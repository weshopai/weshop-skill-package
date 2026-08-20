# External Skill intake: paper-to-storyboard

## Provenance

- Source: https://github.com/MaoranSun/paper-to-storyboard.git
- Source revision: 4f5d97513931f5cfffccd377b923dd08050cf3cb
- Author or organization: Maoran Sun
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: License, README, Skill, extraction/render scripts, schema, templates, palettes, dependencies, and example-site inventory

## Permission decision

- License evidence: Repository-root MIT license verified
- Required notices: Required if application code is packaged
- Material allowed to reuse: Source-trace and exact-data concepts
- Material that must be independently authored: Any PDF-to-site application and UI
- Decision: No reuse; this is a website generator outside the package

## Product decomposition

- User-visible outcomes: Academic PDF converted to a scrollytelling website
- Required inputs: PDF and output directory
- Optional inputs: Palette, mode, typography, and generated cover
- External AI operations: Optional cover image generation
- Deterministic operations: PDF extraction, figure processing, schema compilation, site render, and preview
- State, chaining, polling, and publication: Local site artifacts; no publication
- Preservation and quality claims: Citation/data fidelity, figure trace, responsive readability, and working page

## Package decision

- Existing Atom updates: None
- New Atom candidates: None
- Router compositions: Not applicable
- Rejected or unsupported behavior: Bundled PDF/site application, fixed nine-slot chassis, dependency install, API-key cover script, and mandatory model upsell
- Promotion decision and rationale: Intake complete; outcome belongs to document/frontend tooling outside creative-media Atoms

## Security review

- Secret and environment access: Upstream optional OpenAI key flow not retained
- Remote domains and uploads: No paper upload or publication authorized
- Installation and executable code: Install/script/template stack not executed or copied
- Retry and provider-spend behavior: No cover generation run
- Unsafe or removed behavior: Automatic dependency installation and unsupported data extraction claims

## Validation evidence

- Official WeShop schema checked: Package scope reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static integration validation pending
- Attribution packaged: Not required
