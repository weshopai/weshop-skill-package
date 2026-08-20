#!/usr/bin/env node
import { execFileSync, spawnSync } from "node:child_process";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptPath = fileURLToPath(import.meta.url);
const stateRoot = path.resolve(process.env.WESHOP_SKILL_HOME ?? path.join(os.homedir(), ".weshop-skill-package"));
const statePath = path.join(stateRoot, "auto-update.json");
const installationsPath = path.join(stateRoot, "installations.json");
const logPath = path.join(stateRoot, "auto-update.log");
const label = "ai.weshop.skills.autoupdate";
const intervalSeconds = 6 * 60 * 60;

const usage = `Usage:
  npm run skills:auto-update -- install
  npm run skills:auto-update -- status
  npm run skills:auto-update -- check
  npm run skills:auto-update -- run [--quiet]
  npm run skills:auto-update -- uninstall`;

const args = process.argv.slice(2);
const command = args.shift();
const quiet = args.includes("--quiet");
if (quiet) args.splice(args.indexOf("--quiet"), 1);
if (args.length) throw new Error(usage);

const output = (value) => {
  if (!quiet) process.stdout.write(`${typeof value === "string" ? value : JSON.stringify(value, null, 2)}\n`);
};

const git = (...gitArgs) => execFileSync("git", gitArgs, {
  cwd: root,
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"]
}).trim();

const atomicJson = async (file, value) => {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, file);
};

const readJson = async (file, fallback) => {
  try { return JSON.parse(await readFile(file, "utf8")); }
  catch (error) { if (error.code === "ENOENT") return fallback; throw error; }
};

const parseVersion = (tag) => {
  const match = /^v(\d+)\.(\d+)\.(\d+)$/.exec(tag);
  return match ? match.slice(1).map(Number) : undefined;
};

const latestStableTag = (tags) => tags
  .map((tag) => ({ tag, version: parseVersion(tag) }))
  .filter((entry) => entry.version)
  .sort((left, right) => {
    for (let index = 0; index < 3; index += 1) {
      if (left.version[index] !== right.version[index]) return right.version[index] - left.version[index];
    }
    return 0;
  })[0]?.tag;

const isAncestor = (ancestor, descendant) => spawnSync(
  "git", ["merge-base", "--is-ancestor", ancestor, descendant], { cwd: root, stdio: "ignore" }
).status === 0;

const syncInstallations = async () => {
  const registry = await readJson(installationsPath, { installations: [] });
  const results = [];
  for (const installation of registry.installations ?? []) {
    const target = path.resolve(installation.target);
    const result = spawnSync(process.execPath, [path.join(root, "scripts", "manage-skills.mjs"), "sync", "--all", "--target", target], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
    results.push({ target, ok: result.status === 0, detail: (result.stderr || result.stdout).trim() });
    if (result.status !== 0) throw new Error(`Updated source, but Skill sync failed for ${target}: ${(result.stderr || result.stdout).trim()}`);
  }
  return results;
};

const inspectUpdate = () => {
  git("fetch", "--quiet", "--tags", "--prune", "origin");
  const tags = git("tag", "--list", "v*").split("\n").filter(Boolean);
  const latestTag = latestStableTag(tags);
  const currentCommit = git("rev-parse", "HEAD");
  if (!latestTag) return { result: "no-release", currentCommit };
  const latestCommit = git("rev-list", "-n", "1", latestTag);
  if (currentCommit === latestCommit) return { result: "current", currentCommit, latestCommit, latestTag };
  if (isAncestor(latestCommit, currentCommit)) return { result: "ahead-of-release", currentCommit, latestCommit, latestTag };
  if (!isAncestor(currentCommit, latestCommit)) return { result: "diverged", currentCommit, latestCommit, latestTag };
  return { result: "update-available", currentCommit, latestCommit, latestTag };
};

const runUpdate = async ({ apply }) => {
  const checkedAt = new Date().toISOString();
  const previous = await readJson(statePath, {});
  try {
    if (git("status", "--porcelain")) throw new Error("Source repository has local changes; automatic update was skipped.");
    const inspection = inspectUpdate();
    let synced = [];
    let didSync = false;
    let result = inspection.result;
    if (apply && inspection.result === "update-available") {
      git("merge", "--ff-only", inspection.latestTag);
      inspection.currentCommit = git("rev-parse", "HEAD");
      result = "updated";
    }
    if (apply && inspection.latestTag && previous.syncedCommit !== inspection.currentCommit) {
      synced = await syncInstallations();
      didSync = true;
      if (result === "current") result = "synchronized";
    }
    const state = {
      schemaVersion: 1,
      checkedAt,
      ...inspection,
      result,
      synced,
      syncedCommit: didSync ? inspection.currentCommit : previous.syncedCommit
    };
    await atomicJson(statePath, state);
    output(state);
    return state;
  } catch (error) {
    const state = {
      schemaVersion: 1,
      checkedAt,
      result: "blocked",
      sourceCommit: (() => { try { return git("rev-parse", "HEAD"); } catch { return undefined; } })(),
      syncedCommit: previous.syncedCommit,
      error: error instanceof Error ? error.message : String(error)
    };
    await atomicJson(statePath, state);
    output(state);
    process.exitCode = 1;
    return state;
  }
};

const xmlEscape = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&apos;");

const shellQuote = (value) => `'${value.replaceAll("'", `'"'"'`)}'`;

const installMacScheduler = async () => {
  const directory = path.join(os.homedir(), "Library", "LaunchAgents");
  const plist = path.join(directory, `${label}.plist`);
  await mkdir(directory, { recursive: true });
  await mkdir(stateRoot, { recursive: true });
  const document = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>${label}</string>
  <key>ProgramArguments</key><array>
    <string>${xmlEscape(process.execPath)}</string>
    <string>${xmlEscape(scriptPath)}</string>
    <string>run</string><string>--quiet</string>
  </array>
  <key>WorkingDirectory</key><string>${xmlEscape(root)}</string>
  <key>RunAtLoad</key><true/>
  <key>StartInterval</key><integer>${intervalSeconds}</integer>
  <key>StandardOutPath</key><string>${xmlEscape(logPath)}</string>
  <key>StandardErrorPath</key><string>${xmlEscape(logPath)}</string>
</dict></plist>
`;
  await writeFile(plist, document, { mode: 0o600 });
  spawnSync("launchctl", ["bootout", `gui/${process.getuid()}`, plist], { stdio: "ignore" });
  const loaded = spawnSync("launchctl", ["bootstrap", `gui/${process.getuid()}`, plist], { encoding: "utf8" });
  if (loaded.status !== 0) throw new Error(`Unable to load LaunchAgent: ${loaded.stderr.trim()}`);
  return plist;
};

const cronLinesWithoutJob = (text) => text.split("\n").filter((line) => !line.includes(`# ${label}`) && !line.includes(scriptPath));

const installLinuxScheduler = async () => {
  await mkdir(stateRoot, { recursive: true });
  const existing = spawnSync("crontab", ["-l"], { encoding: "utf8" });
  if (existing.error?.code === "ENOENT") throw new Error("crontab is unavailable; install cron or run `npm run skills:auto-update -- run` from your scheduler.");
  const lines = cronLinesWithoutJob(existing.status === 0 ? existing.stdout : "").filter(Boolean);
  const job = `17 */6 * * * cd ${shellQuote(root)} && ${shellQuote(process.execPath)} ${shellQuote(scriptPath)} run --quiet >> ${shellQuote(logPath)} 2>&1 # ${label}`;
  const installed = spawnSync("crontab", ["-"], { input: `${[...lines, job].join("\n")}\n`, encoding: "utf8" });
  if (installed.status !== 0) throw new Error(`Unable to install cron entry: ${installed.stderr.trim()}`);
  return "user crontab";
};

const installScheduler = async () => {
  const location = process.platform === "darwin"
    ? await installMacScheduler()
    : process.platform === "linux"
      ? await installLinuxScheduler()
      : (() => { throw new Error("Automatic scheduling currently supports macOS and Linux/WSL."); })();
  await atomicJson(path.join(stateRoot, "scheduler.json"), {
    schemaVersion: 1,
    platform: process.platform,
    intervalSeconds,
    sourceRoot: root,
    installedAt: new Date().toISOString(),
    location
  });
  output(`Automatic Skill updates enabled every 6 hours (${location}).`);
};

const uninstallScheduler = async () => {
  if (process.platform === "darwin") {
    const plist = path.join(os.homedir(), "Library", "LaunchAgents", `${label}.plist`);
    spawnSync("launchctl", ["bootout", `gui/${process.getuid()}`, plist], { stdio: "ignore" });
    try { await unlink(plist); } catch (error) { if (error.code !== "ENOENT") throw error; }
  } else if (process.platform === "linux") {
    const existing = spawnSync("crontab", ["-l"], { encoding: "utf8" });
    if (existing.status === 0) {
      const lines = cronLinesWithoutJob(existing.stdout).filter(Boolean);
      spawnSync("crontab", ["-"], { input: `${lines.join("\n")}\n`, encoding: "utf8" });
    }
  }
  try { await unlink(path.join(stateRoot, "scheduler.json")); } catch (error) { if (error.code !== "ENOENT") throw error; }
  output("Automatic Skill updates disabled.");
};

if (command === "install") {
  await runUpdate({ apply: true });
  if (process.exitCode !== 1) await installScheduler();
} else if (command === "uninstall") await uninstallScheduler();
else if (command === "check") await runUpdate({ apply: false });
else if (command === "run") await runUpdate({ apply: true });
else if (command === "status") {
  const scheduler = await readJson(path.join(stateRoot, "scheduler.json"), { enabled: false });
  const update = await readJson(statePath, { result: "never-checked" });
  output({ scheduler, update, logPath });
} else throw new Error(usage);
