# External Skill intake: minimal-zine-poster

> Current intake mechanism. Do not use legacy records without this marker as templates.

- Mechanism version: 2
- Status: active

## Provenance

- Source: https://github.com/LiamGvchi/gc-minimal-zine-poster
- Source revision: ddb0d66b24a94f9c4fdd1f02835a836a2db3774e
- Author or organization: LiamGvchi
- Reviewed date: 2026-08-31
- Files inspected: `README.md`, `README.zh-CN.md`, `SKILL.md`, and all five Markdown files under `references/`

## Product decomposition

- User-visible outcomes: Generate one sparse vertical minimal-zine poster; extract a reusable visual system from references; or return a production-ready prompt when explicitly requested.
- Required inputs: A theme, sentence, article or explicit idea, object, mood, photo, brief, or visual reference set.
- Optional inputs: Exact short copy, ratio, accent hue, photo role, preservation level, output mode, and supplied references.
- External AI operations: Raster generation and photo-aware editing through the host image-generation tool; provider unspecified.
- Deterministic operations: Content reduction, metaphor selection, reference-role classification, preservation invariants, recipe selection, prompt compilation, reference analysis, and quality inspection.
- State, chaining, polling, and publication: Analyze-then-generate is the only chain. The source specifies at most one regeneration but no execution ledger or polling contract. It does not publish externally.
- Preservation and quality claims: High negative space, one small focal event, restrained typography, one high-chroma accent, print reproduction, and no commercial full-bleed layout. Edit targets have high/medium preservation; references preserve grammar rather than identity or composition.

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake
- Proposed standalone Atom: `minimal-zine-poster`
- Router compositions: May hand a finished raster poster to `poster-motion` when the user separately asks to animate it.
- Rejected or unsupported behavior: Do not claim arbitrary folder browsing, exact reference reproduction, exact long typography, or guaranteed native `3:5` output. Use only accessible supplied images and a supported ratio.
- Lifecycle decision and rationale: Promote as a standalone Ready Atom. It owns a fixed editorial system and reference-analysis contract; the general poster Skill owns broad art direction and communication-heavy promotion. Keep this intake active as provenance.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `poster-design` | 0.86 | A single poster from themes, copy, photos, or references. | The result must stay in the sparse aged-paper zine house style, or references must be analyzed into that system. | Broad style exploration, a commercial/event flyer, rich hierarchy, or another poster language is needed. | Either raster may hand off to `poster-motion`. |
| `article-handdrawn-illustrations` | 0.43 | Article ideas become sparse visual metaphors. | The result is one vertical editorial poster with paper/print texture. | The article needs several ordered body illustrations, passage placement, and the recurring black character. | One selected article idea may become a zine poster. |

- Proposed frontmatter distinction: Use for one sparse paper-texture minimal-zine poster or analysis of that exact system; unlike `$poster-design` (0.86), choose this fixed house style instead of broad or promotional poster design; unlike `$article-handdrawn-illustrations` (0.43), choose this for one poster instead of passage-linked body illustrations.
- Highest-risk ambiguity: “Make a minimalist poster” alone routes to `poster-design`; this candidate needs the named zine system, matching references, or traits such as aged paper, radical negative space, a tiny focal event, restrained editorial type, and print defects.
- Router scoring evidence: This candidate wins on the fixed style, one sparse vertical raster, reference analysis, or prompt-only delivery. `poster-design` wins on broad exploration, exact campaign hierarchy, commercial/event copy, or flyers. `article-handdrawn-illustrations` wins on multi-image article coverage.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| “把这篇关于记忆的文章压成一个视觉隐喻，做一张留白很多、旧纸质感的独立杂志海报。” | minimal-zine-poster | One article-derived metaphor in the named zine system. |
| “参考这几张韩系独立刊物，先提炼固定和可变规则，再做一张全新的竖版海报。” | minimal-zine-poster | Reference analysis followed by a family-consistent poster. |
| “用这张人物照做极简 zine poster，保留人物和衣服，只把照片做成小幅复印碎片。” | minimal-zine-poster | High-preservation photo insert in the fixed print system. |
| “做一张极简新品发布海报，要有价格、日期、门店和 CTA。” | poster-design | Communication-heavy promotional hierarchy. |
| “给音乐节做三套完全不同风格的海报方向。” | poster-design | Broad art-direction exploration. |
| “读完这篇长文，挑 5 个段落分别做白底手绘正文插图。” | article-handdrawn-illustrations | Ordered multi-image article coverage. |

## Cross-client catalog record

- Display name: Minimal Zine Poster
- Category: Layout & Design
- Description: Create one sparse vertical editorial poster with aged paper, radical negative space, one small focal event, restrained type, and a single vivid accent from a theme, article idea, photo, or visual references.
- Cover decision: Dedicated cover uploaded and content-verified at `https://ai-image.weshop.com/desktop/coverImage/minimal-zine-poster.png`.
- How to use summary: Provide a theme, short text, article or explicit idea, photo, or references; optionally specify exact short copy, ratio, accent color, and preservation.

| Similar Skill | Difference from this Atom | Why the client should suggest it |
| --- | --- | --- |
| `poster-design` | Broad poster/flyer art direction rather than this fixed system. | Suggest for commercial, information-rich, or varied poster styles. |
| `article-handdrawn-illustrations` | Ordered article-body drawings rather than one editorial poster. | Suggest for several passage-linked explanatory illustrations. |

## Security review

- Secret and environment access: No secrets, environment variables, or unrelated files; standard WeShop execution only.
- Remote domains and uploads: No custom upload client. User assets go only through the approved WeShop route when generation is requested.
- Installation and executable code: No scripts, dependencies, fonts, or executable assets are copied.
- Retry and provider-spend behavior: Durable operation key, terminal polling, no recreation of accepted executions, and at most one issue-specific retry.
- Unsafe or removed behavior: Removed host-specific attachment syntax and assumptions about arbitrary folder access or guaranteed `3:5` generation.

## Validation evidence

- Structural intake check: Run `npm run skills:intake -- validate minimal-zine-poster` after completing both records.
- Semantic routing test: Six natural-language cases above cover three candidate wins and three named-neighbor wins.
- Source record packaged: URL, immutable revision, author, reviewed files, substitution, and lifecycle decision are recorded.
