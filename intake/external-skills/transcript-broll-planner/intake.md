# External Skill intake: transcript-broll-planner
- Mechanism version: 2
- Status: active
## Provenance
- Source: `/Users/jasonjiang/Downloads/minimax skill/transcript-broll-planner`
- Source revision: `sha256:3091be225669f819eeb22133b3930b41cd68800902b11e772935110ea57fe4a3`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; neither executed
## Product decomposition
- User-visible outcomes: a reviewable transcript-to-B-roll plan, missing-material audit, and approved B-roll shots.
- Required inputs: transcript, narration, or talking-head script.
- Optional inputs: footage, screenshots, charts, data, logos, ratio, and style.
- External AI operations: source analysis, still/video generation, and grouping.
- Deterministic operations: semantic segmentation, A-roll/evidence/material decision, and shot plan.
- State, chaining, polling, and publication: approval gate before each paid shot; no automatic publication.
- Preservation and quality claims: exact claims/text remain evidence or deterministic overlays, not fabricated images.
## Package decision
- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `transcript-broll-plan`.
- Router compositions: `$generate-video` produces approved visual-only beats.
- Rejected or unsupported behavior: source Canvas dependence, automatic generation, unverified text rendering, and blind retry.
- Lifecycle decision and rationale: promoted as standalone `skills/transcript-broll-plan`; planning ownership precedes any shot generation.
## Similar Skill boundaries
| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `make-explainer-video` | 0.72 | Explain a topic | Existing transcript must drive A-roll/evidence/B-roll decisions | A new explainer is requested | Approved beats hand off |
## Fuzzy semantic routing test
| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 把这份口播稿拆成可审的 B-roll 方案 | transcript-broll-planner | Transcript-led planning |
| 哪些句子要保留 A-roll，哪些要补数据画面 | transcript-broll-planner | A-roll/evidence split |
| 标出缺少的截图和必须准确的数字 | transcript-broll-planner | Evidence audit |
| 从一个主题做完整科普片 | make-explainer-video | No existing transcript |
| 直接生成一个城市夜景镜头 | generate-video | No planning request |
| 给视频加字幕 | make-kinetic-typography | Subtitle outcome |
## Security review
- Secret and environment access: none retained.
- Remote domains and uploads: authorized materials/native route only.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: per-shot durable keys, no blind retry.
- Unsafe or removed behavior: source Canvas/grouping and claim invention removed.
## Validation evidence
- Structural intake check: `npm run skills:intake -- validate transcript-broll-planner`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
