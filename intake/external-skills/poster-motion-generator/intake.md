# External Skill intake: poster-motion-generator
- Mechanism version: 2
- Status: active
## Provenance
- Source: `/Users/jasonjiang/Downloads/minimax skill/poster-motion-generator`
- Source revision: `sha256:200bc53548489b395c958b5bd6c6d24964174fe7ff9153431dbe7ebfb8e38515`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`, bilingual motion references; none executed
## Product decomposition
- User-visible outcomes: one 8–15 second single-take animated poster that restores a supplied poster as its readable final lock frame.
- Required inputs: poster image.
- Optional inputs: motion direction, ratio, duration, and native-audio preference.
- External AI operations: poster analysis and reference-led video generation.
- Deterministic operations: ratio mapping, layer analysis, timed motion plan, and text/lock-frame QA.
- State, chaining, polling, and publication: approve direction before one durable-key run; no automatic publication.
- Preservation and quality claims: layout, hierarchy, readable text, core subject, full frame, and final poster lock.
## Package decision
- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `poster-motion`.
- Router compositions: `generate-video` executes the approved shot.
- Rejected or unsupported behavior: source template copying, fixed provider, automatic audio, blind retry, and mandatory Canvas documents.
- Lifecycle decision and rationale: promoted as standalone `skills/poster-motion`; its final-lock-frame poster contract is independent.
## Similar Skill boundaries
| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `generate-video` | 0.72 | Create a video | Supplied poster and readable final lock frame are required | General shot is requested | Candidate provides shot contract |
## Fuzzy semantic routing test
| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 把这张海报做成 10 秒一镜到底动态版 | poster-motion-generator | Poster final-lock-frame contract |
| 标题逐层出现后必须回到原海报 | poster-motion-generator | Readable final composition |
| 让产品海报有纸卷展开动效 | poster-motion-generator | Poster-specific direction |
| 生成一段产品旋转短片 | generate-video | No poster anchor |
| 让插画里的云动起来 | animate-image | Still animation only |
| 拼接三个片段 | combine-videos | Existing clips |
## Security review
- Secret and environment access: none retained.
- Remote domains and uploads: authorized poster and native route only.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: durable key, receipt polling, no blind retry.
- Unsafe or removed behavior: source tools and fixed model route removed.
## Validation evidence
- Structural intake check: `npm run skills:intake -- validate poster-motion-generator`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
