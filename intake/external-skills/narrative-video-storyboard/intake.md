# External Skill intake: narrative-video-storyboard

- Mechanism version: 2
- Status: active

## Provenance

- Source: https://github.com/cclank/lanshu-awesome-ai-video-kit
- Source revision: b4ceecc4ca27ded6b6f542b04ac756bf5bd7816d
- Author or organization: Upstream repository contributors
- Reviewed date: 2026-08-24
- Files inspected: README.md and the named upstream SKILL.md entrypoint
- License: MIT declared at repository root

## Product decomposition

- User-visible outcomes: multi-shot narrative video storyboard.
- Required inputs: User request plus approved facts/assets.
- Optional inputs: Format, audience, duration, and style constraints.
- External AI operations: No upstream operation is adopted directly.
- Deterministic operations: Validation, artifact structuring, and acceptance checks.
- State, chaining, polling, and publication: User approval gates downstream work; no automatic publication.
- Preservation and quality claims: Preserve fixed user facts and disclose uncertainty.

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: narrative-video-storyboard
- Router compositions: Exchanges only approved immutable artifacts with $plan-film-storyboard.
- Rejected or unsupported behavior: Provider-specific syntax, credentials, external services, automatic publication, and unverified claims.
- Lifecycle decision and rationale: Active because its requested outcome and preservation contract are distinct.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| plan-film-storyboard | 0.67 | Visual-media work | The candidate-specific output is explicitly requested | A generic final media result is requested | Pass approved artifacts only |

- Proposed frontmatter distinction: Use for multi-shot narrative video storyboard; unlike $plan-film-storyboard (relationship 0.67), select it for its declared output contract.
- Highest-risk ambiguity: The request omits whether it needs planning or final media.
- Router scoring evidence: Required inputs and delivery contract outrank shared keywords.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| Create a multi-shot narrative video storyboard | narrative-video-storyboard | Candidate output is explicit |
| Plan a multi-shot narrative video storyboard with preserved facts | narrative-video-storyboard | Candidate contract applies |
| Revise this multi-shot narrative video storyboard without changing approved assets | narrative-video-storyboard | Candidate preservation applies |
| Create the finished media now | plan-film-storyboard | Neighbor owns generic execution |
| Make a generic media artifact | plan-film-storyboard | Candidate boundary is absent |
| Use the related normal workflow | plan-film-storyboard | Named neighbor applies |

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
