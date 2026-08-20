import type { AgentDefinition } from "./types.js";
export const agentRegistry: AgentDefinition[] = [
  { name: "aimodel", version: "v1.0", title: "AI Fashion Model", operation: "replace-model-or-scene", requiredAssets: ["dressed-model"], defaultParams: { generatedContent: "freeCreation", maskType: "autoHumanSegment", pose: "originalImagePose" } },
  { name: "aipose", version: "v1.0", title: "AI Pose", operation: "change-pose", requiredAssets: ["dressed-model"], defaultParams: { generateVersion: "pro" } },
  { name: "aiproduct", version: "v1.0", title: "AI Product", operation: "product-scene", requiredAssets: ["product"], defaultParams: { generatedContent: "freeCreation", maskType: "autoSubjectSegment" } },
  { name: "outfit-generator", version: "v1.0", title: "Outfit Generator", operation: "outfit-design", requiredAssets: ["image"], defaultParams: {} },
  { name: "removeBG", version: "v1.0", title: "Background Remover", operation: "remove-background", requiredAssets: ["image"], defaultParams: {} },
  { name: "expandimage", version: "v1.0", title: "Expand Image", operation: "expand-image", requiredAssets: ["image"], defaultParams: {} }
];
