import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillsRoot = path.join(root, "skills");
const parseFields = (body) => Object.fromEntries(body.split("\n").filter((line) => line.startsWith("- ") && line.includes(":"))
  .map((line) => { const separator = line.indexOf(":"); return [line.slice(2, separator).trim(), line.slice(separator + 1).trim()]; }));
const section = (source, heading, nextHeading) => {
  const start = source.indexOf(`## ${heading}`);
  const end = source.indexOf(`## ${nextHeading}`, start + 1);
  if (start < 0) return "";
  return source.slice(start + heading.length + 4, end < 0 ? source.length : end).trim();
};
const parseSkill = async (slug) => {
  const source = await readFile(path.join(skillsRoot, slug, "SKILL.md"), "utf8");
  const catalog = parseFields(section(source, "Catalog", "What this skill does"));
  if (!catalog["Display name"]) return null;
  const whatThisSkillDoes = section(source, "What this skill does", "How to use").split("\n").filter((line) => line.startsWith("- ")).map((line) => line.slice(2).trim());
  const howToUseSection = section(source, "How to use", "User-facing output");
  const promptExamples = [...howToUseSection.matchAll(/#### (.+?)\n+```text\n([\s\S]*?)\n```/g)].map((match) => ({ title: match[1].trim(), prompt: match[2].trim() }));
  const output = parseFields(section(source, "User-facing output", "Route"));
  if (!whatThisSkillDoes.length || !promptExamples.length || !output["Media type"]) throw new Error(`${slug}: display fields are incomplete`);
  return [slug, { catalog, whatThisSkillDoes, howToUse: howToUseSection.split("\n\n")[0].trim(), promptExamples, output }];
};
const directories = (await readdir(skillsRoot, { withFileTypes: true })).filter((entry) => entry.isDirectory() && !["weshop-router", "orchestrate-multi-step-workflow"].includes(entry.name)).map((entry) => entry.name).sort();
const parsed = (await Promise.all(directories.map(parseSkill))).filter(Boolean);
const outputDir = path.join(root, "web/src/generated");
await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, "skill-details.json"), `${JSON.stringify(Object.fromEntries(parsed), null, 2)}\n`);
console.log(`Synced ${parsed.length} installable skills for the website.`);
