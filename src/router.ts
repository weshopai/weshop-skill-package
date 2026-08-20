import { compileIntent } from "./intent.js";
import { compileKlingPrompt } from "./kling.js";
import { executionPolicy } from "./execution.js";
import { getModel } from "./models.js";
import { selectImageModel, selectVideoModel } from "./model-selection.js";
import { agentRegistry } from "./registry.js";
import type { IntentCard, RoutePlan, RouteRequest } from "./types.js";
export class RouteError extends Error {}
const general = new Set(["generate-image", "edit-image", "generate-video", "animate-image"]);
export function routeNaturalLanguage(text: string, overrides: Partial<RouteRequest> = {}): RoutePlan {
  const intent = { ...compileIntent(text), ...overrides };
  return route(intent);
}
export function route(request: RouteRequest & Pick<IntentCard, "raw" | "confidence" | "requiresResearch">): RoutePlan {
  if (isUnsupportedAudioRequest(request.raw)) throw new RouteError("WeShop currently has no verified standalone audio-generation or audio-processing model.");
  const runs = request.namedVariations ? request.outputCount : 1, batchCount = request.namedVariations ? 1 : request.outputCount;
  if (request.operation === "character-sheet" || request.operation === "create-character") {
    const hasIdentityReference = request.assets.includes("model-reference") || request.assets.includes("image");
    if (request.requestedModel && request.requestedModel !== "gpt-image") throw new RouteError("Final Character Reference Sheets require GPT Image 2 Medium/2K.");
    const model = getModel("gpt-image");
    if (!model || model.media !== "image") throw new RouteError("Character reference sheets require an image model.");
    return plan(request, 1, 1, {
      model,
      category: "workflow",
      workflow: {
        id: "create-character",
        version: "v1.0",
        steps: hasIdentityReference
          ? ["bind the authorized identity reference and submit the canonical design sheet", "inspect the canonical sheet and return its invariant manifest", "ask whether the user wants the seven derived assets", "after explicit confirmation, preflight seven payloads with the canonical URL in input.images and params.images", "submit the confirmed seven-task expansion and apply one final identity gate"]
          : ["submit the canonical design sheet", "inspect the canonical sheet and return its invariant manifest", "ask whether the user wants the seven derived assets", "after explicit confirmation, preflight seven payloads with the canonical URL in input.images and params.images", "submit the confirmed seven-task expansion and apply one final identity gate"]
      },
      params: {
        imageSize: "2K",
        quality: "medium",
        batchCount: 1,
        executionOrder: "canonical-qa-confirmation-gate-then-optional-seven-task-expansion",
        defaultTasks: ["canonical-design-sheet"],
        optionalConfirmedTasks: ["full-body-front", "full-body-back", "head-close-up", "lighting-study", "final-look-portrait", "scene-1", "scene-2"],
        expansionRequiresPostQaUserConfirmation: true,
        expansionSubmission: { mode: "parallel-wave", concurrency: 7, awaitBetweenSubmissions: false, prepareAllPayloadsAndKeysBeforeFirstSubmit: true, batchCountPerTask: 1 },
        canonicalReferenceBinding: { source: "canonical-design-sheet.result.image", requiredIn: ["input.images", "params.images"], appliesTo: "all optional confirmed tasks" },
        canonicalReferenceRecovery: { lookup: "task-1 operationKey then exact executionId", extract: "data.executions[*].result[*].image", persistAs: "canonicalImageUrl", repairPayloads: true, regenerateTask1: false, derivedSubmissionBeforeRecovery: false }
      },
      acceptance: ["Return exactly 1 canonical sheet before the confirmation gate.", "Do not submit the seven derived tasks without explicit post-QA user confirmation.", "Every submitted task uses batchCount 1.", "Recover a missing canonical URL from the original accepted operationKey and executionId; never regenerate task 1 for retrieval.", "If expansion is confirmed, every derived request includes the same canonical URL in input.images and params.images.", "Launch the seven approved derived create calls as one parallel wave without awaiting between submissions.", "Derived assets preserve the canonical face, age, hair, proportions, wardrobe, palette, marks, and signature props."]
    });
  }
  if (request.operation === "make-mugshot-photo") {
    if (!request.assets.includes("image")) throw new RouteError("Make Mugshot Photo requires an authorized adult portrait image.");
    if (request.requestedModel && request.requestedModel !== "gpt-image") {
      throw new RouteError("Make Mugshot Photo production requires GPT Image 2 Medium.");
    }
    const model = getModel("gpt-image");
    if (!model || model.media !== "image") throw new RouteError("Make Mugshot Photo requires GPT Image 2.");
    return plan(request, 1, 1, {
      model,
      category: "model-command",
      workflow: {
        id: "make-mugshot-photo",
        version: "v1.0",
        steps: ["confirm an authorized adult and fictional or novelty context", "bind the source portrait as the identity reference", "generate a generic lineup-style portrait with a clear FICTIONAL label", "apply one final safety and identity gate"]
      },
      params: {
        aspectRatio: "3:4",
        imageSize: "2K",
        quality: "medium",
        batchCount: 1,
        routePolicy: "direct-gpt-image-2-no-tools-wrapper",
        promptPolicy: "preserve the subject identity; use generic height lines and a clearly readable FICTIONAL label; no real agency, badge, charge, case number, date, or arrest claim"
      },
      acceptance: ["Return one clearly fictional novelty image.", "Preserve the authorized adult's identity.", "The exact word FICTIONAL must be clearly readable.", "No real agency identifiers, accusations, case numbers, dates, or evidence-like framing."]
    });
  }
  if (request.operation === "try-on") {
    if (!request.assets.includes("garment")) throw new RouteError("Virtual Try-On requires: garment.");
    const model = request.requestedModel ? getModel(request.requestedModel) : getModel("gpt-image");
    if (!model || model.media !== "image") throw new RouteError("Virtual Try-On requires an image model.");
    return plan(request, runs, batchCount, {
      model,
      category: "model-command",
      workflow: {
        id: "virtual-try-on",
        version: "v1.0",
        steps: ["bind person, garment, and optional scene roles", "generate one dressed-person image", "apply one final garment and identity gate"]
      },
      params: {
        aspectRatio: "auto",
        imageSize: "2K",
        quality: "medium",
        fallbackPolicy: [
          "use virtualtryon weshopPro when a separate location reference must be routed through its dedicated field",
          "use ai-clothes-changer when only person plus garment replacement is needed and GPT Image 2 is unavailable or mismatched",
          "use virtualtryon weshopFlash only for an explicit speed or low-cost request"
        ]
      }
    });
  }
  if (request.operation === "outfit-design") {
    if (!request.assets.includes("image")) throw new RouteError("Outfit Design requires one person image.");
    const agent = agentRegistry.find((candidate) => candidate.name === "outfit-generator");
    if (!agent) throw new RouteError("No registered Outfit Generator agent.");
    return plan(request, runs, batchCount, {
      agent,
      category: "commercial-workflow",
      workflow: {
        id: "outfit-design",
        version: "v1.0",
        steps: ["bind the person, target clothing slots, protected pieces, and scene locks", "resolve the high-level fashion concept", "resolve the concrete piece list, silhouette, layering, materials, construction, palette, footwear, and accessories", "compile one concise finished-image prompt", "apply one final preservation and outfit gate"]
      },
      params: {
        textDescription: request.raw,
        batchCount: 1,
        promptPolicy: "preserve face, hair, body proportions, pose, hands, background, lighting, camera, crop, and composition; request one finished outfit image with no component board, annotations, collage, duplicate person, or invented branding",
        referenceFallback: "use GPT Image 2 Medium/2K for supplied style or garment references, exact local redesign, several protected pieces, readable garment text, or dedicated-agent mismatch"
      },
      acceptance: ["Return one finished image per named design direction.", "Preserve identity, body proportions, pose, hands, background, lighting, camera, crop, composition, and protected pieces.", "Change every requested clothing slot with coherent pieces, layering, closures, material behavior, footwear, and accessories.", "No board, collage, annotations, duplicate person, extra limbs, impossible intersections, or invented branding."]
    });
  }
  if (request.operation === "replace-model-or-scene" && request.assets.includes("model-reference")) {
    const model = request.requestedModel ? getModel(request.requestedModel) : getModel("gpt-image");
    if (!model || model.media !== "image") throw new RouteError("Fashion Model Replacement requires an image model.");
    return plan(request, runs, batchCount, {
      model,
      category: "model-command",
      workflow: {
        id: "fashion-model-replacement",
        version: "v1.0",
        steps: ["bind dressed source and target-model reference", "replace the model while preserving the outfit", "apply one final outfit and target-person gate"]
      },
      params: { aspectRatio: "auto", imageSize: "2K", quality: "medium" }
    });
  }
  if (request.operation === "change-pose") {
    if (!request.assets.includes("dressed-model")) throw new RouteError("Change Pose requires: dressed-model.");
    const vague = isVaguePoseRequest(request.raw);
    const poseVariants = vague ? [
      "relaxed front-facing catalog stance with open garment visibility",
      "confident three-quarter weight-shift stance with one hand at the hip",
      "natural mid-step walking pose with arms clear of the garment"
    ] : [request.raw];
    const agent = agentRegistry.find((candidate) => candidate.name === "aipose");
    if (!agent) throw new RouteError("No registered AI Pose agent.");
    return plan(request, vague ? 3 : Math.max(1, request.outputCount), 1, {
      agent,
      category: "commercial-workflow",
      workflow: {
        id: "change-pose",
        version: "v1.0",
        steps: ["bind dressed source and preservation locks", "compile one atomic prompt per pose", "apply one final pose and preservation gate"]
      },
      params: { generateVersion: "pro", batchCount: 1, poseVariants },
      acceptance: [`Return ${vague ? 3 : request.outputCount} separate file(s).`, "One model and one pose per file; no grid, collage, or near-duplicate random variants.", "Preserve identity, body proportions, complete outfit, branding, accessories, footwear, background, lighting, camera, and crop."]
    });
  }
  if (request.operation === "product-scene") {
    if (!request.assets.includes("product")) throw new RouteError("AI Product requires: product.");
    const agent = agentRegistry.find((candidate) => candidate.name === "aiproduct");
    if (!agent) throw new RouteError("No registered AI Product agent.");
    return plan(request, runs, batchCount, {
      agent,
      category: "commercial-workflow",
      workflow: {
        id: "ai-product",
        version: "v1.0",
        steps: ["bind product anchors and scene brief", "accept a supplied background or generate an empty background with GPT Image 2 medium/2K", "register the background as an AI Product custom location", "place the protected product into that location", "apply one final product-fidelity gate"]
      },
      params: { generatedContent: "freeCreation", maskType: "autoSubjectSegment", batchCount: 1, backgroundPolicy: "generate-or-use-supplied-custom-location" }
    });
  }
  if (request.operation === "remove-background") {
    if (!request.assets.includes("image")) throw new RouteError("Remove Background requires: image.");
    const agent = agentRegistry.find((candidate) => candidate.name === "removeBG");
    if (!agent) throw new RouteError("No registered Remove Background agent.");
    return plan(request, 1, 1, {
      agent,
      category: "commercial-workflow",
      workflow: {
        id: "remove-background",
        version: "v1.0",
        steps: ["bind the exact foreground and protected fine structures", "resolve the current Transparent preset through agent info", "run automatic subject segmentation once", "verify real alpha and inspect black, white, and checkerboard previews", "retry once with a corrected custom mask only when edge QA fails", "apply non-generative edge-color decontamination without changing alpha when needed"]
      },
      params: {
        maskType: "autoSubjectSegment",
        backgroundPolicy: "resolve the live preset named Transparent through agent info and pass its backgroundId; verified ID 306 on 2026-08-19",
        outputPolicy: "one lossless RGBA PNG with real transparent pixels; a white or colored composite is not acceptance",
        edgePolicy: "inspect on black, white, and checkerboard; allow one custom-mask retry and non-generative edge RGB decontamination only",
        dimensionPolicy: "preserve source dimensions; restore only a few trimmed outer pixels with transparent padding and no resampling",
        batchCount: 1
      },
      acceptance: ["Return 1 lossless transparent PNG.", "The file must contain an alpha channel and fully transparent background pixels.", "No colored halo, opaque background islands, missing fine structures, or false holes on black, white, and checkerboard previews.", "Preserve foreground pixels, count, internal openings, and source canvas dimensions."]
    });
  }
  if (request.operation === "expand-image") {
    if (!request.assets.includes("image")) throw new RouteError("Expand Image requires: image.");
    const model = request.requestedModel ? getModel(request.requestedModel) : getModel("gpt-image");
    if (!model || model.media !== "image") throw new RouteError("Expand Image requires an image model.");
    return plan(request, 1, 1, {
      model,
      category: "model-command",
      workflow: {
        id: "expand-image",
        version: "v1.0",
        steps: ["inspect source dimensions, protected content, and edge text", "resolve target ratio and intended source placement", "outpaint once with GPT Image 2 medium/2K using the source as a reference", "use expandimage once only when the final gate fails or exact arbitrary pixel geometry requires it", "restore the original pixel region when geometry is verified and fidelity or text protection matters"]
      },
      params: {
        targetSpec: request.raw,
        aspectRatio: "derive from requested ratio or exact dimensions",
        imageSize: "2K",
        quality: "medium",
        placementPolicy: "center unless directional copy space is requested",
        promptPolicy: "compile one preservation-first outpainting prompt; generate only missing surroundings and do not add text, logos, subjects, products, or props",
        fallbackPolicy: "after one failed GPT Image 2 result, use expandimage once; do not ladder or repeat identical runs; use deterministic extension only for a verified subject-free, text-free, low-detail edge",
        sourceRestorationPolicy: "paste the lossless original back at verified offsets when fidelity or protected text matters; never feather across glyphs",
        clippedTextPolicy: "do not infer missing characters; request the uncropped source or hand exact copy to deterministic layout",
        batchCount: 1
      }
    });
  }
  if (request.operation === "create-animal") {
    const photorealistic = ["写实", "真实照片", "摄影", "photoreal", "realistic photo"].some((token) => request.raw.toLowerCase().includes(token));
    const modelId = photorealistic ? "z-image" : "gpt-image";
    if (request.requestedModel && request.requestedModel !== modelId) {
      throw new RouteError(`create-animal production requires ${modelId} for this brief.`);
    }
    const model = getModel(modelId);
    if (!model || model.media !== "image") throw new RouteError("create-animal requires a cataloged image model.");
    return plan(request, 1, 1, {
      model,
      category: "model-command",
      workflow: { id: "create-animal", version: "v1.0", steps: ["resolve real species versus fictional creature", "compile anatomy, habitat, action, and camera constraints", "apply one final anatomy and subject-count gate"] },
      params: {
        aspectRatio: "3:2",
        ...(modelId === "gpt-image" ? { imageSize: "2K", quality: "medium" } : {}),
        selectionReason: photorealistic ? "pure photorealistic text-to-image animal generation" : "general or non-photographic animal work requires GPT Image 2 Medium",
        routePolicy: "direct-model-no-tools-wrapper",
        batchCount: 1
      }
    });
  }
  if (["create-logo", "create-flag", "restyle-room", "preview-landscape", "make-flowchart"].includes(request.operation)) {
    const routeByOperation = {
      "create-logo": { modelId: "gpt-image", workflow: "create-logo", aspectRatio: "1:1", reason: "logo geometry and exact readable brand text require GPT Image 2 Medium" },
      "create-flag": { modelId: "gpt-image", workflow: "create-flag", aspectRatio: "3:2", reason: "controlled flat geometry requires GPT Image 2 Medium" },
      "restyle-room": { modelId: "gpt-image", workflow: "restyle-room", aspectRatio: "auto", reason: "source-room geometry and keep-item preservation require a consistency-sensitive image editor" },
      "preview-landscape": { modelId: "gpt-image", workflow: "preview-landscape", aspectRatio: "auto", reason: "source-site geometry and access preservation require a consistency-sensitive image editor" },
      "make-flowchart": { modelId: "gpt-image", workflow: "make-flowchart", aspectRatio: "3:4", reason: "exact node labels and readable diagram text require GPT Image 2 Medium" }
    } as const;
    const selected = routeByOperation[request.operation as keyof typeof routeByOperation];
    if ((request.operation === "restyle-room" || request.operation === "preview-landscape") && !request.assets.includes("image")) {
      throw new RouteError(`${selected.workflow} requires one source image.`);
    }
    if (request.requestedModel && request.requestedModel !== selected.modelId) {
      throw new RouteError(`${selected.workflow} production requires ${selected.modelId}.`);
    }
    const model = getModel(selected.modelId);
    if (!model || model.media !== "image") throw new RouteError(`${selected.workflow} requires a cataloged image model.`);
    return plan(request, 1, 1, {
      model,
      category: "model-command",
      workflow: {
        id: selected.workflow,
        version: "v1.0",
        steps: ["compile the task-specific constraints", "run the direct cataloged model once", "apply one final task-specific gate"]
      },
      params: {
        aspectRatio: selected.aspectRatio,
        ...(selected.modelId === "gpt-image" ? { imageSize: "2K", quality: "medium" } : {}),
        selectionReason: selected.reason,
        routePolicy: "direct-model-no-tools-wrapper",
        batchCount: 1
      }
    });
  }
  if (general.has(request.operation)) {
    const imageSelection = request.media === "image" ? selectImageModel(request) : undefined;
    const videoSelection = request.media === "video" ? selectVideoModel(request) : undefined;
    const selection = imageSelection ?? videoSelection;
    const model = selection?.model;
    if (!model) throw new RouteError(`No ${request.media} model matches this request.`);
    if (model.media !== request.media) throw new RouteError(`${model.id} is a ${model.media} model, not ${request.media}.`);
    const params: Record<string, unknown> = selection ? { ...selection.params, selectionReason: selection.reason } : {};
    if (model.id === "kling") {
      const prompt = compileKlingPrompt(request.raw);
      Object.assign(params, {
        directorPrompt: prompt.directorPrompt,
        textDescription: prompt.textDescription,
        promptSimplified: prompt.simplified,
        omittedClauses: prompt.omittedClauses,
        modelName: "Kling_3_0",
        duration: "5s",
        generateAudio: "false",
        retryPolicy: [
          "poll accepted runs to a terminal state; long processing time alone is not a failure",
          "record error code, message, retryability, refund state, prompt revision, and execution ID",
          "never retry an identical request",
          "for moderation errors, neutralize sensitive wording while preserving the safe intended action",
          "for validation errors, correct parameters and submit an atomic prompt",
          "for retryable service errors, retry once with a materially simplified atomic prompt",
          "for continuity or quality failures, target the failed property or split the shot"
        ],
        downgradePolicy: {
          onlyWhen: ["api-reported insufficient points or credits", "user-directed budget or model change"],
          fallback: { modelName: "Kling_2_5_Turbo", duration: "5s", generateAudio: "false" }
        }
      });
    }
    return plan(request, runs, batchCount, { model, category: "model-command", params });
  }
  const agent = agentRegistry.find((candidate) => candidate.operation === request.operation);
  if (!agent) throw new RouteError(`No registered agent for ${request.operation}.`);
  if (!agent.requiredAssets.every((asset) => request.assets.includes(asset))) throw new RouteError(`${agent.name} requires: ${agent.requiredAssets.join(", ")}.`);
  const params: Record<string, unknown> = { ...agent.defaultParams, batchCount };
  if (agent.name === "aipose" && request.priority === "quality") params.generateVersion = "pro";
  return plan(request, runs, batchCount, { agent, category: "commercial-workflow", params });
}
function isVaguePoseRequest(raw: string) {
  const text = raw.toLowerCase().replace(/[，。,.!！?？]/g, " ").trim();
  const poseDetail = ["站", "坐", "走", "跑", "转身", "侧身", "正面", "背面", "手", "腿", "脚", "重心", "看向", "walking", "standing", "seated", "sitting", "turn", "hand", "arm", "leg", "gaze", "weight"];
  return !poseDetail.some((token) => text.includes(token));
}
function isUnsupportedAudioRequest(raw: string) {
  const text = raw.toLowerCase();
  const asksForVideo = ["视频", "短片", "影片", "动画", "video", "film", "movie", "animate"].some((token) => text.includes(token));
  const asksForStandaloneAudio = ["生成音频", "创作音频", "生成音乐", "创作音乐", "生成音效", "环境音频", "音频文件", "generate audio", "create audio", "generate music", "create music", "sound effect", "audio file"].some((token) => text.includes(token));
  const asksForAudioProcessing = ["处理音频", "编辑音频", "混音", "音频降噪", "音频修复", "audio editing", "edit audio", "process audio", "audio mixing", "audio mastering"].some((token) => text.includes(token));
  return asksForAudioProcessing || (asksForStandaloneAudio && !asksForVideo);
}
function plan(intent: IntentCard, runs: number, batchCount: number, partial: Partial<RoutePlan>): RoutePlan {
  const strict = intent.operation === "remove-background" || intent.operation === "make-mugshot-photo";
  const targeted = !strict && (intent.priority === "fidelity" || intent.preserve.length > 0 || ["try-on", "outfit-design", "replace-model-or-scene", "change-pose", "product-scene", "character-sheet", "create-character"].includes(intent.operation));
  const qaPolicy = strict
    ? { mode: "strict" as const, coverage: "all-outputs" as const, checkpoints: 1 as const, triggers: ["safety or file-contract requirement"] }
    : targeted
      ? { mode: "targeted" as const, coverage: "first-output-and-failures" as const, checkpoints: 1 as const, triggers: ["declared preservation or fidelity requirement"] }
      : { mode: "final-only" as const, coverage: "first-output-and-failures" as const, checkpoints: 1 as const, triggers: [] };
  return {
    intent,
    runs,
    batchCount,
    params: { batchCount, ...partial.params },
    acceptance: [`Return ${intent.outputCount} separate file(s).`, ...intent.preserve.map((item) => `Preserve ${item}.`)],
    qaPolicy,
    executionPolicy,
    ...partial
  } as RoutePlan;
}
