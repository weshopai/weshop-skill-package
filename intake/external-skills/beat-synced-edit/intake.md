# External Skill intake: beat-synced-edit

## Provenance

- Source: https://github.com/ZiadAbdelkarim/beat-synced-edit.git
- Source revision: 48c09c92ee69c2d89b7e44b146bbd7b9c26fff08
- Author or organization: Ziad Abdelkarim
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: Root license/README, Skill, Python pipeline, requirements, and example-media inventory

## Permission decision

- License evidence: Repository-root MIT license verified at the pinned revision
- Required notices: Complete MIT notice packaged
- Material allowed to reuse: Beat-map, clip-tag, EDL, effect restraint, and render-QC concepts
- Material that must be independently authored: WeShop contract, rights/safety, tooling policy, and prose
- Decision: Adapt concepts only; no source code, dependencies, or examples copied

## Product decomposition

- User-visible outcomes: Beat-synchronized edit of supplied visuals and music
- Required inputs: Authorized media, target duration/section, destination, and ratio
- Optional inputs: Must-use/exclude ranges, energy curve, crop, grade, and effects
- External AI operations: None
- Deterministic operations: Audio analysis, clip segmentation, EDL planning, rendering, and QC
- State, chaining, polling, and publication: Saved beat map/EDL; no publication
- Preservation and quality claims: Source integrity, A/V sync, beat rationale, safe crop/effects, and playable export

## Package decision

- Existing Atom updates: None
- New Atom candidates: Add `make-beat-synced-video`
- Router compositions: Optional upstream footage preparation; deterministic edit owns assembly
- Rejected or unsupported behavior: Copied Python tools, example media, dependency install, one-cut-per-beat default, and geometric squeezing
- Promotion decision and rationale: Promote a distinct deterministic editing outcome not owned by current Atoms

## Security review

- Secret and environment access: None
- Remote domains and uploads: No downloads; user supplies authorized files
- Installation and executable code: Upstream code not executed or copied
- Retry and provider-spend behavior: No paid generation
- Unsafe or removed behavior: Unlicensed downloads, unsafe strobing, and destructive source edits

## Validation evidence

- Official WeShop schema checked: Deterministic video boundary reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Complete
