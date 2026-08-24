import assert from "node:assert/strict";
import test from "node:test";
import { compileIntent, compileKlingPrompt, dispatchLegacyNaturalLanguage, dispatchLegacyRequest, getModel, listModels, modelsWithCapability } from "./index.js";
const dispatch = dispatchLegacyRequest;
test("compiles Chinese try-on intent and prioritizes fidelity", () => { const intent = compileIntent("用这件服装生成4张模特试穿图，保持衣服和 logo 一致，高质量"); assert.equal(intent.operation, "try-on"); assert.equal(intent.outputCount, 4); assert.equal(intent.priority, "quality"); });
test("uses one sampled final QA gate for ordinary routes", () => {
  const plan = dispatchLegacyNaturalLanguage("生成4张海边小屋插画");
  assert.deepEqual(plan.qaPolicy, { mode: "final-only", coverage: "first-output-and-failures", checkpoints: 1, triggers: [] });
});
test("uses targeted sampled QA for preservation-sensitive routes", () => {
  const plan = dispatchLegacyNaturalLanguage("用这件服装生成4张模特试穿图，保持 logo 一致", { assets: ["garment"] });
  assert.equal(plan.qaPolicy.mode, "targeted");
  assert.equal(plan.qaPolicy.coverage, "first-output-and-failures");
  assert.equal(plan.qaPolicy.checkpoints, 1);
});
test("reserves strict per-output QA for hard output and safety contracts", () => {
  const transparent = dispatchLegacyNaturalLanguage("去掉这张图的背景，给我透明 PNG", { assets: ["image"] });
  const fictional = dispatchLegacyNaturalLanguage("Create a fictional mugshot from this authorized adult photo", { assets: ["image"] });
  assert.equal(transparent.qaPolicy.mode, "strict");
  assert.equal(transparent.qaPolicy.coverage, "all-outputs");
  assert.equal(fictional.qaPolicy.mode, "strict");
});
test("routes try-on through GPT Image 2 without progressive model trials", () => {
  const fast = dispatchLegacyNaturalLanguage("用这件服装生成1张模特试穿图", { assets: ["garment"] });
  assert.equal(fast.model?.id, "gpt-image");
  assert.equal(fast.workflow?.id, "virtual-try-on");
  assert.equal(fast.params.imageSize, "2K");
  assert.equal(fast.params.quality, "medium");
  assert.match((fast.params.fallbackPolicy as string[]).join(" "), /weshopFlash only for an explicit speed or low-cost request/);
});
test("routes outfit invention separately from virtual try-on", () => {
  const plan = dispatchLegacyNaturalLanguage("给这个人做一套穿搭设计，改成建筑感都市剪裁", { assets: ["image"] });
  assert.equal(plan.workflow?.id, "outfit-design");
  assert.equal(plan.agent?.name, "outfit-generator");
  assert.equal(plan.params.batchCount, 1);
  assert.match(plan.params.promptPolicy as string, /one finished outfit image/);
  assert.match(plan.params.referenceFallback as string, /GPT Image 2 Medium\/2K/);
});
test("routes a supplied replacement-model reference through GPT Image 2", () => {
  const plan = dispatchLegacyNaturalLanguage("替换这张服装图里的模特，保持衣服不变", { assets: ["dressed-model", "model-reference"] });
  assert.equal(plan.workflow?.id, "fashion-model-replacement");
  assert.equal(plan.model?.id, "gpt-image");
  assert.equal(plan.params.imageSize, "2K");
  assert.equal(plan.params.quality, "medium");
});
test("keeps the background for a text-described fashion model replacement", () => {
  const plan = dispatchLegacyNaturalLanguage("替换这张服装图里的模特，保持背景不变", { assets: ["dressed-model"] });
  assert.equal(plan.agent?.name, "aimodel");
  assert.equal(plan.params.generatedContent, "freeCreation");
  assert.equal(plan.params.maskType, "autoHumanSegment");
  assert.equal(plan.params.pose, "originalImagePose");
  assert.equal("locationId" in plan.params, false);
  assert.equal("locationTagIds" in plan.params, false);
});
test("returns three independent pro pose choices for an underspecified pose request", () => {
  const plan = dispatchLegacyNaturalLanguage("给这个模特换一个姿势", { assets: ["dressed-model"] });
  assert.equal(plan.workflow?.id, "change-pose");
  assert.equal(plan.agent?.name, "aipose");
  assert.equal(plan.runs, 3);
  assert.equal(plan.batchCount, 1);
  assert.equal(plan.params.generateVersion, "pro");
  assert.equal((plan.params.poseVariants as string[]).length, 3);
});
test("returns one pro run when the user defines a pose", () => {
  const plan = dispatchLegacyNaturalLanguage("把模特姿势换成侧身站立，一只手放在腰间", { assets: ["dressed-model"] });
  assert.equal(plan.runs, 1);
  assert.equal(plan.params.generateVersion, "pro");
  assert.deepEqual(plan.params.poseVariants, ["把模特姿势换成侧身站立，一只手放在腰间"]);
});
test("routes a real product scene through a generated custom location", () => {
  const plan = dispatchLegacyNaturalLanguage("把这个商品放到温暖的木质棚拍场景里", { assets: ["product"] });
  assert.equal(plan.workflow?.id, "ai-product");
  assert.equal(plan.agent?.name, "aiproduct");
  assert.equal(plan.params.generatedContent, "freeCreation");
  assert.equal(plan.params.maskType, "autoSubjectSegment");
  assert.equal(plan.params.batchCount, 1);
  assert.equal(plan.params.backgroundPolicy, "generate-or-use-supplied-custom-location");
  assert.match(plan.workflow?.steps.join(" ") ?? "", /GPT Image 2 medium\/2K/);
  assert.match(plan.workflow?.steps.join(" ") ?? "", /custom location/);
});
test("recognizes natural product-placement wording", () => {
  assert.equal(compileIntent("把这个商品放到温暖的木质棚拍场景里").operation, "product-scene");
});
test("routes background removal to a true transparent PNG with edge QA", () => {
  const plan = dispatchLegacyNaturalLanguage("去掉这张图的背景，给我透明 PNG", { assets: ["image"] });
  assert.equal(plan.workflow?.id, "remove-background");
  assert.equal(plan.agent?.name, "removeBG");
  assert.equal(plan.params.maskType, "autoSubjectSegment");
  assert.equal(plan.params.batchCount, 1);
  assert.match(plan.params.backgroundPolicy as string, /Transparent/);
  assert.match(plan.params.outputPolicy as string, /RGBA PNG/);
  assert.match(plan.params.edgePolicy as string, /checkerboard/);
});
test("routes ratio correction through GPT Image 2 with one Expand Image fallback", () => {
  const plan = dispatchLegacyNaturalLanguage("把这张图片扩图到 4:5，保持主体居中", { assets: ["image"] });
  assert.equal(plan.workflow?.id, "expand-image");
  assert.equal(plan.model?.id, "gpt-image");
  assert.equal(plan.params.batchCount, 1);
  assert.equal(plan.params.quality, "medium");
  assert.equal(plan.params.imageSize, "2K");
  assert.match(plan.params.promptPolicy as string, /preservation-first/);
  assert.match(plan.params.fallbackPolicy as string, /expandimage once/);
  assert.match(plan.params.sourceRestorationPolicy as string, /lossless original/);
  assert.match(plan.params.clippedTextPolicy as string, /do not infer missing characters/);
});
test("routes routine final image editing to GPT Image 2 Medium/2K", () => { const plan = dispatchLegacyNaturalLanguage("编辑这张图片，替换背景", { assets: ["image"] }); assert.equal(plan.model?.id, "gpt-image"); assert.equal(plan.params.quality, "medium"); assert.equal(plan.params.imageSize, "2K"); assert.equal(plan.category, "model-command"); });
test("uses Nano 2 only for explicit draft divergence", () => { const plan = dispatchLegacyNaturalLanguage("编辑这张图片，做三种快速草稿分叉", { assets: ["image"] }); assert.equal(plan.model?.id, "nano-banana-edit"); assert.equal(plan.params.modelName, "nano2"); });
test("uses Nano Pro only for explicit internal convergence", () => { const plan = dispatchLegacyNaturalLanguage("编辑这张图片用于内部评审和内部收敛", { assets: ["image"] }); assert.equal(plan.model?.id, "nano-banana-edit"); assert.equal(plan.params.modelName, "nano"); assert.equal(plan.params.imageSize, "2K"); });
test("rejects a routine final edit explicitly forced to Nano", () => { assert.throws(() => dispatchLegacyNaturalLanguage("编辑这张图片用于最终交付", { assets: ["image"], requestedModel: "nano-banana-edit" }), /reserved for explicit draft divergence/); });
test("routes readable poster text to GPT Image 2 Medium", () => {
  const plan = dispatchLegacyNaturalLanguage("设计一张海报，标题写新品发布");
  assert.equal(plan.model?.id, "gpt-image");
  assert.equal(plan.params.quality, "medium");
  assert.match(plan.params.selectionReason as string, /readable text/);
});
test("routes every final Banner through GPT Image 2 even when text-free and artistic", () => {
  const plan = dispatchLegacyNaturalLanguage("设计一张无文字的实验艺术风格网站横幅");
  assert.equal(plan.model?.id, "gpt-image");
  assert.equal(plan.params.quality, "medium");
  assert.match(plan.params.selectionReason as string, /every final Banner/);
});
test("uses Midjourney only for an upstream Banner artistic-direction reference", () => {
  const plan = dispatchLegacyNaturalLanguage("为网站 Banner 生成一组无文字的艺术方向参考图");
  assert.equal(plan.model?.id, "midjourney");
  assert.equal(plan.params.outputCount, 4);
  assert.match(plan.params.selectionReason as string, /reference only/);
});
test("keeps Banner direction references with readable copy on GPT Image 2", () => {
  const plan = dispatchLegacyNaturalLanguage("为网站 Banner 生成艺术方向参考图，标题写新品发布");
  assert.equal(plan.model?.id, "gpt-image");
  assert.equal(plan.params.quality, "medium");
});
test("rejects Midjourney as an explicitly requested final Banner model", () => {
  assert.throws(
    () => dispatchLegacyNaturalLanguage("用 Midjourney 制作最终无文字 Banner", { requestedModel: "midjourney" }),
    /Final Banner production requires GPT Image 2 Medium/
  );
});
test("routes pure artistic exploration to Midjourney and accounts for four outputs", () => {
  const plan = dispatchLegacyNaturalLanguage("创作一组实验性艺术插画");
  assert.equal(plan.model?.id, "midjourney");
  assert.equal(plan.params.outputCount, 4);
});
test("routes pure photorealistic text-to-image to Z-Image", () => {
  const plan = dispatchLegacyNaturalLanguage("生成一张写实摄影风格的海边小屋，不要文字");
  assert.equal(plan.model?.id, "z-image");
});
test("routes the reviewed Atom Skills to direct models rather than Tools wrappers", () => {
  const cases = [
    ["Create animal: a photorealistic red panda in a forest", [], "create-animal", "z-image"],
    ["Create logo for NORTHLINE COFFEE", [], "create-logo", "gpt-image"],
    ["Design a flag for fictional Port Meridian", [], "create-flag", "gpt-image"],
    ["Restyle this room as warm Japandi", ["image"], "restyle-room", "gpt-image"],
    ["Redesign this courtyard for a dry climate", ["image"], "preview-landscape", "gpt-image"],
    ["Create a flowchart with exact labels", [], "make-flowchart", "gpt-image"]
  ] as const;
  for (const [brief, assets, operation, modelId] of cases) {
    const plan = dispatchLegacyNaturalLanguage(brief, { assets: [...assets] });
    assert.equal(plan.intent.operation, operation);
    assert.equal(plan.model?.id, modelId);
    assert.equal(plan.agent, undefined);
    assert.equal(plan.params.routePolicy, "direct-model-no-tools-wrapper");
    assert.equal(plan.batchCount, 1);
  }
});
test("uses GPT Image 2 Medium for a non-photographic animal brief", () => {
  const plan = dispatchLegacyNaturalLanguage("Create animal: an original friendly cloud creature in a flat editorial style");
  assert.equal(plan.intent.operation, "create-animal");
  assert.equal(plan.model?.id, "gpt-image");
  assert.equal(plan.params.quality, "medium");
});
test("requires source images for room and landscape preview routes", () => {
  assert.throws(() => dispatchLegacyNaturalLanguage("Restyle this room as warm Japandi", { assets: [] }), /requires one source image/);
  assert.throws(() => dispatchLegacyNaturalLanguage("Redesign this courtyard for a dry climate", { assets: [] }), /requires one source image/);
});
test("rejects model overrides that bypass reviewed Atom routes", () => {
  assert.throws(() => dispatchLegacyNaturalLanguage("Create logo for NORTHLINE COFFEE", { requestedModel: "midjourney" }), /requires gpt-image/);
  assert.throws(() => dispatchLegacyNaturalLanguage("Create animal: a photorealistic red panda", { requestedModel: "gpt-image" }), /requires z-image/);
});
test("excludes text-to-image-only models when an image input exists", () => {
  assert.throws(() => dispatchLegacyNaturalLanguage("编辑这张图片", { assets: ["image"], requestedModel: "z-image" }), /text-to-image only/);
});
test("routes demanding commercial lighting to Seedream", () => {
  const plan = dispatchLegacyNaturalLanguage("生成一张珠宝广告，强调精细棚拍光线和材质塑造");
  assert.equal(plan.model?.id, "seedream");
  assert.equal(plan.params.modelName, "Seedream_50_Pro");
});
test("keeps Seedream Lite as an explicit CLI model variant", () => {
  const plan = dispatchLegacyNaturalLanguage("用 3K 生成产品参考图", { requestedModel: "seedream-lite" });
  assert.equal(plan.model?.id, "seedream-lite");
  assert.equal(plan.params.modelName, "Seedream_50_Lite");
});
test("routes image animation to Kling V3", () => { const plan = dispatchLegacyNaturalLanguage("让这张图片动起来，生成一个视频", { assets: ["image"] }); assert.equal(plan.model?.id, "kling"); assert.equal(plan.model?.media, "video"); assert.equal(plan.params.modelName, "Kling_3_0"); });
test("routes large-amplitude motion to MiniMax H3", () => { const plan = dispatchLegacyNaturalLanguage("生成一段高动态奔跑和跳跃的视频"); assert.equal(plan.model?.id, "minimax-h3"); });
test("routes complex multimodal references to Kling V3 Omni", () => { const plan = dispatchLegacyNaturalLanguage("用这些图片做一段多图参考视频，还要参考这段视频的镜头运动"); assert.equal(plan.model?.id, "kling-v3-omni"); });
test("routes audio-visual artistic work to Seedance 2.5", () => { const plan = dispatchLegacyNaturalLanguage("生成一段音乐卡点的艺术短片，要求音画同步"); assert.equal(plan.model?.id, "seedance-2-5"); });
test("routes explicit low-cost previews to Seedance 2.0 Mini", () => {
  const plan = dispatchLegacyNaturalLanguage("低成本生成一个视频概念验证预览", { priority: "cost" });
  assert.equal(plan.model?.id, "seedance-mini");
  assert.equal(plan.params.modelName, "Seedance_20_Mini");
  assert.equal(plan.params.generateAudio, true);
});
test("routes source-image premium synchronous dialogue to Veo", () => { const plan = dispatchLegacyNaturalLanguage("用这张图片生成电影级对话视频，要求同步对话和精准音效"); assert.equal(plan.model?.id, "veo-ai"); });
test("keeps image and video catalogs separate", () => {
  const images = listModels("image"), videos = listModels("video"), all = listModels();
  assert.ok(images.every((model) => model.media === "image"));
  assert.ok(videos.every((model) => model.media === "video"));
  assert.equal(images.length + videos.length, all.length);
});
test("routes character creation to one canonical task before an optional parallel expansion wave", () => { const plan = dispatchLegacyNaturalLanguage("创建一个可以持续用于漫画的原创角色"); assert.equal(plan.workflow?.id, "create-character"); assert.equal(plan.model?.id, "gpt-image"); assert.equal(plan.runs, 1); assert.equal(plan.batchCount, 1); assert.equal(plan.params.batchCount, 1); assert.equal(plan.params.executionOrder, "canonical-qa-confirmation-gate-then-optional-seven-task-expansion"); assert.deepEqual(plan.params.defaultTasks, ["canonical-design-sheet"]); assert.deepEqual(plan.params.optionalConfirmedTasks, ["full-body-front", "full-body-back", "head-close-up", "lighting-study", "final-look-portrait", "scene-1", "scene-2"]); assert.equal(plan.params.expansionRequiresPostQaUserConfirmation, true); assert.deepEqual(plan.params.expansionSubmission, { mode: "parallel-wave", concurrency: 7, awaitBetweenSubmissions: false, prepareAllPayloadsAndKeysBeforeFirstSubmit: true, batchCountPerTask: 1 }); });
test("uses GPT Image 2 Medium/2K and requires both reference-image fields for confirmed expansion", () => { const plan = dispatchLegacyNaturalLanguage("根据这张图片制作角色设定图", { assets: ["model-reference"] }); assert.equal(plan.workflow?.id, "create-character"); assert.equal(plan.model?.id, "gpt-image"); assert.equal(plan.params.quality, "medium"); assert.equal(plan.params.imageSize, "2K"); assert.deepEqual(plan.params.canonicalReferenceBinding, { source: "canonical-design-sheet.result.image", requiredIn: ["input.images", "params.images"], appliesTo: "all optional confirmed tasks" }); assert.deepEqual(plan.params.canonicalReferenceRecovery, { lookup: "task-1 operationKey then exact executionId", extract: "data.executions[*].result[*].image", persistAs: "canonicalImageUrl", repairPayloads: true, regenerateTask1: false, derivedSubmissionBeforeRecovery: false }); });
test("routes a fictional mugshot-style portrait directly to GPT Image 2", () => {
  const plan = dispatchLegacyNaturalLanguage("把这张获授权成年人照片做成明确标注 FICTIONAL 的虚构 mugshot 风格照片", { assets: ["image"] });
  assert.equal(plan.intent.operation, "make-mugshot-photo");
  assert.equal(plan.workflow?.id, "make-mugshot-photo");
  assert.equal(plan.model?.id, "gpt-image");
  assert.equal(plan.agent, undefined);
  assert.equal(plan.params.quality, "medium");
  assert.equal(plan.params.imageSize, "2K");
  assert.equal(plan.params.aspectRatio, "3:4");
  assert.equal(plan.params.batchCount, 1);
  assert.equal(plan.params.routePolicy, "direct-gpt-image-2-no-tools-wrapper");
  assert.match(plan.acceptance.join(" "), /FICTIONAL/);
});
test("rejects a non-GPT model override for make-mugshot-photo", () => {
  assert.throws(
    () => dispatchLegacyNaturalLanguage("Create a fictional mugshot from this authorized adult photo", { assets: ["image"], requestedModel: "nano-banana-edit" }),
    /requires GPT Image 2 Medium/
  );
});
test("rejects unsupported standalone audio generation instead of inventing a route", () => {
  assert.throws(
    () => dispatchLegacyNaturalLanguage("生成一段 12 秒的原创环境音频，不要画面"),
    /no verified standalone audio-generation or audio-processing model/
  );
});
test("rejects unsupported standalone audio through the legacy dispatch entrypoint", () => {
  assert.throws(
    () => dispatchLegacyRequest({ ...compileIntent("generate audio file"), raw: "generate audio file", confidence: 1, requiresResearch: false }),
    /no verified standalone audio-generation or audio-processing model/
  );
});
test("keeps native audio inside a requested video on the video route", () => {
  const plan = dispatchLegacyNaturalLanguage("生成一段带自然环境声的雨天短片");
  assert.equal(plan.intent.media, "video");
  assert.equal(plan.model?.media, "video");
});
test("queries the capability matrix", () => { assert.ok(modelsWithCapability("nativeAudio").some((model) => model.id === "veo-ai")); assert.ok(modelsWithCapability("typography").some((model) => model.id === "gpt-image")); });
test("does not route models marked offline", () => { assert.equal(getModel("sora-2"), undefined); assert.equal(modelsWithCapability("imageToVideo").some((model) => model.id === "sora-2"), false); });
test("keeps a short Kling prompt unchanged", () => { const result = compileKlingPrompt("The woman looks left while the camera slowly pushes in."); assert.equal(result.simplified, false); assert.equal(result.textDescription, result.directorPrompt); });
test("compiles a complex Kling brief into an atomic execution prompt", () => {
  const result = compileKlingPrompt("女主先看向左侧并缓慢眨眼，轻微吸气，重心后移，双手保持插袋，镜头向右横移两米并缓慢推进，雨水持续落下并保持逆光，保持人物身份服装与站台构图一致，不要切换场景");
  assert.equal(result.simplified, true);
  assert.match(result.textDescription, /女主先看向左侧/);
  assert.match(result.textDescription, /镜头向右横移/);
  assert.match(result.textDescription, /雨水持续落下/);
  assert.match(result.textDescription, /保持人物身份/);
  assert.ok(result.omittedClauses.length > 0);
});
test("adds Kling 3.0 atomic execution and error-aware retry parameters", () => {
  const plan = dispatchLegacyNaturalLanguage("让这张图片动起来，镜头缓慢推进", { assets: ["image"] });
  assert.equal(plan.params.modelName, "Kling_3_0");
  assert.equal((plan.params.downgradePolicy as { fallback: { modelName: string } }).fallback.modelName, "Kling_2_5_Turbo");
  assert.match((plan.params.retryPolicy as string[]).join(" "), /never retry an identical request/);
  assert.match((plan.params.downgradePolicy as { onlyWhen: string[] }).onlyWhen.join(" "), /insufficient points/);
  assert.equal(plan.params.generateAudio, "false");
});
