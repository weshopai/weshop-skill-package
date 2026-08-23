# External Skill intake: paper-collage-explainer-generator

> Current intake mechanism. This is an independent candidate; legacy records are not templates.

- Mechanism version: 2
- Status: active

## Provenance

- Source: `/Users/jasonjiang/Downloads/minimax skill/paper-collage-explainer-generator`
- Source revision: `SKILL.md` sha256 `2e51dca95bf9e9e4419a6b49a7803c7299f4b1fcb646481fcd08d6d20f3d1089`; `meta.yaml` sha256 `955e5e3dd9b66d15b6274fd6b31c21de364bb902abcdc2e5a62769809c591b7b`
- Author or organization: MiniMax Design, official-featured export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; neither was executed

## Product decomposition

- User-visible outcomes: an approved visual-metaphor plan, final paper-collage stills, stop-motion collage clips, and optional ordered assembly.
- Required inputs: narration line, story beats, or concept; intended delivery context.
- Optional inputs: ratio, duration, batch count, BGM, voiceover, subtitles, and authorized assets.
- External AI operations: image generation, reference-led video generation, optional audio and clip assembly.
- Deterministic operations: beat decomposition, visual-metaphor storyboard, style manifest, and final QA.
- State, chaining, polling, and publication: approval required for plan and stills before video; one durable key per clip; no automatic publication.
- Preservation and quality claims: stable halftone cut-paper language, tactile assembly, final-frame continuity, no readable text unless requested.

## Package decision

- Intake result: standalone Atom candidate; do not collapse it into generic explainer or video generation.
- Proposed standalone Atom: `paper-collage-explainer-generator`.
- Router compositions: use `generate-video` for each approved collage shot and `combine-videos` for requested multi-clip delivery.
- Rejected or unsupported behavior: MiniMax Hub tools, fixed H3 default, automatic music/voice/subtitles, editable-layer guarantee, blind retries, and automatic publication.
- Lifecycle decision and rationale: promoted as standalone `skills/paper-collage-explainer-generator`. Its mandatory plan/still gates and material-specific stop-motion continuity own a finished visual-explainer result; paid representative media execution remains unrun.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `make-explainer-video` | 0.78 | Explain a topic visually | Paper-collage material, approved final stills, and stop-motion assembly are required | A general explainer treatment is requested | Candidate may supply a collage treatment |
| `generate-video` | 0.59 | Generate a video shot | One shot must assemble paper objects into an approved collage final frame | A general atomic shot is requested | Generate each approved segment |
| `combine-videos` | 0.42 | Multi-clip delivery | Metaphor planning and collage generation are still required | Accepted clips only need editing | Assemble approved clips |

- Proposed frontmatter distinction: approved editorial paper-collage explainer with tactile stop-motion, not generic B-roll, typography animation, or post-hoc clip editing.
- Highest-risk ambiguity: “做一个纸艺风视频” may ask only for one general stylized shot.
- Router scoring evidence: plan gate, approved still anchor, paper-material rules, and no-unrequested audio differentiate this candidate.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 用这句话做三个纸质拼贴隐喻镜头，先给我方案和静帧 | paper-collage-explainer-generator | Plan and still approval gates |
| 做一支 16:9 拼贴知识短片，纸片逐个弹出并保留纸张音效 | paper-collage-explainer-generator | Material-specific assembly and SFX policy |
| 把这五个故事节点做成统一的半调剪纸定格动画 | paper-collage-explainer-generator | Cohesive multi-beat collage outcome |
| 为这段访谈做一支清晰的数据可视化解释视频 | make-explainer-video | No collage material contract |
| 生成一段四秒纸船漂过水洼的单镜头 | generate-video | One general shot |
| 按顺序剪辑我已经验收的四段视频 | combine-videos | Source clips already exist |

## Security review

- Secret and environment access: none.
- Remote domains and uploads: authorized assets and native WeShop routes only.
- Installation and executable code: source Hub tools and editors are excluded.
- Retry and provider-spend behavior: one key per planned still/clip; no blind retry.
- Unsafe or removed behavior: automatic BGM, narration, subtitles, source model defaults, and editable-layer claims.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate paper-collage-explainer-generator`.
- Semantic routing test: six cases recorded above.
- Source record packaged: this intake and capability map only.
