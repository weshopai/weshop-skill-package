# External Skill intake: suspense-title-sequence-generator

## Provenance

- Source: /Users/jasonjiang/Downloads/minimax skill/suspense-title-sequence-generator
- Source revision: sha256:394a6e70659dd7bca8e839db60cfa6b6f563bad859b0ca50bfb09a5c9deda161 (SKILL.md); sha256:eae31ab4b483014c589a830eb2d375356c9b912f4c518351ebd4f223f6c28bee (meta.yaml)
- Author or organization: MiniMax Design (`official-featured` export)
- Reviewed date: 2026-08-21
- Files inspected: `SKILL.md`, `meta.yaml` (both files in the supplied export)

## Product decomposition

- User-visible outcomes: A 15-second pop-art suspense title sequence, six approved visual anchors, exact supplied title/credits, and a final motion-graphics video
- Required inputs: Film type, title, logline, cast, authorized references, and exact supplied credit names/roles
- Optional inputs: Director/editor/creator/production-design credits and style references
- External AI operations: Six text-safe keyframe images and one reference-led title-sequence video
- Deterministic operations: Reference-role classification, copy/credit ledger, keyframe approval, exact-copy finishing, QC
- State, chaining, polling, and publication: Confirm film data then keyframes before paid work; stable key per keyframe/video; terminal polling; user publishes
- Preservation and quality claims: Exact supplied copy only, readable English text, no invented credits, six-shot structure, graphic suspense style and source-reference identity cues

## Package decision

- Intake result: Standalone Atom candidate
- Proposed standalone Atom: `suspense-title-sequence-generator`
- Router compositions: Owns this six-anchor suspense pop-art title package; may use a text-safe image route for anchors, `generate-video` for motion, and deterministic finishing for exact credits
- Rejected or unsupported behavior: Default fictional credits, hard-coded title/shot template, unverified H3 route/audio, source Canvas tools, generic copying of a named title style, and automatic publication
- Promotion decision and rationale: The six-keyframe, supplied-credit, suspense pop-art title-package contract is a separate outcome. Retain it as an independent candidate despite adjacency to the earlier title-sequence candidate; promotion remains pending verification.

## Similar Skill boundaries

Complete one row for every materially similar or adjacent installed Skill. Similar Skills remain independent.

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `make-cinematic-title-sequence` (candidate) | 0.95 | Film title/credit sequence | The request specifies this suspense pop-art, six-graphic-anchor, credit-led package | The request is a different cinematic title/credit sequence | Independent candidates may share only accepted intermediate artifacts |
| `make-video-intro` | 0.61 | Short title/opening | A multi-shot film-title package and supplied credits are required | A reusable branded opening sting is requested | Intro may precede content |
| `make-kinetic-typography` | 0.59 | Exact animated type | Title sequence includes visual narrative/anchors | Typography alone is the deliverable | Deterministic text treatment |
| `generate-video` | 0.42 | One generated video shot | Finished sequence owns keyframes/copy/QC | One visual shot is requested | Final motion handoff |

- Proposed frontmatter distinction: Use for a six-anchor suspense pop-art film title package with user-supplied credits only; unlike `make-cinematic-title-sequence` (0.95), choose it when this fixed visual/approval structure is the requested outcome.
- Highest-risk ambiguity: “Title sequence” can mean a reusable brand intro, pure motion typography, or a film-specific credit package.
- Router scoring evidence: Six-keyframe approval, suspense pop-art graphics, and supplied credit ledger select this candidate; different film-title grammar selects the adjacent candidate.

## Security review

- Secret and environment access: No source code ran; credentials remain environment-only.
- Remote domains and uploads: Use authorized references and current WeShop uploads only; ignore source cover media.
- Installation and executable code: No Hub/Canvas binding, dependency, or source file adopted.
- Retry and provider-spend behavior: Stable keys for six anchors and final video; no blind replacement after unknown submission.
- Unsafe or removed behavior: Invented credits/names, garbled text acceptance, copying existing IP/title sequence frames, assumed BGM capability, and auto publication.

## Validation evidence

- Official WeShop schema checked: Existing cinematic-title-sequence intake, `make-video-intro`, `make-kinetic-typography`, `generate-video`, and Router model policy reviewed.
- Representative execution: Not authorized or not run
- Acceptance result: Promoted as an independent Atom; static route verification passed. Representative paid execution remains unrun and does not imply a capability guarantee.
- Source record packaged: `skills/suspense-title-sequence-generator/references/source-provenance.md`
