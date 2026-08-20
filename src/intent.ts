import type { AssetRole, IntentCard, MediaType, Operation, Priority } from "./types.js";

const has = (text: string, words: string[]) => words.some((word) => text.includes(word));
const quantity = (text: string) => Number(text.match(/(?:生成|要|给我|create|make)\s*(\d+)\s*(?:张|个|条|images?|videos?)/i)?.[1] ?? 1);

/** A transparent deterministic compiler. An LLM may enrich this card later, never replace its schema. */
export function compileIntent(raw: string): IntentCard {
  const text = raw.toLowerCase();
  const video = has(text, ["视频", "短片", "video", "film", "动画", "animate", "动起来", "motion"]);
  const operation: Operation = has(text, ["角色设定图", "人物设定图", "角色三视图", "人物三视图", "character sheet", "casting sheet"]) ? "character-sheet"
    : has(text, ["mugshot", "mug shot", "虚构入案照", "虚构拘捕照", "入案照风格", "拘捕照风格"]) ? "make-mugshot-photo"
    : has(text, ["流程图", "flowchart", "flow chart"]) ? "make-flowchart"
    : has(text, ["景观预览", "庭院改造", "庭院设计", "景观设计", "preview landscape", "landscape preview", "redesign this courtyard", "redesign this yard"]) ? "preview-landscape"
    : has(text, ["房间改造", "房间换风格", "室内改造", "restyle room", "restyle this room", "restyle this living room"]) ? "restyle-room"
    : has(text, ["设计旗帜", "设计一面旗", "create flag", "design a flag"]) ? "create-flag"
    : has(text, ["设计logo", "设计 logo", "创建logo", "创建 logo", "create logo", "design a logo"]) ? "create-logo"
    : has(text, ["创建动物", "生成动物", "设计动物", "create animal", "generate animal", "design an animal"]) ? "create-animal"
    : has(text, ["试穿", "上身", "try on", "try-on"]) ? "try-on"
    : has(text, ["穿搭设计", "设计穿搭", "重新设计衣服", "重设计服装", "整套造型", "outfit design", "redesign outfit", "design an outfit", "new outfit concept"]) ? "outfit-design"
    : has(text, ["换姿势", "姿势", "pose"]) ? "change-pose"
    : has(text, ["换模特", "更换模特", "替换模特", "换场景", "replace model", "model replacement", "replace scene"]) || (text.includes("替换") && text.includes("模特")) ? "replace-model-or-scene"
    : has(text, ["抠图", "去背景", "背景透明", "透明 png", "transparent png", "remove background", "cutout"]) || ((text.includes("去掉") || text.includes("移除")) && text.includes("背景")) ? "remove-background"
    : has(text, ["扩图", "扩展", "outpaint", "expand"]) ? "expand-image"
    : has(text, ["商品图", "产品图", "商品放", "产品放", "product scene", "product into", "product in a", "still life"]) ? "product-scene"
    : video ? (has(text, ["图片", "image", "照片", "photo"]) ? "animate-image" : "generate-video")
    : has(text, ["编辑", "修改", "edit", "replace", "去除"]) ? "edit-image" : "generate-image";
  const media: MediaType = operation === "generate-video" || operation === "animate-image" ? "video" : "image";
  const assets: AssetRole[] = [];
  if (has(text, ["衣服", "服装", "garment", "apparel"])) assets.push("garment");
  if (has(text, ["模特图", "人物图", "dressed model", "已穿"])) assets.push("dressed-model");
  if (has(text, ["商品", "产品", "product", "包装"])) assets.push("product");
  if (has(text, ["图片", "图像", "照片", "image", "photo"])) assets.push("image");
  if (video && has(text, ["视频", "video", "素材"])) assets.push("video");
  if (assets.length === 0 && operation !== "character-sheet" && operation !== "generate-image" && operation !== "generate-video") assets.push("image");
  const preserve = ["服装|衣服|apparel" , "商品|产品|product|包装", "logo|商标", "人物|人脸|identity", "背景|background"].flatMap((pattern, index) => has(text, pattern.split("|")) ? [["apparel", "product", "logo", "identity", "background"][index]] : []);
  const priority: Priority = has(text, ["高质量", "4k", "高清", "quality"]) ? "quality" : has(text, ["保真", "一致", "preserve", "fidelity"]) ? "fidelity" : has(text, ["快速", "快", "speed"]) ? "speed" : "cost";
  return { raw, operation, media, assets, preserve, outputCount: quantity(text), namedVariations: has(text, ["分别", "每张", "each", "不同的"]), priority, requiresResearch: has(text, ["amazon", "tiktok shop", "temu", "shopee", "规格", "合规", "竞品"]), confidence: operation === "generate-image" || operation === "generate-video" ? 0.72 : 0.9 };
}
