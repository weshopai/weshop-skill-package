# External Skill intake: ian-xiaohei-illustrations

> Current intake mechanism. Do not use legacy records without this marker as templates; they may reflect the retired merge-era policy.

- Mechanism version: 2
- Status: active

## Provenance

- Source: https://github.com/helloianneo/ian-xiaohei-illustrations
- Source revision: 91b560849e8f883922cc2fa8a358a668caa94105
- Author or organization: Ian / helloianneo
- License: MIT, copyright 2026 Ian
- Reuse mode: adapted with attribution; upstream example images and QR asset are not copied
- Reviewed date: 2026-08-31
- Files inspected: `README.md`, `LICENSE`, `NOTICE.md`, `ian-xiaohei-illustrations/SKILL.md`, `agents/openai.yaml`, all five Markdown references, repository tree, and example filenames

## Product decomposition

- User-visible outcomes: A short article-level illustration plan and one or more separate 16:9, white-background, sparse hand-drawn explanatory illustrations in which a deadpan black character performs the core metaphorical action.
- Required inputs: Prefer the complete article or substantive body text; alternatively accept one explicit idea when the user only wants a single illustration.
- Optional inputs: Audience, target passage, quantity, ratio, exact short labels, language, authorized visual references, output location, and whether planning only or generation is requested.
- External AI operations: One raster image generation per approved illustration using the runtime image generator upstream; the native Atom maps this to GPT Image 2.
- Deterministic operations: Source reading, cognitive-anchor selection, shot-list planning, prompt compilation, filenames, ordered receipts, and visual/content QA.
- State, chaining, polling, and publication: Upstream saves ordered PNG files but does not specify provider receipts or polling. The native Atom assigns one durable operation key per image, polls accepted executions, preserves terminal results, and does not publish.
- Preservation and quality claims: One idea per image; strong whitespace; sparse labels; the black character owns the action; avoid dense diagrams, slide-like layouts, old-example replication, and unreadable generated Chinese.

## Package decision

- Intake result: Promote a standalone native Atom; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `article-handdrawn-illustrations`.
- Router compositions: Route article-body illustration requests directly here; hand off to `make-infographic` for fact-dense sourced diagrams, `create-social-carousel` for swipeable page sequences, or `create-image-deck` for presentation deliverables.
- Rejected or unsupported behavior: Do not copy upstream example images, QR asset, generic runtime tool-selection instructions, automatic generation when the user asked only for planning, or file overwrites. Do not promise exact Chinese lettering, editable vectors, research, publication, or a proprietary character exclusive to the user.
- Lifecycle decision and rationale: Active and promoted. The full-article input, cognitive-anchor selection, sparse hand-drawn body-illustration output, and recurring action-character contract are distinct from existing infographic, carousel, and deck outcomes.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `make-infographic` | 0.68 | Explain concepts visually | The source is an article and the deliverable is a sparse metaphorical body illustration | Facts, data, labels, and source-backed information hierarchy own one infographic | Hand off fact-dense requests to `make-infographic` |
| `create-social-carousel` | 0.57 | Turn source content into illustrated assets | Each image accompanies a passage and is not a swipe page | Platform sequencing, mobile copy, cover, page order, and CTA own the deliverable | Reuse approved article ideas only when the user separately requests a carousel |
| `create-image-deck` | 0.55 | Produce several consistent generated visuals | Images remain standalone article illustrations | Slides, exact page count, presentation packaging, and editable overlays own the deliverable | Hand off presentation requests to `create-image-deck` |

- Proposed frontmatter distinction: Recommend the complete article or body text and route only sparse article-body illustration intent; explicitly exclude infographic, carousel, deck, poster, logo, and generic illustration work.
- Highest-risk ambiguity: A user may say “给文章配图” while actually expecting a Xiaohongshu carousel or information-heavy infographic; destination and deliverable structure decide the route.
- Router scoring evidence: Full article plus “正文配图/文章插图/认知锚点/手绘隐喻” selects this Atom; sourced facts selects `make-infographic`; swipe pages selects `create-social-carousel`; slides or PPT selects `create-image-deck`.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| `我把整篇中文文章贴给你，挑 5 个认知转折做成白底手绘正文插图` | `ian-xiaohei-illustrations` | Intake candidate: complete article, cognitive-anchor selection, and body illustrations |
| `给这篇方法论文章配三张小黑参与核心动作的怪诞解释图` | `ian-xiaohei-illustrations` | Intake candidate: recurring action character and separate article illustrations |
| `先读这篇博客，只给我值得配图的位置和 shot list，暂时别生图` | `ian-xiaohei-illustrations` | Intake candidate: article-level illustration planning without generation |
| `查证这些节水数据，做一张带来源的中文信息图` | `make-infographic` | Source-backed fact hierarchy owns the asset |
| `把这篇文章改成 7 页小红书轮播，最后一页加 CTA` | `create-social-carousel` | Ordered mobile swipe sequence and CTA |
| `把培训材料做成 10 页 16:9 图片型 PPT，并交付演示文件` | `create-image-deck` | Exact slide count and deck packaging |

## Cross-client catalog record

- Display name: Article Hand-drawn Illustrations
- Category: Layout & Design
- Description: Turn an article or one explicit idea into sparse hand-drawn explanatory body illustrations with fresh visual metaphors and an action-led black character.
- Cover decision: Use the standard Package fallback cover until a separately approved Package-owned cover is produced; upstream examples are not copied.
- How to use summary: For best results, paste the complete article or substantive body text, then state the audience, desired quantity, ratio, and whether you want a shot list only or final images.

| Similar Skill | Difference from this Atom | Why the client should suggest it |
| --- | --- | --- |
| `make-infographic` | Fact-dense sourced hierarchy rather than sparse article metaphor | Suggest for evidence, data, and exact informational labels |
| `create-social-carousel` | Ordered mobile pages rather than passage-level body illustrations | Suggest for Xiaohongshu, Instagram, or LinkedIn swipe content |
| `create-image-deck` | Packaged presentation rather than standalone article images | Suggest for slides, PPT, and exact page counts |

## Security review

- Secret and environment access: Upstream contains prompt/reference Markdown only and no secret access. Native generation uses the Package's existing WeShop credential boundary.
- Remote domains and uploads: Source documentation links GitHub, the author's website, and X; none are required at runtime. Native generation sends only user-authorized text and references through the existing WeShop image route.
- Installation and executable code: No upstream scripts, dependencies, binaries, hooks, or executable code are copied or run by the promoted Atom.
- Retry and provider-spend behavior: One image per accepted execution, one durable operation key per image, terminal polling, and issue-specific bounded replacement only. Never recreate an accepted execution while its state is unknown.
- Unsafe or removed behavior: No automatic publication, QR/marketing asset copying, example-image copying, silent workspace overwrite, unrequested remote fetching, or unbounded multi-image generation.

## Validation evidence

- Structural intake check: Passed with `npm run skills:intake -- validate ian-xiaohei-illustrations`.
- Semantic routing test: Six natural-language cases recorded above: three candidate and three installed-neighbor routes.
- Source record packaged: `skills/article-handdrawn-illustrations/references/source-attribution.md` preserves the pinned revision, modification disclosure, NOTICE request, and MIT text.
