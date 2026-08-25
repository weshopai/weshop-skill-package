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
const ignoredKeywords = new Set(["and", "are", "can", "create", "creative", "final", "from", "for", "image", "into", "media", "new", "one", "only", "original", "real", "reference", "request", "scene", "skill", "that", "the", "this", "use", "using", "video", "with", "workflow"]);
const keywords = (value) => new Set((value.toLowerCase().match(/[a-z0-9]{3,}/g) ?? []).filter((word) => !ignoredKeywords.has(word)));
const overlap = (left, right) => [...left].filter((word) => right.has(word)).length;
const parseSkill = async (slug) => {
  const source = await readFile(path.join(skillsRoot, slug, "SKILL.md"), "utf8");
  const catalog = parseFields(section(source, "Catalog", "What this skill does"));
  const requiredCatalogFields = ["Display name", "Category", "Short description"];
  for (const field of requiredCatalogFields) if (!catalog[field]) throw new Error(`${slug}: Catalog requires ${field}`);
  if (catalog.Featured && !["yes", "no"].includes(catalog.Featured)) throw new Error(`${slug}: Featured must be yes or no when provided`);
  if (catalog["Cover image"] && !catalog["Cover image"].startsWith("/skill-covers/")) throw new Error(`${slug}: Cover image must be served from /skill-covers/`);
  const whatThisSkillDoes = section(source, "What this skill does", "How to use").split("\n").filter((line) => line.startsWith("- ")).map((line) => line.slice(2).trim());
  const howToUseSection = section(source, "How to use", "User-facing output");
  const promptExamples = [...howToUseSection.matchAll(/#### (.+?)\n+```text\n([\s\S]*?)\n```/g)].map((match) => ({ title: match[1].trim(), prompt: match[2].trim() }));
  const output = parseFields(section(source, "User-facing output", "Route"));
  if (!whatThisSkillDoes.length || !howToUseSection || !output["Media type"]) throw new Error(`${slug}: display fields are incomplete`);
  return {
    id: slug,
    displayName: catalog["Display name"],
    description: catalog["Short description"],
    category: catalog.Category,
    categoryTags: [tag(catalog.Category)],
    coverImage: catalog["Cover image"] || fallbackCover,
    routeLabel: catalog["Route label"] || "Skill workflow",
    tone: catalog.Tone || "ink",
    featured: catalog.Featured === "yes",
    whatThisSkillDoes,
    howToUse: { summary: firstParagraph(howToUseSection), promptExamples },
    output,
  };
};
const directories = (await readdir(skillsRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
const parsed = await Promise.all(directories.map(parseSkill));
const withSimilarSkills = parsed.map((skill) => {
  const terms = keywords(`${skill.displayName} ${skill.description}`);
  const similarSkills = parsed.filter((candidate) => candidate.id !== skill.id).map((candidate) => {
    const sharedTerms = overlap(terms, keywords(`${candidate.displayName} ${candidate.description}`));
    return { candidate, score: sharedTerms + (candidate.category === skill.category ? 0.25 : 0), sharedTerms };
  }).filter(({ sharedTerms }) => sharedTerms > 0).sort((a, b) => b.score - a.score || a.candidate.displayName.localeCompare(b.candidate.displayName)).slice(0, 3)
    .map(({ candidate }) => ({ id: candidate.id, displayName: candidate.displayName, difference: `${candidate.displayName}: ${candidate.description} In contrast, ${skill.displayName}: ${skill.description}` }));
  return { ...skill, similarSkills };
});
const outputDir = path.join(root, "web/src/generated");
await mkdir(outputDir, { recursive: true });
const catalog = `${JSON.stringify({ schemaVersion: "1.0.0", skills: withSimilarSkills }, null, 2)}\n`;
await mkdir(path.join(root, "catalog"), { recursive: true });
await writeFile(path.join(root, "catalog", "skills.json"), catalog);
await writeFile(path.join(outputDir, "skill-catalog.json"), catalog);
console.log(`Synced ${withSimilarSkills.length} Skills into the normalized client catalog.`);
