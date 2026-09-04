import { spawnSync } from "node:child_process";

const packed = spawnSync("npm", ["pack", "--dry-run", "--json"], { encoding: "utf8", env: { ...process.env, npm_config_loglevel: "silent" } });
if (packed.status !== 0) throw new Error(packed.stderr || "npm pack --dry-run failed.");
const report = JSON.parse(packed.stdout)[0];
const paths = report.files.map((entry) => entry.path);
const required = [
  "LICENSE",
  "README.md",
  "package.json",
  "scripts/weshop-skills.mjs",
  "scripts/manage-skills.mjs",
  "skills/weshop-router/SKILL.md",
  "skills/weshop-router/references/routing-map.json",
  "skills/weshop-router/references/task-routing.md",
  "skills/weshop-router/references/workflow-recipes.md",
  "skills/orchestrate-multi-step-workflow/SKILL.md",
  "skills/create-custom-skill/SKILL.md",
  "skills/create-custom-skill/scripts/check-custom-skill.mjs",
  "shared/model-selection.md",
  "models/catalog.json",
  "catalog/skills.json"
];
for (const file of required) {
  if (!paths.includes(file)) throw new Error(`npm package is missing required runtime file: ${file}`);
}
const forbiddenPrefixes = ["intake/", "docs/", "src/", ".github/", "output/", "runtime/skill-covers/"];
const forbiddenNames = new Set(["handoff.md", "CONTRIBUTING.md"]);
const forbidden = paths.filter((file) => (
  file.startsWith("web/")
  || forbiddenPrefixes.some((prefix) => file.startsWith(prefix))
  || forbiddenNames.has(file)
  || /(?:^|\/)\S+\.test\.(?:js|d\.ts|mjs)$/.test(file)
));
if (forbidden.length) throw new Error(`npm package contains non-runtime files:\n${forbidden.join("\n")}`);
if (paths.includes("tool-call-assembly.md")) throw new Error("npm package must not duplicate a host Tool wrapper contract.");
console.log(`Valid npm package: ${report.name}@${report.version}, ${report.entryCount} files, ${report.size} packed bytes, ${report.unpackedSize} unpacked bytes.`);
