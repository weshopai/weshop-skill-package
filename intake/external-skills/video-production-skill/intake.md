# External Skill intake: video-production-skill

## Provenance

- Source: https://github.com/Aaryan-Kapoor/video-production-skill
- Source revision: 662738c012174788d860fdee9627239e23cffef6
- Author or organization: Aaryan Kapoor
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, `README.md`, `skills/video-production/SKILL.md`, changelog, install, contribution, and security docs

## Permission decision

- License evidence: Repository-root MIT license verified at the pinned revision
- Required notices: Preserve the complete MIT notice wherever adapted material is packaged
- Material allowed to reuse: Product workflow, artifact fields, and quality checks under MIT
- Material that must be independently authored: WeShop route, package boundary, security model, and final Skill prose
- Decision: Adapt concepts only; do not copy executable code or showcase assets

## Product decomposition

- User-visible outcomes: A broad narrated-video production pipeline spanning research, scripting, graphics, TTS, rendering, hosting, and archive
- Required inputs: User source material, desired result, fixed assets/facts, and delivery constraints
- Optional inputs: References, style, duration, ratio, language, and production context
- External AI operations: Optional TTS/media generation and local Manim/ffmpeg tools
- Deterministic operations: Input audit, structured plan, state/timing checks, output validation, and issue-local repair
- State, chaining, polling, and publication: Explicit artifacts; paid nodes use durable keys and terminal polling; no automatic publication
- Preservation and quality claims: Fixed inputs, exact scope, technical validity, and observable acceptance

## Package decision

- Existing Atom updates: No new broad Atom; map to `make-explainer-video`, `make-product-commercial`, `make-podcast-video`, `plan-film-storyboard`, and Router composition
- New Atom candidates: None unless explicitly named above
- Router compositions: Use existing narrow planning, media, editing, and assembly Atoms
- Rejected or unsupported behavior: Automatic dependency install, TTS assumptions, local/Tailscale hosting, archival side effects, and a duplicate monolithic orchestrator
- Promotion decision and rationale: No new broad Atom; map to `make-explainer-video`, `make-product-commercial`, `make-podcast-video`, `plan-film-storyboard`, and Router composition

## Security review

- Secret and environment access: Upstream credentials are not retained
- Remote domains and uploads: Authorized assets use existing WeShop routes only
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: No blind duplicate submission, identical retry, or silent downgrade
- Unsafe or removed behavior: Automatic dependency install, TTS assumptions, local/Tailscale hosting, archival side effects, and a duplicate monolithic orchestrator

## Validation evidence

- Official WeShop schema checked: Relevant package routes and deterministic-operation boundary reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Required for promoted adaptations; intake-only outcomes keep provenance here
