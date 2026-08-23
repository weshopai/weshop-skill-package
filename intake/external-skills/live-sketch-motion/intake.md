# External Skill intake: live-sketch-motion

> Current intake mechanism. This is an independent candidate, not an installed Skill.

- Mechanism version: 2
- Status: active

## Provenance

- Source: `/Users/jasonjiang/Downloads/minimax skill/live-sketch-motion`
- Source revision: `sha256:50cca78051b932136ac14821fa3b6b7e536a5928440e1f1805bf931530ff6b75`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; neither executed

## Product decomposition

- User-visible outcomes: a live-action short where a real blue marker hand progressively converts a moving subject into a colored-pencil sketch without freezing it.
- Required inputs: real photo, reference video, or text scene.
- Optional inputs: aspect ratio, duration, sketch style, sound, and subtitle request.
- External AI operations: optional realistic preview, source analysis, and reference-led video generation.
- Deterministic operations: motion plan, occlusion check, pen-path specification, three-layer sketch contract, and QA.
- State, chaining, polling, and publication: text-only scenes require source-preview approval; durable key per asset; no automatic publication.
- Preservation and quality claims: source composition/identity, plausible background life, marker-tip synchronized reveal, and ongoing subject motion.

## Package decision

- Intake result: standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `live-sketch-motion`.
- Router compositions: reference image generation supplies text-only previews; `generate-video` makes the approved clip.
- Rejected or unsupported behavior: mandatory source Canvas documents, unrequested audio/subtitles, fixed provider default, and automatic model switching. When Canvas is available, retain the approved production plan and prompt there; otherwise return them through chat or local delivery.
- Lifecycle decision and rationale: promoted as standalone `skills/live-sketch-motion`; marker-tip synchronization and live-motion preservation remain separate from generic doodle animation.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `animate-image` | 0.75 | Animate a source image | A foreground marker drives a progressive moving-subject sketch conversion | The image simply needs motion | Candidate uses reference animation downstream |
| `generate-video` | 0.64 | Produce a short clip | Pen-tip timing and sketch layer are central | A general live-action clip is requested | Candidate supplies prompt contract |

- Proposed frontmatter distinction: live photo/video plus pen-tip-driven progressive sketch conversion, not an overlay or frozen sticker.
- Highest-risk ambiguity: “照片变手绘视频” may request a simple filter.
- Router scoring evidence: real marker hand, tip-synchronized reveal, one target, and continuous natural motion.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 让蓝色马克笔边画边把跑步的小狗变成彩铅涂鸦 | live-sketch-motion | Tip-synchronized moving-subject conversion |
| 用我的猫照片做真人背景里逐步手绘化的短片 | live-sketch-motion | Live scene retained while target moves |
| 先做真实街景预览，再让画笔把骑车人画出来 | live-sketch-motion | Text preview and marker reveal gates |
| 让这张猫图自然眨眼摆尾 | animate-image | No sketch conversion |
| 生成一段街头跑步的视频 | generate-video | No source/marker contract |
| 给产品图加一个贴纸 | add-speech-bubble | Static overlay instead of motion |

## Security review

- Secret and environment access: none retained.
- Remote domains and uploads: only authorized source assets and native routes.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: one key per preview/clip; reconcile unknown submissions.
- Unsafe or removed behavior: mandatory source Canvas writes, forced audio, and blind fallback are removed; Canvas calls are capability-gated.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate live-sketch-motion`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
