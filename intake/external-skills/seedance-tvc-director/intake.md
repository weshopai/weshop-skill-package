# External Skill intake: seedance-tvc-director

## Provenance

- Source: https://github.com/nutllwhy/seedance-tvc-director
- Source revision: 9fef40f955f476551eb7e6fc5a7355f7dbc44181
- Author or organization: nutllwhy
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, `README.md`, `seedance-tvc-director/SKILL.md`, and bundled TVC planning, casting, product-action, prompting, delivery, and review references

## Permission decision

- License evidence: Repository-root MIT license, copyright 2026 nutllwhy
- Required notices: Preserve the complete MIT notice in an adapted Skill
- Material allowed to reuse: Brief structure, causal product role, hook, scene progression, casting continuity, product-action and sensory-evidence checks
- Material that must be independently authored: WeShop model routing, request fields, polling, retry policy, and Atom schema
- Decision: Adapt the product-commercial directing logic into a WeShop-native outcome Atom

## Product decomposition

- User-visible outcomes: One coherent short product commercial, with a locked treatment and shot plan
- Required inputs: Product, audience, promise, duration, ratio, market, and required product facts
- Optional inputs: Product images, brand rules, cast, voiceover, CTA, music/sound, first/last frames, and alternate cut
- External AI operations: Generate source assets when missing, generate one or more shots, and assemble only when the requested commercial needs multiple clips
- Deterministic operations: Brief lock, duration budget, shot list, exact-copy/claim ledger, continuity checks, and final inspection
- State, chaining, polling, and publication: Approve treatment before paid runs; stable operation per shot; terminal poll; assemble accepted shots; user controls publication
- Preservation and quality claims: Product geometry/label/color, causal product role, cast identity, screen direction, duration, ratio, audible/visible claim accuracy, and CTA legibility

## Package decision

- Existing Atom updates: None; general video generation owns one shot, not a complete commercial
- New Atom candidates: `make-product-commercial`
- Router compositions: Product asset preparation → per-shot generation → `combine-videos` when required → final QA
- Rejected or unsupported behavior: Provider-specific Seedance syntax, trademark invention, unsafe product claims, and automatic identical retries
- Promotion decision and rationale: Promote a commercial-specific Atom because product truth, claims, duration budgeting, and cross-shot continuity require one owner

## Security review

- Secret and environment access: WeShop key remains environment-only
- Remote domains and uploads: Authorized product/reference assets upload only to WeShop
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: One durable key per shot; retry only failed or rejected shots with a changed prompt; no silent model downgrade
- Unsafe or removed behavior: Remove unsupported claim invention, autonomous publication, and blind multi-version generation

## Validation evidence

- Official WeShop schema checked: Current package video catalog and existing generation/assembly contracts reviewed
- Representative execution: Not authorized or not run
- Acceptance result: Static promotion validation pending
- Attribution packaged: Planned in `skills/make-product-commercial/references/source-attribution.md`
