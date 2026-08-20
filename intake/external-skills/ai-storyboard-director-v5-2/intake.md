# External Skill intake: ai-storyboard-director-v5-2

## Provenance

- Source: https://github.com/62656456/ai-storyboard-director-v5.2.git
- Source revision: a8d9ad6362ed38d76857199cb9ba92956f87ae5d
- Author or organization: 62656456
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: License, root/package READMEs, full/edited single-file manifests, Skill archive inventory, and visual assets inventory

## Permission decision

- License evidence: Repository-root MIT license verified
- Required notices: Complete MIT notice merged into adapted Atom
- Material allowed to reuse: Design-pass, motif, spatial-power, non-default-choice, editorial-motivation concepts
- Material that must be independently authored: WeShop schema, routes, safety, and prose
- Decision: Adapt selected planning concepts; do not copy archive, manifests, or assets

## Product decomposition

- User-visible outcomes: Human-reviewable storyboard design followed by machine-executable shot manifest
- Required inputs: Script/source, duration, ratio, production mode, and fixed facts
- Optional inputs: Style, motifs, assets, and allowed adaptation level
- External AI operations: Optional downstream video generation
- Deterministic operations: Fact extraction, concept pass, shot decomposition, continuity, and review
- State, chaining, polling, and publication: Planning artifacts only; downstream Atoms own media state
- Preservation and quality claims: Source trace, atomic shots, motivated edits, continuity, and executable physical facts

## Package decision

- Existing Atom updates: Enhance `plan-film-storyboard`
- New Atom candidates: None
- Router compositions: Plan then generate accepted atomic shots
- Rejected or unsupported behavior: Duplicate versioned Skill, copied large prompt manifests/archive/assets, and provider-specific prompt conversion
- Promotion decision and rationale: Merge the missing design-pass and editorial-motivation layer into the existing storyboard Atom

## Security review

- Secret and environment access: None
- Remote domains and uploads: Downstream authorized references only
- Installation and executable code: Skill archive not installed or copied
- Retry and provider-spend behavior: No paid operation in planning
- Unsafe or removed behavior: Automatic generation and unapproved story changes

## Validation evidence

- Official WeShop schema checked: Existing storyboard boundary reviewed
- Representative execution: Not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Complete
