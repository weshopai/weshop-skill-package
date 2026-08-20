# External Skill intake: storyboard-director

## Provenance

- Source: https://github.com/kevinchin12/storyboard-director
- Source revision: 208782096ad7be19d609b4f3f70568507245ef30
- Author or organization: Storyboard Director contributors
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, `README.md`, root and four stage Skills, config/session contracts, scripts, integration notes, and asset/release validators

## Permission decision

- License evidence: Repository-root MIT license verified at the pinned revision
- Required notices: Preserve the complete MIT notice wherever adapted material is packaged
- Material allowed to reuse: Workflow concepts, artifact fields, validation checks, and product-specific sequencing
- Material that must be independently authored: WeShop routes, package boundary, execution safety, and final Skill prose
- Decision: Adapt concepts only; no upstream executable code or showcase asset is copied

## Product decomposition

- User-visible outcomes: A staged story-to-shot package with optional line-art review board and aggregate video prompts
- Required inputs: User source material, audience/goal, requested format, and fixed facts/assets
- Optional inputs: Style, duration, ratio, language, references, and production constraints
- External AI operations: Upstream uses image generation for per-shot line art and optional frames
- Deterministic operations: Brief/fact freeze, structured plan, timing/count checks, continuity, and acceptance report
- State, chaining, polling, and publication: Stage artifacts are explicit; paid nodes require durable keys and terminal polling; publication remains user-controlled
- Preservation and quality claims: Fixed facts/assets, exact scope, observable continuity, and stage-specific acceptance

## Package decision

- Existing Atom updates: Merge session/approval and text-self-contained prompt insights into `plan-film-storyboard`; compose existing image Atoms when images are explicitly requested
- New Atom candidates: Only when explicitly named in the decision
- Router compositions: Planning output feeds existing narrow generation, editing, and assembly Atoms
- Rejected or unsupported behavior: Upstream installer/state scripts, forced worker delegation, HTML session system, generated line-art dependencies in copy-ready prompts, and automatic batch spend
- Promotion decision and rationale: Merge session/approval and text-self-contained prompt insights into `plan-film-storyboard`; compose existing image Atoms when images are explicitly requested

## Security review

- Secret and environment access: Upstream credential/install behavior is not retained
- Remote domains and uploads: Authorized assets use existing WeShop routes only
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: No blind duplicate submission, identical retry, or silent downgrade
- Unsafe or removed behavior: Upstream installer/state scripts, forced worker delegation, HTML session system, generated line-art dependencies in copy-ready prompts, and automatic batch spend

## Validation evidence

- Official WeShop schema checked: Existing package planning and relevant media routes reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static promotion or integration validation pending
- Attribution packaged: Required for promoted adaptations; intake-only rejection keeps provenance here
