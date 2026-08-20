import { readFile } from "node:fs/promises";

const catalog = JSON.parse(await readFile(new URL("../models/catalog.json", import.meta.url)));
const ids = new Set();
for (const model of catalog.models) {
  if (!/^[a-z0-9-]+$/.test(model.id)) throw new Error(`Invalid id: ${model.id}`);
  if (ids.has(model.id)) throw new Error(`Duplicate id: ${model.id}`);
  if (!['image', 'video'].includes(model.media)) throw new Error(`Invalid media: ${model.id}`);
  if (!model.capabilities || Object.keys(model.capabilities).length === 0) throw new Error(`Missing capabilities: ${model.id}`);
  for (const [capability, support] of Object.entries(model.capabilities)) {
    if (!catalog.supportValues.includes(support)) throw new Error(`Invalid ${capability} support on ${model.id}: ${support}`);
  }
  if (model.status !== "offline" && (!Array.isArray(model.strengths) || model.strengths.length === 0)) {
    throw new Error(`Missing strengths: ${model.id}`);
  }
  if (model.status === "offline" && Object.values(model.capabilities).some((support) => support !== "no")) {
    throw new Error(`Offline model still exposes capabilities: ${model.id}`);
  }
  ids.add(model.id);
}
console.log(`Valid model catalog: ${catalog.models.length} models, verified ${catalog.lastVerifiedAt}.`);
