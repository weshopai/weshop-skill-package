# External Skill intake: music-video-director-skill

## Provenance

- Source: https://github.com/guigulaoshi/music-video-director-skill
- Source revision: 80651450ca45d7acf543a372d19f81a91f640966
- Author or organization: guigulaoshi
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, `README.md`, `skill.md`, Python package modules, tests, and EDL/audio/video validation logic

## Permission decision

- License evidence: Repository-root MIT license verified at the pinned revision
- Required notices: Preserve the complete MIT notice wherever adapted material is packaged
- Material allowed to reuse: Workflow concepts, artifact fields, validation checks, and product-specific sequencing
- Material that must be independently authored: WeShop routes, package boundary, execution safety, and final Skill prose
- Decision: Adapt concepts only; no upstream executable code or showcase asset is copied

## Product decomposition

- User-visible outcomes: One finished music video cut from supplied or authorized audio and footage, plus an EDL
- Required inputs: User source material, audience/goal, requested format, and fixed facts/assets
- Optional inputs: Style, duration, ratio, language, references, and production constraints
- External AI operations: No generative provider required; local analysis and ffmpeg rendering
- Deterministic operations: Brief/fact freeze, structured plan, timing/count checks, continuity, and acceptance report
- State, chaining, polling, and publication: Stage artifacts are explicit; paid nodes require durable keys and terminal polling; publication remains user-controlled
- Preservation and quality claims: Fixed facts/assets, exact scope, observable continuity, and stage-specific acceptance

## Package decision

- Existing Atom updates: Create `make-music-video` as a distinct edit-and-assembly outcome
- New Atom candidates: Only when explicitly named in the decision
- Router compositions: Planning output feeds existing narrow generation, editing, and assembly Atoms
- Rejected or unsupported behavior: Automatic package/shell-profile installation, unlicensed downloading, mandatory watermarking, brittle site assumptions, and arbitrary source-count quotas
- Promotion decision and rationale: Create `make-music-video` as a distinct edit-and-assembly outcome

## Security review

- Secret and environment access: Upstream credential/install behavior is not retained
- Remote domains and uploads: Authorized assets use existing WeShop routes only
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: No blind duplicate submission, identical retry, or silent downgrade
- Unsafe or removed behavior: Automatic package/shell-profile installation, unlicensed downloading, mandatory watermarking, brittle site assumptions, and arbitrary source-count quotas

## Validation evidence

- Official WeShop schema checked: Existing package planning and relevant media routes reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static promotion or integration validation pending
- Attribution packaged: Required for promoted adaptations; intake-only rejection keeps provenance here
