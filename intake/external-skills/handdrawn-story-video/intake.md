# External Skill intake: handdrawn-story-video

> Current intake mechanism. Do not use legacy records without this marker as templates; they may reflect the retired merge-era policy.

- Mechanism version: 2
- Status: active

## Provenance

- Source: https://github.com/gnipbao/story-to-handdrawn-video
- Source revision: fbab5b27f4f0db61739d86f78000a39eeaa692d3
- Author or organization: gnipbao
- Reviewed date: 2026-08-24
- Files inspected: README.md, package.json, and skill-package/story-to-handdrawn-video/SKILL.md

## Product decomposition

- User-visible outcomes: A silent hand-drawn story video from Chinese copy or ordered images.
- Required inputs: Chinese story text or ordered user-owned images and a requested aspect ratio.
- Optional inputs: Approved hand-drawn style, page-turn mode, duration, and supplied illustrations.
- External AI operations: Optional illustration generation; the final assembly is deterministic.
- Deterministic operations: Beat splitting, safe-area layout, staged reveal, and MP4 assembly.
- State, chaining, polling, and publication: Preview and final render are distinct; publication is user-controlled.
- Preservation and quality claims: Preserve wording, image order, source-page composition, and safe borders.

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake
- Proposed standalone Atom: handdrawn-story-video
- Router compositions: Can receive approved storyboards and illustrations, then hand the silent video to editing or audio post-production.
- Rejected or unsupported behavior: Upstream Remotion installation, API-key fallback, fixed source styles/assets, automatic overwrite, and bundled audio claims.
- Lifecycle decision and rationale: Retain as an active standalone candidate because the staged hand-drawn narrative render is a distinct final-video contract.

## Similar Skill boundaries

Complete one row for every materially similar or adjacent installed Skill. Similar Skills remain independent.

Calibrate the static relationship score from outcome, input roles, preservation, deliverable, and exclusions: 0.00–0.24 incidental; 0.25–0.49 shared component; 0.50–0.74 closely related but clearly different; 0.75–0.89 strongly adjacent; 0.90–1.00 nearly the same absent the recorded decisive boundary. It is discovery metadata, never a merge or runtime-selection score.

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| make-podcast-video | 0.53 | Turns a narrative into video | A silent hand-drawn visual story and page-safe staging are required | Talking-head or podcast-style video is required | A narrated track may be added downstream only with user-supplied licensed audio |

- Proposed frontmatter distinction: Use for silent hand-drawn story videos; unlike $make-podcast-video (relationship 0.53), choose this for illustration-led staged reveals; choose the neighbor for spoken-program video.
- Highest-risk ambiguity: A user says only “story video” without identifying a visual or audio format.
- Router scoring evidence: Hand-drawn presentation and no-audio contract are decisive.

## Fuzzy semantic routing test

Before closing the intake, test natural-language wording against the candidate and every plausible installed neighbor. Add at least three requests that should select this candidate and three ambiguous requests that should select a named installed neighbor. Explain the decisive boundary; do not test keywords alone.

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| Turn my Chinese story into a silent colored-pencil diary animation | handdrawn-story-video | Hand-drawn silent final is required |
| Animate these ordered comic pages with text-to-sketch-to-color reveals | handdrawn-story-video | Ordered art and staged reveal are required |
| Make a page-turn hand-drawn video without cropping my images | handdrawn-story-video | Image-order and composition preservation |
| Turn this interview into a narrated podcast video | make-podcast-video | Spoken program is requested |
| Make a host-led video episode from this transcript | make-podcast-video | Talking format is requested |
| Create a video with a presenter discussing this topic | make-podcast-video | Presenter is required |

## Security review

- Secret and environment access: API keys and environment-driven generator fallback are excluded.
- Remote domains and uploads: User assets stay in approved WeShop/local rendering paths.
- Installation and executable code: Upstream renderer, package installs, and scripts are not executed during intake.
- Retry and provider-spend behavior: Generation follows the Router ledger; local assembly retries do not create a new generation.
- Unsafe or removed behavior: Source-style assets, automatic overwrite, and audio generation are excluded.

## Validation evidence

- Structural intake check: Pending after capability map completion.
- Semantic routing test: Static cases recorded; runtime selection is not executed during intake.
- Source record packaged: No; only native analysis and provenance are retained.
