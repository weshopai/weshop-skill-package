# Handoff

## 2026-08-20: MIT crawl intake batch 2 (rows 6–10)

- Pinned and verified MIT sources: `zhanghaonan777/Seedance2-skill` at `4ecc0046eee2c56d517fa9e4fbe802527d39ddb3`, `zyz254009-crypto/script-to-shootable-storyboard` at `e1ee698cf5cc94b035560937540134fb7bdb0a07`, `CK42BB/vox-explainer-skill` at `7003225dc3ed1dee9e2ef8b91b05b82c04691aa9`, `rediumvex/viral-hooks-skill` at `e26b339ccf452abf43bb97df54603e4781ae0a8e`, and `YvonneMovingon/short-drama-skills` at `6d632fd7d790cfa45ccf81916bf0e26efd7744c7`. Completed a provenance and capability map for each; no upstream code was executed.
- Updated `generate-video` with one visible creative change and source-composition/camera compatibility checks. Removed the upstream Volcengine client, credential flow, callback/task controls, trend scraping, fixed platform-limit claims, and automatic fallback.
- Added `plan-film-storyboard` for fact-traceable, timed atomic film shots with blocking, sound, physical continuity, coverage, rights unknowns, risk/fallback briefs, and downstream generation handoffs. It remains separate from comic-page planning and does not call a plan a finished production.
- Added `make-explainer-video` for source-backed beat scripts, narration-first timing, original visual anchors, per-beat media, subtitles, deterministic assembly, audio ducking, and end-to-end QC. Named-publisher style imitation, Atlas execution, stale price/model claims, and implied unsupported standalone audio generation were removed.
- Added `write-short-video-hooks` for three truthful, distinct, platform-fit openings with body-payoff validation. The upstream 100-formula database and preview were not copied and virality is not guaranteed.
- Full MIT notices and pinned source links are packaged with every adapted installable Skill. Paid representative media generation was not run. Four affected Skills passed quick validation; TypeScript checks, 73 core tests, 2 updater/install tests, model catalog/routing validation, docs/maintainer validation, website build, an 83-Skill install-all smoke test, and `git diff --check` passed.

## 2026-08-20: MIT crawl intake batch 1 (rows 1–5)

- Parsed `/Users/jasonjiang/Downloads/github_skill_20260820_140556.csv`: 100 candidates contain 44 rows labeled MIT. Added `intake/mit-crawl-20260820.md` as the durable queue; every MIT label still requires a pinned revision and repository license verification.
- Completed isolated intake and capability maps for `ziguishian/xhs-visual-director-skill` at `5c730c688f2c7e64f798d611608997ffba43813d`, `0xsline/short-drama` at `8979a428c31a865421d661bdb606e24314b683a0`, `worldwonderer/drama-skills` at `3b9f807cd384cd63324d0856d92950be4c95b40d`, `nutllwhy/seedance-tvc-director` at `9fef40f955f476551eb7e6fc5a7355f7dbc44181`, and `jijiutong/ai-visual-director` at `b47f664ca00c50539c5365109e9360f82170972d`. Repository-root MIT licenses were verified and no upstream code was executed.
- Added `create-social-carousel`: one ordered mobile-first carousel, a visual-master approval gate, one GPT Image 2 operation per page, complete-sequence QA, and page-scoped recovery.
- Merged the two complementary short-drama sources into `write-short-drama-series`: source-fact ledger, locked bible, exact-count episode arc, shootable requested scripts, and an accepted-episode continuity ledger. It performs no paid generation.
- Added `make-product-commercial`: truthful claim lock, product-caused treatment, timed atomic shots, product/reference-aware model routing, durable per-shot operations, accepted-clip assembly, and end-to-end commercial QA.
- Did not promote the broad `ai-visual-director` hierarchy. Its useful stage/anchor concepts map to the package's existing narrow Atoms and adaptive Router, avoiding a duplicate monolithic orchestrator.
- Packaged source revision links and full MIT notices with all three adapted Atoms. No paid representative generation was run. All three Skills passed `quick_validate.py`; `git diff --check`, TypeScript checks, 73 core tests, 2 updater/install tests, model catalog/routing validation, README and maintainer-doc validation, the generated website build, an 80-Skill install-all smoke test, and status checks for all three new Skills passed.

## 2026-08-20: first-party AI Comic workflow decomposition

- Reviewed the user's `Jason12196/Ai-Comic-Generator` at commit `f1a86c3aad624cd52c273707f789a69ab7689ae0` as first-party product evidence; did not use the external Skill intake template or copy its UI, provider adapters, deployment, or secret-storage behavior.
- Extracted the useful Prompt contracts: story expansion, visual-style selection, structured character extraction, exact-count pagination, character design sheets, reference-bound page rendering, per-page progress, and targeted page regeneration.
- Added `plan-comic-storyboard` for a validated story/character/page/panel manifest and `render-comic-page` for one reference-aware finished page. Enhanced `character-reference-sheet` with comic expression and invariant handoffs.
- The Router composes storyboard planning, only the missing character sheets, one render operation per page, and `add-speech-bubble` only when accepted artwork needs deterministic copy repair.
- Replaced provider-specific Gemini/Nano fallback behavior, automatic identical timeout retries, and unconditional page fan-out with the package's GPT Image 2 Medium/2K route, durable operation keys, terminal polling, continuity-aware sequencing, and page-scoped error-responsive recovery.
- No paid image generation was run. Both new Skills, the enhanced character Skill, and the Router passed quick validation; `npm run check`, 73 tests including a five-node comic DAG dry run, model validators, docs validators, web build, install smoke tests, and `git diff --check` passed before the original commit and are rerun against this repository during the port.

## 2026-08-20: `ip-as-logo` external Skill intake and adaptation

- Tested `npm run skills:intake` against `s1dashu/ip-as-logo-skill` and pinned the review to commit `88031b38854ebbcc41eb71ab6b169e9b1772e4fb`.
- Confirmed the upstream MIT license and reviewed `SKILL.md`, `README.md`, `LICENSE`, and the repository tree. No upstream code was executed and the showcase asset was not copied.
- Promoted the useful behavior as a separate `create-mascot-logo` Atom instead of broadening `create-logo`: it owns three-direction discovery, separately labeled square candidates, a simple rounded silhouette contract, and a controlled color/background contract.
- Replaced provider-agnostic generation and subagent fan-out with `gpt-image` v1.0 / GPT Image 2 Medium/2K, `batchCount: 1`, one stable operation key per candidate, terminal polling, visible acceptance reporting, and bounded replacement behavior.
- Packaged upstream attribution and the complete MIT notice in the promoted Skill.
- No paid representative image run was made; static Skill and repository validation remain the promotion evidence for this change.

## 2026-08-20: built-in WeShop CLI

- Added the `weshop-skill` package command as a direct WeShop OpenAPI executor; the separate official `weshop-cli` package is not required.
- Commands cover image upload, generic Standard/Premium Agent submission, agent info, one-shot status, and terminal polling.
- Local image values use the explicit `file:` prefix inside `--input` and `--params` JSON; repeated paths are uploaded once per command.
- Every create-run requires a caller-provided stable key and is persisted before submission in `~/.weshop-skill-package/operations.json`. Existing keys cannot be submitted twice; `weshop-skill operation <key>` inspects the durable record.
- `WESHOP_API_KEY` remains environment-only and is sent only to `https://openapi.weshop.ai`.
- The API key's account permissions and credits remain authoritative; bundling execution code does not grant Premium access.
- Validation required before release: `npm test`, model validators, docs validation, web build, Router Skill quick validation, and CLI help smoke test.
- No commit or push was performed.

## 2026-08-20: maintainer Skill intake workflow

- Added `CONTRIBUTING.md` as the maintainer entrypoint; the root README remains user-facing.
- Added separate maintainer guides for first-party Atom creation and external project adaptation.
- External projects now start under `intake/external-skills/<slug>/`, outside the installable `skills/` registry.
- `npm run skills:intake -- ...` records immutable source provenance, license/reuse mode, product decomposition, security review, and a per-operation external-provider-to-WeShop substitution map.
- Promotion requires an explicit decision to update an Atom, create an Atom, compose existing Atoms, retain a deterministic operation, or reject unsupported behavior.
- The intake command never clones, downloads, executes, or installs the external source.
- No commit or push was performed for this workflow change.
