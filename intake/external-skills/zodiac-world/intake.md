# External Skill intake: zodiac-world
- Mechanism version: 2
- Status: active
## Provenance
- Source: `/Users/jasonjiang/Downloads/minimax skill/zodiac-world`
- Source revision: `sha256:a38ef80bafd38da3efddee44da1879f407de197aca486c4f6ec28b1198e3ab31`
- Author or organization: Community source export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; neither executed
## Product decomposition
- User-visible outcomes: a children’s English story-and-song episode package with reusable characters/scenes, script, keyframes, and vertical clips.
- Required inputs: original chapter, focus character, and target expression.
- Optional inputs: authorized character/scene sheets, ratio, duration, and licensed audio.
- External AI operations: character/scene sheets, keyframes, voice/song, clips, and assembly.
- Deterministic operations: age-appropriate script, expression repetition, asset registry, storyboard, and QA.
- State, chaining, polling, and publication: approvals before asset and video stages; no automatic publication.
- Preservation and quality claims: child safety, recurring-character and scene consistency, clear English-learning objective, and source-independent original world.
## Package decision
- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `children-english-story-episode`.
- Router compositions: character sheets, image route, `$generate-video`, and `$combine-videos`.
- Rejected or unsupported behavior: source world/character copying, branded studio-style imitation, voice IDs, auto song generation, and blind retry.
- Lifecycle decision and rationale: promoted as standalone `skills/children-english-story-episode`; reusable learning-episode production is independent.
## Similar Skill boundaries
| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `character-reference-sheet` | 0.69 | Keep characters consistent | A complete English-learning episode with reusable scene assets is required | Only a character sheet is needed | Sheets are upstream assets |
## Fuzzy semantic routing test
| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 用原创动物角色教孩子 “May I join?” | zodiac-world | Story-and-learning episode package |
| 做 45 秒竖版英语故事加结尾童谣计划 | zodiac-world | Episode and song-outline structure |
| 先锁定角色、场景比例再生成分镜 | zodiac-world | Recurring asset consistency |
| 给我的角色做四视图 | character-reference-sheet | Sheet only |
| 写一个短剧剧本 | write-short-drama-series | No learning episode asset plan |
| 合成已验收动画片段 | combine-videos | Existing clips |
## Security review
- Secret and environment access: none retained.
- Remote domains and uploads: authorized original assets/native route only.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: durable keys and approval gates.
- Unsafe or removed behavior: source world, voice IDs, style imitation, and auto song generation removed.
## Validation evidence
- Structural intake check: `npm run skills:intake -- validate zodiac-world`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
