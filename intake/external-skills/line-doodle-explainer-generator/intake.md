# External Skill intake: line-doodle-explainer-generator

> Current intake mechanism. This is an independent candidate, not an installed Skill.

- Mechanism version: 2
- Status: active

## Provenance

- Source: `/Users/jasonjiang/Downloads/minimax skill/line-doodle-explainer-generator`
- Source revision: `sha256:c2630a0de99d2a6c38f5ace2e560ac4730f70b93224962ce3fcb005aa86a76f2`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`, bilingual interaction-card and output-format references; none executed

## Product decomposition

- User-visible outcomes: a knowledge-explainer plan, narration, diagram system, storyboard, optional assets, and a minimalist line-doodle final video.
- Required inputs: topic, lesson material, or core idea.
- Optional inputs: audience, duration, ratio, source materials, voiceover, subtitles, and delivery scope.
- External AI operations: media generation, assembly, and optional subtitle work.
- Deterministic operations: concept extraction, teaching structure, narration, diagram design, storyboard, and QA.
- State, chaining, polling, and publication: staged approvals before paid media; durable key per asset or clip; no automatic publishing.
- Preservation and quality claims: clear teaching logic, sparse line figures, only meaningful comparisons, and readable pacing.

## Package decision

- Intake result: standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `line-doodle-explainer-generator`.
- Router compositions: `generate-video` produces approved shots and `combine-videos` assembles them.
- Rejected or unsupported behavior: unconditional source Canvas documents/cards, unverified audio or subtitle generation, automatic generation, and source tool calls. When Canvas is available, save the approved plan and staged decisions there; otherwise keep them in chat or local delivery.
- Lifecycle decision and rationale: promoted as standalone `skills/line-doodle-explainer`; it owns a line-doodle teaching grammar rather than generic explainer output.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `make-explainer-video` | 0.82 | Explain a topic visually | Minimalist line figures and diagram-led teaching are required | A general explainer treatment is requested | Candidate can provide visual treatment |
| `make-infographic` | 0.52 | Make information clear | Timed narration and animated diagram sequence are required | One static information graphic is requested | Static diagram may be upstream |

- Proposed frontmatter distinction: diagram-first moving line-doodle education, not a generic explainer or static infographic.
- Highest-risk ambiguity: “做科普视频” does not by itself specify the line-doodle grammar.
- Router scoring evidence: knowledge structure, sparse line figures, narration beats, and avoidance of decorative dividers.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 用线条小人讲清楚通货膨胀的三个原因 | line-doodle-explainer-generator | Explicit line-doodle teaching grammar |
| 把教材这一页拆成旁白、图解和短分镜 | line-doodle-explainer-generator | Narration-plus-diagram production package |
| 做一支极简黑白小人科普短片 | line-doodle-explainer-generator | Minimalist animated diagram system |
| 做一支纸雕定格动画解释火山 | make-explainer-video | Different material treatment |
| 给这组统计数据设计一张图 | make-infographic | Static artifact only |
| 剪辑我已验收的六段知识视频 | combine-videos | Clips already exist |

## Security review

- Secret and environment access: none retained.
- Remote domains and uploads: user-authorized teaching material and native routes only.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: approve plan before assets; unknown submissions reconcile.
- Unsafe or removed behavior: source-only Canvas cards, automatic subtitles/audio, and blind retries are removed; Canvas use itself is conditional on Agent capability.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate line-doodle-explainer-generator`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
