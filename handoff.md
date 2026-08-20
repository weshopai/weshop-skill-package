# Handoff

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
