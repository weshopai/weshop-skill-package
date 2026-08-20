# External Skill intake: brand-promo-video-generator

## Provenance

- Source: Local MiniMax Skill package at `/Users/jasonjiang/Downloads/minimax skill/brand-promo-video-generator`
- Source revision: Content fingerprint `sha256:0a35646832654eb7a90d9039cbb709efee0962edfae5f88be1e71b019438d4f9`
- Author or organization: MiniMax Design (`exported-by: MiniMax-hub`, `source: official-featured` in supplied metadata)
- Reviewed date: 2026-08-20
- Files inspected: `SKILL.md` and `meta.yaml`

## Product decomposition

- User-visible outcomes: One short promotional video for a brand, product, website, app, shop, or project, with verified assets, campaign direction, timed beats, audio, assembly, and delivery review
- Required inputs: Campaign goal, audience, duration, ratio, official or user-authorized brand/product facts and identity-bearing assets
- Optional inputs: Website, UI/product imagery, footage, typography, colors, narration, copy, CTA, disclaimers, voice, music, and distribution channel
- External AI operations: Generate non-identity imagery or motion plates, create atomic video shots, and optionally create separately authorized audio
- Deterministic operations: Source/provenance manifest, brand truth and claim ledger, timed treatment, exact-copy/end-card preparation, timeline assembly, captions/mix, and final inspection
- State, chaining, polling, and publication: Approve treatment before paid runs; stable operation key per asset/shot; terminal polling and output inspection; assemble accepted assets only; user controls publication
- Preservation and quality claims: Exact logo/UI/product geometry and copy, truthful claims, asset authorization, readable CTA, duration, ratio, language, audio clarity, and no fabricated identity evidence

## Package decision

- Intake result: Keep as an independent complete-outcome Skill candidate
- Proposed standalone Atom: `brand-promo-video-generator`
- Router compositions: `make-product-commercial` owns product/brand promos whose truthful product benefit drives the story; use `make-explainer-video` for a source-backed narrated explanation, `generate-video` for one generic promo shot, and `combine-videos` for editing-only requests
- Rejected or unsupported behavior: Unverified identity recreation, invented claims, assumed audio capability, unverified universal model defaults, automatic publication, and implicit external-state mutation
- Promotion decision and rationale: Promoted as standalone `skills/brand-promo-video-generator` because a brand/app/shop/site promotion has a broader campaign and identity-manifest outcome than a product-benefit commercial; similarity does not require fusion

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `make-product-commercial` | 0.86 | Short promotional video, verified claims/assets, shot plan, generation, assembly, CTA | The campaign promotes a brand, app, website, shop, service, or mixed brand system and requires a brand truth/provenance manifest | One supplied physical/digital product and its truthful benefit causally drive a 5–30 second advertisement | May use product-commercial shots as one campaign segment |
| `make-explainer-video` | 0.58 | Research, script, timed visuals, narration, assembly | The primary goal is campaign promotion and CTA | The primary goal is source-backed education or explanation | A verified explainer segment may feed the promo edit |
| `generate-video` | 0.49 | Generative promotional footage | The deliverable is a multi-beat finished campaign short | The request is one standalone promo shot | Calls it for atomic shots |
| `combine-videos` | 0.36 | Final video assembly | Asset truth, campaign direction, and generation are also needed | The user supplies all clips and asks only for ordered editing | Hands accepted assets to deterministic assembly |

- Proposed frontmatter distinction: Use for one complete brand/app/site/shop/service promotional short with a brand truth sheet and provenance manifest; unlike `make-product-commercial` (relationship 0.86), choose this when the campaign subject is the wider brand or digital/service experience rather than one product-benefit causal ad; choose `make-product-commercial` when one supplied product and claim own the story; the two can compose for a mixed campaign.
- Highest-risk ambiguity: “Product promo” may refer either to a product-benefit commercial or a broader launch/brand reel; score the campaign subject, proof type, and required manifest before format words.
- Router scoring evidence: `brand-promo-video-generator` wins for brand-system or digital/service campaign outcomes; `make-product-commercial` wins when one product and its truthful causal benefit dominate.

## Security review

- Secret and environment access: No source code was executed; WeShop credentials remain environment-only
- Remote domains and uploads: Research only official/user-authorized sources; upload authorized assets through existing WeShop routes; do not use the supplied cover URL as a production asset
- Installation and executable code: No upstream dependency, script, or package installation was requested or performed
- Retry and provider-spend behavior: Stable key per asset; inspect terminal output; one changed-prompt retry for the failing asset/shot; no blind multi-model or multi-version generation
- Unsafe or removed behavior: Logo/wordmark/UI/packaging imitation, invented claims or metrics, rights assumptions, unauthorized voice cloning, autonomous publishing, and platform-specific canvas/tool mandates

## Validation evidence

- Official WeShop schema checked: Current `make-product-commercial`, `make-explainer-video`, `generate-video`, and `combine-videos` contracts and current catalog-based video policy reviewed
- Representative execution: Not authorized or run; intake is static and does not imply paid generation
- Acceptance result: Promoted with explicit relationship scores, highest-intent-match routing boundaries, brand-truth/provenance contracts, durable operations, and final authenticity QC
- Source record packaged: `skills/brand-promo-video-generator/references/source-provenance.md`
