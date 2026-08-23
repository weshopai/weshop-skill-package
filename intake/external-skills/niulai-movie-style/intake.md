# External Skill intake: niulai-movie-style

> Current intake mechanism. This is an independent candidate, not an installed Skill.

- Mechanism version: 2
- Status: active

## Provenance

- Source: `/Users/jasonjiang/Downloads/minimax skill/niulai-movie-style`
- Source revision: `sha256:ae313a018d56dff32c6eed6fddbed03c8ff5062b2c758fd0f844e6060bbfe2d9`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`, and four style, prompt, motion, and recovery references; none executed

## Product decomposition

- User-visible outcomes: a source-image transformation into deliberately primitive, awkward low-budget 3D, with an optional short motion continuation.
- Required inputs: source image unless the user explicitly requests an invented scene.
- Optional inputs: source ratio, degradation strength, likeness strength, prompt-only mode, and video intent.
- External AI operations: image editing and optional image-to-video generation.
- Deterministic operations: anchor extraction, preset selection, negative constraints, quality inspection, and recovery diagnosis.
- State, chaining, polling, and publication: one source edit before optional confirmed video; durable key per output; no automatic publication.
- Preservation and quality claims: subject count, broad layout/action/camera, scene category, props, colors; intentionally degraded topology, rigging, materials, lighting, and render quality.

## Package decision

- Intake result: standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `niulai-movie-style`.
- Router compositions: image-edit route creates the source transformation; `generate-video` makes the approved continuation.
- Rejected or unsupported behavior: named source-style branding in a promoted description, fixed provider default, automatic fallback, repeated retries, and source tool calls.
- Lifecycle decision and rationale: promoted as standalone `skills/primitive-folk-cgi-restyle`; the controlled primitive-3D reconstruction contract is distinct from generic low-poly styling.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `preview-paint` | 0.61 | Restyle a supplied image | The desired result is intentionally crude primitive 3D with failed production traits | A painted preview is requested | Edited still may be motion source |
| `restyle-video` | 0.55 | Change video style | Source-image reconstruction and optional awkward motion are required | Existing video needs broader restyling | Candidate can supply reference still |

- Proposed frontmatter distinction: broad-anchor-preserving primitive failed-3D reconstruction, not a flattering low-poly look or a generic filter.
- Highest-risk ambiguity: “low poly” often asks for polished geometric art instead.
- Router scoring evidence: deliberate sparse geometry, broken proportions, stiff rigging, cheap textures/lighting, with no horror or injury.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 把这张合照变成笨拙的早期 3D 游戏过场，但保留站位 | niulai-movie-style | Controlled primitive-3D reconstruction |
| 保留这只狗和客厅，用粗糙贴图、僵硬动作做成 5 秒短片 | niulai-movie-style | Source anchors plus awkward motion layer |
| 让这张街景看起来像低预算民间 CGI，不要恐怖 | niulai-movie-style | Full production-stack degradation |
| 把照片画成水彩海报 | preview-paint | Painted result, not primitive 3D |
| 给现有电影片段统一调色 | restyle-video | Existing video restyle |
| 生成一张全新的低多边形角色图 | create-character | No source-edit contract |

## Security review

- Secret and environment access: none retained.
- Remote domains and uploads: authorized source image and native routes only.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: only known terminal failure permits one materially revised retry.
- Unsafe or removed behavior: source model defaults, repeated blind retries, and source tool calls are removed.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate niulai-movie-style`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
