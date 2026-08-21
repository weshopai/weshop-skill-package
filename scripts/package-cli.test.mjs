import assert from "node:assert/strict";
import { lstat, mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cli = path.join(root, "scripts", "weshop-skills.mjs");
const packageVersion = JSON.parse(await readFile(path.join(root, "package.json"), "utf8")).version;
const availableSkillCount = (await readdir(path.join(root, "skills"), { withFileTypes: true })).filter((entry) => entry.isDirectory()).length;
const run = (args, env = {}) => spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: "utf8", env: { ...process.env, ...env } });

test("package CLI reports its version and installs all Skills to an explicit target", async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), "weshop-package-cli-test-"));
  try {
    const target = path.join(fixture, "skills");
    const state = path.join(fixture, "state");
    const version = run(["version"]);
    assert.equal(version.status, 0, version.stderr);
    assert.equal(version.stdout.trim(), packageVersion);
    const installed = run(["install", "--all", "--target", target, "--copy"], { WESHOP_SKILL_HOME: state });
    assert.equal(installed.status, 0, installed.stderr);
    const directories = (await readdir(target, { withFileTypes: true })).filter((entry) => entry.isDirectory());
    assert.equal(directories.length, availableSkillCount);
    const status = run(["status", "--all", "--target", target], { WESHOP_SKILL_HOME: state });
    assert.equal(status.status, 0, status.stderr);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});

test("sync --all prunes only retired package-managed symlinks", async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), "weshop-package-prune-test-"));
  try {
    const target = path.join(fixture, "skills");
    const state = path.join(fixture, "state");
    const installed = run(["install", "--all", "--target", target], { WESHOP_SKILL_HOME: state });
    assert.equal(installed.status, 0, installed.stderr);
    const lockPath = path.join(target, ".weshop-skill-lock.json");
    const lock = JSON.parse(await readFile(lockPath, "utf8"));
    lock.skills["retired-package-skill"] = {
      mode: "symlink",
      source: "skills/retired-package-skill",
      sourceCommit: "test",
      contentHash: "sha256:test"
    };
    await writeFile(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
    await symlink(path.join(root, "skills", "retired-package-skill"), path.join(target, "retired-package-skill"), "dir");
    const custom = path.join(target, "user-owned-custom-skill");
    await mkdir(custom);
    await writeFile(path.join(custom, "SKILL.md"), "user owned\n");

    const synced = run(["sync", "--all", "--target", target], { WESHOP_SKILL_HOME: state });
    assert.equal(synced.status, 0, synced.stderr);
    assert.match(synced.stdout, /retired-package-skill: removed/);
    await assert.rejects(lstat(path.join(target, "retired-package-skill")), { code: "ENOENT" });
    assert.equal((await readFile(path.join(custom, "SKILL.md"), "utf8")).trim(), "user owned");
    const updatedLock = JSON.parse(await readFile(lockPath, "utf8"));
    assert.equal(updatedLock.skills["retired-package-skill"], undefined);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
