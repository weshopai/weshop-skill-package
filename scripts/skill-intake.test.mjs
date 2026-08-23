import assert from "node:assert/strict";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const script = path.join(root, "scripts", "create-skill-intake.mjs");
const slug = "intake-validation-fixture";
const target = path.join(root, "intake", "external-skills", slug);
const run = (args) => spawnSync(process.execPath, [script, ...args], { cwd: root, encoding: "utf8" });

const intake = `# External Skill intake: ${slug}

- Mechanism version: 2
- Status: active

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| generate-video | 0.76 | Video | The request needs the distinct outcome | A general shot is requested | Generate a segment |

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| Make the distinct outcome | ${slug} | Specific output contract |
| I need that complete outcome | ${slug} | Same contract |
| Create a focused version | ${slug} | Same preservation rule |
| Make one ordinary video shot | generate-video | No special contract |
| Animate this image | animate-image | Bounded image motion |
| Join these accepted clips | combine-videos | Existing clips only |
`;

const capabilityMap = `# WeShop capability substitution: ${slug}

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Generate an outcome | External model | Authorized input | generate-video | prompt | Native prompt | None | Schema |
`;

test("current intake validation requires lifecycle, boundaries, and fuzzy semantic cases", async () => {
  await mkdir(target, { recursive: true });
  try {
    await writeFile(path.join(target, "intake.md"), intake);
    await writeFile(path.join(target, "capability-map.md"), capabilityMap);
    const valid = run(["validate", slug]);
    assert.equal(valid.status, 0, valid.stderr);

    await writeFile(path.join(target, "intake.md"), intake.replace("| Join these accepted clips | combine-videos | Existing clips only |\n", ""));
    const invalid = run(["validate", slug]);
    assert.equal(invalid.status, 1);
    assert.match(invalid.stderr, /fuzzy semantic test needs/);
  } finally {
    await rm(target, { recursive: true, force: true });
  }
});
