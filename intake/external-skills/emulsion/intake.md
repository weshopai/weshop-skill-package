# External Skill intake: emulsion

## Provenance

- Source: https://github.com/dennisonbertram/emulsion.git
- Source revision: f28083faf1945975f96dea44f846ab3724ecb652
- Author or organization: Dennison Bertram
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, `README.md`, `SKILL.md`, browser/server source, QA/export scripts, and example scene data

## Permission decision

- License evidence: Repository-root MIT license verified at the pinned revision
- Required notices: Preserve complete MIT notice if source or adapted code is packaged
- Material allowed to reuse: Blocking concepts, scene-state fields, camera recipes, and verification ideas
- Material that must be independently authored: WeShop package behavior and any future implementation
- Decision: Review concepts only; do not copy or bundle the local web application

## Product decomposition

- User-visible outcomes: Interactive 3D shot blocking and an exported camera/motion reference clip
- Required inputs: Scene action, duration, blocking, camera intent, and set/character proxies
- Optional inputs: Saved sets, shots, assets, annotations, and camera keyframes
- External AI operations: Optional downstream video generation
- Deterministic operations: Local scene editing, state synchronization, playback, QA, and MP4 export
- State, chaining, polling, and publication: Local HTTP state bridge and persisted project files; upstream PR behavior is excluded
- Preservation and quality claims: Do not overwrite user edits; validate framing and motion before export

## Package decision

- Existing Atom updates: None
- New Atom candidates: None in this package; this is an application plus bridge, not a prompt-only creative Atom
- Router compositions: Its exported clip could feed `plan-film-storyboard` and `generate-video`
- Rejected or unsupported behavior: Bundled local server/UI, automatic browser opening, automatic upstream contribution, and environment-specific commands
- Promotion decision and rationale: Intake complete without package change because meaningful parity requires shipping and maintaining the companion application

## Security review

- Secret and environment access: No credentials required
- Remote domains and uploads: Localhost bridge only; downstream uploads require separate authorization
- Installation and executable code: Upstream Python/Node/browser code was inspected but not executed or copied
- Retry and provider-spend behavior: No paid operation retained
- Unsafe or removed behavior: Automatic GitHub fork/PR behavior and last-writer-wins remote mutation are excluded

## Validation evidence

- Official WeShop schema checked: Application boundary compared with current Atom contract
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Not required because no installable adaptation was made
