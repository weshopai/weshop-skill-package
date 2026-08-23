# External Skill intake: micro-expression-video-generator

> Current intake mechanism. This is an independent candidate, not an installed Skill.

- Mechanism version: 2
- Status: active

## Provenance

- Source: `/Users/jasonjiang/Downloads/minimax skill/micro-expression-video-generator`
- Source revision: `sha256:8f7ee54538fcb6658001877a949da9a14282ffcb5797d9a57a486812345583a7`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`, and seven performance reference files; none executed

## Product decomposition

- User-visible outcomes: a concise performance prompt pack and an approved emotional-acting clip for an existing character, script beat, or emotion phrase.
- Required inputs: character image, script segment, or emotion phrase.
- Optional inputs: shot duration, intensity, dialogue, scene, and camera intent.
- External AI operations: reference analysis and video generation.
- Deterministic operations: gaze/brow/mouth/breath/hand timing plan, tempo selection, and performance QA.
- State, chaining, polling, and publication: confirm the prompt pack before one clip; durable key; no automatic publication.
- Preservation and quality claims: identity, scene, dialogue, camera intent, restrained emotion, and controlled intensity.

## Package decision

- Intake result: standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `micro-expression-video-generator`.
- Router compositions: `generate-video` executes the approved performance shot.
- Rejected or unsupported behavior: mandatory source Canvas writes, fixed provider default, automatic fallback, facial-rigging claims, and final compositing. When Canvas is available, write the approved performance pack there; otherwise deliver it in chat or locally.
- Lifecycle decision and rationale: promoted as standalone `skills/micro-expression-performance`; it owns acting-layer direction rather than full scene generation.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `make-talking-video` | 0.74 | Animate a face/person | Subtle non-lip-sync emotional performance is central | Speech delivery is the primary outcome | Performance layer can precede dialogue animation |
| `generate-video` | 0.58 | Produce a video shot | Existing character acting needs precise micro-expression direction | General scene motion is requested | Candidate provides shot prompt |

- Proposed frontmatter distinction: restrained performance direction for an existing shot, not lip-sync, scriptwriting, or general animation.
- Highest-risk ambiguity: “角色表情自然一点” may only ask for a general retake.
- Router scoring evidence: gaze, brow, breath, mouth, hand timing, emotion route, and intensity gate.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 让这位演员听到消息后忍住眼泪，给我 5 秒微表情表演 | micro-expression-video-generator | Restrained acting layer |
| 把这句台词拆成迟疑到坚定的眼神和呼吸节奏 | micro-expression-video-generator | Performance prompt pack |
| 这张角色图需要克制的愤怒和手指细节 | micro-expression-video-generator | Micro-expression contract |
| 让角色把这段话准确说出来 | make-talking-video | Speech/lip-sync primary |
| 生成一段人物走进房间的视频 | generate-video | No acting-specific requirements |
| 剪辑现有表演片段 | combine-videos | Clips already exist |

## Security review

- Secret and environment access: none retained.
- Remote domains and uploads: authorized character assets and native routes only.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: unknown submissions reconcile; known failures use an error-specific revision.
- Unsafe or removed behavior: mandatory source Canvas writes, source model default, and automatic fallback are removed; Canvas use is capability-gated.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate micro-expression-video-generator`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
