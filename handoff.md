# Handoff

## 2026-08-20: first-party AI Comic workflow decomposition

- Reviewed the user's `Jason12196/Ai-Comic-Generator` at commit `f1a86c3aad624cd52c273707f789a69ab7689ae0` as first-party product evidence; did not use the external Skill intake template or copy its UI, provider adapters, deployment, or secret-storage behavior.
- Extracted the useful Prompt contracts: story expansion, visual-style selection, structured character extraction, exact-count pagination, character design sheets, reference-bound page rendering, per-page progress, and targeted page regeneration.
- Added `plan-comic-storyboard` for a validated story/character/page/panel manifest and `render-comic-page` for one reference-aware finished page. Enhanced `character-reference-sheet` with comic expression and invariant handoffs.
- The Router composes storyboard planning, only the missing character sheets, one render operation per page, and `add-speech-bubble` only when accepted artwork needs deterministic copy repair.
- Replaced provider-specific Gemini/Nano fallback behavior, automatic identical timeout retries, and unconditional page fan-out with the package's GPT Image 2 Medium/2K route, durable operation keys, terminal polling, continuity-aware sequencing, and page-scoped error-responsive recovery.
- No paid image generation was run. Both new Skills, the enhanced character Skill, and the Router passed quick validation; `npm run check`, 73 tests including a five-node comic DAG dry run, model validators, docs validators, web build, install smoke tests, and `git diff --check` passed before the original commit and are rerun against this repository during the port.

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
