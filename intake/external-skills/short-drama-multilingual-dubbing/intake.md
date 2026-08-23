# External Skill intake: short-drama-multilingual-dubbing

> Current intake mechanism. This is an independent candidate; legacy records are not templates.

- Mechanism version: 2
- Status: active

## Provenance

- Source: `/Users/jasonjiang/Downloads/minimax skill/short-drama-multilingual-dubbing`
- Source revision: `SKILL.md` sha256 `da849356deb8925bb22a970e19aa7977f2d26e35bd079f6a490e57a52cb8f215`; `meta.yaml` sha256 `e21c8cc13baadbf7531b4ca7cadc735bdef6aa20ca54bbafc95feb706e47ee09`
- Author or organization: MiniMax Design, official-featured export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; neither was executed

## Product decomposition

- User-visible outcomes: editable localized dialogue/subtitle tables, source-line performance-preserving dubbed audio, and optionally a muxed localized short-drama video.
- Required inputs: authorized video or audio, target language, and confirmation of dialogue wording before generation.
- Optional inputs: clean dialogue stem, subtitle file, source-line versus official voice mode, subtitle delivery, and final assembly request.
- External AI operations: audio extraction/separation, transcription, translation, voice replication or TTS, subtitle export, and timeline mux.
- Deterministic operations: master-clock ledger, dubbing/subtitle tables, slot manifest, source-silent video creation, and timeline assembly.
- State, chaining, polling, and publication: hard confirmation before voice generation; stable key per row if a supported route exists; no automatic publishing.
- Preservation and quality claims: original timeline, silence gaps, line emotion/timbre/rhythm, and subtitle timing must remain aligned.

## Package decision

- Intake result: standalone Atom candidate, retained active without an execution-ready promotion.
- Proposed standalone Atom: `short-drama-multilingual-dubbing`.
- Router compositions: deterministic tables and authorized assembly may hand off to `combine-videos`; do not claim an audio-replacement route until it is verified.
- Rejected or unsupported behavior: MiniMax voice replication, Hub audio tools, persistent voice cloning, unverified official voices, automatic dubbing, and source-specific Canvas publication.
- Lifecycle decision and rationale: active candidate. The dialogue-localization contract is distinct, but current package policy has no verified standalone audio-generation/editing route for source-line multilingual replacement. When a verified audio model or Agent becomes available, extend this candidate with the per-line replacement, timing, mix, and acceptance route rather than treating it as a new generic video Skill.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `make-talking-video` | 0.46 | Spoken audiovisual output | Existing drama dialogue must be localized on its source timeline | One authorized or fictional presenter speaks a new script | No substitution for multi-line dubbing |
| `combine-videos` | 0.40 | Timeline assembly | Dialogue extraction, translation, replacement, and subtitles are required | Accepted audio/video clips only need deterministic editing | Assemble only after audio exists |
| `write-short-drama-series` | 0.32 | Short-drama language work | Localizing an existing performed drama | Writing or adapting drama scripts before production | Localized table can inform later adaptation review |

- Proposed frontmatter distinction: localized source-dialogue replacement with timing and performance preservation; not a talking avatar, scriptwriting, or ordinary clip assembly.
- Highest-risk ambiguity: “英文配音视频” can mean a new talking presenter rather than replacing dialogue in an existing drama.
- Router scoring evidence: supplied drama, target-language replacement, source-line timing, dubbing table, and subtitle timeline make this candidate win.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 把这部中文短剧配成英语，逐句保留原来的情绪和时间轴 | short-drama-multilingual-dubbing | Existing dialogue localization |
| 我有字幕和干净人声，请做可编辑的日语配音表并在确认后输出配音版 | short-drama-multilingual-dubbing | Table-confirmed multilingual dubbing contract |
| 给这段已拍剧情做西班牙语对白替换和独立字幕文件 | short-drama-multilingual-dubbing | Replacement and subtitle timing |
| 让这张虚拟主播照片用英文说一句欢迎词 | make-talking-video | New single-presenter output |
| 将四段我验收好的视频做成一个保留原声的合集 | combine-videos | No dialogue replacement |
| 将这个中文短剧梗概改写成二十集英文竖屏剧本 | write-short-drama-series | Writing, not post-production localization |

## Security review

- Secret and environment access: no credentials; only authorized source media may be processed.
- Remote domains and uploads: no source Hub calls or automatic upload/publication.
- Installation and executable code: source tools and voice services are not executed or copied.
- Retry and provider-spend behavior: no generation route is proposed; when an audio route is verified, use one durable receipt per replacement line and never resubmit ambiguous outcomes.
- Unsafe or removed behavior: persistent voice cloning, unconfirmed voice choice, automatic dialogue generation, and muxing new audio onto an original audio stream.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate short-drama-multilingual-dubbing`.
- Semantic routing test: six cases recorded above.
- Source record packaged: this intake and capability map only; no execution readiness claim.
