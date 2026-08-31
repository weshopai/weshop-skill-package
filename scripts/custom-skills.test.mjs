import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const initializer = path.join(root, "scripts", "create-custom-skill-draft.mjs");
const checker = path.join(root, "skills", "create-custom-skill", "scripts", "check-custom-skill.mjs");
const run = (script, args) => spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: "utf8" });

test("creates an isolated custom draft that cannot pass its local check unfinished", async () => {
  const draftRoot = await mkdtemp(path.join(os.tmpdir(), "weshop-custom-draft-test-"));
  try {
    const initialized = run(initializer, ["weekly-campaign-directions", "--root", draftRoot]);
    assert.equal(initialized.status, 0, initialized.stderr);
    const target = path.join(draftRoot, "weekly-campaign-directions");
    const intake = await readFile(path.join(target, "intake.md"), "utf8");
    assert.match(intake, /Origin: User-authored/);
    assert.match(intake, /Local installation authorization: Granted by the user's create, save, import, or upload request/);
    assert.doesNotMatch(intake, /User approved installation: No/);
    const checked = run(checker, [target]);
    assert.equal(checked.status, 1, checked.stderr);
    const report = JSON.parse(checked.stdout);
    assert.equal(report.verdict, "Revise");
    assert.ok(report.blockers.some((item) => item.includes("placeholders")));
  } finally {
    await rm(draftRoot, { recursive: true, force: true });
  }
});

test("creator's bundled checker remains self-contained in a copied installation", async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), "weshop-custom-review-test-"));
  try {
    const installedCreator = path.join(fixture, "create-custom-skill");
    await cp(path.join(root, "skills", "create-custom-skill"), installedCreator, { recursive: true });
    const checked = run(path.join(installedCreator, "scripts", "check-custom-skill.mjs"), [installedCreator]);
    assert.equal(checked.status, 0, checked.stderr);
    const report = JSON.parse(checked.stdout);
    assert.equal(report.verdict, "Mechanical pass");
    assert.deepEqual(report.blockers, []);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
