# External Skill intake: urban-daylight-documentary-grade

- Mechanism version: 2
- Status: active

## Provenance

- Source: User-supplied Chinese Prompt, “照片发闷没层次，用这个提示词瞬间有感觉！”
- Source revision: `conversation-2026-09-03-v1`
- Author or organization: User supplied; original authorship not documented
- Reviewed date: 2026-09-03
- Files inspected: Complete Prompt supplied in the conversation; no external code, assets, or links

## Product decomposition

- User-visible outcomes: Give one flat urban daylight photograph controlled bright highlights, deeper detailed shadows, clean midtones, stable neutral grays, restrained source colors, subtle warm-light/cool-shadow separation, and clearer spatial depth.
- Required inputs: One authorized source photograph whose composition, subjects, objects, geometry, texture, light direction, weather, environment, and depth of field must remain unchanged.
- Optional inputs: Adjustment strength, protected colors or neutral surfaces, and permission for an extremely subtle vignette.
- External AI operations: One consistency-sensitive image edit limited to exposure, contrast, saturation, white balance, local tonal/color separation, restrained sharpness, and an optional very light vignette.
- Deterministic operations: Compare framing and landmarks; inspect clipping, crushed shadows, neutral drift, hue changes, halos, artifacts, noise, and unrequested content changes.
- State, chaining, polling, and publication: One durable-key edit, terminal polling, one issue-specific retry at most, no automatic publication, and no source overwrite.
- Preservation and quality claims: No invented elements, redraw, relighting, weather/depth-of-field changes, flare, beams, grain, noise, aging, HDR flattening, painted texture, CG rendering, or AI-redrawn appearance.

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake
- Proposed standalone Atom: `urban-daylight-documentary-grade`
- Router compositions: May precede `apply-photo-filter` only when the user separately requests a broader aesthetic treatment after the daylight correction.
- Rejected or unsupported behavior: Pixel-identical preservation, deterministic RAW development, calibrated color management, and recovery of source detail absent from the supplied raster cannot be guaranteed by a generative editor.
- Lifecycle decision and rationale: Promote as an independent Atom because its narrow outcome is realistic urban-daylight depth recovery with explicit highlight, shadow, neutral-color, and no-redraw constraints, not a general filter.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `apply-photo-filter` | 0.86 | Both adjust a photograph's palette and tone while preserving scene content. | Flat urban daylight needs controlled highlights, detailed deep shadows, clean midtones, neutral grays, and no texture effects. | The user wants film emulation, monochrome, matte, grain, bloom, or another broader aesthetic treatment. | Correct daylight first, then filter only when explicitly requested. |
| `remove-photo-filter` | 0.55 | Both normalize white balance, contrast, and color. | A naturally dull source needs a stronger realistic daylight grade. | An existing preset, cast, or stylization must be removed toward a neutral baseline. | Remove the filter first if present. |
| `recolor-object` | 0.31 | Both may alter local color while protecting other regions. | Local color changes only support tonal depth and warm/cool separation. | One named object must receive a new target hue. | Recolor first, then protect the approved hue during grading. |

- Proposed frontmatter distinction: Apply one restrained urban-daylight documentary exposure and color correction to a supplied photograph while preserving composition, scene content, geometry, texture, original light direction, weather, and depth of field. Use when a city photo looks flat, gray, or muddy and needs controlled bright highlights, deeper detailed shadows, clean midtones, stable neutral grays, and subtle warm-light/cool-shadow separation; unlike $apply-photo-filter (relationship 0.86), choose this for realistic daylight depth recovery with no grain, bloom, vintage texture, global cast, or named aesthetic filter, and choose $apply-photo-filter for broader film, monochrome, matte, texture, or reference-led treatments.
- Highest-risk ambiguity: “更有感觉”“通透”“电影感” can mean realistic correction or stylized filtering; route here when preservation and daylight tonal depth dominate.
- Router scoring evidence: Favor this candidate for a supplied city/daylight photo plus highlight protection, non-crushed shadows, haze removal, stable architectural neutrals, local warm/cool separation, and explicit no-redraw/no-new-light constraints.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 这张街拍灰蒙蒙没层次，天空和白墙别过曝，把阴影压深一点但保留细节，灰色建筑不要偏色，也别改人物和构图。 | `urban-daylight-documentary-grade` | Urban daylight recovery, stable neutrals, and strict preservation. |
| 把这张晴天城市照片调得通透扎实，受光面微暖、阴影微冷，不要HDR，不要颗粒，不要新增光源。 | `urban-daylight-documentary-grade` | Restrained daylight separation with anti-HDR and no-texture exclusions. |
| 地面和玻璃有点脏灰，请保留原来的光线方向和景深，只调整曝光、白平衡和局部色彩层次。 | `urban-daylight-documentary-grade` | Narrow correction controls and source-light preservation. |
| 套一个克制的 1990 年代胶片感，加一点细颗粒和轻微 bloom。 | `apply-photo-filter` | Named film look plus grain and bloom. |
| 去掉这张图很重的青橙滤镜，恢复接近原始自然颜色。 | `remove-photo-filter` | Neutralizing an existing filter is the primary outcome. |
| 只把照片里那辆红色自行车改成墨绿色，其他不变。 | `recolor-object` | A named object receives a new hue. |

## Cross-client catalog record

- Display name: Urban Daylight Documentary Grade
- Category: Layout & Design
- Description: Recover clean tonal depth in one urban daylight photograph while preserving the original scene, lighting, texture, and composition.
- Cover decision: Use the generated remote SVG fallback until a rights-cleared before/after example is commissioned.
- How to use summary: Provide one city daylight photo; receive one source-composition edit with controlled highlights, detailed shadows, clean midtones, neutral grays, and no invented content or relighting.

| Similar Skill | Difference from this Atom | Why the client should suggest it |
| --- | --- | --- |
| `apply-photo-filter` | Broader aesthetic grading, including film, matte, grain, bloom, and reference looks. | Suggest for a named visual treatment. |
| `remove-photo-filter` | Removes an existing cast or preset toward neutral. | Suggest for a visibly filtered source. |
| `recolor-object` | Assigns a new hue to one named object. | Suggest for object-specific recoloring. |

## Security review

- Secret and environment access: No credentials, environment variables, or unrelated files requested.
- Remote domains and uploads: No remote behavior supplied; a promoted Atom uses only the approved WeShop route with the authorized image.
- Installation and executable code: Plain Prompt text only; no code or packages installed or run.
- Retry and provider-spend behavior: One durable operation key and at most one linked issue-specific retry after a terminal result.
- Unsafe or removed behavior: No source overwrite, invented detail, scene additions, artificial lighting, or claims of deterministic preservation.

## Validation evidence

- Structural intake check: Passed `npm run skills:intake -- validate urban-daylight-documentary-grade` on 2026-09-03.
- Semantic routing test: Six authored cases cover three candidate requests and three named installed neighbors; no live routing benchmark run.
- Source record packaged: Intake Markdown retained as provenance; the promoted Atom is independently authored under `skills/urban-daylight-documentary-grade/`.
