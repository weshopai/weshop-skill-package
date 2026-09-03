import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const catalog = JSON.parse(await readFile(path.join(root, "models/catalog.json"), "utf8"));
const activeModelIds = new Set(catalog.models.filter((model) => model.status !== "offline").map((model) => model.id));
const skillRoot = path.join(root, "skills");
const platformSkills = new Set(["create-custom-skill"]);
const failures = [];
let checked = 0;

for (const entry of await readdir(skillRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = path.join(skillRoot, entry.name, "SKILL.md");
  let body;
  try { body = await readFile(file, "utf8"); } catch { continue; }
  const policyReferences = body.matchAll(/\[[^\]]*model-selection policy[^\]]*\]\(([^)]+)\)/gi);
  if (/`model-selection(?:-policy)?\.md`/i.test(body)) {
    failures.push(`${entry.name}: shared model policy must be a relative Markdown link, not an unqualified file reference.`);
  }
  for (const match of policyReferences) {
    const target = path.resolve(path.dirname(file), match[1]);
    try { await readFile(target, "utf8"); } catch { failures.push(`${entry.name}: shared model policy link does not resolve: ${match[1]}.`); }
  }
  if (["weshop-router", "orchestrate-multi-step-workflow"].includes(entry.name)) continue;
  if (platformSkills.has(entry.name)) continue;
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
  for (const match of production.matchAll(/`(gpt-image|nano-banana-edit|seedream|seedream-lite|qwen-image-edit|midjourney|z-image|firered-image-edit|grok-imagine|seedance-2-5|minimax-h3|seedance|seedance-mini|kling-v3-omni|kling|happyhorse|sora-2|wan-ai|grok-imagine-video|hailuo-ai|vidu-ai|veo-ai)`/gi)) {
    if (!activeModelIds.has(match[1].toLowerCase())) failures.push(`${entry.name}: unavailable or offline model id ${match[1]}.`);
  }
}

if (failures.length) {
  console.error(`Model-routing validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Valid model routing: ${checked} Atom Skills checked against ${activeModelIds.size} active catalog models.`);
