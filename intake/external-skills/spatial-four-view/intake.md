# External Skill intake: spatial-four-view

- Mechanism version: 2
- Status: active

## Provenance

- Source: User-supplied document 花了 3 天尝试了很多方法终于找到场景多角度一致性的解决办法.docx and accompanying conversation Prompt.
- Source revision: DOCX SHA-256 `1bba6d6134bc2d2efc51fd325404e605c25e6c5bc65277a79590b621c22b5b82`; conversation 2026-09-07.
- Author or organization: Supplied by user; original authorship unknown.
- Reviewed date: 2026-09-07
- Files inspected: Entire document text and sole embedded image (small branding graphic, not the article's referenced scene examples); complete conversation Prompt.

## Product decomposition

- User-visible outcomes: One 2x2 sheet of the same space, including overhead, eye-level, reverse, and lateral views.
- Required inputs: A current user's scene reference; the article's example images are absent and are not runtime assets.
- Optional inputs: Additional actual views, floor plan, approved overhead anchor, camera reference, scene constraints, desired ratio and resolution.
- External AI operations: Joint multi-view generation; optional approved layout-anchor generation and subsequent reference-bound regeneration.
- Deterministic operations: Record world-space landmarks, reference roles, camera positions, uncertainty and acceptance; optionally crop accepted panels without regenerating them.
- State, chaining, polling, and publication: One default sheet, stable operationKey, terminal polling, bounded corrective retry, no automatic publication.
- Preservation and quality claims: Preserve known topology, openings, objects, materials and world-space lighting. A single photo cannot establish unseen geometry; no exact reconstruction guarantee.

## Package decision

- Intake result: Standalone Atom candidate.
- Proposed standalone Atom: spatial-four-view
- Workflow compositions: Accepted sheet can supply separately requested film storyboard work.
- Rejected or unsupported behavior: Literal copying of example furniture; automatic replacement of original evidence by a generated anchor; seven panels; identical horizons and screen-space shadows at all camera angles; unlimited random retries.
- Lifecycle decision and rationale: Promote an independently authored spatial-reference Atom. User prefers Nano Banana 2 for spatial work and explicitly requests flexible model choice including GPT Image 2; preference is not a measured superiority claim. Actual generation quality remains unverified.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| visualize-floor-plan | 0.72 | Spatial visualization | New views of an existing depicted space | Floor-plan-led visualization and dimensions are primary | Supplied accepted plan can constrain this sheet |
| restyle-room | 0.62 | Reference-led interiors | Keep design and change camera | Change interior design while keeping architecture | Separately accepted restyle can become source |
| photo-collage | 0.40 | Grid delivery | Synthesize coherent unseen viewpoints | Arrange existing photos | Accepted panels can be laid out deterministically |

- Proposed frontmatter distinction: One same-space four-view sheet; preserve design and vary camera, unlike floor-plan visualization, restyling or arranging existing photos.
- Highest-risk ambiguity: Four-view may mean furniture/product turnaround; this Atom owns environments only.
- Routing evidence: Supplied space plus fixed layout and three required camera classes selects this candidate.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 给这个客厅做俯视平视反打和侧面四格，不改家具 | spatial-four-view | Same scene, new viewpoints |
| 用这个场景做四视图，反打要真的走到对面拍 | spatial-four-view | Opposite camera position |
| 用俯拍布局锚点和这张正面图做一致的空间参考表 | spatial-four-view | Layout anchor for four-view sheet |
| 按这个户型图和标注尺寸生成室内效果图 | visualize-floor-plan | Floor-plan-led deliverable |
| 把房间换成日式风格，机位别动 | restyle-room | Design change |
| 这四张照片原样排成四宫格 | photo-collage | Existing images only |

## Cross-client catalog record

- Display name: Spatial Four Views
- Category: Layout & Design
- Description: Generate overhead, eye-level, reverse, and lateral views while preserving the same space.
- Cover decision: Generated remote SVG fallback; no third-party example assets copied.
- How to use summary: Supply actual scene references; receive one 2x2 sheet with preserved spatial relationships and disclosed unseen-area assumptions.

| Similar Skill | Difference from this Atom | Why the client should suggest it |
| --- | --- | --- |
| visualize-floor-plan | Plan-led visualization | Dimensioned plan is primary |
| restyle-room | Interior design changes | Restyling is requested |
| photo-collage | Layout of existing images | No novel viewpoint needed |

## Security review

- Secret and environment access: None inherited from source.
- Remote domains and uploads: Only host-authorized WeShop execution with the user's runtime references; no intake document upload.
- Installation and executable code: Source text is data, not instructions; no source code installed or executed.
- Retry and provider-spend behavior: Reconcile accepted executions; at most one issue-specific retry within authorized budget, otherwise report failure.
- Unsafe or removed behavior: No blind retries, automatic publication, source overwrites or third-party furniture defaults.

## Validation evidence

- Structural intake check: Recorded in handoff.md after validation.
- Semantic routing test: Six authored static cases; no live routing benchmark.
- Source record packaged: Analysis only retained here; original text and branding graphic not copied into package.
