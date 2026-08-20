import { createHash } from "node:crypto";
import { cp, lstat, mkdir, readFile, readdir, readlink, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = path.join(root, "skills");
const lockName = ".weshop-skill-lock.json";
const stateRoot = path.resolve(process.env.WESHOP_SKILL_HOME ?? path.join(os.homedir(), ".weshop-skill-package"));
const installationsPath = path.join(stateRoot, "installations.json");
const usage = `Usage:
  npm run skills:manage -- list
  npm run skills:manage -- install <skill|--all> [--target <dir>] [--copy]
  npm run skills:manage -- status [skill|--all] [--target <dir>]
  npm run skills:manage -- sync [skill|--all] [--target <dir>]`;

const args = process.argv.slice(2);
const command = args.shift();
const option = (name) => {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value\n${usage}`);
  args.splice(index, 2);
  return value;
};
const targetRoot = path.resolve(option("--target") ?? path.join(os.homedir(), ".codex", "skills"));
const copyMode = args.includes("--copy");
if (copyMode) args.splice(args.indexOf("--copy"), 1);
const requested = args.shift();
if (args.length) throw new Error(usage);

const skillNames = async () => (await readdir(skillsRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const exists = async (file) => {
  try { await lstat(file); return true; } catch (error) { if (error.code === "ENOENT") return false; throw error; }
};

const files = async (directory) => {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await files(file));
    else found.push(file);
  }
  return found.sort();
};

const hashDirectory = async (directory) => {
  const hash = createHash("sha256");
  for (const file of await files(directory)) {
    hash.update(path.relative(directory, file));
    hash.update(await readFile(file));
  }
  return `sha256:${hash.digest("hex")}`;
};

const git = (...gitArgs) => {
  try { return execFileSync("git", gitArgs, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); }
  catch { return "unknown"; }
};

const readLock = async () => {
  try { return JSON.parse(await readFile(path.join(targetRoot, lockName), "utf8")); }
  catch (error) { if (error.code === "ENOENT") return { schemaVersion: 1, sourceRepository: git("remote", "get-url", "origin"), skills: {} }; throw error; }
};

const writeLock = async (lock) => {
  await mkdir(targetRoot, { recursive: true });
  lock.sourceCommit = git("rev-parse", "HEAD");
  lock.updatedAt = new Date().toISOString();
  await writeFile(path.join(targetRoot, lockName), `${JSON.stringify(lock, null, 2)}\n`);
  await mkdir(stateRoot, { recursive: true });
  let registry = { schemaVersion: 1, installations: [] };
  try { registry = JSON.parse(await readFile(installationsPath, "utf8")); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  const installation = {
    target: targetRoot,
    sourceRepository: git("remote", "get-url", "origin"),
    updatedAt: lock.updatedAt
  };
  registry.installations = [
    ...registry.installations.filter((entry) => path.resolve(entry.target) !== targetRoot),
    installation
  ].sort((left, right) => left.target.localeCompare(right.target));
  await writeFile(installationsPath, `${JSON.stringify(registry, null, 2)}\n`);
};

const select = async (value, lock, forExisting = false) => {
  const available = await skillNames();
  if (value === "--all") return forExisting ? Object.keys(lock.skills).sort() : available;
  if (!value) return forExisting ? Object.keys(lock.skills).sort() : [];
  if (!available.includes(value)) throw new Error(`Unknown Skill: ${value}. Run \"npm run skills:manage -- list\".`);
  return [value];
};

const installOne = async (name, mode, lock) => {
  const source = path.join(skillsRoot, name);
  const destination = path.join(targetRoot, name);
  if (!(await exists(path.join(source, "SKILL.md")))) throw new Error(`${name} has no SKILL.md.`);
  if (await exists(destination)) {
    const managed = lock.skills[name];
    if (!managed) throw new Error(`${destination} already exists and is not managed by ${lockName}; move or remove it yourself.`);
    const destinationStat = await lstat(destination);
    if (managed.mode === "symlink") {
      if (!destinationStat.isSymbolicLink()) throw new Error(`${destination} replaced a managed symlink; refusing to overwrite it.`);
      const link = await readlink(destination);
      if (path.resolve(path.dirname(destination), link) !== source) throw new Error(`${destination} points outside this package; refusing to overwrite it.`);
    } else {
      if (!destinationStat.isDirectory()) throw new Error(`${destination} is not the managed copied directory; refusing to overwrite it.`);
      const installedHash = await hashDirectory(destination);
      if (installedHash !== managed.contentHash) throw new Error(`${destination} has local changes; preserve or revert them before sync.`);
    }
    await rm(destination, { recursive: true, force: true });
  }
  if (mode === "copy") await cp(source, destination, { recursive: true });
  else await symlink(source, destination, "dir");
  lock.skills[name] = {
    mode,
    source: path.relative(root, source),
    sourceCommit: git("rev-parse", "HEAD"),
    contentHash: await hashDirectory(source)
  };
  console.log(`${name}: ${mode} -> ${destination}`);
};

if (command === "list") {
  for (const name of await skillNames()) console.log(name);
} else if (command === "install") {
  const lock = await readLock();
  const selected = await select(requested, lock);
  if (!selected.length) throw new Error(usage);
  if (requested === "--all") {
    lock.tracksAll = true;
    lock.defaultMode = copyMode ? "copy" : "symlink";
  }
  await mkdir(targetRoot, { recursive: true });
  for (const name of selected) await installOne(name, copyMode ? "copy" : "symlink", lock);
  await writeLock(lock);
} else if (command === "sync") {
  const lock = await readLock();
  const selected = requested === "--all" && lock.tracksAll
    ? await skillNames()
    : await select(requested, lock, true);
  if (!selected.length) throw new Error(`No managed Skills in ${targetRoot}.`);
  for (const name of selected) await installOne(name, lock.skills[name]?.mode ?? lock.defaultMode ?? "symlink", lock);
  await writeLock(lock);
} else if (command === "status") {
  const lock = await readLock();
  const selected = await select(requested, lock, true);
  if (!selected.length) throw new Error(`No managed Skills in ${targetRoot}.`);
  let stale = false;
  for (const name of selected) {
    const record = lock.skills[name];
    if (!record) { console.log(`${name}: not managed`); stale = true; continue; }
    const source = path.join(root, record.source);
    const destination = path.join(targetRoot, name);
    if (!(await exists(destination))) { console.log(`${name}: missing installation`); stale = true; continue; }
    const sourceHash = await hashDirectory(source);
    let installedHash;
    if (record.mode === "symlink") {
      const link = await readlink(destination);
      installedHash = path.resolve(path.dirname(destination), link) === source ? sourceHash : "wrong-symlink-target";
    } else installedHash = await hashDirectory(destination);
    const current = sourceHash === installedHash;
    console.log(`${name}: ${current ? "current" : "update available"} (${record.mode})`);
    if (!current) stale = true;
  }
  if (stale) process.exitCode = 1;
} else throw new Error(usage);
