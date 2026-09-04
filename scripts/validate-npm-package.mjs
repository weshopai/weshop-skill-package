import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const packed = spawnSync("npm", ["pack", "--dry-run", "--json"], { encoding: "utf8", env: { ...process.env, npm_config_loglevel: "silent" } });
if (packed.status !== 0) throw new Error(packed.stderr || "npm pack --dry-run failed.");
const report = JSON.parse(packed.stdout)[0];
const paths = report.files.map((entry) => entry.path);
const manifest = JSON.parse(readFileSync("package.json", "utf8"));
const expectedRuntimeResources = [
  "skills",
  "catalog/skills.json",
  "routing/guide.md",
  "workflows/guide.md",
  "workflows/catalog.json",
  "shared/model-selection.md",
  "LICENSE"
];
if (manifest.weshopDesktop?.schemaVersion !== 1
  || JSON.stringify(manifest.weshopDesktop.runtimeResources) !== JSON.stringify(expectedRuntimeResources)) {
  throw new Error("weshopDesktop.runtimeResources does not match the protected runtime architecture.");
}
const required = [
  "LICENSE",
  "README.md",
  "package.json",
  "scripts/weshop-skills.mjs",
  "scripts/manage-skills.mjs",
  "routing/guide.md",
  "workflows/guide.md",
  "workflows/catalog.json",
  "skills/create-custom-skill/SKILL.md",
  "skills/create-custom-skill/scripts/check-custom-skill.mjs",
  "shared/model-selection.md",
  "models/catalog.json",
  "catalog/skills.json"
];
for (const file of required) {
  if (!paths.includes(file)) throw new Error(`npm package is missing required runtime file: ${file}`);
}
for (const legacySkill of ["skills/weshop-router/", "skills/orchestrate-multi-step-workflow/"]) {
  if (paths.some((file) => file.startsWith(legacySkill))) {
    throw new Error(`routing infrastructure must not be packaged as a Skill: ${legacySkill}`);
  }
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
