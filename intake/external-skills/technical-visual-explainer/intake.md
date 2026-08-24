# External Skill intake: technical-visual-explainer

> Current intake mechanism. Do not use legacy records without this marker as templates; they may reflect the retired merge-era policy.

- Mechanism version: 2
- Status: active

## Provenance

- Source: https://github.com/nicobailon/visual-explainer
- Source revision: df35d97a00191d8aba831e757a65dd6ce0514fc0
- Author or organization: nicobailon
- Reviewed date: 2026-08-24
- Files inspected: README.md, package.json, and plugins/visual-explainer/SKILL.md

## Product decomposition

- User-visible outcomes: Self-contained HTML visual explanations, diagrams, comparisons, and technical recaps.
- Required inputs: Verified source facts and a requested explanation, comparison, or review.
- Optional inputs: Existing design tokens, diagrams, screenshots, and a presentation format.
- External AI operations: None required; optional illustration generation is not part of this candidate.
- Deterministic operations: HTML assembly, accessible structure, diagram rendering, and browser preview.
- State, chaining, polling, and publication: User approves output location and any browser opening; no publication.
- Preservation and quality claims: Preserve supplied facts and project visual tokens; disclose unverified inferences.

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake
- Proposed standalone Atom: technical-visual-explainer
- Router compositions: Can receive verified research or code-review facts and hand a static graphic to make-infographic when an image is requested.
- Rejected or unsupported behavior: Writing to home directories, automatic browser opening, optional third-party image tooling, and unverified facts.
- Lifecycle decision and rationale: Retain as an active standalone candidate because interactive self-contained explanation pages are distinct from static infographics.

## Similar Skill boundaries

Complete one row for every materially similar or adjacent installed Skill. Similar Skills remain independent.

Calibrate the static relationship score from outcome, input roles, preservation, deliverable, and exclusions: 0.00–0.24 incidental; 0.25–0.49 shared component; 0.50–0.74 closely related but clearly different; 0.75–0.89 strongly adjacent; 0.90–1.00 nearly the same absent the recorded decisive boundary. It is discovery metadata, never a merge or runtime-selection score.

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| make-infographic | 0.62 | Visual explanation of facts | The deliverable is an interactive or printable HTML page with diagrams or code/data detail | The deliverable is a single static infographic image | HTML output may supply the source brief for a final infographic |

- Proposed frontmatter distinction: Use for self-contained HTML visual explanations; unlike $make-infographic (relationship 0.62), choose this for interactive diagrams, code review, or technical recaps; choose $make-infographic for one static image.
- Highest-risk ambiguity: A request for a diagram without a requested media format.
- Router scoring evidence: Output format and interaction need outweigh the shared explanatory topic.

## Fuzzy semantic routing test

Before closing the intake, test natural-language wording against the candidate and every plausible installed neighbor. Add at least three requests that should select this candidate and three ambiguous requests that should select a named installed neighbor. Explain the decisive boundary; do not test keywords alone.

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| Turn this architecture into a self-contained HTML page with a zoomable flow | technical-visual-explainer | Interactive HTML is required |
| Make an HTML diff review with diagrams and comparison tables | technical-visual-explainer | Review page rather than a media image |
| Explain this data pipeline as a browser-ready technical recap | technical-visual-explainer | Browser-delivered explanation |
| Make one shareable static infographic about this data pipeline | make-infographic | One image is requested |
| Create a social poster that explains this metric | make-infographic | Poster output is requested |
| Design a chart-style image for this concept | make-infographic | Static visual deliverable |

## Security review

- Secret and environment access: None retained.
- Remote domains and uploads: No external upload is required; user-provided local assets remain local.
- Installation and executable code: Upstream renderers and optional tools are not installed or executed.
- Retry and provider-spend behavior: No provider spend; rendering failures remain local and are reported.
- Unsafe or removed behavior: Home-directory writes and automatic browser opening require explicit user direction.

## Validation evidence

- Structural intake check: Pending after capability map completion.
- Semantic routing test: Static cases recorded; runtime selection is not executed during intake.
- Source record packaged: No; this intake stores only provenance and native analysis.
