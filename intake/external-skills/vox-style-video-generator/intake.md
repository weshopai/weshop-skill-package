# External Skill intake: vox-style-video-generator
- Mechanism version: 2
- Status: active
## Provenance
- Source: `/Users/jasonjiang/Downloads/minimax skill/vox-style-video-generator`
- Source revision: `sha256:65efdc41f9e6a0df49d48e809ed072e8927b820b0e752aa9c33f785d22a496ca`
- Author or organization: Community source export
- Reviewed date: 2026-08-23
- Files inspected: `README.md`, `LICENSE`, `SKILL.md`, `meta.yaml`, and three references; none executed
## Product decomposition
- User-visible outcomes: an approval-first editorial cutout science explainer plan, key visuals, shallow-parallax clips, and optional assembly.
- Required inputs: topic, article, or report.
- Optional inputs: evidence, ratio, duration, narration, subtitles, and licensed audio.
- External AI operations: key art, animation, voice/music, and ffmpeg assembly.
- Deterministic operations: thesis, beat budget, collage style, evidence handling, and QC.
- State, chaining, polling, and publication: plan/visual approval gates and durable keys; no automatic publication.
- Preservation and quality claims: editorial cutout grammar, shallow 2D motion, readable evidence, and no imitation of a named publisher.
## Package decision
- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `editorial-cutout-explainer`.
- Router compositions: image route, `$generate-video`, and `$combine-videos`.
- Rejected or unsupported behavior: named-brand imitation, external API, ffmpeg recipes, auto voice/music/subtitles, and blind retry.
- Lifecycle decision and rationale: promoted as standalone `skills/editorial-cutout-explainer`; editorial evidence-led cutout treatment is independent.
## Similar Skill boundaries
| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `paper-collage-explainer-generator` | 0.76 | Explain with collage | Editorial cutouts, information labels, and shallow 2D motion are required | Tactile halftone paper assembly is required | May share approved beat plan |
## Fuzzy semantic routing test
| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 用剪报拼贴和信息标签讲这篇报告 | vox-style-video-generator | Editorial cutout evidence grammar |
| 做一支浅视差的短纪录片式科普 | vox-style-video-generator | 2D editorial motion |
| 先出论点、分镜和关键视觉再做片子 | vox-style-video-generator | Approval-first package |
| 做半调纸艺定格解释视频 | paper-collage-explainer-generator | Tactile paper material |
| 直接生成一个知识镜头 | generate-video | No explainer plan |
| 合成已有片段 | combine-videos | Existing clips |
## Security review
- Secret and environment access: external API excluded.
- Remote domains and uploads: authorized assets/native route only.
- Installation and executable code: ffmpeg commands excluded.
- Retry and provider-spend behavior: durable receipt rules replace source retries.
- Unsafe or removed behavior: named-brand imitation, auto audio/subtitles, and external tooling removed.
## Validation evidence
- Structural intake check: `npm run skills:intake -- validate vox-style-video-generator`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
