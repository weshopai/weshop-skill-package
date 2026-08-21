import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
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
