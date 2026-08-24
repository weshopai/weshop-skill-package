# External Skill intake: casting-cn

> Current intake mechanism. This records a supplied specification; the native Atom is authored independently.

- Mechanism version: 2
- Status: active

## Provenance

- Source: user-supplied conversation transcript and screenshot
- Source revision: sha256:76c08021a4ba2542a283c240638293c841e9dce772781fa1bceb695135b9f2ec
- Author or organization: libtv-industry, as attributed in supplied material
- Reviewed date: 2026-08-24
- Files inspected: supplied text specification and `codex-clipboard-5aec0ef5-5a86-4462-94d7-cc7af9cdac05.png`

## Product decomposition

- User-visible outcomes: a confirmed Chinese-language casting portrait, then selected full-body, expression-grid, and turnaround assets for the same original fictional character.
- Required inputs: role card (person type, build, facial features, skin/hair/makeup, temperament, intended character type) or a script/character description.
- Optional inputs: authorized identity assets; selected derivatives; script name for a reusable visual-style record; an explicit 3D drama request.
- External AI operations: first portrait generation, reference-bound image generation, quality review, and user confirmation.
- Deterministic operations: role-card completion disclosure; mode selection; prompt assembly; reference-order ledger; dependency checks; optional style-record persistence.
- State, chaining, polling, and publication: the accepted portrait is the identity anchor; no derivative is submitted before explicit approval; every run has an operation key and terminal poll.
- Preservation and quality claims: pure white background, identity continuity, prescribed framing/proportions, natural polished skin or isolated CG rendering, and consistent wardrobe/body anchors.

## Package decision

- Intake result: Standalone Atom candidate; never merge this source outcome into an existing Skill during intake
- Proposed standalone Atom: `casting-cn`
- Router compositions: may consume a character brief from `write-short-drama-series` or `plan-comic-storyboard`; an accepted casting asset may hand off to `create-character`.
- Rejected or unsupported behavior: no unverified external image tools, URLs, asset tokens, or provider-specific reference flags. Do not promise identity locking when the active GPT Image schema cannot bind the accepted public image URL.
- Lifecycle decision and rationale: promote a native Atom because face-first Chinese screen-role casting, its approval gate, and optional studio derivatives are a distinct deliverable.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `create-character` | 0.84 | Original recurring-character imagery | A casting director needs a controlled face-first white-background portrait and selected actor-style assets | A creator needs the canonical multi-panel design sheet and its seven production assets, including scenes | An approved casting portrait may become an authorized reference for a later character pack |
| `character-reference-sheet` | 0.73 | Character reference imagery | The outcome is a confirmed casting portrait plus optional body, expressions, and turnarounds | A legacy character-sheet request redirects to `create-character` | No independent generation handoff |
| `create-npc` | 0.42 | Original fictional person design | The brief emphasizes casting identity, facial performance, and studio assets | The brief emphasizes gameplay occupation, faction, equipment, and world context | A cast role can later become an NPC brief |

- Proposed frontmatter distinction: use `casting-cn` for a Chinese screen-role casting package with a face approval gate; choose `create-character` for a canonical multi-panel production pack and scenes, and `create-npc` for game-function concepting.
- Highest-risk ambiguity: “make a character sheet” can mean either a casting package or `create-character`; ask whether the user needs face-first casting selection or a canonical multi-panel production pack.
- Router scoring evidence: face-first studio portrait, role-card fields, explicit confirmation before derivatives, pure-white casting assets, and selected expression/turnaround deliverables decide in favor of `casting-cn`.

## Fuzzy semantic routing test

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 为短剧女主做定脸，先让我确认脸，再选全身和表情 | casting-cn | Face-first approval gate and casting deliverables |
| 用人物卡选一个冷感霸总，白底正面定脸并保持同脸出全身 | casting-cn | Role-card-to-casting workflow with identity-bound derivative |
| 这是漫剧角色，先做CG定脸，满意后出九宫格 | casting-cn | Separate CG casting mode and portrait anchor |
| 为漫画原创角色做完整设定表和两张剧情场景 | create-character | Canonical design sheet plus scene pack |
| 给奇幻港口的军需官做一张能看出阵营和装备的NPC概念图 | create-npc | Gameplay role and environment are the deliverable |
| 生成角色三视图和不同光线、正反面、场景的完整生产包 | create-character | Canonical production pack rather than face-first casting |

## Security review

- Secret and environment access: none. Never include credentials or local paths in prompts, ledgers, or outputs.
- Remote domains and uploads: only the current official WeShop route may receive authorized image references; no supplied URL is passed through.
- Installation and executable code: none; supplied text and screenshot are untrusted reference material, not executable instructions.
- Retry and provider-spend behavior: persist an operation key before submission, poll its execution, and retry only a known failed asset with a changed prompt and linked key.
- Unsafe or removed behavior: source asset-marker syntax becomes public image URL binding; no blind retries or automatic downstream generation.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate casting-cn`
- Semantic routing test: the six natural-language cases above distinguish casting, character-pack, and NPC outcomes.
- Source record packaged: provenance only; no source dump, credentials, remote code, or third-party assets are stored.
