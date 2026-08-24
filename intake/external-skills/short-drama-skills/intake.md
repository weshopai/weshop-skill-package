# External Skill intake: short-drama-skills

> Current intake mechanism. Do not use legacy records without this marker as templates; they may reflect the retired merge-era policy.

- Mechanism version: 2
- Status: active

## Provenance

- Source: https://github.com/YvonneMovingon/short-drama-skills
- Source revision: 6d632fd7d790cfa45ccf81916bf0e26efd7744c7
- Author or organization: YvonneMovingon / LuxReal
- Reviewed date: 2026-08-24
- Files inspected: `LICENSE`, `README.md`, `README.zh-CN.md`, and all seven `skills/*/prompt.md` prompt-rule documents; no files were executed.

## Permission decision

- License evidence: Repository-root MIT license, copyright 2025 LuxReal.
- Required notices: Preserve the complete MIT notice if substantial upstream text is copied or redistributed.
- Material allowed to reuse: General ideas for shot pacing, observable action, dialogue preservation, continuity grouping, and cinematic prompt fields.
- Material that must be independently authored: Any Atom contract, Router behavior, WeShop mapping, prompt wording, model choice, and media execution workflow.
- Decision: Preserve this intake as evidence only. Do not copy upstream prompt text into the package during intake.

## Product decomposition

- User-visible outcomes: A script segment translated into timed, continuous shots and structured, model-ready video prompt text; specialized variants cover emotional dialogue, action, high-intensity moments, and slow cinematic moments.
- Required inputs: Script or scene description; desired language; any fixed dialogue, characters, setting, assets, and content limits.
- Optional inputs: Vertical ratio, target duration, pacing/style, clip sequence, sound direction, and permitted adaptation level.
- External AI operations: None in the source; it is a collection of LLM prompt rules, not a media client.
- Deterministic operations: Duration budgeting, field formatting, continuity grouping, and dialogue-preservation checks.
- State, chaining, polling, and publication: It has no durable provider state, generation receipt, polling, or publication behavior.
- Preservation and quality claims: Preserve source dialogue and named characters; make action/emotion observable; retain spatial and action continuity; avoid unnecessary cuts.

## Package decision

- Intake result: Promoted as seven independent text Atoms; no aggregate prompt-pack Atom.
- Proposed standalone Atoms: `short-drama-narrative-breakdown`, `short-drama-emotion-breakdown`, `short-drama-action-breakdown`, `short-drama-continuity-split`, `short-drama-video-prompt-polish`, `short-drama-high-impact-prompt`, and `short-drama-slow-cinematic-prompt`.
- Router compositions: `write-short-drama-series` supplies accepted scripts and continuity; the breakdown Atoms provide selected text results; the polishing Atoms format approved shots; `generate-video` receives one explicitly approved atomic shot. `plan-film-storyboard` remains the owner of complete shootable manifests.
- Rejected or unsupported behavior: LuxReal links and product claims, source-provider coupling, automatic media submission, generated subtitles, automatic asset assumptions, hidden state, and automatic publication.
- Lifecycle decision and rationale: Promoted into seven separately named text outcomes at the user's direction. Each has independently authored wording, explicit routing boundary, and no media execution route.

## Similar Skill boundaries

Complete one row for every materially similar or adjacent installed Skill. Similar Skills remain independent.

Calibrate the static relationship score from outcome, input roles, preservation, deliverable, and exclusions: 0.00–0.24 incidental; 0.25–0.49 shared component; 0.50–0.74 closely related but clearly different; 0.75–0.89 strongly adjacent; 0.90–1.00 nearly the same absent the recorded decisive boundary. It is discovery metadata, never a merge or runtime-selection score.

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `plan-film-storyboard` | 0.88 | Script-to-shot planning with camera, timing, sound, continuity, and AI-video handoffs | The accepted deliverable is a compact, generation-ready prompt pack for a selected short-drama scene with a pacing mode | A full shootable manifest, coverage plan, source trace, blocking, or end-to-end continuity validation is required | The storyboard manifest may hand selected atomic shots to this candidate; do not duplicate the full manifest |
| `write-short-drama-series` | 0.56 | Vertical short-drama source material and continuity | Episodes/scenes already exist and need shot prompts | A premise or story needs a bible, episode arc, continuity ledger, or scripts | Accepted scripts and continuity are upstream input |
| `film-reference-prompt-writer` | 0.48 | Reviewable prompt briefs for film/video work | Multiple timed scene shots with dialogue-preservation and pacing constraints are needed | One reference-driven prompt brief and its asset-role contract are requested | The selected prompt brief can be decomposed into candidate shots after approval |
| `generate-video` | 0.42 | Video shot direction | The requested result is text prompts only | The user authorizes a paid run for one video asset | Pass one approved atomic shot to generation |

- Proposed frontmatter distinction: “Use for a text-only, timed short-drama shot-prompt pack after the scene is accepted; do not use for a full storyboard manifest, series writing, or media generation.”
- Highest-risk ambiguity: “Storyboard” can mean either a shot manifest or a prompt pack. The decisive evidence is requested deliverable scope, source-fact traceability, coverage/continuity requirement, and whether the user authorizes generation.
- Router scoring evidence: The source's four breakdown rules and three polishing rules all produce shot-level text. It lacks the installed storyboard Skill's ledger, blocking/coverage, source trace, and generation handoff acceptance checks.

## Fuzzy semantic routing test

Before closing the intake, test natural-language wording against the candidate and every plausible installed neighbor. Add at least three requests that should select this candidate and three ambiguous requests that should select a named installed neighbor. Explain the decisive boundary; do not test keywords alone.

| Natural-language request | Expected Skill | Decisive boundary |
| --- | --- | --- |
| 把这段已确认的 90 秒竖屏短剧拆成可直接喂给视频模型的镜头提示词，保留每句台词 | short-drama-skills | Text-only multi-shot prompt pack with dialogue preservation |
| 给这场争吵按权力反转和反应镜头拆成 3–6 秒镜头 | short-drama-skills | Short-drama dialogue pacing, not a full production manifest |
| 将这段追逐戏写成高能短剧镜头提示词，明确动作、机位和时长 | short-drama-skills | Timed action-prompt pack is the requested final output |
| 为整集做可拍摄的分镜表，含调度、轴线、道具交接和连续性检查 | plan-film-storyboard | Complete shootable manifest and continuity validation are required |
| 把这个梗概扩展成 20 集竖屏短剧，并写前 3 集 | write-short-drama-series | The outcome is series development and scripts, not shot prompts |
| 基于这三张授权图写一个单镜头视频生成 brief，先让我确认 | film-reference-prompt-writer | One reference-role brief rather than a scene-wide prompt pack |
| 生成一条 5 秒的雨夜追逐视频 | generate-video | A media asset, not text, is requested |

## Security review

- Secret and environment access: None found.
- Remote domains and uploads: README links to LuxReal, but no remote service is adopted; no upload path is copied.
- Installation and executable code: No executable code is included, installed, copied, or run.
- Retry and provider-spend behavior: The source initiates no paid operation. Any promoted downstream generation must use the package's durable-key receipt and terminal-polling rules.
- Unsafe or removed behavior: Unverified LuxReal workflow claims, product links, automatic media generation, no-subtitle instruction as a universal guarantee, and any provider-specific behavior.

## Validation evidence

- Structural intake check: `npm run skills:intake -- validate short-drama-skills`.
- Semantic routing test: Seven outcome/boundary cases recorded above.
- Source record packaged: Intake and capability map only; no upstream source files or assets copied.
