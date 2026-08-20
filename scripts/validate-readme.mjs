import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readme = await readFile(path.join(root, "README.md"), "utf8");
const skills = (await readdir(path.join(root, "skills"), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && entry.name !== "weshop-router")
  .map((entry) => entry.name)
  .sort();

const inventory = readme.split("## Complete Skill inventory")[1]?.split(/^## /m)[0];
if (!inventory) throw new Error("README is missing the complete Skill inventory section.");
const listed = [...inventory.matchAll(/`([a-z0-9-]+)`/g)]
  .map((match) => match[1])
  .filter((name) => name !== "weshop-router");
const uniqueListed = [...new Set(listed)].sort();
const missing = skills.filter((name) => !uniqueListed.includes(name));
const extra = uniqueListed.filter((name) => !skills.includes(name));
const duplicates = listed.filter((name, index) => listed.indexOf(name) !== index);
if (missing.length || extra.length || duplicates.length) {
  throw new Error(`README Skill inventory mismatch:\nmissing=${missing.join(",")}\nextra=${extra.join(",")}\nduplicates=${[...new Set(duplicates)].join(",")}`);
}

const localLinks = [...readme.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
  .map((match) => match[1])
  .filter((link) => !link.startsWith("http") && !link.startsWith("#"));
for (const link of localLinks) await access(path.join(root, link));

const requiredCommands = ["skills:manage", "api-key:check", "models:validate", "models:routing-validate", "docs:validate", "web:build"];
for (const command of requiredCommands) {
  if (!readme.includes(command)) throw new Error(`README is missing command documentation for ${command}.`);
}

console.log(`Valid README: ${skills.length} Atom Skills, ${localLinks.length} local links, ${requiredCommands.length} required command families.`);
