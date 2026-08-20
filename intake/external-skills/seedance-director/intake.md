# External Skill intake: seedance-director

## Provenance

- Source: https://github.com/crowscc/seedance-director
- Source revision: 2f0525b3be9b45d5ef2d5d67568b1c6cd562a1c9
- Author or organization: seedance-director contributors
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, both READMEs, root Skill, and bundled visual workflow assets

## Permission decision

- License evidence: Repository-root MIT license verified at the pinned revision
- Required notices: Preserve the complete MIT notice wherever adapted material is packaged
- Material allowed to reuse: Product workflow, artifact fields, and quality checks under MIT
- Material that must be independently authored: WeShop route, package boundary, security model, and final Skill prose
- Decision: Adapt concepts only; do not copy executable code or showcase assets

## Product decomposition

- User-visible outcomes: A script-to-Seedance plan with optional character/scene/keyframe assets and video prompts
- Required inputs: User source material, desired result, fixed assets/facts, and delivery constraints
- Optional inputs: References, style, duration, ratio, language, and production context
- External AI operations: Image reference generation plus video generation
- Deterministic operations: Input audit, structured plan, state/timing checks, output validation, and issue-local repair
- State, chaining, polling, and publication: Explicit artifacts; paid nodes use durable keys and terminal polling; no automatic publication
- Preservation and quality claims: Fixed inputs, exact scope, technical validity, and observable acceptance

## Package decision

- Existing Atom updates: Merge visible-asset, missing-asset, and prompt-handoff checks into `plan-film-storyboard` and existing video Atoms
- New Atom candidates: None unless explicitly named above
- Router compositions: Use existing narrow planning, media, editing, and assembly Atoms
- Rejected or unsupported behavior: Provider-specific Seedance syntax, forced question UI/subagents, full-frame default spend, and duplicate orchestration
- Promotion decision and rationale: Merge visible-asset, missing-asset, and prompt-handoff checks into `plan-film-storyboard` and existing video Atoms

## Security review

- Secret and environment access: Upstream credentials are not retained
- Remote domains and uploads: Authorized assets use existing WeShop routes only
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: No blind duplicate submission, identical retry, or silent downgrade
- Unsafe or removed behavior: Provider-specific Seedance syntax, forced question UI/subagents, full-frame default spend, and duplicate orchestration

## Validation evidence

- Official WeShop schema checked: Relevant package routes and deterministic-operation boundary reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Required for promoted adaptations; intake-only outcomes keep provenance here
