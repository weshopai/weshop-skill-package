import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const slug = args.shift();
const usage = "npm run skills:intake -- <slug> --source <url-or-local-path> --source-ref <commit|tag|version|content-hash>";

const option = (name) => {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a value\n${usage}`);
  args.splice(index, 2);
  return value;
};

if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Use a lowercase kebab-case intake slug.\n${usage}`);
const source = option("--source");
const sourceRef = option("--source-ref");
if (!source || !sourceRef || args.length) throw new Error(usage);

const intakeRoot = path.join(root, "intake", "external-skills");
const target = path.join(intakeRoot, slug);
const today = new Date().toISOString().slice(0, 10);
const intake = `# External Skill intake: ${slug}

## Provenance

- Source: ${source}
- Source revision: ${sourceRef}
- Author or organization: Pending review
- Reviewed date: ${today}
- Files inspected: Pending review

## Product decomposition

- User-visible outcomes: Pending review
- Required inputs: Pending review
- Optional inputs: Pending review
- External AI operations: Pending review
- Deterministic operations: Pending review
- State, chaining, polling, and publication: Pending review
- Preservation and quality claims: Pending review

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake
- Proposed standalone Atom: Pending review
- Router compositions: Pending review
- Rejected or unsupported behavior: Pending review
- Promotion decision and rationale: Pending review; preserve this candidate independently and use similar Skills only to state routing distinctions

## Similar Skill boundaries

Complete one row for every materially similar or adjacent installed Skill. Similar Skills remain independent.

Calibrate the static relationship score from outcome, input roles, preservation, deliverable, and exclusions: 0.00–0.24 incidental; 0.25–0.49 shared component; 0.50–0.74 closely related but clearly different; 0.75–0.89 strongly adjacent; 0.90–1.00 nearly the same absent the recorded decisive boundary. It is discovery metadata, never a merge or runtime-selection score.

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| Pending review | 0.00 | Pending review | Pending review | Pending review | Pending review |

- Proposed frontmatter distinction: Pending review
- Highest-risk ambiguity: Pending review
- Router scoring evidence: Pending review

## Security review

- Secret and environment access: Pending review
- Remote domains and uploads: Pending review
- Installation and executable code: Pending review
- Retry and provider-spend behavior: Pending review
- Unsafe or removed behavior: Pending review

## Validation evidence

- Official WeShop schema checked: Pending review
- Representative execution: Not authorized or not run
- Acceptance result: Pending review
- Source record packaged: Pending review
`;

const capabilityMap = `# WeShop capability substitution: ${slug}

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pending review | Pending review | Pending review | Pending review | Pending review | Pending review | Pending review | Pending review |

## Deterministic operations retained locally

- Pending review

## Unsupported parity

- Pending review

## Proposed Atom boundaries

- Pending review
`;

await mkdir(intakeRoot, { recursive: true });
await mkdir(target, { recursive: false });
await writeFile(path.join(target, "intake.md"), intake, { flag: "wx" });
await writeFile(path.join(target, "capability-map.md"), capabilityMap, { flag: "wx" });
console.log(`Created isolated external Skill intake: ${path.relative(root, target)}`);
console.log("Complete provenance and the WeShop capability map before creating or changing an installable Atom.");
