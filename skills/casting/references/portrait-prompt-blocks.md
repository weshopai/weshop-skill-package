# Casting portrait prompt blocks

Use only for `casting`; the user role card supplies character-specific facts. Prompts are Chinese-led; retain the following English anchors, proportions, negatives, and `#ffffff` unchanged.

## Photographic compiler

Build: `CHARACTER:` apparent age + `Chinese` + state-based temperament + face anchor + brows/eyes/nose/lips; then `SKIN (priority, refined realistic): smooth clean realistic skin with a refined natural finish, subtle fine texture and minimal barely-visible pores, looking real but polished like high-end editorial retouching, never plastic, never rough bumpy blemished.`; then `OUTFIT:` inferred from character type and temperament, elevated in material/cut, no logos. Add `untucked, worn loose over the waistband, never tucked into trousers or skirt` where applicable.

Female face anchor: `slim refined oval face with a clean sharp well-defined jawline, harmonious proportions, NOT wide, NOT square, NOT a heavy or sagging jaw`.

Male face anchor: `long clean face with a sharp angular well-defined jawline, NOT wide, NOT round, NOT a soft sagging jaw`.

Append these three blocks verbatim:

### COMPOSITION

构图（严格锁定，逐条执行，标准证件照美颜近景）：
- 景别：头颈紧景特写。发顶紧贴画框顶边，头顶上方无留白。画框底边切于锁骨/上胸口。脸部高度约占画框垂直高度的55–60%。NOT拉远至显示肩膀、西装身段或半身。
- 居中：头部水平居中，面部中线（鼻梁）与画框垂直中线精确对齐。脸在画框内垂直居中。
- 发型裁切：头发自然垂落两侧，左右两侧发丝被画框边缘自然裁切——头发整体宽度超出画框，只露出内侧部分。
- 朝向：完全正面视角，头部绝对水平，零偏转零旋转，双眼直视镜头，下颌微收，颈部完整可见至锁骨。
- 表情：按角色气质填写分化，不套同一种表情。
- 画幅：竖向3:4画幅，左右对称构图。

### RENDERING

渲染：纯净无缝纯白#ffffff背景。柔和电影感美颜布光，面部有自然的明暗塑形——额头、鼻梁、颧骨保留清晰高光，脸侧有柔和阴影，呈现三维立体体积感，NOT平光NOT均匀补光。皮肤温润通透，有丰富的subsurface透光感与自然肤色渐变，高端杂志级写实质感，竖向3:4画幅。

### SHARPNESS

清晰度：将整个头部渲染在同一个清晰焦平面内——脸部、眼睛、睫毛、耳朵、耳饰、发际线及所有发丝（包括头部两侧的头发）全部同等清晰、对焦准确、细节完整，从脸部正面到两侧发丝保持同等精细度。皮肤质感干净细腻，有自然肌理与极细微几乎不可见的毛孔，真实但经过高端修图级润色。头发与耳朵NOT模糊NOT虚焦NOT失焦。通过高分辨率与精细细节渲染实现均匀清晰，NOT靠压平光影或降低对比度来实现。始终保留柔和电影感光线、脸侧体积阴影与温润通透肤色。no浅景深效果，no模糊发丝，no平板均匀布光，no灰白发死的肤色，no粗糙坑洼皮肤，no重度放大毛孔，no过度磨皮塑料感。

Never add `narrow aperture`, `large depth of field`, `no soft-focus`, or `no bokeh on the face`.

## Proportion and CG blocks

- Female: `natural well-balanced 7-heads-tall female proportion, the head about one seventh of the full body height`.
- Ordinary/classical/everyday male: `well-proportioned 8-heads-tall figure`.
- Antagonist: `realistic everyday body proportion, minimum 7 heads tall, NOT idealised or stretched, NOT a squashed compressed body, NOT an oversized head on a short stocky frame`.
- Child: `cute chibi-leaning proportion, about 3 to 4 heads tall`.
- Always add: `keep the specified head-to-body ratio strictly; NOT a large head on a short body, NOT an exaggerated 8.5-9 heads elongated frame unless a 霸总-type male lead. Shoulders natural width (female ~1.6 head-widths, male ~2 head-widths).`

CG replaces, never combines with, photographic rendering: `high-end 3D CG character render, cinematic game-quality rendering, realistic-stylised 3D, clearly a rendered CG character not a photograph, not flat 2D anime, not cartoonish`; use semi-realistic CG skin, 3D-modelled hair, and luminous CG eyes. Retain composition, white background, approval gate, references, and proportions.

## Repair blocks

- White/hair edge: `completely clean seamless pure solid white #ffffff backdrop, no gradient, no grey, no off-white... Hair, hairline and outer strands must have clean sharp well-defined edges — NO wispy strands fading into background, NO semi-transparent hair edges, NO grey halo, NO foggy fringe. Keep natural volumetric light on face.`
- Rough skin: add smooth even-tone/minimal-pore constraints and pair with real-texture micro-detail constraints to avoid waxy plastic skin.
