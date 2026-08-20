import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { ExecutionLedger } from "./execution-ledger.js";
import { executeRun, pollRun } from "./executor.js";
import { WeShopOpenApiClient } from "./openapi-client.js";

const jsonResponse = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

test("submits once, persists the receipt, and polls the accepted execution", async () => {
  const directory = await mkdtemp(join(tmpdir(), "weshop-executor-"));
  const calls: string[] = [];
  const client = new WeShopOpenApiClient({
    apiKey: "test-key",
    fetchImpl: (async (input) => {
      const url = String(input); calls.push(url);
      if (url.endsWith("/runs")) return jsonResponse({ success: true, data: {}, meta: { executionId: "exec-1" } });
      return jsonResponse({ success: true, data: { status: "Success", executions: [{ status: "Success", result: [{ image: "https://example.test/out.png" }] }] } });
    }) as typeof fetch
  });
  const ledger = new ExecutionLedger(join(directory, "ledger.json"));
  const result = await executeRun(client, ledger, { agent: { name: "gpt-image", version: "v1.0" }, params: { textDescription: "test" } }, { operationKey: "op-1" });
  assert.equal(result.executionId, "exec-1");
  assert.equal(result.terminal, true);
  assert.equal(calls.filter((url) => url.endsWith("/runs")).length, 1);
  const persisted = JSON.parse(await readFile(ledger.path, "utf8"));
  assert.equal(persisted.operations["op-1"].submissionState, "accepted");
  assert.equal(persisted.operations["op-1"].executionId, "exec-1");
});

test("freezes an ambiguous create response and refuses duplicate submission", async () => {
  const directory = await mkdtemp(join(tmpdir(), "weshop-executor-"));
  let calls = 0;
  const client = new WeShopOpenApiClient({
    apiKey: "test-key",
    fetchImpl: (async () => { calls += 1; throw new TypeError("connection closed"); }) as typeof fetch
  });
  const ledger = new ExecutionLedger(join(directory, "ledger.json"));
  const request = { agent: { name: "kling", version: "v1.0" }, params: { textDescription: "test" } };
  await assert.rejects(executeRun(client, ledger, request, { operationKey: "op-unknown" }), /outcome is unknown/);
  await assert.rejects(executeRun(client, ledger, request, { operationKey: "op-unknown" }), /refusing a duplicate/);
  assert.equal(calls, 1);
  assert.equal((await ledger.get("op-unknown"))?.submissionState, "outcome-unknown");
});

test("records a structured API rejection as rejected rather than unknown", async () => {
  const directory = await mkdtemp(join(tmpdir(), "weshop-executor-"));
  const client = new WeShopOpenApiClient({
    apiKey: "test-key",
    fetchImpl: (async () => jsonResponse({ success: false, error: { code: "INVALID_ARGUMENT", message: "bad params", retryable: false } }, 400)) as typeof fetch
  });
  const ledger = new ExecutionLedger(join(directory, "ledger.json"));
  await assert.rejects(executeRun(client, ledger, { agent: { name: "gpt-image", version: "v1.0" } }, { operationKey: "op-rejected" }), /bad params/);
  assert.equal((await ledger.get("op-rejected"))?.submissionState, "rejected");
});

test("serializes concurrent preparation and sends only one create request per operation key", async () => {
  const directory = await mkdtemp(join(tmpdir(), "weshop-executor-"));
  let creates = 0;
  const client = new WeShopOpenApiClient({
    apiKey: "test-key",
    fetchImpl: (async (input) => {
      if (String(input).endsWith("/runs")) {
        creates += 1;
        return jsonResponse({ success: true, data: {}, meta: { executionId: "exec-race" } });
      }
      return jsonResponse({ success: true, data: { status: "Success" } });
    }) as typeof fetch
  });
  const ledger = new ExecutionLedger(join(directory, "ledger.json"));
  const request = { agent: { name: "gpt-image", version: "v1.0" }, params: { textDescription: "test" } };
  const attempts = await Promise.allSettled([
    executeRun(client, ledger, request, { operationKey: "op-race", wait: false }),
    executeRun(client, ledger, request, { operationKey: "op-race", wait: false })
  ]);
  assert.equal(attempts.filter((attempt) => attempt.status === "fulfilled").length, 1);
  assert.equal(attempts.filter((attempt) => attempt.status === "rejected").length, 1);
  assert.equal(creates, 1);
});

test("rejects polling intervals that could amplify provider traffic", async () => {
  const client = new WeShopOpenApiClient({ apiKey: "test-key", fetchImpl: (async () => jsonResponse({ success: true, data: { status: "Running" } })) as typeof fetch });
  await assert.rejects(pollRun(client, "exec-fast", { pollIntervalMs: 0 }), /at least 1000ms/);
});

test("surfaces a known execution ID when receipt persistence fails", async () => {
  const directory = await mkdtemp(join(tmpdir(), "weshop-executor-"));
  class FailingLedger extends ExecutionLedger {
    override async update(operationKey: string, patch: Parameters<ExecutionLedger["update"]>[1]) {
      if (patch.submissionState === "accepted") throw new Error("disk full");
      return super.update(operationKey, patch);
    }
  }
  const client = new WeShopOpenApiClient({ apiKey: "test-key", fetchImpl: (async () => jsonResponse({ success: true, data: {}, meta: { executionId: "exec-known" } })) as typeof fetch });
  const ledger = new FailingLedger(join(directory, "ledger.json"));
  await assert.rejects(executeRun(client, ledger, { agent: { name: "gpt-image", version: "v1.0" } }, { operationKey: "op-known" }), /exec-known.*Do not resubmit/);
});

test("recovers a ledger lock left by a dead process", async () => {
  const directory = await mkdtemp(join(tmpdir(), "weshop-executor-"));
  const ledger = new ExecutionLedger(join(directory, "nested", "ledger.json"));
  await mkdir(join(directory, "nested"));
  await writeFile(`${ledger.path}.lock`, JSON.stringify({ pid: 2_147_483_647, createdAt: new Date(0).toISOString() }));
  const record = await ledger.prepare({ operationKey: "op-after-crash", agent: { name: "gpt-image", version: "v1.0" }, request: {} });
  assert.equal(record.submissionState, "prepared");
});
