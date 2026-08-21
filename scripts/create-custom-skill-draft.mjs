import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const slug = args.shift();
const usage = "npm run skills:custom:init -- <slug> [--root <draft-root>]";

const option = (name) => {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value\n${usage}`);
  args.splice(index, 2);
  return value;
};

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Use a lowercase kebab-case slug.\n${usage}`);
const draftRoot = path.resolve(option("--root") ?? path.join(os.homedir(), ".weshop-skill-package", "custom-skills"));
if (args.length) throw new Error(usage);
const target = path.join(draftRoot, slug);
if (path.dirname(target) !== draftRoot) throw new Error("Resolved draft path escaped the selected root.");

const skill = `---
name: ${slug}
description: "TODO: State the user outcome, inputs, preservation scope, deliverable, exclusions, and materially related Skills."
---
# ${slug}

## Catalog

- Display name: TODO
- Category: User custom
- Status: Draft
- Route label: TODO
- Tone: blue
- Short description: TODO

## What this skill does

- TODO: Describe one reusable user-visible result.

## How to use

TODO: Name required inputs, optional inputs, constraints, and a representative request.

#### Example

\`\`\`text
TODO: Add a realistic request that should select this Skill.
\`\`\`

## Workflow

1. TODO: Define the minimum complete workflow and stopping conditions.

## User-facing output

- Media type: TODO
- Default quantity: TODO
- Content per artifact: TODO
- Default layout: TODO
- Model policy: TODO or Agent-authored; no paid media generation
- Downstream use: TODO
`;

const intake = `# User custom Skill intake: ${slug}

## Origin and ownership

- Origin: User-authored from a new brief, current conversation, or user-owned workflow
- Created date: ${new Date().toISOString().slice(0, 10)}
- Draft owner: User
- Intended harness and install target: Pending user choice
- Official package promotion requested: No

## Intent contract

- User-visible outcome: Pending
- Required inputs: Pending
- Optional inputs: Pending
- Preservation constraints: Pending
- Deliverable and quantity: Pending
- Reusable decisions or error corrections: Pending

## Similar Skill boundaries

Similarity never requires fusion. Complete one row for every plausible installed Skill.

| Related Skill | Relationship score (0-1) | Shared use case | Use this custom Skill when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| Pending | 0.00 | Pending | Pending | Pending | Pending |

- Proposed frontmatter distinction: Pending
- Three requests that should select this Skill: Pending
- Three requests that should not select this Skill: Pending

## Execution and safety

- Planning-only or executable: Pending
- WeShop Agent/model and verified fields, if executable: Pending
- Deterministic scripts and why they are needed: Pending
- Secret, environment, remote-domain, upload, and installation behavior: Pending
- Paid-operation confirmation and duplicate-submission safety: Pending
- Acceptance and stopping conditions: Pending

## Review and installation

- Mechanical review command: \`npm run skills:custom:review -- ${target}\`
- Independent review verdict: Pending
- Blocking findings resolved: Pending
- User approved installation: No
- Installed target: Not installed
`;

await mkdir(draftRoot, { recursive: true });
await mkdir(target, { recursive: false });
await writeFile(path.join(target, "SKILL.md"), skill, { flag: "wx" });
await writeFile(path.join(target, "intake.md"), intake, { flag: "wx" });
console.log(JSON.stringify({ result: "created", slug, target, files: ["SKILL.md", "intake.md"] }, null, 2));
