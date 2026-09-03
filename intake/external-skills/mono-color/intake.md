# External Skill intake: mono-color

> Current intake mechanism. This records the reviewed outcome; the native Atom is authored independently.

- Mechanism version: 2
- Status: active

## Provenance

- Source: https://github.com/yanliudesign/mono-color-skill
- Source revision: c8ff70597ddedcd65f21a0b528f6a70c35690b0a
- Author or organization: yanliudesign
- Reviewed date: 2026-09-03
- Files inspected: all 68 tracked paths were inventoried; all root documentation and the Skill entrypoint, seven design-system files, two eval files, four Python validation/build scripts, and the GitHub validation workflow were read; the design-system board, representative generated examples, and layout-system reference were visually inspected; 29 example/reference image paths and 17 SVG swatches were treated as untrusted source assets and were not copied

## Product decomposition

- User-visible outcomes: one original raster editorial artifact that translates a theme, sentence, article idea, object, or authorized reference image into a controlled one-ink or two-ink print language, plus the final Prompt and a compact recipe.
- Required inputs: one subject, theme, sentence, article idea, object, or authorized image; exact display copy when wording matters.
- Optional inputs: output ratio, one- or two-ink mode, named ink or pair, neutral substrate, representation mode, typography direction, print process, and visual references.
- External AI operations: prompt compilation and image generation or reference-aware image editing through an unspecified host image-generation capability.
- Deterministic operations: resolve subject and intent; preserve exact supplied words; choose one stable palette, plate role, composition, type hierarchy, focal event, release zone, and bounded print imperfection recipe; inspect output against ink, copy, preservation, and originality constraints.
- State, chaining, polling, and publication: the source expects prompt then image generation but does not define a durable remote execution ledger; its local save path and repository validation scripts are not retained.
- Preservation and quality claims: recognizable source identity and factual anchors remain intact; paper stays visible; no more than two ink plates; one dominant focal event; supplied text remains exact; reference composition, wording, logo, and artwork are not copied.

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake
- Proposed standalone Atom: `mono-color`
- Router compositions: may consume copy from a Text Atom or an approved image from a product, portrait, or character Atom; the finished graphic may be handed to a downstream campaign or layout workflow.
- Rejected or unsupported behavior: no source repository scripts, example/reference assets, SVG swatches, hidden local catalogs, `~/Desktop/Claude skills/mono-color/` writes, arbitrary host image tools, or claim of deterministic pixel reproduction. Exact long-form typesetting and physical print separations require deterministic finishing outside this Atom.
- Lifecycle decision and rationale: promote a native Atom because the fixed one/two-ink plate system, active-paper composition, print-reproduction grammar, and prompt-plus-image recipe form a coherent deliverable distinct from broad poster exploration.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `minimal-zine-poster` | 0.88 | Fixed-house-style editorial posters with paper exposure and print texture | The decisive system is one or two assigned ink plates, 25–55% active paper, type/image collision, and contemporary or tactile editorial print | The decisive system is 70–90% aged-paper negative space, one small focal event, restrained typography, and one vivid accent | Compare the desired ink system and focal scale; do not stack both house styles |
| `poster-design` | 0.86 | A single image combining subject, typography, color, and composition | The user explicitly wants mono-color, monochrome/duotone plate logic, risograph, halftone, screen-print, or the named house style | The user wants broad art-direction exploration, commercial/event communication, a flyer, or a style unconstrained by two inks | `poster-design` may supply a broader concept brief before a separately requested mono-color rendering |
| `apply-photo-filter` | 0.54 | Monochrome or duotone treatment of a supplied photograph | The photo may be cropped, screened, isolated, combined with type, and reorganized as a new editorial artifact | Scene geometry, crop, people, objects, and text must remain unchanged while only color and texture change | A filtered photo may become an input, but the two transformations must be separately requested |

- Proposed frontmatter distinction: use `mono-color` for one original one/two-ink editorial print artifact with assigned plates, exposed paper, typographic tension, and a prompt-plus-recipe deliverable; choose `minimal-zine-poster` for an aged, extremely sparse small-focal zine system, `poster-design` for unrestricted poster direction, and `apply-photo-filter` when composition must not change.
- Highest-risk ambiguity: “做一张单色极简海报” may mean either plate-constrained mono-color or the aged, 70–90% empty `minimal-zine-poster`; select from the requested ink mechanics, paper age, focal scale, and negative-space range.
- Router scoring evidence: explicit one/two inks, named plate colors, risograph/screen-print/halftone language, type colliding with a dominant object, exposed substrate, and a requested print recipe decide for `mono-color`.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 用钴蓝和陶土橙做一张凌晨便利店的双色孔版印刷海报，标题是 STILL OPEN | mono-color | Two named ink plates, risograph reproduction, and exact short copy define the result |
| 把这张骑行照片做成单色编辑封面，保留人物但让标题压过车轮 | mono-color | Reference-aware editorial reconstruction with one plate and type-image collision |
| 为蕨类观察笔记做绿色网点印刷页，只用一种绿墨并露出很多纸白 | mono-color | Pure one-ink mechanics and exposed substrate are mandatory |
| 把这篇文章做成旧纸感、留白九成、只有一个很小红点的独立杂志海报 | minimal-zine-poster | Aged paper, radical 70–90% negative space, and tiny focal event own the request |
| 给新品发布会做信息完整的海报，包含时间、地点、CTA，风格你来探索 | poster-design | Information-heavy promotion and open art direction are not constrained to the mono-color system |
| 保持这张照片的构图和人物完全不变，只把色调换成黑白并加细颗粒 | apply-photo-filter | Content and composition must remain unchanged; only the photographic treatment changes |

## Cross-client catalog record

- Display name: Mono Color
- Category: Layout & Design
- Description: Create original one- or two-ink editorial print images with assigned plates, exposed paper, typographic tension, and controlled halftone texture.
- Cover decision: use the generated remote fallback SVG for `mono-color`; no external source asset is copied or uploaded.
- How to use summary: Provide a theme, exact short copy, object, article idea, or authorized image; optionally choose the ratio, named inks, contemporary or tactile treatment, and what the source must preserve.

| Similar Skill | Difference from this Atom | Why the client should suggest it |
| --- | --- | --- |
| `minimal-zine-poster` | Aged paper, 70–90% negative space, and a small focal event instead of assigned one/two-ink plates and a dominant type/object collision | Suggest for extremely sparse, quiet zine compositions |
| `poster-design` | Broad poster and flyer art direction without a fixed plate limit | Suggest for promotions, dense information, or unrestricted style exploration |
| `apply-photo-filter` | Preserves the original composition and changes only photographic color and texture | Suggest for non-destructive monochrome grading rather than editorial reconstruction |

## Security review

- Secret and environment access: none retained; never expose credentials, environment variables, unrelated local files, or private paths in prompts or output.
- Remote domains and uploads: only the official WeShop route may receive authorized source images; no source repository domain, sample asset, or arbitrary URL is forwarded.
- Installation and executable code: the four Python scripts and GitHub workflow were reviewed as deterministic validators/board builders but are neither executed nor copied; the Atom installs no dependencies and runs no source code.
- Retry and provider-spend behavior: persist an operation key before submission, poll the accepted execution to terminal state, and retry at most once with a linked key after a known failed acceptance property.
- Unsafe or removed behavior: remove the hard-coded Claude Desktop save path, source asset reuse, host-specific tool assumptions, and any implication that model output is a physical separations file.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate mono-color`
- Semantic routing test: the six natural-language cases above distinguish plate-constrained editorial print, minimal zine, broad poster, and unchanged-composition filtering.
- Source record packaged: provenance and independently authored behavior only; no source code, images, swatches, repository data dump, credentials, or third-party assets are stored.
