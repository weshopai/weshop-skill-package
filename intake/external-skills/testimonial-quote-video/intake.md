# External Skill intake: testimonial-quote-video

- Mechanism version: 2
- Status: active

## Provenance

- Source: https://github.com/iart-ai/ad-video-skills
- Source revision: 0de0f2a1c1f42a98103fc0ec436509276428372c
- Author or organization: Upstream repository contributors
- Reviewed date: 2026-08-24
- Files inspected: README.md and the named upstream SKILL.md entrypoint
- License: MIT declared at repository root

## Product decomposition

- User-visible outcomes: attributed animated testimonial video.
- Required inputs: User request plus approved facts/assets.
- Optional inputs: Format, audience, duration, and style constraints.
- External AI operations: No upstream operation is adopted directly.
- Deterministic operations: Validation, artifact structuring, and acceptance checks.
- State, chaining, polling, and publication: User approval gates downstream work; no automatic publication.
- Preservation and quality claims: Preserve fixed user facts and disclose uncertainty.

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: testimonial-quote-video
- Router compositions: Exchanges only approved immutable artifacts with $make-video-intro.
- Rejected or unsupported behavior: Provider-specific syntax, credentials, external services, automatic publication, and unverified claims.
- Lifecycle decision and rationale: Active because its requested outcome and preservation contract are distinct.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| make-video-intro | 0.67 | Visual-media work | The candidate-specific output is explicitly requested | A generic final media result is requested | Pass approved artifacts only |

- Proposed frontmatter distinction: Use for attributed animated testimonial video; unlike $make-video-intro (relationship 0.67), select it for its declared output contract.
- Highest-risk ambiguity: The request omits whether it needs planning or final media.
- Router scoring evidence: Required inputs and delivery contract outrank shared keywords.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| Create a attributed animated testimonial video | testimonial-quote-video | Candidate output is explicit |
| Plan a attributed animated testimonial video with preserved facts | testimonial-quote-video | Candidate contract applies |
| Revise this attributed animated testimonial video without changing approved assets | testimonial-quote-video | Candidate preservation applies |
| Create the finished media now | make-video-intro | Neighbor owns generic execution |
| Make a generic media artifact | make-video-intro | Candidate boundary is absent |
| Use the related normal workflow | make-video-intro | Named neighbor applies |

## Security review

- Secret and environment access: No upstream secret or environment behavior is retained.
- Remote domains and uploads: Only authorized WeShop routes may receive assets or credentials.
- Installation and executable code: Upstream code and scripts are not copied or executed.
- Retry and provider-spend behavior: Follow the Router operation ledger; never blind-retry.
- Unsafe or removed behavior: Provider-specific behavior and automatic external actions are excluded.

## Validation evidence

- Structural intake check: Pending.
- Semantic routing test: Six static cases recorded.
- Source record packaged: No; this record stores provenance and native analysis only.
