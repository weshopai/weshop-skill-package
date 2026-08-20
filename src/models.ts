import catalog from "../models/catalog.json" with { type: "json" };
import type { MediaType, ModelDefinition } from "./types.js";

export const modelCatalog = catalog.models as unknown as ModelDefinition[];
export function listModels(media?: MediaType): ModelDefinition[] { return media ? modelCatalog.filter((model) => model.media === media) : [...modelCatalog]; }
export function getModel(id: string): ModelDefinition | undefined { return modelCatalog.find((model) => model.id === id && model.status !== "offline"); }
export function modelsWithCapability(capability: string, includeUnknown = false): ModelDefinition[] {
  return modelCatalog.filter((model) => model.status !== "offline" && (model.capabilities[capability] === "yes" || (includeUnknown && model.capabilities[capability] === "unknown")));
}
