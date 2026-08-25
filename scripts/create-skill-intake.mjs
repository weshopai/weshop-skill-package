import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const command = args.shift();
const usage = "npm run skills:intake -- <slug> --source <url-or-local-path> --source-ref <commit|tag|version|content-hash>\n  or: npm run skills:intake -- validate <slug>";
const validSlug = (value) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value ?? "");

const option = (name) => {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value\n${usage}`);
  args.splice(index, 2);
  return value;
};

if (command === "validate") {
  const slug = args.shift();
  if (!validSlug(slug) || args.length) throw new Error(`Use a lowercase kebab-case intake slug.\n${usage}`);
  const target = path.join(root, "intake", "external-skills", slug);
  const [intake, capabilityMap, installed] = await Promise.all([
    readFile(path.join(target, "intake.md"), "utf8"),
    readFile(path.join(target, "capability-map.md"), "utf8"),
    readdir(path.join(root, "skills"), { withFileTypes: true }),
  ]);
  const errors = [];
  if (!intake.includes("- Mechanism version: 2")) errors.push("intake.md must use mechanism version 2; legacy records are archive evidence only.");
  if (!/^- Status: (active|inactive)$/m.test(intake)) errors.push("intake.md must declare Status: active or inactive.");
  if (/Pending review|TODO|Not documented/.test(intake + capabilityMap)) errors.push("intake files cannot contain incomplete placeholder text.");
  const boundaries = intake.split("## Similar Skill boundaries")[1]?.split("## ")[0] ?? "";
  if (!/^\|\s*[^|-][^|]*\|\s*(?:0(?:\.\d+)?|1(?:\.0+)?)\s*\|/m.test(boundaries)) errors.push("intake.md needs a completed similar-Skill boundary row with a relationship score.");
  if (!/^\|\s*[^|-][^|]*\|\s*[^|]+\|\s*[^|]+\|\s*[^|]+\|\s*[^|]+\|\s*[^|]+\|\s*[^|]+\|\s*[^|]+\|/m.test(capabilityMap)) errors.push("capability-map.md needs a completed capability substitution row.");
  const semantic = intake.split("## Fuzzy semantic routing test")[1]?.split("## ")[0] ?? "";
  const cases = [...semantic.matchAll(/^\|\s*[^|]+\|\s*`?([a-z0-9-]+)`?\s*\|\s*[^|]+\|$/gm)]
    .filter(([, expected]) => expected !== "---");
  const selfCases = cases.filter(([, expected]) => expected === slug).length;
  const neighborCases = cases.filter(([, expected]) => expected !== slug && installed.some((entry) => entry.isDirectory() && entry.name === expected)).length;
  if (selfCases < 3 || neighborCases < 3) errors.push("fuzzy semantic test needs 3 candidate requests and 3 near-neighbor requests that name installed Skills.");
  const clientCatalog = intake.split("## Cross-client catalog record")[1]?.split("## ")[0] ?? "";
  for (const field of ["Display name", "Category", "Description", "Cover decision", "How to use summary"]) {
    if (!new RegExp(`^- ${field}: (?!Not documented|TODO).+`, "m").test(clientCatalog)) errors.push(`cross-client catalog record requires ${field}`);
  }
  const relatedRows = [...clientCatalog.matchAll(/^\|\s*`?([a-z0-9-]+)`?\s*\|\s*[^|]+\|\s*[^|]+\|$/gm)].filter(([, related]) => related !== "---");
  if (relatedRows.length > 3) errors.push("cross-client catalog record may list at most three similar Skills.");
  if (errors.length) throw new Error(`Invalid current intake ${slug}:\n- ${errors.join("\n- ")}`);
  console.log(`Valid current intake: ${slug} (${cases.length} semantic cases).`);
  process.exit(0);
}

const slug = command;
if (!validSlug(slug)) throw new Error(`Use a lowercase kebab-case intake slug.\n${usage}`);
const source = option("--source");
const sourceRef = option("--source-ref");
if (!source || !sourceRef || args.length) throw new Error(usage);

const intakeRoot = path.join(root, "intake", "external-skills");
const target = path.join(intakeRoot, slug);
const today = new Date().toISOString().slice(0, 10);
const intake = `# External Skill intake: ${slug}

> Current intake mechanism. Do not use legacy records without this marker as templates; they may reflect the retired merge-era policy.

- Mechanism version: 2
- Status: active

## Provenance

- Source: ${source}
- Source revision: ${sourceRef}
- Author or organization: Not documented
- Reviewed date: ${today}
- Files inspected: Not documented

## Product decomposition

- User-visible outcomes: Not documented
- Required inputs: Not documented
- Optional inputs: Not documented
- External AI operations: Not documented
- Deterministic operations: Not documented
- State, chaining, polling, and publication: Not documented
- Preservation and quality claims: Not documented

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake
- Proposed standalone Atom: Not documented
- Router compositions: Not documented
- Rejected or unsupported behavior: Not documented
- Lifecycle decision and rationale: Not documented. Keep this record active until explicitly made inactive.

## Similar Skill boundaries

Complete one row for every materially similar or adjacent installed Skill. Similar Skills remain independent.

Calibrate the static relationship score from outcome, input roles, preservation, deliverable, and exclusions: 0.00–0.24 incidental; 0.25–0.49 shared component; 0.50–0.74 closely related but clearly different; 0.75–0.89 strongly adjacent; 0.90–1.00 nearly the same absent the recorded decisive boundary. It is discovery metadata, never a merge or runtime-selection score.

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| Not documented | 0.00 | Not documented | Not documented | Not documented | Not documented |

- Proposed frontmatter distinction: Not documented
- Highest-risk ambiguity: Not documented
- Router scoring evidence: Not documented

## Fuzzy semantic routing test

Before closing the intake, test natural-language wording against the candidate and every plausible installed neighbor. Add at least three requests that should select this candidate and three ambiguous requests that should select a named installed neighbor. Explain the decisive boundary; do not test keywords alone.

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| Not documented | ${slug} | Not documented |
| Not documented | ${slug} | Not documented |
| Not documented | ${slug} | Not documented |
| Not documented | related-installed-skill | Not documented |

## Cross-client catalog record

This record becomes the client contract when the Atom is promoted. Use exact Catalog wording where possible. A missing custom cover is valid only when the fallback cover is explicitly selected. List only the most useful related Skills, never more than three, and state the decisive difference.

- Display name: Not documented
- Category: Not documented
- Description: Not documented
- Cover decision: Not documented
- How to use summary: Not documented

| Similar Skill | Difference from this Atom | Why the client should suggest it |
| --- | --- | --- |
| Not documented | related-installed-skill | Not documented |
| Not documented | related-installed-skill | Not documented |

## Security review

- Secret and environment access: Not documented
- Remote domains and uploads: Not documented
- Installation and executable code: Not documented
- Retry and provider-spend behavior: Not documented
- Unsafe or removed behavior: Not documented

## Validation evidence

- Structural intake check: Not run
- Semantic routing test: Not run
- Source record packaged: Not documented
`;

const capabilityMap = `# WeShop capability substitution: ${slug}

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Not documented | Not documented | Not documented | Not documented | Not documented | Not documented | Not documented | Not documented |

## Deterministic operations retained locally

- Not documented

## Unsupported parity

- Not documented

## Proposed Atom boundaries

- Not documented
`;

await mkdir(intakeRoot, { recursive: true });
await mkdir(target, { recursive: false });
await writeFile(path.join(target, "intake.md"), intake, { flag: "wx" });
await writeFile(path.join(target, "capability-map.md"), capabilityMap, { flag: "wx" });
console.log(`Created isolated external Skill intake: ${path.relative(root, target)}`);
console.log("Complete the intake and run `npm run skills:intake -- validate <slug>` before authoring an Atom.");
