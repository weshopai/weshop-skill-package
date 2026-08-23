# External Skill intake: ip-toy-grid-motion

> Current intake mechanism. This is an independent candidate, not an installed Skill.

- Mechanism version: 2
- Status: active

## Provenance

- Source: `/Users/jasonjiang/Downloads/minimax skill/ip-toy-grid-motion`
- Source revision: `sha256:4515ffa9448a38dec9719f159385e88f9b47b2eba97ca03d454d3bb9c327d4eb`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`, and three Chinese prompt-reference files; none executed

## Product decomposition

- User-visible outcomes: an identity-preserved 9:16 six-panel designer-toy poster and a six-second motion-poster version.
- Required inputs: one character, mascot, or original-character image.
- Optional inputs: character name, copy request, audio reference, ratio, and duration.
- External AI operations: reference analysis, still generation, motion generation, and optional per-panel fallback.
- Deterministic operations: panel-layout specification, character evidence extraction, and still-before-motion QA.
- State, chaining, polling, and publication: approve still before video; durable key per still and clip; no automatic publication.
- Preservation and quality claims: identity, coverage state, props, colors, six irregular rounded panels, and Panel 4 opening sequence.

## Package decision

- Intake result: standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `ip-toy-grid-motion`.
- Router compositions: image route creates the poster; `generate-video` animates it; deterministic compositor is fallback only.
- Rejected or unsupported behavior: verbatim source templates, fixed provider call, automatic retries, and unconditional source Canvas grouping; when Canvas is available, it may group the accepted poster and motion output.
- Lifecycle decision and rationale: promoted as standalone `skills/character-toy-grid-motion`; the fixed six-panel identity contract remains independently useful.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `character-reference-sheet` | 0.73 | Present a character consistently | Six-panel toy poster plus vertical motion is the deliverable | A broader identity reference sheet is needed | Reference sheet may be upstream |
| `generate-video` | 0.61 | Produce a short clip | Panel-4 expansion and locked six-panel return are required | A general clip is requested | Candidate hands off approved poster |

- Proposed frontmatter distinction: source-character-to-toy six-panel poster and motion sequence, not a general character sheet.
- Highest-risk ambiguity: “做角色九宫格” might not seek toy styling or motion.
- Router scoring evidence: one source character, six irregular panels, vertical layout, and panel-4 opening.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 用这张吉祥物做潮玩六宫格竖版动态海报 | ip-toy-grid-motion | Required six-panel toy motion outcome |
| 让角色第四格先全屏，再缩回不规则六宫格 | ip-toy-grid-motion | Fixed panel-4 timeline |
| 做一个保留服装和道具的盲盒风 IP 动态拼图 | ip-toy-grid-motion | Identity-preserved toy grid |
| 给我的角色做正侧背和表情设定图 | character-reference-sheet | Reference sheet, not motion poster |
| 生成角色在舞台上跳舞的视频 | generate-video | No grid contract |
| 把现有六段视频剪到一起 | combine-videos | Clips already exist |

## Security review

- Secret and environment access: none retained.
- Remote domains and uploads: only the authorized character image and native routes.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: per-slot durable keys; compositing does not cause regeneration.
- Unsafe or removed behavior: verbatim template copying, source tools, and blind retries are removed.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate ip-toy-grid-motion`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
