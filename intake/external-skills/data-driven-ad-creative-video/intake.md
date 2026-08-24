# External Skill intake: data-driven-ad-creative-video

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

- User-visible outcomes: controlled advertising-video variants from approved tabular data.
- Required inputs: User request plus approved facts/assets.
- Optional inputs: Format, audience, duration, and style constraints.
- External AI operations: No upstream operation is adopted directly.
- Deterministic operations: Validation, artifact structuring, and acceptance checks.
- State, chaining, polling, and publication: User approval gates downstream work; no automatic publication.
- Preservation and quality claims: Preserve fixed user facts and disclose uncertainty.

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: data-driven-ad-creative-video
- Router compositions: Exchanges only approved immutable artifacts with $generate-video.
- Rejected or unsupported behavior: Provider-specific syntax, credentials, external services, automatic publication, and unverified claims.
- Lifecycle decision and rationale: Active because its requested outcome and preservation contract are distinct.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| generate-video | 0.67 | Visual-media work | The candidate-specific output is explicitly requested | A generic final media result is requested | Pass approved artifacts only |

- Proposed frontmatter distinction: Use for controlled advertising-video variants from approved tabular data; unlike $generate-video (relationship 0.67), select it for its declared output contract.
- Highest-risk ambiguity: The request omits whether it needs planning or final media.
- Router scoring evidence: Required inputs and delivery contract outrank shared keywords.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| Create a controlled advertising-video variants from approved tabular data | data-driven-ad-creative-video | Candidate output is explicit |
| Plan a controlled advertising-video variants from approved tabular data with preserved facts | data-driven-ad-creative-video | Candidate contract applies |
| Revise this controlled advertising-video variants from approved tabular data without changing approved assets | data-driven-ad-creative-video | Candidate preservation applies |
| Create the finished media now | generate-video | Neighbor owns generic execution |
| Make a generic media artifact | generate-video | Candidate boundary is absent |
| Use the related normal workflow | generate-video | Named neighbor applies |

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
