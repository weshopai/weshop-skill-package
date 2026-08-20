import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const git = (cwd, ...args) => execFileSync("git", args, {
  cwd,
  encoding: "utf8",
  stdio: ["ignore", "pipe", "pipe"]
}).trim();

const runUpdater = (client, state, command) => spawnSync(
  process.execPath,
  [path.join(client, "scripts", "auto-update.mjs"), command],
  { cwd: client, encoding: "utf8", env: { ...process.env, WESHOP_SKILL_HOME: state } }
);

test("advances a detached checkout only to the latest stable release", async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), "weshop-auto-update-test-"));
  try {
    const seed = path.join(fixture, "seed");
    const remote = path.join(fixture, "remote.git");
    const client = path.join(fixture, "client");
    const state = path.join(fixture, "state");
    await mkdir(path.join(seed, "scripts"), { recursive: true });
    await cp(path.join(root, "scripts", "auto-update.mjs"), path.join(seed, "scripts", "auto-update.mjs"));
    await cp(path.join(root, "scripts", "manage-skills.mjs"), path.join(seed, "scripts", "manage-skills.mjs"));

    git(seed, "init", "-b", "main");
    git(seed, "config", "user.name", "WeShop Tests");
    git(seed, "config", "user.email", "tests@weshop.ai");
    git(seed, "add", "scripts");
    git(seed, "commit", "-m", "Initial release");
    git(seed, "tag", "v0.1.0");
    git(fixture, "init", "--bare", remote);
    git(seed, "remote", "add", "origin", remote);
    git(seed, "push", "-u", "origin", "main", "--tags");
    git(fixture, "clone", remote, client);
    git(remote, "symbolic-ref", "HEAD", "refs/heads/main");
    git(client, "checkout", "--detach", "v0.1.0");

    await writeFile(path.join(seed, "release-content.txt"), "stable release\n");
    git(seed, "add", "release-content.txt");
    git(seed, "commit", "-m", "Stable update");
    git(seed, "tag", "v0.2.0");
    git(seed, "push", "origin", "main", "--tags");

    const checked = runUpdater(client, state, "check");
    assert.equal(checked.status, 0, checked.stderr);
    assert.equal(JSON.parse(checked.stdout).result, "update-available");

    const updated = runUpdater(client, state, "run");
    assert.equal(updated.status, 0, updated.stderr);
    assert.equal(JSON.parse(updated.stdout).result, "updated");
    assert.equal(git(client, "rev-parse", "HEAD"), git(seed, "rev-list", "-n", "1", "v0.2.0"));
    assert.equal(spawnSync("git", ["symbolic-ref", "-q", "HEAD"], { cwd: client }).status, 1);

    const current = runUpdater(client, state, "run");
    assert.equal(current.status, 0, current.stderr);
    assert.equal(JSON.parse(current.stdout).result, "current");

    await writeFile(path.join(client, "local-change.txt"), "do not overwrite\n");
    const blocked = runUpdater(client, state, "run");
    assert.equal(blocked.status, 1);
    assert.equal(JSON.parse(await readFile(path.join(state, "auto-update.json"), "utf8")).result, "blocked");
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});

test("full installations track future Skills and register their target", async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), "weshop-install-test-"));
  try {
    const target = path.join(fixture, "skills");
    const state = path.join(fixture, "state");
    const installed = spawnSync(
      process.execPath,
      [path.join(root, "scripts", "manage-skills.mjs"), "install", "--all", "--target", target],
      { cwd: root, encoding: "utf8", env: { ...process.env, WESHOP_SKILL_HOME: state } }
    );
    assert.equal(installed.status, 0, installed.stderr);
    const lock = JSON.parse(await readFile(path.join(target, ".weshop-skill-lock.json"), "utf8"));
    const registry = JSON.parse(await readFile(path.join(state, "installations.json"), "utf8"));
    assert.equal(lock.tracksAll, true);
    assert.equal(lock.defaultMode, "symlink");
    assert.equal(Object.keys(lock.skills).length, 85);
    assert.deepEqual(registry.installations.map((entry) => entry.target), [target]);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
