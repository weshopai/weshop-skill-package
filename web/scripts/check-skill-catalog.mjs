import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const categoryNames = new Set(["Video", "Text", "Fashion", "Layout & Design", "Commercial Production", "Character", "Utility", "Portrait", "Film", "Comic", "Social Media"]);
const mediaBase = "https://ai-image.weshop.com/desktop";
const catalog = JSON.parse(await readFile(path.join(root, "web/src/generated/skill-catalog.json"), "utf8"));
const publishedCatalog = await readFile(path.join(root, "catalog/skills.json"), "utf8");
if (publishedCatalog !== `${JSON.stringify(catalog, null, 2)}\n`) throw new Error("Published catalog/skills.json is not synchronized with the client catalog");
if (catalog.schemaVersion !== "1.0.0" || !Array.isArray(catalog.skills) || !catalog.skills.length) throw new Error("Skill catalog has an invalid envelope");
const ids = new Set(catalog.skills.map((skill) => skill.id));
for (const skill of catalog.skills) {
  for (const field of ["id", "displayName", "description", "category", "coverImage", "routeLabel", "tone"]) if (typeof skill[field] !== "string" || !skill[field]) throw new Error(`${skill.id}: missing ${field}`);
  if (!Array.isArray(skill.categoryTags) || !skill.categoryTags.length || skill.categoryTags.length > 3 || skill.categoryTags.some((category) => !categoryNames.has(category)) || new Set(skill.categoryTags).size !== skill.categoryTags.length || skill.category !== skill.categoryTags[0]) throw new Error(`${skill.id}: invalid categoryTags`);
  if (!skill.howToUse?.summary || !Array.isArray(skill.howToUse.promptExamples)) throw new Error(`${skill.id}: invalid howToUse`);
  if (skill.similarSkills !== undefined) {
    if (!Array.isArray(skill.similarSkills) || skill.similarSkills.length > 3) throw new Error(`${skill.id}: similarSkills must contain at most three entries`);
    if (skill.similarSkills.some((similar) => similar.id === skill.id || !ids.has(similar.id) || !similar.difference)) throw new Error(`${skill.id}: invalid similar Skill`);
  }
  if (!new RegExp(`^${mediaBase}/coverImage/${skill.id}\\.(?:png|jpe?g|webp|gif|avif|svg)$`, "i").test(skill.coverImage)) throw new Error(`${skill.id}: invalid remote coverImage`);
  if (skill.coverMotion !== undefined) {
    if (typeof skill.coverMotion !== "string" || !new RegExp(`^${mediaBase}/cover(?:Video|Image)/${skill.id}\\.(?:mp4|webm)$`, "i").test(skill.coverMotion)) throw new Error(`${skill.id}: invalid remote coverMotion`);
  }
  if (skill.sourceImages !== undefined) {
    if (!Array.isArray(skill.sourceImages) || !skill.sourceImages.length) throw new Error(`${skill.id}: invalid sourceImages`);
    skill.sourceImages.forEach((source, index) => {
      const suffix = skill.sourceImages.length > 1 ? `-${index + 1}` : "";
      if (!new RegExp(`^${mediaBase}/sourceImage/${skill.id}${suffix}\\.(?:png|jpe?g|webp|gif|avif)$`, "i").test(source)) throw new Error(`${skill.id}: invalid remote source image ${index + 1}`);
    });
  }
}
console.log(`Validated normalized catalog for ${catalog.skills.length} Skills.`);
