# External Skill intake: color-grade-ai

## Provenance

- Source: https://github.com/isaacrowntree/color-grade-ai
- Source revision: a6eef94e0d773b1a9475cd9bac8bc15bc3944f46
- Author or organization: Isaac Rowntree
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, `README.md`, `SKILL.md`, LUT/preset manifests, grading scripts, preview, metrics, and tests

## Permission decision

- License evidence: Repository-root MIT license verified at the pinned revision
- Required notices: Preserve the complete MIT notice wherever adapted material is packaged
- Material allowed to reuse: Product workflow, artifact fields, and quality checks under MIT
- Material that must be independently authored: WeShop route, package boundary, security model, and final Skill prose
- Decision: Adapt concepts only; do not copy executable code or showcase assets

## Product decomposition

- User-visible outcomes: Measured footage analysis, shot matching, correction LUT output, or a corrected video export
- Required inputs: User source material, desired result, fixed assets/facts, and delivery constraints
- Optional inputs: References, style, duration, ratio, language, and production context
- External AI operations: No generative AI required; deterministic color science and ffmpeg/LUT application
- Deterministic operations: Input audit, structured plan, state/timing checks, output validation, and issue-local repair
- State, chaining, polling, and publication: Explicit artifacts; paid nodes use durable keys and terminal polling; no automatic publication
- Preservation and quality claims: Fixed inputs, exact scope, technical validity, and observable acceptance

## Package decision

- Existing Atom updates: Update `correct-video-color` with transfer-curve detection, ambiguity gate, measured correction, shot matching, and LUT/export validation
- New Atom candidates: None unless explicitly named above
- Router compositions: Use existing narrow planning, media, editing, and assembly Atoms
- Rejected or unsupported behavior: Copying preset LUT binaries/code, assuming Rec.709 before conversion, hardware-specific encoders, fixed universal skin/exposure targets, and destructive source overwrite
- Promotion decision and rationale: Update `correct-video-color` with transfer-curve detection, ambiguity gate, measured correction, shot matching, and LUT/export validation

## Security review

- Secret and environment access: Upstream credentials are not retained
- Remote domains and uploads: Authorized assets use existing WeShop routes only
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: No blind duplicate submission, identical retry, or silent downgrade
- Unsafe or removed behavior: Copying preset LUT binaries/code, assuming Rec.709 before conversion, hardware-specific encoders, fixed universal skin/exposure targets, and destructive source overwrite

## Validation evidence

- Official WeShop schema checked: Relevant package routes and deterministic-operation boundary reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Required for promoted adaptations; intake-only outcomes keep provenance here
