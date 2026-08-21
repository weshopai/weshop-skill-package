import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const initializer = path.join(root, "scripts", "create-custom-skill-draft.mjs");
const reviewer = path.join(root, "skills", "review-custom-skill", "scripts", "review-custom-skill.mjs");
const run = (script, args) => spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: "utf8" });

test("creates an isolated custom draft that cannot pass review unfinished", async () => {
  const draftRoot = await mkdtemp(path.join(os.tmpdir(), "weshop-custom-draft-test-"));
  try {
    const initialized = run(initializer, ["weekly-campaign-directions", "--root", draftRoot]);
    assert.equal(initialized.status, 0, initialized.stderr);
    const target = path.join(draftRoot, "weekly-campaign-directions");
    assert.match(await readFile(path.join(target, "intake.md"), "utf8"), /Origin: User-authored/);
    const reviewed = run(reviewer, [target]);
    assert.equal(reviewed.status, 1, reviewed.stderr);
    const report = JSON.parse(reviewed.stdout);
    assert.equal(report.verdict, "Revise");
    assert.ok(report.blockers.some((item) => item.includes("placeholders")));
  } finally {
    await rm(draftRoot, { recursive: true, force: true });
  }
});

test("bundled reviewer remains self-contained in a copied installation", async () => {
  const fixture = await mkdtemp(path.join(os.tmpdir(), "weshop-custom-review-test-"));
  try {
    const installedCreator = path.join(fixture, "create-custom-skill");
    const installedReviewer = path.join(fixture, "review-custom-skill");
    await cp(path.join(root, "skills", "create-custom-skill"), installedCreator, { recursive: true });
    await cp(path.join(root, "skills", "review-custom-skill"), installedReviewer, { recursive: true });
    const reviewed = run(path.join(installedReviewer, "scripts", "review-custom-skill.mjs"), [installedCreator]);
    assert.equal(reviewed.status, 0, reviewed.stderr);
    const report = JSON.parse(reviewed.stdout);
    assert.equal(report.verdict, "Mechanical pass");
    assert.deepEqual(report.blockers, []);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
