# External Skill intake: seedance-video-script

## Provenance

- Source: https://github.com/buluslan/seedance-video-script.git
- Source revision: ae7c78d9cb5365286bffb95510fe43eed5c6daba
- Author or organization: Buluu / 新西楼.AI
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, both READMEs, `SKILL.md`, all references, and scenario assets

## Permission decision

- License evidence: Repository-root MIT license verified at the pinned revision
- Required notices: Preserve the complete MIT notice if adapted material is packaged
- Material allowed to reuse: Workflow concepts, input fields, prompt checks, and reference-role concepts
- Material that must be independently authored: WeShop routing, provider limits, model policy, safety, and final prose
- Decision: Concepts only; do not copy provider-specific templates or volatile capability limits

## Product decomposition

- User-visible outcomes: Timed prompts and asset-upload order for generated or edited short video
- Required inputs: Task, scene intent, duration, ratio, authorized assets, and dialogue when applicable
- Optional inputs: Platform, style, audio, camera, and reference roles
- External AI operations: Final video generation or edit
- Deterministic operations: Intent audit, asset-role assignment, timed shot planning, prompt compilation, and conflict checks
- State, chaining, polling, and publication: Existing video Atoms own durable submission and polling; no publication
- Preservation and quality claims: Reference identity, requested timing, one dominant action/move per shot, and observable acceptance

## Package decision

- Existing Atom updates: None; `plan-film-storyboard` and `generate-video` already cover the stable behavior
- New Atom candidates: None
- Router compositions: Plan atomic shots, then generate or edit each accepted shot
- Rejected or unsupported behavior: Seedance 2.5 limits and syntax presented as universal facts, platform-specific upload rules, and prompt-only completion claims
- Promotion decision and rationale: Intake complete without package change; stable concepts are already present and volatile platform claims would reduce reliability

## Security review

- Secret and environment access: No upstream credential flow retained
- Remote domains and uploads: Only user-authorized media may be uploaded through existing WeShop routes
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: Existing terminal polling and non-identical bounded retry policy applies
- Unsafe or removed behavior: No automatic upload, publication, or unverified provider capability claim

## Validation evidence

- Official WeShop schema checked: Existing storyboard and video route boundaries reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Not required because no installable adaptation was made
