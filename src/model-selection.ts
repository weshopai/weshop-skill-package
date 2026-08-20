import { getModel } from "./models.js";
import type { ModelDefinition, RouteRequest } from "./types.js";

export interface ModelSelection {
  model: ModelDefinition;
  params: Record<string, unknown>;
  reason: string;
}

const includesAny = (text: string, terms: string[]) => terms.some((term) => text.includes(term));

/** Implements the WeShop AI Model Selection Guide dated 2026-08-17. */
export function selectImageModel(request: RouteRequest & { raw: string }): ModelSelection {
  const text = request.raw.toLowerCase();
  const hasImageInput = request.assets.some((asset) => asset !== "text") || request.operation === "edit-image";
  const explicitlyTextFree = includesAny(text, ["不要文字", "无文字", "不含文字", "纯画面", "no text", "text-free", "without text"]);
  const bannerDeliverable = includesAny(text, ["banner", "横幅", "频道封面", "网站首屏", "hero banner", "channel banner"]);
  const bannerDirectionReference = bannerDeliverable && explicitlyTextFree && includesAny(text, ["艺术方向参考", "视觉方向参考", "风格参考图", "art direction reference", "visual direction reference", "style reference image"]);
  const needsReadableText = !explicitlyTextFree && includesAny(text, ["文字", "文案", "标题", "中文", "多语言", "翻译", "本地化", "海报", "包装", "banner", "poster", "headline", "title", "copy", "signage", "menu", "readable text", "translate", "localization"]);
  const artistic = includesAny(text, ["艺术", "插画", "灵感", "概念艺术", "experimental", "artistic", "illustration", "concept art", "inspiration"]);
  const photorealistic = includesAny(text, ["写实", "真实照片", "摄影", "photoreal", "realistic photo"]);
  const chineseCulture = includesAny(text, ["中国文化", "中式", "国风", "汉服", "敦煌", "水墨", "chinese culture", "chinese cultural"]);
  const demandingLighting = includesAny(text, ["高要求灯光", "精细灯光", "棚拍光线", "材质塑造", "珠宝", "腕表", "香水", "汽车广告", "demanding lighting", "studio lighting", "material rendering", "jewelry", "watch", "fragrance", "automotive"]);
  const asianAesthetic = includesAny(text, ["亚洲审美", "亚洲模特", "亚洲人物", "亚洲电商", "asian aesthetic", "asian model", "asian fashion", "asian e-commerce"]);
  const consistency = request.priority === "fidelity" || includesAny(text, ["保持不变", "不要改变", "一致", "保真", "同一个", "角色一致", "商品一致", "identity", "consistent", "fidelity", "preserve unchanged"]);
  const draftDivergence = includesAny(text, ["快速草稿", "草稿分叉", "多方向草稿", "draft divergence", "quick drafts", "draft variations"]);
  const internalConvergence = includesAny(text, ["内部评审", "内部审阅", "内部收敛", "internal review", "internal convergence"]);

  if (request.requestedModel) {
    const requested = getModel(request.requestedModel);
    if (!requested || requested.media !== "image") throw new Error(`Unavailable image model: ${request.requestedModel}.`);
    if (hasImageInput && (requested.id === "midjourney" || requested.id === "z-image")) throw new Error(`${requested.label} is text-to-image only and cannot receive image or edit inputs.`);
    if (bannerDeliverable && !bannerDirectionReference && requested.id !== "gpt-image") throw new Error("Final Banner production requires GPT Image 2 Medium; Midjourney may only create a text-free artistic-direction reference.");
    if (needsReadableText && requested.id !== "gpt-image") throw new Error("Readable text and multilingual image work require GPT Image 2 Medium.");
    if (requested.id === "nano-banana-edit" && !draftDivergence && !internalConvergence) throw new Error("Nano Banana is reserved for explicit draft divergence or internal convergence; routine final editing requires GPT Image 2 Medium/2K.");
    return { model: requested, params: requested.id === "gpt-image" ? { quality: "medium", imageSize: "2K" } : {}, reason: "user-requested model passed hard capability rules" };
  }

  if (bannerDirectionReference && !hasImageInput) return pick("midjourney", { outputCount: 4 }, "Midjourney creates a text-free artistic-direction reference only; GPT Image 2 must produce the final Banner");
  if (bannerDeliverable) return pick("gpt-image", { quality: "medium", imageSize: "2K" }, "GPT Image 2 Medium/2K produces every final Banner and all Banner copy");
  if (needsReadableText) return pick("gpt-image", { quality: "medium", imageSize: "2K" }, "readable text or multilingual work requires GPT Image 2 Medium/2K");
  if (hasImageInput) {
    if (demandingLighting || asianAesthetic) return pick("seedream", { imageSize: "2K" }, "reference task requires demanding lighting or Asian commercial aesthetics");
    if (draftDivergence) return pick("nano-banana-edit", { modelName: "nano2", imageSize: "1K", aspectRatio: "auto" }, "explicit fast draft divergence");
    if (internalConvergence) return pick("nano-banana-edit", { modelName: "nano", imageSize: "2K", aspectRatio: "auto" }, "explicit high-quality internal convergence or review");
    return pick("gpt-image", { quality: "medium", imageSize: "2K" }, consistency ? "reference task prioritizes subject or product consistency" : "routine final reference-image editing uses the general GPT Image 2 Medium/2K route");
  }
  if (artistic) return pick("midjourney", { outputCount: 4 }, "pure text-to-image artistic exploration");
  if (chineseCulture || photorealistic) return pick("z-image", {}, chineseCulture ? "pure text-to-image Chinese cultural direction" : "pure text-to-image photorealism");
  if (demandingLighting || asianAesthetic) return pick("seedream", { imageSize: "2K" }, "demanding lighting or Asian commercial aesthetics");
  return pick("gpt-image", { quality: "medium", imageSize: "2K" }, "global GPT Image 2 default: Medium/2K");
}

export function selectVideoModel(request: RouteRequest & { raw: string }): ModelSelection {
  const text = request.raw.toLowerCase();
  if (request.requestedModel) {
    const requested = getModel(request.requestedModel);
    if (!requested || requested.media !== "video") throw new Error(`Unavailable video model: ${request.requestedModel}.`);
    return { model: requested, params: {}, reason: "user-requested video model" };
  }
  const largeMotion = includesAny(text, ["大幅度", "高动态", "激烈动作", "奔跑", "跳跃", "打斗", "large-amplitude", "high-dynamic", "action sequence"]);
  const complexReferences = request.assets.includes("scene-reference") || request.assets.includes("pose-reference") || request.assets.includes("model-reference") || includesAny(text, ["多图参考", "多参考", "视频参考", "复杂参考", "multi-reference", "video reference", "complex reference"]);
  const preciseFramesOrProduct = includesAny(text, ["首尾帧", "首帧", "尾帧", "产品展示", "商品展示", "first frame", "last frame", "product showcase"]);
  const audioVisual = includesAny(text, ["音画同步", "音乐卡点", "对口型", "艺术短片", "audio-visual", "lip sync", "music sync", "artistic video"]);
  const lightweight = request.priority === "cost" && includesAny(text, ["草稿", "概念验证", "预览", "draft", "concept validation", "preview"]);
  if (largeMotion) return pick("minimax-h3", {}, "large-amplitude or high-dynamic motion");
  if (complexReferences) return pick("kling", { modelName: "Kling_3_0" }, "complex references; Kling V3 Omni is not yet cataloged, so use the closest verified adapter and record the limitation");
  if (preciseFramesOrProduct || request.operation === "animate-image") return pick("kling", { modelName: "Kling_3_0" }, "precise frame or controllable product showcase");
  if (audioVisual) return pick("seedance-2-5", {}, "audio-visual synchronization or artistic expression");
  if (lightweight) return pick("seedance", {}, "lightweight validation; Seedance Mini is not yet cataloged");
  return pick("seedance", {}, "routine video generation");
}

function pick(id: string, params: Record<string, unknown>, reason: string): ModelSelection {
  const model = getModel(id);
  if (!model) throw new Error(`No cataloged model for ${id}.`);
  return { model, params, reason };
}
