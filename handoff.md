# Handoff

## 2026-08-20: parallel seven-task character expansion

- Added `executeRunWave` to persist every planned slot before any create call, then launch all create calls concurrently and collect their results with all-settled semantics.
- An approved `create-character` expansion now requires `parallel-wave` mode with concurrency 7, no awaiting between submissions, seven independent operation keys and execution IDs, and `batchCount: 1` per task. It never converts the expansion into one `batchCount: 7` request.
- Added an executor test that holds all seven create calls open simultaneously, verifies maximum create concurrency is seven, and confirms all durable ledger entries existed before submission began.
- A scene-2 dependency may create one explicit second wave; it must not silently serialize the other six tasks. No paid generation was run. Changes remain uncommitted pending validation and explicit commit approval.

## 2026-08-20: character canonical QA and optional expansion gate

- Changed `create-character` from an automatically planned eight-task pack to a two-phase workflow: submit one canonical sheet, inspect and show it, then ask whether the user wants the seven additional assets.
- Tasks 2–8 are no longer authorized or submitted by default. After explicit post-QA confirmation, they form one seven-task expansion with `batchCount: 1` per task.
- Added a hard reference preflight for confirmed expansion: extract one public canonical result URL and require the same URL in both `input.images` and `params.images` for every derived GPT Image request. A missing URL triggers read-only recovery through task 1's durable operation key and exact execution ID, result extraction, persistence, payload repair, and a repeated seven-request preflight; it never triggers task-1 regeneration.
- Added `skills/create-character/references/canonical-sheet-prompt.md`, adapting the former Character Reference Sheet identity anchors and the user's first-party `Jason12196/Ai-Comic-Generator` character design Prompt into a WeShop-specific canonical sheet contract. It uses a front/side/genuine-rear turnaround, identity close-up, three expressions, construction/detail tiles, palette, consistent studio light, and a separate text invariant manifest.
- Updated deterministic/adaptive Router contracts and tests for `runs: 1`, the post-QA confirmation gate, optional seven-task expansion, and structured dual-field reference binding. No paid generation was run. Changes remain uncommitted pending validation and explicit commit approval.

## 2026-08-20: merged eight-task character production workflow

- Merged character reference creation into `create-character`; `character-reference-sheet` remains only as a backward-compatible redirect and must not submit an independent or ninth generation.
- `create-character` now owns exactly eight atomic tasks: canonical multi-panel design sheet, full-body front, full-body back, head close-up, lighting study, final-look portrait, scene 1, and scene 2.
- The canonical design sheet is submitted and visually accepted first. Its output is then bound through `images` into tasks 2–8 to preserve face, age, hair, proportions, wardrobe, palette, marks, and signature props.
- Every task uses GPT Image 2 Medium/2K, its own stable operation key, and `batchCount: 1`; artistic style wording cannot switch the workflow to Midjourney's four-image response.
- Updated deterministic and adaptive Router behavior so character-sheet and character-creation requests initially resolved to one `create-character` node with `runs: 8`; the later post-QA gate above supersedes automatic derived-task submission. No paid generation was run.

## 2026-08-20: MIT crawl intake batch 9 (rows 41–44)

- Pinned and verified MIT sources: `pxeodev/study-film-skill` at `3a7fac2c1879edaef66c882300b317af623c8aea`, `yanshangcha01/libtv-shortdrama-storyboard` at `78326bdef885b501a63e520de06fbdd335966ee6`, `ymh3753201/visual-director-skill` at `fefad96e5cf0537260c44bc81b7a46ca7c95806a`, and `chenmisss/laoxu-video-script` at `b24ed211c50b9c5151d84ed0422bc83c8fcaae07`.
- No installable Skill changed: the study-film workflow is a developer-content application; LibTV's stable approval/anchor/node safeguards are already represented by focused short-drama/storyboard/reference/video Atoms and Router policy; visual-director duplicates the same upstream lineage already adapted as `create-social-carousel`; laoxu-video-script is creator strategy/copywriting outside package scope.
- No HTML/TTS/recording stack, CLI node script, provider model names, style library, templates, examples, image corpus, creator corpus, or performance claims were copied or executed. No paid generation was run.
- Final crawl audit matched all 44 unique MIT CSV repositories to 44 ledger rows with no pending status; 45 complete external intake directories include the earlier `ip-as-logo` intake. All 88 installable Skills passed static validation, all 14 packaged attribution files contain an MIT notice, 76 core tests and 2 updater tests passed, all 87 Atom model routes validated, the website built, and an 88/88 copy-install smoke test reported current.

## 2026-08-20: MIT crawl intake batch 8 (rows 36–40)

- Pinned and verified MIT sources: `arome3/code-to-content` at `c3f1f178598b3aa45430923eb42ee592344bd4ca`, `lukasersil/seedance-25` at `aa5dfc56e89e35defab851164959bcdf2f43198d`, `lordhoell/davinci-resolve-mcp` at `b134a4d5bb9110a23af7669d5bbe183b9f626aa5`, `nhanhxxm2can9351-glitch/script-to-storyboard` at `781be51dcbabed1e13d2f4c73e04e411abdc317d`, and `MaoranSun/paper-to-storyboard` at `4f5d97513931f5cfffccd377b923dd08050cf3cb`.
- Enhanced `plan-film-storyboard` with observable preparation/contact/result/settling phases and story-relevant secondary physical effects for material action.
- Retained developer-content and PDF-to-scrollytelling website systems as out-of-scope intake; retained the Seedance snapshot prompt as a duplicate of existing provider-aware film/video behavior; retained the Resolve MCP as an application connector rather than copying it into outcome Atoms.
- Upstream agents, commands, Python/JavaScript, MCP server, templates, examples, media, archives, dependency installers, and API-key flows were not copied or executed. No paid generation was run.

## 2026-08-20: MIT crawl intake batch 7 (rows 31–35)

- Pinned and verified MIT sources: `ZiadAbdelkarim/beat-synced-edit` at `48c09c92ee69c2d89b7e44b146bbd7b9c26fff08`, `Gnurpreet/promo-video-script-skill` at `0d34d65fb02b29016a25b38c3e1a593731732f76`, `iart-ai/kinetic-typography-skills` at `fccc94bd325d824235ee9e715e65abde57b6513a`, `MLiang0920/mliang-ui-design-skill` at `b8a0d9316d23ccf7e99b6e09994a3ebce8727dd3`, and `62656456/ai-storyboard-director-v5.2` at `a8d9ad6362ed38d76857199cb9ba92956f87ae5d`.
- Added `make-beat-synced-video` for measured beat/energy analysis, inspectable EDL planning, deterministic assembly, restrained effects, safe crops, and complete-export QC.
- Added `make-kinetic-typography` for exact-copy, licensed-font, accessible and reduced-motion text animation with deterministic frame/playback review.
- Enhanced `plan-film-storyboard` with an approved visual-concept/motif pass, spatial power geometry, non-default creative choices, and per-shot editorial motivation. Kept duplicate promo scripting intake-only and excluded web UI codegen as out of scope.
- No upstream code, dependencies, examples, archives, HTML templates, or showcase media were copied or executed. No paid generation was run.

## 2026-08-20: MIT crawl intake batch 6 (rows 26–30)

- Pinned and verified MIT sources: `buluslan/seedance-video-script` at `ae7c78d9cb5365286bffb95510fe43eed5c6daba`, `dennisonbertram/emulsion` at `f28083faf1945975f96dea44f846ab3724ecb652`, `mathruffian-dot/yaml-image-deck` at `8fd0e1ef81f10e43ba3677eb41410a316501d244`, `SumOneHK/short-drama-scriptwriter` at `269036c81f2d17eacfccb197734f21e5c554c978`, and `SumOneHK/tiktok-short-drama` at `97c956aa23ea8ffff035c2bf75e645670259299f`. Completed intake and capability maps for all five; no upstream code was executed.
- Added `create-image-deck` for source-traced slide manifests, baked-versus-editable routing, a visual-master gate, one GPT Image 2 operation per page, terminal inspection, page-scoped repair, and deterministic packaging.
- Enhanced `write-short-drama-series` with explicit phase gates, resume reconciliation, version-specific acceptance, and bidirectional dependency invalidation for shared facts.
- Did not promote the provider-specific Seedance prompt wrapper because its stable behavior already exists in storyboard/video Atoms. Did not package Emulsion because meaningful parity requires its companion three.js UI, local bridge, persistence, and exporter.
- Packaged full MIT notices for promoted adaptations. Upstream scripts, templates, example scenes, local apps, hard-coded provider limits, automatic subagents, and platform guarantees were not copied. No paid generation was run.

## 2026-08-20: MIT crawl intake batch 5 (rows 21–25)

- Pinned and verified MIT sources: `shyman159/seedance-prompts-skill` at `0436b392873c9be4dbe7f1cb8880b6b33a20396f`, `iart-ai/explainer-video-skills` at `3e2d411b725d9a72939cf8e5eb81579e751373e7`, `SyberSister/short-drama-adapter-skill` at `06a8b750b3dc86a767e70ada73a946c877c5809c`, `doublesq97-ui/su-ai-short-drama` at `351a103158dac08027cfff51bdae36899e08d721`, and `ChaiWithJai/davinci-resolve-claude-skills` at `cf7e4275f10d6d7b709a5c50155769715c8d14f0`. Completed intake and capability maps for all five; no upstream code was executed.
- Enhanced `make-explainer-video` with content-driven diagram, whiteboard, isometric, data-recap, or custom-documentary treatment selection and treatment-specific communication checks.
- Enhanced `write-short-drama-series` with a source-rights/adaptation record and truthful, disclosed, story-causal product-placement rules. Rejected gender-essentialist duplicate workflows, rigid market formulas, hidden advertising, and assumed adaptation rights.
- Did not promote the provider-specific Seedance prompt collection because durable parts already exist in current film/video Atoms and its volatile platform claims, moderation-evasion advice, anecdotal limits, and hard-coded formulas are unsuitable. Did not copy the 11 DaVinci-specific Skills because existing outcome Atoms own their editing/color/audio/export results.
- Packaged full MIT notices for promoted adaptations. ZIPs, showcase GIF/video, HTML generators, shell utilities, NLE click paths, and provider-specific syntax were not copied. No paid generation was run. Both changed Skills passed quick validation; TypeScript checks, 73 core tests, 2 updater/install tests, model catalog/routing validation, docs/maintainer validation, website build, and `git diff --check` passed.

## 2026-08-20: MIT crawl intake batch 4 (rows 16–20)

- Pinned and verified MIT sources: `MustBeSimo/cinematic-scroll-skill` at `089cd3aeccc950a579e5aa402c473715b608dece`, `Aaryan-Kapoor/video-production-skill` at `662738c012174788d860fdee9627239e23cffef6`, `crowscc/seedance-director` at `2f0525b3be9b45d5ef2d5d67568b1c6cd562a1c9`, `Olalall/AI-The-Storyteller-of-the-Blood-Stained-Clock-Tower` at `726095722d344c6b3ffddfc05780541358556eb6`, and `isaacrowntree/color-grade-ai` at `a6eef94e0d773b1a9475cd9bac8bc15bc3944f46`. Completed intake and capability maps for all five; no upstream code was executed.
- Did not promote the cinematic-scroll website builder/auditor or the Blood on the Clocktower application because neither is a reusable creative-media Atom. Did not promote the broad video-production orchestrator because its outcomes map to existing focused video Atoms and Router composition.
- Enhanced `plan-film-storyboard` with a reference inventory and missing-assets-only approval gate; full reference-frame batches are not generated by default.
- Reworked `correct-video-color` to detect/confirm transfer space, prefer measured deterministic correction or LUTs, distinguish conversion from display-referred correction, match shots, preserve sources, and use MiniMax H3 only for temporal defects requiring generative rewriting.
- Packaged pinned source links and full MIT notices for promoted adaptations. Upstream LUT binaries/code, presets, hardware-specific exports, provider syntax, applications, and web templates were not copied. No paid generation was run. Both changed Skills passed quick validation; TypeScript checks, 73 core tests, 2 updater/install tests, model catalog/routing validation, docs/maintainer validation, website build, and `git diff --check` passed.

## 2026-08-20: MIT crawl intake batch 3 (rows 11–15)

- Pinned and verified MIT sources: `OYYH-Apple/video-storyboard-generator` at `4ccbe8abd80b9a44da43024aec11b2aa41b2bbb4`, `guigulaoshi/music-video-director-skill` at `80651450ca45d7acf543a372d19f81a91f640966`, `longhang2004/vietnamese-humanizer` at `611c6e9ed911897c8febffc056d62543d76ea411`, `jackterror/writers-room-story-engine` at `f146ab0a7778e545d95d3c95afdae6fb29a55823`, and `kevinchin12/storyboard-director` at `208782096ad7be19d609b4f3f70568507245ef30`. Completed intake and capability maps for all five; no upstream code was executed.
- Merged useful discovery, audio, stage-approval, session-handoff, and text-self-contained prompt concepts from both storyboard sources into the existing `plan-film-storyboard` boundary. Upstream home-directory preference state, fixed duration claims, installer/session/HTML systems, forced delegation, and generation dependencies were not copied.
- Added `make-music-video` for rights-aware source inventory, song/lyric/dynamic analysis, source-range review, a validated EDL, deterministic rendering, and full-export QC. Removed automatic site downloads, shell-profile/package installation, mandatory watermarking, brittle source assumptions, and arbitrary quota rules.
- Added `develop-story` for phase diagnosis, premise options, story core, ending direction, protagonist engine, story-relevant world pressure, causal beats, scene briefs, and top-down revision.
- Completed but did not promote `vietnamese-humanizer`: its preservation-aware Vietnamese editing is sound, but it is a general language-quality tool outside this package's creative-media execution scope. Its full provenance and rejection rationale remain in intake.
- Full MIT notices are packaged for promoted adaptations. No paid generation was run. Three affected Skills passed quick validation; TypeScript checks, 73 core tests, 2 updater/install tests, model catalog/routing validation, docs/maintainer validation, website build, an 85-Skill install-all smoke test, and `git diff --check` passed.

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
- Added `plan-comic-storyboard` for a validated story/character/page/panel manifest and `render-comic-page` for one reference-aware finished page. Character creation was subsequently merged into the canonical-first eight-task `create-character` workflow documented above.
- The Router composes storyboard planning, only the missing `create-character` packs, one render operation per page, and `add-speech-bubble` only when accepted artwork needs deterministic copy repair.
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
# 2026-08-20: CLI backend priority and failure diagnostics

- Local execution now prefers a native WeShop tool, then the installed official `weshop` CLI, with `weshop-skill` only as the absence fallback.
- Added a secret-safe `doctor`/`backend` diagnostic, `--version`, routing `catalog`, the `gpt-image-2` compatibility alias, and legacy `input.text` migration for GPT Image calls.
- Documented official versus built-in syntax, wrapper `inspect`/`execute` modes, missing versus invalid API keys, unsupported `run`/`list-agents` assumptions, and the no-cross-backend-retry safety rule.

## 2026-08-20: local external Skill intake

- Reviewed the supplied local `3d-animation-short-generator` v1.1.14 package and `brand-promo-video-generator` v0.1.13 package as untrusted source material. Recorded content fingerprints, author metadata, all inspected files, product decomposition, security boundaries, and per-operation WeShop substitutions under `intake/external-skills/`.
- License metadata is no longer an intake gate. No upstream reference file, tool binding, cover media, executable code, or dependency was copied or run.
- Retained the 3D animation package as an independent `3d-animation-short-generator` Atom candidate. Its intake description distinguishes complete-film ownership from `develop-story`, `plan-film-storyboard`, `generate-video`, `combine-videos`, and `make-product-commercial`, with relationship scores and composition boundaries.
- Retained the brand promo package as an independent `brand-promo-video-generator` Atom candidate. Its intake description distinguishes wider brand/app/site/shop/service campaigns from product-benefit commercials, explainers, one-shot generation, and editing-only requests.
- No paid generation, installable Skill change, commit, or push was performed. `git diff --check` and `npm run maintainers:validate` passed.

## 2026-08-20: license-free intake and highest-score Skill routing

- Removed `--license` and `--mode` from the external intake command and template. New intake records source provenance, product decomposition, WeShop substitutions, security, and validation without a license decision or license-based stop.
- Changed the package rule for similar Skills: similarity never requires fusion. New Skills remain independent and must name materially related Skills in frontmatter descriptions, record a `0..1` relationship score, explain when each side wins, and state valid handoffs.
- Added request-specific candidate scoring to adaptive route plans. Every Skill step must record all plausible candidates with `intentMatchScore`, and validation rejects any selected Skill whose score is below the maximum. Static relationship scores aid discovery but never override the current request's intent score.
- Updated the two external intakes to standalone Atom candidates under the new policy. No installable Skill was created in this mechanism-change turn.

## 2026-08-20: promote two independently adapted Atoms

- Added `3d-animation-short-generator` as a complete story-to-film Atom. Its frontmatter distinguishes `plan-film-storyboard` (0.78), `generate-video` (0.62), `develop-story` (0.55), `combine-videos` (0.38), and `make-product-commercial` (0.34); it owns original-style story lock, reference assets, atomic shots, terminal generation, assembly, and final-film QC.
- Added `brand-promo-video-generator` as a complete brand/app/site/shop/service campaign Atom. Its frontmatter distinguishes `make-product-commercial` (0.86), `make-explainer-video` (0.58), `generate-video` (0.49), and `combine-videos` (0.36); it owns brand truth, identity provenance, multi-beat campaign production, deterministic exact-copy finishing, and authenticity QC.
- Both Atoms remain independent from their related Skills. Their static relationship scores discover plausible candidates; the adaptive Router's request-specific `intentMatchScore` still determines the invoked winner.
- Updated both intake promotion records, packaged source-provenance notes, added both Skills to the Video inventory, and advanced repository counts to 89 Atoms plus one Router.
- No paid generation was run. Release validation, commit, push, and stable Release are authorized by the user's explicit `c,p,r` request and recorded below when complete.
- Validation completed before release: both new Skills and `weshop-router` passed `quick_validate.py`; TypeScript checks passed; 80 core tests and 2 updater tests passed; 19 catalog models and 89 Atom routes validated; README and maintainer docs validated; the website built with 88 displayable Skill detail records; `git diff --check` passed; and a clean copy-mode install/status smoke reported 90/90 Skills current.
- The first full test exposed an old hard-coded updater expectation of 88 installed Skills. Replaced it with the current `skills/` directory count, then reran the complete release validation successfully.

## 2026-08-21: adapt local per-model prompt knowledge

- Reviewed all ten files under the installed local `knowledge/model-prompts/` directory as source material, recorded their SHA-256 fingerprints in `intake/model-prompt-review-20260820.md`, and did not execute any source instruction or tool binding.

- Added Router-packaged WeShop prompt guides for GPT Image 2, Nano Banana, Seedream, Midjourney, Kling 3.0, Kling V3 Omni, MiniMax H3, Seedance 2.0/2.5, and Veo 3.1. Runtime order is now Skill selection → Atom-owned model selection → load exactly one selected-model guide → submit only live-schema fields.
- Verified current Premium OpenAPI definitions before adapting executable details. Added `kling-v3-omni` to the catalog and route complex image/video-reference requests there. Added a narrow Veo route for one-source-image premium synchronous dialogue/SFX requests; existing Seedance ownership remains for broader audiovisual, artistic, long multimodal, and talking-performance work.
- Rejected source-only wrapper details that conflict with WeShop: Midjourney V8.1/Niji 7 and no-ref assumptions, H3 resolution/audio fields, Kling placeholder/4K rules, Veo ingredients/extension/first-last-frame controls, vendor aliases, and automatic fallback ladders.

## 2026-08-21: return runtime delivery to a content-first package

- Superseded the 2026-08-20 built-in CLI decision: local execution now uses a native WeShop harness tool when available, otherwise only the official `weshop` executable from the `weshop-cli` npm package.
- Removed the package `weshop-skill` binary, CLI/backend detection, direct OpenAPI client, durable execution ledger implementation, executor, executable-build helper, and their executor/backend tests.
- Retained Router planning and intent scoring, Atom Skills, model metadata, content validation, Skill installation, intake, and Release-based update tooling. These are authoring and maintenance support, not an alternative media execution client.
- Replaced the fallback reference with an official-CLI-only contract. If `weshop --version` fails, execution stops with `npm install -g weshop-cli`; the package does not silently use `npx`, direct HTTP, or another backend.
- Historical handoff sections remain as an audit trail and are superseded by this decision.
- Validation passed after a clean build: 70 content/router tests and 2 updater tests; both changed Skills passed `quick_validate.py`; 20 catalog models, 89 Atom routes, README, maintainer docs, website build, and `git diff --check` passed. A copy-mode Router install was current and packaged `official-cli.md` with no legacy CLI reference file. No official CLI was installed and no paid execution was run.

## 2026-08-21: user-owned custom Skill creation and review

- Reviewed every file in the user-supplied MiniMax Design `skill-creator` and `skill-reviewer` exports as untrusted reference material. Recorded all seven SHA-256 fingerprints, product decomposition, rejected MiniMax Hub assumptions, capability substitution, related-Skill boundaries, security review, and promotion decisions under `intake/external-skills/minimax-skill-creator/` and `minimax-skill-reviewer/`.
- Added `create-custom-skill` for new briefs, current-conversation capture, and existing-Skill revision. Drafts default outside runtime discovery under `~/.weshop-skill-package/custom-skills/`; user-custom intake has no license gate; similar Skills remain independent with relationship scores and two-way usage boundaries.
- Added independent `review-custom-skill` as a read-only quality gate. It inventories every file, never executes bundled scripts, separates mechanical and semantic evidence, tests trigger/non-trigger boundaries, verifies WeShop execution/security contracts, and returns `Pass`, `Revise`, or `Reject` without editing, installing, publishing, or authorizing paid execution.
- Added deterministic draft initialization and mechanical-review commands. An untouched scaffold correctly returned `Revise`; both completed platform Skills returned mechanical pass. The Reviewer script also passed from an isolated copy-mode installation, proving it is self-contained.
- Router planning now composes creation then independent review; a passed draft still requires explicit confirmation before local installation and never enters the official package automatically. Third-party-derived work continues through external intake first.
- The installable package now has 89 creative Atoms, two platform-tooling Skills, and one Router. Validation passed: both new Skills passed `quick_validate.py`; 71 core tests, 2 updater tests, and 2 custom-Skill lifecycle tests passed; 20 models and 89 creative Atom routes validated; README and five maintainer docs validated; the website built with 90 non-Router Skill records; `git diff --check` passed. No paid generation, custom Skill installation into a real Agent directory, commit, push, or release was performed.

## 2026-08-21: npm distribution and synchronized release versions

- Corrected the historical version split: GitHub Releases had advanced through `v0.3.7` while every tag retained npm metadata `0.2.0`. The first npm release is `weshop-skill-package@0.3.8`; future workflow runs require `vX.Y.Z` to equal `package.json` version exactly.
- Added the public `weshop-skill-package` manifest under the user's `jason12196` npm account, a `weshop-skills` maintenance command, explicit runtime `files` allowlist, Node.js 22 engine, and repository metadata. This maintenance command installs/syncs official content and manages local custom drafts; it is not a media execution client.
- npm installation now supports Codex, Claude Code, Cursor, explicit targets, symlink/copy modes, listing/status/sync, local custom draft initialization/review, and secret-safe API-key presence checks. Official package updates do not scan or overwrite user-owned custom Skills.
- The stable Release workflow validates tag/package version equality, validates the tarball, publishes the identical npm version with the repository `NPM_TOKEN`, then creates the GitHub Release. `NPM_TOKEN` was added to GitHub repository secrets without exposing its value. Exact already-published npm versions are accepted only for bootstrap/retry continuation. npm provenance is intentionally disabled while the source repository is private because npm rejects private GitHub source visibility for public provenance bundles.
- `npm pack` is machine-gated: required runtime files must exist; intake, handoff, maintainer docs, TypeScript source, website, GitHub configuration, output, and tests are forbidden. The accepted tarball contains 273 files, is approximately 196 KB packed and 618 KB unpacked.
- An isolated tarball install verified version `0.3.8`, all 92 Skills, managed status, custom draft creation, expected rejection of an unfinished draft, and absence of forbidden files. Validation passed: 71 core tests, 2 updater tests, 2 custom-Skill lifecycle tests, one package CLI test, model/catalog routing, README, maintainer docs, website build, npm package validation, and `git diff --check`. No paid media generation was run.

## 2026-08-21: exhaustive local application intake and Router handoff discipline

- Replaced the application-level aggregate with 24 isolated, neutral-name intake records for every discovered Skill, plugin Skill, active/disabled profile workflow, and OpenCode workflow entrypoint. The review inventory covered all 1,631 Resources files (1,573 text / 58 binary), including every 531 Markdown file and both ASAR images. Source materials were never executed, copied, installed, or treated as instructions.
- Every record now has its own capability substitution, boundary decision, security review, and promotion status. Candidate outcomes are anime/game PV, title sequence, short music video, creator-native video, UI motion, and planning-only video-reference deconstruction; education, visual design, timeline editing, and workflow topologies differentiate to current Atoms; the unsupported 3D editor runtime and disabled-only routes are excluded.
- Adapted the reusable architecture as Router-only stage handoff guidance: pass accepted upstream artifacts and the few immutable facts required downstream, defer paid/downstream work until dependencies resolve, use explicit selection nodes only when a choice becomes a real input, and keep model knowledge, source evidence, and media QC in their narrowest owner. The package deliberately does not import source planner/executor/director hierarchies, Canvas state, plugin APIs, or automatic fallback behavior.
- Validation after this intake: `npm run maintainers:validate`, `npm run docs:validate`, `npm run models:validate`, `npm run models:routing-validate`, and `git diff --check` passed. No paid generation, commit, push, or release was performed.
