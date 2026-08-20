# External Skill intake: xhs-visual-director

## Provenance

- Source: https://github.com/ziguishian/xhs-visual-director-skill
- Source revision: 5c730c688f2c7e64f798d611608997ffba43813d
- Author or organization: ziguishian
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, `README.md`, `skill/SKILL.md`, and bundled workflow references

## Permission decision

- License evidence: Repository-root MIT license, copyright 2026 ziguishian
- Required notices: Preserve the complete MIT notice in any adapted installable Skill
- Material allowed to reuse: Workflow concepts, page-plan fields, consistency checks, and prompt patterns under MIT
- Material that must be independently authored: WeShop routes, execution safety, package schema, and product boundary
- Decision: Adapt the carousel-specific workflow; do not copy repository prose or assets wholesale

## Product decomposition

- User-visible outcomes: A visually consistent 6–8 page Xiaohongshu-style educational or promotional carousel, plus caption and tags
- Required inputs: Topic, audience, goal, page count or default, language, and platform
- Optional inputs: Brand assets, exact copy, reference style, CTA, palette, and image references
- External AI operations: Generate one approved visual master and one image per carousel page
- Deterministic operations: Discovery, copy outline, page numbering, exact-copy freeze, caption/tag drafting, and acceptance checklist
- State, chaining, polling, and publication: Approve the visual master before page generation; use one durable operation per page; publication remains user-controlled
- Preservation and quality claims: Stable layout system, palette, typography intent, subject identity, 3:4 crop, mobile readability, and exact page count

## Package decision

- Existing Atom updates: None; posters and photo collages do not own ordered multi-page social carousels
- New Atom candidates: `create-social-carousel`
- Router compositions: Optional upstream brand/character asset creation; one carousel Atom owns planning and page generation
- Rejected or unsupported behavior: Autonomous publishing and undeclared parallel paid generation
- Promotion decision and rationale: Promote a platform-aware but reusable carousel Atom; use Xiaohongshu 3:4 defaults only for that placement

## Security review

- Secret and environment access: No upstream secret workflow retained; WeShop key remains environment-only
- Remote domains and uploads: Only user-supplied references are uploaded to WeShop when generation is authorized
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: One operation per page; retry only failed or rejected pages with a changed prompt
- Unsafe or removed behavior: Removed implicit publishing, blind batch fan-out, and unsupported typography guarantees

## Validation evidence

- Official WeShop schema checked: Package catalog route and GPT Image 2 field contract reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static promotion validation pending
- Attribution packaged: Planned in `skills/create-social-carousel/references/source-attribution.md`
