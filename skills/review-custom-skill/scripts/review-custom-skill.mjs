import { lstat, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const input = process.argv[2];
if (!input || process.argv.length !== 3) throw new Error("Usage: review-custom-skill.mjs <skill-directory>");
const directory = path.resolve(input);
const skillPath = path.join(directory, "SKILL.md");
const source = await readFile(skillPath, "utf8");
const blockers = [];
const warnings = [];

const frontmatter = source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/)?.[1];
if (!frontmatter) blockers.push("SKILL.md must begin with YAML frontmatter.");
const name = frontmatter?.match(/^name:\s*["']?([^\n"']+)["']?\s*$/m)?.[1]?.trim();
const descriptionMatch = frontmatter?.match(/^description:\s*(?:[>|]\s*\n((?:[ \t]+.*(?:\n|$))*)|["']?([^\n"']+)["']?\s*$)/m);
const description = (descriptionMatch?.[1] ?? descriptionMatch?.[2])?.replace(/\n\s+/g, " ").trim();

if (!name) blockers.push("Frontmatter requires name.");
else {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) blockers.push("name must use lowercase kebab-case.");
  if (name !== path.basename(directory)) blockers.push(`Directory name ${path.basename(directory)} must equal frontmatter name ${name}.`);
}
if (!description) blockers.push("Frontmatter requires a non-empty description.");
else {
  if (/TODO|TBD|Pending/i.test(description)) blockers.push("Description still contains scaffold placeholders.");
  if (description.length < 120) warnings.push("Description may be too short to distinguish outcome, inputs, deliverable, exclusions, and related Skills.");
}
if (/\b(?:TODO|TBD|Pending review)\b/i.test(source)) blockers.push("SKILL.md still contains unfinished placeholders.");

for (const heading of ["## What this skill does", "## How to use", "## User-facing output"]) {
  if (!source.includes(heading)) blockers.push(`Missing required section: ${heading}.`);
}
if (!/```text\n[\s\S]+?\n```/.test(source)) warnings.push("Add at least one realistic text request example.");

const resourceMatches = [...source.matchAll(/(?:\[[^\]]+\]\()?((?:references|scripts|assets)\/[a-zA-Z0-9._/-]+)/g)]
  .map((match) => match[1].replace(/[)`.,;:]+$/, ""));
for (const resource of new Set(resourceMatches)) {
  try { await lstat(path.join(directory, resource)); }
  catch (error) { if (error.code === "ENOENT") blockers.push(`Referenced resource does not exist: ${resource}.`); else throw error; }
}

const entries = await readdir(directory, { withFileTypes: true });
if (entries.some((entry) => entry.isDirectory() && entry.name === "scripts")) {
  warnings.push("Bundled scripts require manual source review; this validator does not execute them.");
}
if (/WESHOP_API_KEY\s*[:=]\s*(?!<|\$\{|process\.env|os\.environ|environment|env\b)["']?[^\s"']+/i.test(source)) {
  blockers.push("Possible literal WESHOP_API_KEY value or unsafe key assignment detected.");
}
if (/https?:\/\/(?!open\.weshop\.ai\b|www\.weshop\.ai\b|github\.com\b)/i.test(source)) {
  warnings.push("Review non-WeShop remote domains and asset-upload behavior before installation.");
}
if (/(curl\s+.*openapi\.weshop\.ai|package-owned OpenAPI client|blind retry|automatic resubmission)/i.test(source)) {
  blockers.push("Execution instructions conflict with the official-CLI-only or no-blind-resubmission policy.");
}

const verdict = blockers.length ? "Revise" : "Mechanical pass";
console.log(JSON.stringify({ verdict, skill: name ?? null, directory, blockers, warnings, note: "Mechanical pass is not semantic approval or proof of an executable WeShop route." }, null, 2));
if (blockers.length) process.exitCode = 1;
