import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const catalog = JSON.parse(await readFile(path.join(root, "models/catalog.json"), "utf8"));
const activeModelIds = new Set(catalog.models.filter((model) => model.status !== "offline").map((model) => model.id));
const skillRoot = path.join(root, "skills");
const failures = [];
let checked = 0;

for (const entry of await readdir(skillRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(skillRoot, entry.name, "SKILL.md");
  let body;
  try { body = await readFile(file, "utf8"); } catch { continue; }
  if (entry.name === "weshop-router") continue;
  checked += 1;
  const production = body;
  const usesGptImage = /GPT Image 2|gpt-image/i.test(production);
  if (usesGptImage && !/Medium.{0,30}2K|quality.{0,30}medium.{0,60}imageSize.{0,30}2K/is.test(production)) {
    failures.push(`${entry.name}: GPT Image 2 production use does not declare the Medium/2K default.`);
  }
  if (/Nano Banana|nano-banana-edit/i.test(production)) {
    const constrained = /draft divergence|草稿分叉/i.test(production) && /internal (?:convergence|review)|内部(?:收敛|评审|审阅)/i.test(production);
    if (!constrained) failures.push(`${entry.name}: Nano use is not limited to explicit draft divergence and internal convergence/review.`);
  }
  if (/Sora 2|sora-2/i.test(production)) failures.push(`${entry.name}: offline Sora 2 appears in production instructions.`);
  for (const match of production.matchAll(/`(gpt-image|nano-banana-edit|seedream|qwen-image-edit|midjourney|z-image|firered-image-edit|grok-imagine|seedance-2-5|minimax-h3|seedance|kling|happyhorse|sora-2|wan-ai|grok-imagine-video|hailuo-ai|vidu-ai|veo-ai)`/gi)) {
    if (!activeModelIds.has(match[1].toLowerCase())) failures.push(`${entry.name}: unavailable or offline model id ${match[1]}.`);
  }
}

if (failures.length) {
  console.error(`Model-routing validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Valid model routing: ${checked} Atom Skills checked against ${activeModelIds.size} active catalog models.`);
