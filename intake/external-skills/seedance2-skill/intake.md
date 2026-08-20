# External Skill intake: seedance2-skill

## Provenance

- Source: https://github.com/zhanghaonan777/Seedance2-skill
- Source revision: 4ecc0046eee2c56d517fa9e4fbe802527d39ddb3
- Author or organization: Saul Goodman
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, `README.md`, `SKILL.md`, `SKILL_EN.md`, `reference.md`, and `scripts/seedance.py`

## Permission decision

- License evidence: Repository-root MIT license, copyright 2026 Saul Goodman
- Required notices: Preserve the complete MIT notice if adapted material is packaged
- Material allowed to reuse: Creative-direction checks, observable motion language, reference-role clarity, and image/prompt/camera compatibility
- Material that must be independently authored: WeShop route, fields, safety, retry policy, and package prose
- Decision: Adapt selected prompt checks; do not copy or execute the Volcengine client

## Product decomposition

- User-visible outcomes: One creative atomic video prompt and optionally one generated shot from text or authorized media
- Required inputs: Concept or source asset, action, duration, ratio, style, and sound preference
- Optional inputs: First/last frame, motion video, audio reference, dialogue, and fixed visual constraints
- External AI operations: Upstream Volcengine video generation; substitute existing WeShop video routes
- Deterministic operations: Asset diagnosis, direction selection, prompt compilation, and frame review
- State, chaining, polling, and publication: One durable operation per shot, terminal polling, no automatic publication
- Preservation and quality claims: Reference identity, one observable action, compatible camera movement, duration, ratio, sound, and memorable visual change

## Package decision

- Existing Atom updates: Add concise creative and reference-compatibility gates to `generate-video`
- New Atom candidates: None
- Router compositions: Use `animate-image` for one supplied still and `make-product-commercial` for complete advertisements
- Rejected or unsupported behavior: Volcengine credentials/script, trend scraping, callbacks, blind fallback, and claimed fixed platform limits
- Promotion decision and rationale: Merge into `generate-video`; the user result is already one generated video shot

## Security review

- Secret and environment access: Upstream `ARK_API_KEY` workflow is not retained
- Remote domains and uploads: Authorized inputs use WeShop only
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: Keep package durable-key, terminal-poll, and error-responsive retry rules
- Unsafe or removed behavior: Remove silent downgrade, arbitrary callbacks, destructive task management, and unverified current-spec claims

## Validation evidence

- Official WeShop schema checked: Existing video catalog and `generate-video` contract checked
- Representative execution: Not authorized or not run
- Acceptance result: Existing Atom update validation pending
- Attribution packaged: Required in `generate-video`
