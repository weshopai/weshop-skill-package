# External Skill intake: ai-visual-director

## Provenance

- Source: https://github.com/jijiutong/ai-visual-director
- Source revision: b47f664ca00c50539c5365109e9360f82170972d
- Author or organization: AI Visual Director Contributors
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, root `SKILL.md`, and character, scene, source, style, storyboard, poster, and video subskill entrypoints

## Permission decision

- License evidence: Repository-root MIT license, copyright 2026 AI Visual Director Contributors
- Required notices: Required only if adapted material is packaged; no direct prose/code copy planned
- Material allowed to reuse: Scene anchors, draft/lock/commit stages, continuity checks, and structured production handoffs
- Material that must be independently authored: WeShop routes, Router composition, product boundaries, and provider execution
- Decision: Use as design evidence for Router composition; reject promotion of another broad visual-director Skill

## Product decomposition

- User-visible outcomes: A broad story-to-production package spanning characters, scenes, storyboard, images, posters, and video
- Required inputs: Story/source and production goal
- Optional inputs: Style, character references, scene references, formats, and provider choices
- External AI operations: Multiple image and video generations
- Deterministic operations: Source analysis, asset manifests, anchor sheets, prompt plans, state transitions, and QA
- State, chaining, polling, and publication: Draft → locked → committed artifacts across production stages
- Preservation and quality claims: Character, scene, style, narrative, and prompt continuity

## Package decision

- Existing Atom updates: No direct change in this batch; existing Atom contracts already preserve explicit references and acceptance
- New Atom candidates: None
- Router compositions: Story planning → character/scene references → storyboard → image/video generation → layout/editing
- Rejected or unsupported behavior: A second broad Router, provider-independent calls without verified schemas, and monolithic production execution
- Promotion decision and rationale: Intake-only. The package already separates these outcomes into narrower Atoms and one adaptive Router

## Security review

- Secret and environment access: No upstream secret workflow retained
- Remote domains and uploads: Existing Atoms govern authorized WeShop uploads
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: Existing durable-key and error-responsive retry policy remains authoritative
- Unsafe or removed behavior: Reject hidden state mutation, unverified provider abstraction, and automatic cross-stage spend

## Validation evidence

- Official WeShop schema checked: Existing Router and relevant character, comic, image, poster, and video Atom contracts reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Accepted as Router design evidence; no installable source-derived material promoted
- Attribution packaged: Not required because no upstream material is packaged; provenance remains in this intake
