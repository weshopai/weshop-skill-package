#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { ExecutionLedger } from "./execution-ledger.js";
import { executeRun, pollRun } from "./executor.js";
import { WeShopOpenApiClient, isTerminalRun, runStatusFrom, type RunRequest } from "./openapi-client.js";
import { BUILT_IN_CLI_VERSION, detectCliBackend, normalizeAgentName, normalizeRunPayload } from "./cli-backend.js";
import { modelCatalog } from "./models.js";

type Arguments = Record<string, string | boolean | string[]> & { _: string[] };

const HELP = `WeShop Skill Package CLI

Usage:
  weshop-skill doctor
  weshop-skill catalog
  weshop-skill upload <image-path>
  weshop-skill run <agent> --input <json|@json-file> --params <json|@json-file> [options]
  weshop-skill status <execution-id> [--wait]
  weshop-skill operation <operation-key>
  weshop-skill info <agent> [--version v1.0]

Execution priority:
  Prefer the official local CLI when "weshop --version" succeeds. Use its native
  syntax, for example: weshop gpt-image --prompt "...". This built-in CLI is the
  fallback when the official executable is absent; its syntax is not interchangeable.

Run options:
  --version <version>              Agent version (default: v1.0)
  --input <json|@file>             OpenAPI input object
  --params <json|@file>            Agent-specific params object
  --task-name <name>               Sets input.taskName
  --callback-url <url>             Optional public callback URL
  --operation-key <key>            Stable key (required)
  --parent-operation-key <key>     Links a revised retry to its terminal failure
  --no-wait                        Return after receiving executionId
  --poll-interval-ms <ms>          Poll interval (default: 3000)
  --timeout-ms <ms>                Wait timeout (default: 1800000)
  --ledger <path>                  Override durable ledger path

Local images inside --input or --params:
  Use a string such as "file:./product.png". It is uploaded once per command and
  replaced with the reusable WeShop URL before submission.

Agent notes:
  GPT Image 2 uses the Agent ID "gpt-image", not "gpt-image-2".
  Neither CLI has a "list-agents" command; use catalog, info, or --help.

The API key is read only from WESHOP_API_KEY and is sent only to openapi.weshop.ai.`;

function parseArguments(argv: string[]): Arguments {
  const parsed: Arguments = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) { parsed._.push(token); continue; }
    const [rawKey, inline] = token.slice(2).split("=", 2);
    if (rawKey === "help" || rawKey === "no-wait" || rawKey === "wait") { parsed[rawKey] = true; continue; }
    const value = inline ?? argv[++index];
    if (value === undefined || value.startsWith("--")) throw new Error(`Missing value for --${rawKey}.`);
    const existing = parsed[rawKey];
    parsed[rawKey] = existing === undefined ? value : Array.isArray(existing) ? [...existing, value] : [String(existing), value];
  }
  return parsed;
}

function one(args: Arguments, name: string): string | undefined {
  const value = args[name];
  if (Array.isArray(value)) throw new Error(`--${name} may be provided only once.`);
  return typeof value === "string" ? value : undefined;
}

function numberOption(args: Arguments, name: string): number | undefined {
  const value = one(args, name);
  if (value === undefined) return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) throw new Error(`--${name} must be a non-negative number.`);
  return parsed;
}

async function jsonObject(value: string | undefined, name: string): Promise<Record<string, unknown>> {
  if (!value) return {};
  const source = value.startsWith("@") ? await readFile(resolve(value.slice(1)), "utf8") : value;
  const parsed = JSON.parse(source) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error(`--${name} must contain a JSON object.`);
  return parsed as Record<string, unknown>;
}

async function resolveLocalImages(value: unknown, client: WeShopOpenApiClient, cache = new Map<string, string>()): Promise<unknown> {
  if (typeof value === "string" && value.startsWith("file:")) {
    const path = resolve(value.slice(5));
    const cached = cache.get(path);
    if (cached) return cached;
    const uploaded = await client.uploadImage(path);
    cache.set(path, uploaded.imageUrl);
    return uploaded.imageUrl;
  }
  if (Array.isArray(value)) return Promise.all(value.map((item) => resolveLocalImages(item, client, cache)));
  if (value && typeof value === "object") {
    const entries = await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await resolveLocalImages(item, client, cache)] as const));
    return Object.fromEntries(entries);
  }
  return value;
}

function print(value: unknown): void {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

export async function runCli(argv = process.argv.slice(2)): Promise<void> {
  if (argv.length === 1 && (argv[0] === "--version" || argv[0] === "-v")) { process.stdout.write(`${BUILT_IN_CLI_VERSION}\n`); return; }
  const args = parseArguments(argv);
  const [command, subject] = args._;
  if (!command || command === "help" || args.help === true) { process.stdout.write(`${HELP}\n`); return; }
  if (command === "version") { process.stdout.write(`${BUILT_IN_CLI_VERSION}\n`); return; }
  if (command === "doctor" || command === "backend") {
    print({
      ...detectCliBackend(),
      apiKeyConfigured: Boolean(process.env.WESHOP_API_KEY?.trim()),
      guidance: "Use the official weshop CLI when available. Fall back only when it is absent; auth or request failures are not fallback signals."
    });
    return;
  }
  if (command === "catalog") {
    print({ note: "Routing catalog IDs, not a server-side list of account-enabled Agents.", models: modelCatalog.map(({ id, label, media, status }) => ({ id, label, media, status })) });
    return;
  }
  if (command === "list-agents") throw new Error("list-agents is not supported. Use 'weshop-skill catalog', 'weshop-skill info <agent>', or 'weshop --help'.");
  if (command === "operation") {
    if (!subject) throw new Error("operation requires an operation key.");
    const record = await new ExecutionLedger(one(args, "ledger")).get(subject);
    if (!record) throw new Error(`Operation ${subject} was not found in the ledger.`);
    print(record);
    return;
  }
  const client = new WeShopOpenApiClient();

  if (command === "upload") {
    if (!subject) throw new Error("upload requires an image path.");
    print(await client.uploadImage(subject));
    return;
  }
  if (command === "status") {
    if (!subject) throw new Error("status requires an execution ID.");
    const ledger = new ExecutionLedger(one(args, "ledger"));
    const result = args.wait === true
      ? await pollRun(client, subject, { pollIntervalMs: numberOption(args, "poll-interval-ms"), timeoutMs: numberOption(args, "timeout-ms") })
      : await client.getRun(subject).then((response) => ({ response, terminal: isTerminalRun(response) }));
    if (result.terminal) {
      const record = await ledger.findByExecutionId(subject);
      if (record) await ledger.update(record.operationKey, { terminalStatus: runStatusFrom(result.response), terminalObservedAt: new Date().toISOString() });
    }
    print(result);
    return;
  }
  if (command === "info") {
    if (!subject) throw new Error("info requires an agent name.");
    print(await client.getAgentInfo(normalizeAgentName(subject), one(args, "version") ?? "v1.0"));
    return;
  }
  if (command !== "run") throw new Error(`Unknown command: ${command}.`);
  if (!subject) throw new Error("run requires an agent name.");
  const agent = normalizeAgentName(subject);
  const operationKey = one(args, "operation-key")?.trim();
  if (!operationKey) throw new Error("run requires --operation-key with a stable value chosen before submission.");

  const input = await resolveLocalImages(await jsonObject(one(args, "input"), "input"), client) as Record<string, unknown>;
  const params = await resolveLocalImages(await jsonObject(one(args, "params"), "params"), client) as Record<string, unknown>;
  normalizeRunPayload(agent, input, params);
  if (agent === "gpt-image" && typeof params.textDescription !== "string") throw new Error("gpt-image requires params.textDescription (the built-in CLI also accepts legacy input.text and moves it there).");
  const taskName = one(args, "task-name");
  if (taskName) input.taskName = taskName;
  const request: RunRequest = {
    agent: { name: agent, version: one(args, "version") ?? "v1.0" },
    input,
    params,
    ...(one(args, "callback-url") ? { callbackUrl: one(args, "callback-url") } : {})
  };
  const ledger = new ExecutionLedger(one(args, "ledger"));
  print(await executeRun(client, ledger, request, {
    operationKey,
    parentOperationKey: one(args, "parent-operation-key"),
    wait: args["no-wait"] !== true,
    pollIntervalMs: numberOption(args, "poll-interval-ms"),
    timeoutMs: numberOption(args, "timeout-ms")
  }));
}
