# External Skill intake: lip-product-ad-generator

> Current intake mechanism. This is an independent candidate, not an installed Skill.

- Mechanism version: 2
- Status: active

## Provenance

- Source: `/Users/jasonjiang/Downloads/minimax skill/lip-product-ad-generator`
- Source revision: `sha256:33f9a1a808d5ba4e94f233cf0b682563d813ddedfb468c97884fc0003a66fa34`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; neither executed

## Product decomposition

- User-visible outcomes: a 30-second horizontal lip-product commercial with locked model/product anchors, storyboard, shot segments, and a final composite.
- Required inputs: lip product reference or creative brief.
- Optional inputs: model reference, script, pack copy, color, claimed finish, and licensed music.
- External AI operations: portrait, still life, reference-led video, audio generation, and compositing.
- Deterministic operations: asset order, storyboard, shot plan, copy placement checks, and final QA.
- State, chaining, polling, and publication: approve portrait, product still, and storyboard before clips; durable key per paid output; no automatic publication.
- Preservation and quality claims: model identity, package form, label placement, finish, shade, natural hand/product interaction, and readable end card.

## Package decision

- Intake result: standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `lip-product-ad-generator`.
- Router compositions: reference image route and `generate-video` make approved shots; `combine-videos` handles the cut.
- Rejected or unsupported behavior: automatic music generation, fixed 30-second guarantee, mandatory source Canvas prompts, and blind segment retries. When Canvas is available, it may retain the approved storyboard and source anchors.
- Lifecycle decision and rationale: promoted as standalone `skills/lip-product-commercial`; it owns a lip-specific proof-and-consistency commercial contract.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `product-detail-page` | 0.67 | Present a cosmetic product | A moving lip-color proof commercial is required | A static commerce page is required | Product facts can be shared |
| `generate-video` | 0.63 | Make commercial video | Lip application, shade, packaging, and natural proof shots must stay consistent | A general product clip is requested | Candidate supplies approved shots |

- Proposed frontmatter distinction: lip-product TVC with evidence shots and anchor gates, not a generic beauty reel.
- Highest-risk ambiguity: “美妆广告” can refer to skincare or eye makeup.
- Router scoring evidence: lips, shade/finish proof, applicator/package detail, and product/model interaction.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 用这支唇釉做 30 秒横版广告，保留瓶身和色泽 | lip-product-ad-generator | Lip-specific product and finish contract |
| 先用模特图、产品静物和分镜锁定口红广告 | lip-product-ad-generator | Required anchor gates |
| 做唇泥的上唇、质地和收尾 packshot 短片 | lip-product-ad-generator | Lip proof shots |
| 为护肤精华拍一支视频 | generate-video | Not a lip product |
| 设计口红商品详情页 | product-detail-page | Static commerce artifact |
| 合成现成的广告片段 | combine-videos | No new product generation |

## Security review

- Secret and environment access: none retained.
- Remote domains and uploads: authorized model/product assets and native routes only.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: regenerate only a known failed shot with a linked new key.
- Unsafe or removed behavior: autonomous music generation, source tool calls, and blind retries are removed.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate lip-product-ad-generator`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
