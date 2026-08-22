# External Skill intake: fpv-tour-video-generator

## Provenance

- Source: /Users/jasonjiang/Downloads/minimax skill/fpv-tour-video-generator
- Source revision: sha256:9f6fb1d9b356b6e5706422b9bbad24b16202ade2cc91c2b5f316b18693493248 (SKILL.md); sha256:1c19f4cbdd712b4ec325e24cfc4a6039b61c11c4f952ad0ba09f36f9cfa1ed37 (meta.yaml)
- Author or organization: MiniMax Design (`official-featured` export)
- Reviewed date: 2026-08-21
- Files inspected: `SKILL.md`, `meta.yaml` (both files in the supplied export)

## Product decomposition

- User-visible outcomes: One continuous scene-first FPV flythrough, optionally with a character as the persistent route guide
- Required inputs: Authorized scene/subject image, duration, aspect ratio, and must-show route landmarks
- Optional inputs: Character/multi-angle images, motion reference, route preset, difficulty, and platform
- External AI operations: One or more atomic reference-led video shots
- Deterministic operations: Asset-role analysis, route/storyboard, segment continuity plan, assembly, and frame review
- State, chaining, polling, and publication: Require route approval before paid work; preserve one operation key per segment, poll terminal output, assemble accepted segments only; no automatic publication
- Preservation and quality claims: Scene governs world/look; character supplies identity only; continuous direction, visible guide, spatially plausible route, ratio and duration

## Package decision

- Intake result: Standalone Atom candidate
- Proposed standalone Atom: `fpv-tour-video-generator`
- Router compositions: Use `generate-video` for each atomic flight segment, `combine-videos` only for connected segments over the model limit, and `animate-image` for bounded motion from one still without a spatial tour
- Rejected or unsupported behavior: Source Hub tools/state, paper-airplane default without user consent, automatic platform selection, blind retries, and a guaranteed H3 default
- Promotion decision and rationale: An FPV one-take tour has a distinct spatial-route and continuity contract; do not promote until a live WeShop video route confirms the required reference and duration fields

## Similar Skill boundaries

Complete one row for every materially similar or adjacent installed Skill. Similar Skills remain independent.

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `generate-video` | 0.76 | Reference-led video motion | The final result is a spatial FPV route with continuous one-take flight rules | The request is one general shot without FPV route ownership | Generate atomic segments |
| `animate-image` | 0.48 | Animate an image | The user asks to traverse/showcase a space | The user wants bounded motion inside one supplied frame | Use only for a constrained insert |
| `combine-videos` | 0.36 | Multi-clip delivery | Route design and generation are required | All accepted clips are already supplied | Assemble connected segments |

- Proposed frontmatter distinction: Use for a continuous FPV flythrough of an authorized environment; not generic drone footage, montage, talking head, or static product ad.
- Highest-risk ambiguity: “Drone video” can mean a generic aerial shot rather than a single-take spatial traversal.
- Router scoring evidence: Spatial route, gaps/parallax, one-take continuity, and landmark coverage make this candidate win.

## Security review

- Secret and environment access: No source code was run; credentials remain environment-only.
- Remote domains and uploads: Use authorized assets and existing WeShop routes only; do not treat the source cover URL as an input.
- Installation and executable code: No dependency, tool binding, or source file is copied/executed.
- Retry and provider-spend behavior: Stable key per segment; terminal polling and no blind resubmission.
- Unsafe or removed behavior: Unsafe flight claims, impossible clipping, source-specific Hub/Canvas behavior, and automatic publication.

## Validation evidence

- Official WeShop schema checked: Current `generate-video`, `animate-image`, `combine-videos`, and Router video policy reviewed; no source model field adopted.
- Representative execution: Not authorized or not run
- Acceptance result: Promoted as an independent Atom; static route verification passed. Representative paid execution remains unrun and does not imply a capability guarantee.
- Source record packaged: `skills/fpv-tour-video-generator/references/source-provenance.md`
