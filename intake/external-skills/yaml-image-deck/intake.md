# External Skill intake: yaml-image-deck

## Provenance

- Source: https://github.com/mathruffian-dot/yaml-image-deck.git
- Source revision: 8fd0e1ef81f10e43ba3677eb41410a316501d244
- Author or organization: 三師爸 Sense Bar / mathruffian-dot
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: Root `LICENSE` and README; Skill, schema, prompt, layout, batching and validation references; YAML template and validation scripts

## Permission decision

- License evidence: Repository-root MIT license verified at the pinned revision
- Required notices: Preserve the complete MIT notice with the adapted Atom
- Material allowed to reuse: Image-first deck workflow, design-contract concept, layout routing, golden-sample lock, and page validation ideas
- Material that must be independently authored: WeShop routing, model policy, output contract, safety, and prose
- Decision: Adapt stable workflow concepts into a narrow WeShop Atom; do not copy scripts or templates

## Product decomposition

- User-visible outcomes: A consistent image-first presentation with inspectable slide images and an editable deck package when requested
- Required inputs: Communication goal, audience, source content, slide count or scope, ratio, and output mode
- Optional inputs: Brand/style references, exact text, layout preferences, editable-text requirement, and golden sample
- External AI operations: One image generation operation per visual slide
- Deterministic operations: Content decomposition, slide manifest, layout assignment, text/data verification, montage inspection, and deck packaging
- State, chaining, polling, and publication: Stable page IDs and durable operation keys; package only after terminal results and inspection; no publication
- Preservation and quality claims: Exact facts/text where required, safe area, visual consistency, complete cardinality, and editable native data when precision matters

## Package decision

- Existing Atom updates: None
- New Atom candidates: Add `create-image-deck`
- Router compositions: Optional research/analysis, per-slide image generation, deterministic deck packaging
- Rejected or unsupported behavior: Mandatory Traditional Chinese rounded font, Windows-only commands, automatic subagent spawning, and treating generated text/charts as exact
- Promotion decision and rationale: Promote one outcome-focused Atom because no existing Skill owns multi-slide image-deck planning, generation, inspection, and packaging

## Security review

- Secret and environment access: No API key required by the adapted contract
- Remote domains and uploads: Only authorized source/reference assets may be sent to selected image generation
- Installation and executable code: Upstream scripts/templates were not copied or executed
- Retry and provider-spend behavior: One page per operation, terminal polling, issue-specific bounded repair, no silent downgrade
- Unsafe or removed behavior: No automatic parallel agents, publication, or false editable/exactness claim

## Validation evidence

- Official WeShop schema checked: Image generation and deterministic packaging boundaries reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Complete MIT notice added to the promoted Atom
