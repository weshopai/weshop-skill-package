import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const slug = args.shift();
const usage = "npm run skills:intake -- <slug> --source <url> --source-ref <commit|tag|version> --license <SPDX|NO-LICENSE> --mode <adapted|licensed-reuse|clean-room>";

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
const license = option("--license");
const mode = option("--mode");
if (!source || !sourceRef || !license || !mode || args.length) throw new Error(usage);
if (!["adapted", "licensed-reuse", "clean-room"].includes(mode)) throw new Error(`Unsupported mode: ${mode}\n${usage}`);

const intakeRoot = path.join(root, "intake", "external-skills");
const target = path.join(intakeRoot, slug);
const today = new Date().toISOString().slice(0, 10);
const intake = `# External Skill intake: ${slug}

## Provenance

- Source: ${source}
- Source revision: ${sourceRef}
- Author or organization: Pending review
- License: ${license}
- Reuse mode: ${mode}
- Reviewed date: ${today}
- Files inspected: Pending review

## Permission decision

- License evidence: Pending review
- Required notices: Pending review
- Material allowed to reuse: Pending review
- Material that must be independently authored: Pending review
- Decision: Pending review

## Product decomposition

- User-visible outcomes: Pending review
- Required inputs: Pending review
- Optional inputs: Pending review
- External AI operations: Pending review
- Deterministic operations: Pending review
- State, chaining, polling, and publication: Pending review
- Preservation and quality claims: Pending review

## Package decision

- Existing Atom updates: Pending review
- New Atom candidates: Pending review
- Router compositions: Pending review
- Rejected or unsupported behavior: Pending review
- Promotion decision and rationale: Pending review

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
- Attribution packaged: Pending review
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
