# External Skill intake: papercraft-stop-motion-explainer

> Current intake mechanism. This is an independent candidate, not an installed Skill.

- Mechanism version: 2
- Status: active

## Provenance

- Source: `/Users/jasonjiang/Downloads/minimax skill/papercraft-stop-motion-explainer`
- Source revision: `sha256:8675bbc5085f4c400969ab3d70062e84e672707b6cc25d97ed5b12c08af179e0`
- Author or organization: Official featured design export
- Reviewed date: 2026-08-23
- Files inspected: `SKILL.md`, `meta.yaml`; neither executed

## Product decomposition

- User-visible outcomes: a science/knowledge production package or selected assets using layered handmade papercraft, miniature dioramas, and stop-motion mechanisms.
- Required inputs: topic, core learning points, or source material.
- Optional inputs: audience, duration, ratio, delivery scope, voiceover, and licensed sound.
- External AI operations: previews, stills, video generation, and optional voice/audio work.
- Deterministic operations: learning goal, metaphor, art direction, character/set/asset design, storyboards, and review checklists.
- State, chaining, polling, and publication: staged approvals before paid assets; durable key per planned asset; no automatic publication.
- Preservation and quality claims: physical paper fibers, depth planes, shadows, mechanical movement, explanatory clarity, and no smooth CG look.

## Package decision

- Intake result: standalone Atom candidate; never merge this source outcome into an existing Skill during intake.
- Proposed standalone Atom: `papercraft-stop-motion-explainer`.
- Router compositions: image route provides approved previews/stills; `generate-video` creates approved shots; `combine-videos` assembles clips.
- Rejected or unsupported behavior: mandatory source Canvas-document rules, automatic voice/audio generation, fixed provider route, card UI dependence, and source tool calls. When Canvas is available, retain the package, storyboard, and approvals there; otherwise use chat or local delivery.
- Lifecycle decision and rationale: promoted as standalone `skills/papercraft-stop-motion-explainer`; the educational layered-papercraft production system remains independently owned.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `make-explainer-video` | 0.79 | Explain a topic visually | Paper diorama, physical layers, and stop-motion mechanisms are essential | A general explainer treatment is requested | Candidate supplies material-specific treatment |
| `generate-video` | 0.57 | Create a video shot | A planned papercraft shot must retain physical material and staged depth | A general shot is needed | Candidate hands off approved shot brief |

- Proposed frontmatter distinction: knowledge explainer built as a layered physical-paper stop-motion world, not generic animation or a flat paper filter.
- Highest-risk ambiguity: “纸艺视频” can mean a single stylized shot rather than an explainer package.
- Router scoring evidence: learning outcome, paper mechanisms, multi-plane diorama, staged approvals, and anti-smooth-CG rules.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 用纸雕定格动画讲清楚火山喷发 | papercraft-stop-motion-explainer | Educational papercraft mechanism |
| 给这节课设计纸偶、分层布景和 30 秒分镜 | papercraft-stop-motion-explainer | Full production package |
| 做一个立体书风格的知识短片，纸片要有阴影和拉杆 | papercraft-stop-motion-explainer | Physical layered-paper contract |
| 用极简线条小人讲火山喷发 | make-explainer-video | Different visual grammar |
| 只生成一段普通的纸船漂流镜头 | generate-video | General atomic clip |
| 拼接已验收的纸艺片段 | combine-videos | Clips already exist |

## Security review

- Secret and environment access: none retained.
- Remote domains and uploads: authorized learning material and native routes only.
- Installation and executable code: none retained.
- Retry and provider-spend behavior: approved plan gates each paid run; unknown receipts reconcile.
- Unsafe or removed behavior: mandatory source Canvas documents, automatic voice/music, fixed route, and source tool calls are removed; Canvas use is capability-gated.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate papercraft-stop-motion-explainer`.
- Semantic routing test: six cases recorded above.
- Source record packaged: intake and capability map only.
