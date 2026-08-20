# External Skill intake: drama-skills

## Provenance

- Source: https://github.com/worldwonderer/drama-skills
- Source revision: 3b9f807cd384cd63324d0856d92950be4c95b40d
- Author or organization: drama-skills contributors
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, root documentation, and the ten short-drama analysis, development, writing, asset, prompt, storyboard, production, and review Skill entrypoints

## Permission decision

- License evidence: Repository-root MIT license, copyright 2026 drama-skills contributors
- Required notices: Preserve the complete MIT notice where adapted concepts are packaged
- Material allowed to reuse: Staged confirmation, continuity and provenance ledgers, adapter model, review gates, and handoff schemas
- Material that must be independently authored: WeShop route selection, Atom boundaries, prompts, and execution safety
- Decision: Adapt selected contracts; do not mirror the upstream ten-Skill hierarchy

## Product decomposition

- User-visible outcomes: End-to-end short-drama development from source analysis through scripts, asset briefs, storyboards, video prompts, production, and review
- Required inputs: Story source or premise and production constraints
- Optional inputs: Visual references, platform, model, episode subset, and production stage
- External AI operations: Character/scene image generation and video generation in production stages
- Deterministic operations: Source-fact ledger, confirmation gates, continuity updates, prompt manifests, and review reports
- State, chaining, polling, and publication: Staged artifacts with explicit acceptance between development, writing, visual planning, and generation
- Preservation and quality claims: Traceable source facts, stable characters/scenes, exact requested deliverables, and stage-specific QA

## Package decision

- Existing Atom updates: Feed stronger handoff contracts into Router composition
- New Atom candidates: Merge narrative core into `write-short-drama-series`; later candidates will determine whether a film-storyboard Atom is warranted
- Router compositions: `write-short-drama-series` → `character-reference-sheet` → storyboard/video planning → `generate-video` or narrower video Atoms
- Rejected or unsupported behavior: One monolithic installable workflow, provider-specific fan-out, automatic publication, and duplicating existing image/video Atoms
- Promotion decision and rationale: Absorb the useful staged contracts while keeping installable Atoms outcome-specific and independently callable

## Security review

- Secret and environment access: No upstream secret handling retained; WeShop key remains environment-only
- Remote domains and uploads: Only authorized assets go to WeShop in downstream generation Atoms
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: Router must use durable operation keys and retry only failed/rejected nodes
- Unsafe or removed behavior: Removed implicit workspace mutation and broad provider abstractions without verified fields

## Validation evidence

- Official WeShop schema checked: Existing character, image, and video routes reviewed; no new external execution wrapper promoted
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Planned in the merged short-drama Atom
