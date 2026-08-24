# External Skill intake: social-knowledge-notes

- Mechanism version: 2
- Status: active

## Provenance

- Source: https://github.com/cpp285/xiaohongshu-visual-notes
- Source revision: 7d86a50fcf7d10e938b42edebe40978594e70395
- Author or organization: Upstream repository contributors
- Reviewed date: 2026-08-24
- Files inspected: README.md and the named upstream SKILL.md entrypoint
- License: MIT declared at repository root

## Product decomposition

- User-visible outcomes: fact-checked multi-page social knowledge-note set.
- Required inputs: User request plus approved facts/assets.
- Optional inputs: Format, audience, duration, and style constraints.
- External AI operations: No upstream operation is adopted directly.
- Deterministic operations: Validation, artifact structuring, and acceptance checks.
- State, chaining, polling, and publication: User approval gates downstream work; no automatic publication.
- Preservation and quality claims: Preserve fixed user facts and disclose uncertainty.

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: social-knowledge-notes
- Router compositions: Exchanges only approved immutable artifacts with $make-infographic.
- Rejected or unsupported behavior: Provider-specific syntax, credentials, external services, automatic publication, and unverified claims.
- Lifecycle decision and rationale: Active because its requested outcome and preservation contract are distinct.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| make-infographic | 0.67 | Visual-media work | The candidate-specific output is explicitly requested | A generic final media result is requested | Pass approved artifacts only |

- Proposed frontmatter distinction: Use for fact-checked multi-page social knowledge-note set; unlike $make-infographic (relationship 0.67), select it for its declared output contract.
- Highest-risk ambiguity: The request omits whether it needs planning or final media.
- Router scoring evidence: Required inputs and delivery contract outrank shared keywords.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| Create a fact-checked multi-page social knowledge-note set | social-knowledge-notes | Candidate output is explicit |
| Plan a fact-checked multi-page social knowledge-note set with preserved facts | social-knowledge-notes | Candidate contract applies |
| Revise this fact-checked multi-page social knowledge-note set without changing approved assets | social-knowledge-notes | Candidate preservation applies |
| Create the finished media now | make-infographic | Neighbor owns generic execution |
| Make a generic media artifact | make-infographic | Candidate boundary is absent |
| Use the related normal workflow | make-infographic | Named neighbor applies |

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
