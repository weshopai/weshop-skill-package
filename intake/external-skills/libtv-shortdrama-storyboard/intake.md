# External Skill intake: libtv-shortdrama-storyboard

## Provenance

- Source: https://github.com/yanshangcha01/libtv-shortdrama-storyboard.git
- Source revision: 78326bdef885b501a63e520de06fbdd335966ee6
- Author or organization: LibTV Short-Drama Storyboard Contributors
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: License, README, Skill, agent workflow, prompts, architecture, templates, manifest example, and node script

## Permission decision

- License evidence: Repository-root MIT license verified
- Required notices: Required only if adapted material is packaged
- Material allowed to reuse: Approval-before-node and anchor-reference concepts
- Material that must be independently authored: WeShop routes, model selection, and prose
- Decision: No package change; stable safeguards already exist

## Product decomposition

- User-visible outcomes: Script analysis, anchors, storyboard, and unexecuted LibTV canvas nodes
- Required inputs: Script, project, ratio, and accepted revision
- Optional inputs: Assets, genre/style, and model availability
- External AI operations: Image/video nodes created but intentionally not run
- Deterministic operations: Script analysis, anchor/shot manifest, node creation, and linkage
- State, chaining, polling, and publication: Canvas node state; human starts paid generation
- Preservation and quality claims: Character/scene/prop anchoring, approved script, and reference connectivity

## Package decision

- Existing Atom updates: None; `plan-film-storyboard`, reference assets, Router approval, and durable runs cover stable behavior
- New Atom candidates: None
- Router compositions: Existing short-drama, storyboard, asset, and video Atoms
- Rejected or unsupported behavior: LibTV CLI, hard-coded models, copied node script/templates, and provider placeholder syntax
- Promotion decision and rationale: Intake complete without duplicate or provider-specific package changes

## Security review

- Secret and environment access: LibTV login flow not retained
- Remote domains and uploads: Existing WeShop authorized routes only
- Installation and executable code: Node script not executed or copied
- Retry and provider-spend behavior: Existing approval and durable-operation policy
- Unsafe or removed behavior: Automatic node generation/run and hard-coded paid model

## Validation evidence

- Official WeShop schema checked: Current Router/storyboard/reference boundary reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Not required
