#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import packageJson from "../package.json" with { type: "json" };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const command = args.shift();
const usage = `WeShop Skills ${packageJson.version}

Usage:
  weshop-skills install [skill|--all] [--agent codex|claude|cursor] [--target <dir>] [--copy]
  weshop-skills sync [skill|--all] [--agent codex|claude|cursor] [--target <dir>]
  weshop-skills status [skill|--all] [--agent codex|claude|cursor] [--target <dir>]
  weshop-skills list
  weshop-skills custom init <slug> [--root <draft-root>]
  weshop-skills custom review <skill-directory>
  weshop-skills api-key check
  weshop-skills version`;

const run = (script, scriptArgs) => {
  const result = spawnSync(process.execPath, [path.join(root, script), ...scriptArgs], { stdio: "inherit", cwd: root });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
};

const extractOption = (name) => {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value.\n${usage}`);
  args.splice(index, 2);
  return value;
};

const agentTarget = (agent) => {
  if (!agent || agent === "codex") return path.join(os.homedir(), ".codex", "skills");
  if (agent === "claude") return path.join(os.homedir(), ".claude", "skills");
  if (agent === "cursor") return path.join(os.homedir(), ".cursor", "skills");
  throw new Error(`Unsupported --agent ${agent}. Use codex, claude, cursor, or an explicit --target.\n${usage}`);
};

if (!command || command === "help" || command === "--help" || command === "-h") {
  process.stdout.write(`${usage}\n`);
} else if (command === "version" || command === "--version" || command === "-v") {
  process.stdout.write(`${packageJson.version}\n`);
} else if (["install", "sync", "status", "list"].includes(command)) {
  const agent = extractOption("--agent");
  const hasTarget = args.includes("--target");
  if (agent && hasTarget) throw new Error("Use either --agent or --target, not both.");
  if (command === "list" && (agent || args.length)) throw new Error(usage);
  if (command === "install") {
    let hasSelection = false;
    for (let index = 0; index < args.length; index += 1) {
      if (args[index] === "--target") { index += 1; continue; }
      if (args[index] === "--all" || !args[index].startsWith("--")) { hasSelection = true; break; }
    }
    if (!hasSelection) args.unshift("--all");
  }
  const managerArgs = [command, ...args];
  if (command !== "list" && agent) managerArgs.push("--target", agentTarget(agent));
  run("scripts/manage-skills.mjs", managerArgs);
} else if (command === "custom") {
  const subcommand = args.shift();
  if (subcommand === "init") run("scripts/create-custom-skill-draft.mjs", args);
  else if (subcommand === "review") run("skills/review-custom-skill/scripts/review-custom-skill.mjs", args);
  else throw new Error(usage);
} else if (command === "api-key") {
  if (args.length !== 1 || args[0] !== "check") throw new Error(usage);
  run("scripts/check-api-key.mjs", []);
} else {
  throw new Error(usage);
}
