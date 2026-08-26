import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillsRoot = path.join(root, "skills");
const fallbackCover = "/skill-covers/default-skill.svg";
const parseFields = (body) => Object.fromEntries(body.split("\n").filter((line) => line.startsWith("- ") && line.includes(":"))
  .map((line) => { const separator = line.indexOf(":"); return [line.slice(2, separator).trim(), line.slice(separator + 1).trim()]; }));
const section = (source, heading, nextHeading) => {
  const start = source.indexOf(`## ${heading}`);
  const end = source.indexOf(`## ${nextHeading}`, start + 1);
  if (start < 0) return "";
  return source.slice(start + heading.length + 4, end < 0 ? source.length : end).trim();
};
const firstParagraph = (value) => value.split("\n\n")[0].replace(/\n+/g, " ").trim();
const tag = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const normalizedCategory = (value) => ({
  "Video": "Video and audio",
  "Layout / composition": "Layout and design",
  "Commercial image": "Commercial production",
  "Social and memory": "Social and layout",
}[value] ?? value);
const parseSkill = async (slug) => {
  const source = await readFile(path.join(skillsRoot, slug, "SKILL.md"), "utf8");
  const catalog = parseFields(section(source, "Catalog", "What this skill does"));
  const requiredCatalogFields = ["Display name", "Category", "Short description"];
  for (const field of requiredCatalogFields) if (!catalog[field]) throw new Error(`${slug}: Catalog requires ${field}`);
  if (catalog.Featured && !["yes", "no"].includes(catalog.Featured)) throw new Error(`${slug}: Featured must be yes or no when provided`);
  if (catalog["Cover image"] && !catalog["Cover image"].startsWith("/skill-covers/")) throw new Error(`${slug}: Cover image must be served from /skill-covers/`);
  if (catalog["Cover motion"] && !catalog["Cover motion"].startsWith("/skill-covers/")) throw new Error(`${slug}: Cover motion must be served from /skill-covers/`);
  const whatThisSkillDoes = section(source, "What this skill does", "How to use").split("\n").filter((line) => line.startsWith("- ")).map((line) => line.slice(2).trim());
  const howToUseSection = section(source, "How to use", "User-facing output");
  const promptExamples = [...howToUseSection.matchAll(/#### (.+?)\n+```text\n([\s\S]*?)\n```/g)].map((match) => ({ title: match[1].trim(), prompt: match[2].trim() }));
  const output = parseFields(section(source, "User-facing output", "Route"));
  if (!whatThisSkillDoes.length || !howToUseSection || !output["Media type"]) throw new Error(`${slug}: display fields are incomplete`);
  const similarSkillIds = catalog["Similar skills"]?.split(",").map((id) => id.trim()).filter(Boolean) ?? [];
  const sourceCategory = normalizedCategory(catalog.Category);
  const isTextCategory = catalog["Text category"] === "yes";
  const category = isTextCategory ? "Text" : sourceCategory;
  return {
    id: slug,
    displayName: catalog["Display name"],
    description: catalog["Short description"],
    category,
    categoryTags: [...new Set([tag(category), ...(isTextCategory ? [tag(sourceCategory)] : [])])],
    coverImage: catalog["Cover image"] || fallbackCover,
    ...(catalog["Cover motion"] ? { coverMotion: catalog["Cover motion"] } : {}),
    routeLabel: catalog["Route label"] || "Skill workflow",
    tone: catalog.Tone || "ink",
    featured: catalog.Featured === "yes",
    whatThisSkillDoes,
    howToUse: { summary: firstParagraph(howToUseSection), promptExamples },
    output,
    similarSkillIds,
  };
};
const directories = (await readdir(skillsRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const parsed = await Promise.all(directories.map(parseSkill));
const skillsById = new Map(parsed.map((skill) => [skill.id, skill]));
const withSimilarSkills = parsed.map(({ similarSkillIds, ...skill }) => {
  if (!similarSkillIds.length) return skill;
  if (similarSkillIds.length > 3) throw new Error(`${skill.id}: Catalog Similar skills may contain at most three IDs`);
  const similarSkills = similarSkillIds.map((id) => {
    const candidate = skillsById.get(id);
    if (!candidate || id === skill.id) throw new Error(`${skill.id}: Catalog Similar skills contains invalid ID ${id}`);
    return { id, displayName: candidate.displayName, difference: `${candidate.displayName}: ${candidate.description} In contrast, ${skill.displayName}: ${skill.description}` };
  });
  if (new Set(similarSkillIds).size !== similarSkillIds.length) throw new Error(`${skill.id}: Catalog Similar skills contains duplicate IDs`);
  return { ...skill, similarSkills };
});
const outputDir = path.join(root, "web/src/generated");
await mkdir(outputDir, { recursive: true });
const catalog = `${JSON.stringify({ schemaVersion: "1.0.0", skills: withSimilarSkills }, null, 2)}\n`;
await mkdir(path.join(root, "catalog"), { recursive: true });
await writeFile(path.join(root, "catalog", "skills.json"), catalog);
await writeFile(path.join(outputDir, "skill-catalog.json"), catalog);
console.log(`Synced ${withSimilarSkills.length} Skills into the normalized client catalog.`);
