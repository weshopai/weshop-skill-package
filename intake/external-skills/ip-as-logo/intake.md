# External Skill intake: ip-as-logo

## Provenance

- Source: https://github.com/s1dashu/ip-as-logo-skill
- Source revision: 88031b38854ebbcc41eb71ab6b169e9b1772e4fb
- Author or organization: s1dashu
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `SKILL.md`, `README.md`, `LICENSE`, repository tree; showcase asset filename reviewed but asset not copied

## Permission decision

- License evidence: Repository `LICENSE` at the pinned revision contains the MIT License, copyright 2026 s1dashu.
- Required notices: Preserve the copyright and MIT permission/warranty notice when identifiable source expression is adapted.
- Material allowed to reuse: Workflow concepts and instruction text under MIT, with attribution and modification disclosure.
- Material that must be independently authored: WeShop routing, OpenAPI fields, operation ledger, polling, acceptance, and retry behavior.
- Decision: Adapt the useful behavior into a native WeShop Atom and ship `references/source-attribution.md`; do not copy the showcase asset.

## Product decomposition

- User-visible outcomes: Three product-relevant mascot directions, followed by separately labeled square mascot-logo candidates with a strict simple-shape and color contract.
- Required inputs: Product or brand purpose, audience, personality; an explicit mascot subject may substitute for open subject discovery.
- Optional inputs: Subject, palette, candidate quantity, selected direction, corner, and supplied brand context.
- External AI operations: Independent square image generations; the upstream skill delegates to any configured image generator.
- Deterministic operations: Read-only product-context discovery, direction labeling, prompt compilation, result labeling, and receipt reporting.
- State, chaining, polling, and publication: Upstream proposes six images and preserves all results but has no durable execution ledger or provider-specific polling contract.
- Preservation and quality claims: Roughly 4–7 large shapes, two mascot color families plus one solid background, rounded silhouette, paired features visible, 75–85% corner crop, recognizable at small size.

## Package decision

- Existing Atom updates: Keep `create-logo` focused on one selected general symbol, wordmark, monogram, or lockup.
- New Atom candidates: `create-mascot-logo`, because it owns a distinct discovery, batch, composition, and acceptance contract.
- Router compositions: Route mascot/IP-logo requests directly to the new Atom; no multi-Atom DAG is required.
- Rejected or unsupported behavior: Do not inherit provider-agnostic tool selection, automatic subagent fan-out, approximate 1536 px promises, or uninspected one-pass delivery as execution policy.
- Promotion decision and rationale: Promote as `create-mascot-logo`; it is meaningfully narrower than general logo or character creation and maps to the existing `gpt-image` route.

## Security review

- Secret and environment access: Upstream contains no secret access. Native execution uses environment-only `WESHOP_API_KEY`.
- Remote domains and uploads: Upstream README links GitHub and ipaslogo.com; the promoted Atom uploads no assets outside `https://openapi.weshop.ai`.
- Installation and executable code: No upstream scripts or dependencies; no remote code is copied or executed.
- Retry and provider-spend behavior: Replace provider-agnostic batch fan-out with one stable operation key per candidate, terminal polling, and no blind resubmission. User-requested replacements use new linked keys.
- Unsafe or removed behavior: Remove implicit parallel/subagent spending, generic generator fallback, and claims that every stochastic return should bypass observable acceptance reporting.

## Validation evidence

- Official WeShop schema checked: Existing package `gpt-image` v1.0 contract and `models/catalog.json` route reused; no new Agent or model schema introduced.
- Representative execution: Not run; this intake did not include separate authorization for a paid six-candidate generation.
- Acceptance result: Static contract, Skill quick validation, repository gates, and generated website catalog required before promotion is complete.
- Attribution packaged: `skills/create-mascot-logo/references/source-attribution.md`.
