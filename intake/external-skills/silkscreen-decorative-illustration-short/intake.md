# External Skill intake: silkscreen-decorative-illustration-short
- Mechanism version: 2
- Status: active
## Provenance
- Source: `/Users/jasonjiang/Downloads/minimax skill/silkscreen-decorative-illustration-short`
- Source revision: `sha256:fc6a15e479a7ca031d7cbee6af8a2234fb776f82496eb0653dfb386693ed30e9`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; neither executed
## Product decomposition
- User-visible outcomes: a refined decorative print-illustration short with paired wide/close shots and tactile SFX-only master.
- Required inputs: theme or authorized visual reference.
- Optional inputs: ratio, duration, palette, and optional licensed BGM request.
- External AI operations: key-art, shot generation, audio, and assembly.
- Deterministic operations: style system, two-shot rhythm, action/SFX plan, and QA.
- State, chaining, polling, and publication: approve art direction before planned assets; no automatic publication.
- Preservation and quality claims: fine closed linework, flat print color, decorative density, restrained camera, and no brand copying.
## Package decision
- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `decorative-print-short`.
- Router compositions: image route, `generate-video`, and `combine-videos` for accepted clips.
- Rejected or unsupported behavior: source brands/designs, automatic music/audio, fixed provider, and blind retry.
- Lifecycle decision and rationale: promoted as standalone `skills/decorative-print-short`; its paired luxury-print shot grammar is independent.
## Similar Skill boundaries
| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `generate-video` | 0.66 | Make a clip | Decorative print style and paired shot structure matter | General shot is wanted | Candidate provides plan |
## Fuzzy semantic routing test
| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 做一支丝印装饰感的茶席短片 | silkscreen-decorative-illustration-short | Print illustration grammar |
| 每个场景需要全景再近景的精致短片 | silkscreen-decorative-illustration-short | Paired shot contract |
| 只要动作同步的瓷器轻响 | silkscreen-decorative-illustration-short | SFX-only master |
| 生成普通的奢侈品产品镜头 | generate-video | No print contract |
| 做一张装饰插画 | poster-design | Still deliverable |
| 拼接已验收片段 | combine-videos | Existing clips |
## Security review
- Secret and environment access: none retained.
- Remote domains and uploads: authorized assets/native route only.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: durable keys and receipt polling.
- Unsafe or removed behavior: protected design copying and automatic audio removed.
## Validation evidence
- Structural intake check: `npm run skills:intake -- validate silkscreen-decorative-illustration-short`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
