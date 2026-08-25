import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const catalog = JSON.parse(await readFile(path.join(root, "web/src/generated/skill-catalog.json"), "utf8"));
const publishedCatalog = await readFile(path.join(root, "catalog/skills.json"), "utf8");
if (publishedCatalog !== `${JSON.stringify(catalog, null, 2)}\n`) throw new Error("Published catalog/skills.json is not synchronized with the client catalog");
if (catalog.schemaVersion !== "1.0.0" || !Array.isArray(catalog.skills) || !catalog.skills.length) throw new Error("Skill catalog has an invalid envelope");
const ids = new Set(catalog.skills.map((skill) => skill.id));
for (const skill of catalog.skills) {
  for (const field of ["id", "displayName", "description", "category", "coverImage", "routeLabel", "tone"]) if (typeof skill[field] !== "string" || !skill[field]) throw new Error(`${skill.id}: missing ${field}`);
  if (!Array.isArray(skill.categoryTags) || !skill.categoryTags.length) throw new Error(`${skill.id}: missing categoryTags`);
  if (!skill.howToUse?.summary || !Array.isArray(skill.howToUse.promptExamples)) throw new Error(`${skill.id}: invalid howToUse`);
  if (!Array.isArray(skill.similarSkills) || skill.similarSkills.length > 3) throw new Error(`${skill.id}: similarSkills must contain at most three entries`);
  if (skill.similarSkills.some((similar) => similar.id === skill.id || !ids.has(similar.id) || !similar.difference)) throw new Error(`${skill.id}: invalid similar Skill`);
  await access(path.join(root, "web/public", skill.coverImage));
}
console.log(`Validated normalized catalog for ${catalog.skills.length} Skills.`);
