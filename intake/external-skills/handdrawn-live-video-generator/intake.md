# External Skill intake: handdrawn-live-video-generator

> Current intake mechanism. This is an independent candidate, not an installed Skill.

- Mechanism version: 2
- Status: active

## Provenance

- Source: `/Users/jasonjiang/Downloads/minimax skill/handdrawn-live-video-generator`
- Source revision: `sha256:fd50466ef7df6ac100700e90edbacc43032605c6418d32cc90888b869d31d8d7`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; neither executed

## Product decomposition

- User-visible outcomes: a 15-second 16:9 live-action scene where a rough glowing drawing touches a real hand or object, morphs continuously, escapes, and receives a delayed handheld chase.
- Required inputs: scene idea, contact object or hand, and mood.
- Optional inputs: source image, language, ratio, duration, and ambient-audio request.
- External AI operations: prompt authoring and reference-led video generation.
- Deterministic operations: beat plan, same-language output, safety exclusions, and QA.
- State, chaining, polling, and publication: confirm prompt before one video run with a durable key; no automatic publication.
- Preservation and quality claims: opening contact, one traceable entity, crayon/chalk texture, connected space, and non-horror tone.

## Package decision

- Intake result: standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `handdrawn-live-video-generator`.
- Router compositions: `generate-video` supplies the approved atomic clip.
- Rejected or unsupported behavior: fixed provider default, automatic retry or fallback, automatic generation after prompt delivery, and source-specific tools.
- Lifecycle decision and rationale: promoted as standalone `skills/handdrawn-live-action-fusion`; the contact-led morph chase remains independently discoverable.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `generate-video` | 0.68 | Produce a short video | Real/drawn contact, continuous morphing, and delayed pursuit are required | A general atomic clip is requested | Candidate supplies shot contract |
| `animate-image` | 0.51 | Animate a supplied image | A live-action fusion scene is required | A source image needs standard motion only | Confirmed still can be upstream |

- Proposed frontmatter distinction: contact-led hand-drawn/live-action morph chase, not general video generation.
- Highest-risk ambiguity: “手绘动起来” may mean ordinary image animation.
- Router scoring evidence: contact, one entity, connected chase, and anti-horror texture rules.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 让粉笔小狐狸从我的手心钻出来，一镜到底追到阳台 | handdrawn-live-video-generator | Contact-led live/drawn morph chase |
| 做真实厨房里会逃跑的蜡笔涂鸦 | handdrawn-live-video-generator | Connected space and delayed pursuit |
| 把这只画鸟和真实手指互动后变成晚霞 | handdrawn-live-video-generator | Traceable morphing entity |
| 为产品拍一段常规开箱视频 | generate-video | No fusion contract |
| 让这张插画里的云缓慢飘动 | animate-image | Standard still animation |
| 把三段成片合成一个短视频 | combine-videos | Accepted clips already exist |

## Security review

- Secret and environment access: none retained.
- Remote domains and uploads: authorized assets and native WeShop route only.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: one key per run; reconcile unknown submissions.
- Unsafe or removed behavior: source tools, fixed route, and blind fallback are removed.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate handdrawn-live-video-generator`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
