# External Skill intake: dodge-game-video-generator

- Mechanism version: 2
- Status: active

## Provenance

- Source: recorded in creation command
- Source revision: content hashes recorded in the initial record
- Author or organization: MiniMax export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; not executed

## Product decomposition

- User-visible outcomes: 角色参考驱动的箭头躲避游戏短片
- Required inputs: 授权角色图、方向、比例
- External AI operations: source media generation or analysis only
- Deterministic operations: requirement capture, plan, asset-role ledger, acceptance review
- Preservation and quality claims: 固定镜头的二维躲避动画

## Package decision

- Intake result: standalone Atom candidate; never merge this outcome during intake
- Proposed standalone Atom: dodge-game-video-generator
- Router compositions: may hand off verified atomic media or deterministic operations to installed Skills
- Rejected or unsupported behavior: 可玩游戏、Hub、固定 H3
- Lifecycle decision and rationale: promoted as standalone ; paid representative execution remains unrun

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `generate-video` | 0.68 | Adjacent delivery | 固定镜头的二维躲避动画 | The narrower existing result is requested | Use only after the candidate plan is accepted |

- Proposed frontmatter distinction: 固定镜头的二维躲避动画
- Highest-risk ambiguity: generic media or planning wording
- Router scoring evidence: outcome, input roles, preservation contract, and exclusions

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 做一个角色参考驱动的箭头躲避游戏短片 | dodge-game-video-generator | Candidate outcome |
| 用我的素材完成角色参考驱动的箭头躲避游戏短片 | dodge-game-video-generator | Input and preservation contract |
| 先规划再交付角色参考驱动的箭头躲避游戏短片 | dodge-game-video-generator | Candidate workflow |
| 做一个普通相邻结果 | generate-video | No candidate contract |
| 只做一个普通视频镜头 | generate-video | Atomic video only |
| 只编辑已有视频 | combine-videos | Existing clips only |

## Security review

- Secret and environment access: none
- Remote domains and uploads: authorized assets and native routes only
- Installation and executable code: source tools not copied or executed
- Retry and provider-spend behavior: durable receipt per future run; no blind retry
- Unsafe or removed behavior: 可玩游戏、Hub、固定 H3

## Validation evidence

- Structural intake check: pending command execution
- Semantic routing test: six cases recorded above
- Source record packaged: this intake and capability map only
