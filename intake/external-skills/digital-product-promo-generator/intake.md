# External Skill intake: digital-product-promo-generator

- Mechanism version: 2
- Status: active

## Provenance

- Source: recorded in creation command
- Source revision: content hashes recorded in the initial record
- Author or organization: MiniMax export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; not executed

## Product decomposition

- User-visible outcomes: 数字产品或网页的真实界面宣传片方案
- Required inputs: URL或授权截图、品牌资产、时长
- External AI operations: source media generation or analysis only
- Deterministic operations: requirement capture, plan, asset-role ledger, acceptance review
- Preservation and quality claims: 真实界面优先的产品宣传

## Package decision

- Intake result: standalone Atom candidate; never merge this outcome during intake
- Proposed standalone Atom: digital-product-promo-generator
- Router compositions: may hand off verified atomic media or deterministic operations to installed Skills
- Rejected or unsupported behavior: 外部抓取、Hub 音频、固定模型
- Lifecycle decision and rationale: promoted as standalone ; paid representative execution remains unrun

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `brand-promo-video-generator` | 0.68 | Adjacent delivery | 真实界面优先的产品宣传 | The narrower existing result is requested | Use only after the candidate plan is accepted |

- Proposed frontmatter distinction: 真实界面优先的产品宣传
- Highest-risk ambiguity: generic media or planning wording
- Router scoring evidence: outcome, input roles, preservation contract, and exclusions

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 做一个数字产品或网页的真实界面宣传片方案 | digital-product-promo-generator | Candidate outcome |
| 用我的素材完成数字产品或网页的真实界面宣传片方案 | digital-product-promo-generator | Input and preservation contract |
| 先规划再交付数字产品或网页的真实界面宣传片方案 | digital-product-promo-generator | Candidate workflow |
| 做一个普通相邻结果 | brand-promo-video-generator | No candidate contract |
| 只做一个普通视频镜头 | generate-video | Atomic video only |
| 只编辑已有视频 | combine-videos | Existing clips only |

## Security review

- Secret and environment access: none
- Remote domains and uploads: authorized assets and native routes only
- Installation and executable code: source tools not copied or executed
- Retry and provider-spend behavior: durable receipt per future run; no blind retry
- Unsafe or removed behavior: 外部抓取、Hub 音频、固定模型

## Validation evidence

- Structural intake check: pending command execution
- Semantic routing test: six cases recorded above
- Source record packaged: this intake and capability map only
