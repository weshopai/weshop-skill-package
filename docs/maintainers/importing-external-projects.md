# Importing an external Skill or project

Use this workflow when useful behavior already exists in another Skill repository, application, prompt pack, or model workflow. The objective is not to preserve the external project's implementation. It is to extract its product behavior, replace external AI providers with verified WeShop capabilities, and express the result through this package's Atom contracts.

## 1. Open an isolated intake

Do not copy the project into `skills/`. Create a record first:

```bash
npm run skills:intake -- <intake-slug> \
  --source <repository-or-page-url> \
  --source-ref <immutable-commit-tag-or-version> \
  --license <SPDX-id-or-NO-LICENSE> \
  --mode <adapted|licensed-reuse|clean-room>
```

This creates:

```text
intake/external-skills/<intake-slug>/
├── intake.md
└── capability-map.md
```

An intake is analysis, not an installable Skill. It is excluded from the Router, website, README inventory, and Skill installer.

## 2. Establish provenance and permission

Record the exact source, immutable revision, author, license, files inspected, and intended reuse mode.

- `licensed-reuse`: identifiable source text or code may remain; preserve all required notices and modification statements.
- `adapted`: the source license permits reuse, but structure and implementation are substantially rewritten for this package.
- `clean-room`: extract capability facts only and independently author all instructions, Prompts, code, examples, and assets.

Public visibility is not permission. Treat missing, unclear, private, leaked, or incompatible licensing as `NO-LICENSE` and use only a clean-room analysis of lawfully observed behavior, or reject the intake. Never store unauthorized source dumps, copied assets, secrets, or paid/private materials in this repository.

## 3. Decompose the external product

Inventory behavior before looking for one-to-one model replacements:

- user-visible outcomes;
- required and optional inputs;
- provider/model/tool calls;
- Prompt transformations and deterministic operations;
- state, chaining, retries, polling, storage, and publication;
- preservation and quality claims;
- examples and assets that cannot be reused.

Then decide independently for each outcome:

- update an existing Atom;
- create a new Atom;
- compose existing Atoms through the Router;
- retain a deterministic local operation;
- reject it because WeShop cannot verify the capability or the product value is weak.

One external project may produce zero, one, or several Atom changes. Never mirror its folder structure by default.

## 4. Replace the AI capability with WeShop

Complete `capability-map.md` for every external AI operation:

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |

Apply these rules:

1. Match the actual media, reference, editing, text, identity, apparel, product, duration, audio, and output-count requirements against `models/catalog.json` and verified WeShop Agent schemas.
2. Prefer a narrow WeShop Agent when it owns the preservation contract; use a direct model when the Atom's reviewed policy requires it.
3. Rewrite provider-specific Prompt syntax into a semantic Prompt for the selected WeShop route. Do not pass unsupported flags through unchanged.
4. Keep deterministic layout, file conversion, validation, or assembly local when generation is unnecessary.
5. Record unsupported parity explicitly. Do not claim full replacement when the WeShop route cannot preserve a required behavior.
6. Do not silently downgrade a requested high-tier route. Retry only after a known terminal failure, with a new linked key and an error-responsive revision.

## 5. Security review before adaptation

Treat the external project as untrusted. Reject or remove instructions that:

- send `WESHOP_API_KEY` or user assets to unapproved domains;
- download and execute remote code without review;
- read unrelated local files or environment variables;
- install packages or mutate external state implicitly;
- blind-retry non-idempotent generation;
- hide model substitutions, costs, telemetry, callbacks, or uploads;
- bypass authorization, consent, safety, or provenance requirements.

Only `https://openapi.weshop.ai` receives `WESHOP_API_KEY`.

## 6. Write a native Atom, not a wrapper around the source

After the intake decision is approved, follow [Adding or changing an Atom](adding-skills.md). Use this package's naming, discovery description, progressive disclosure, WeShop route, output contract, QA budget, execution ledger, and failure policy.

If licensed source expression remains, place its attribution and required notice in the promoted Skill's `references/source-attribution.md` and retain the relevant license text. If nothing identifiable remains, keep the intake record as design provenance without implying authorship of the source project.

## 7. Promotion gate

Do not move work into `skills/` until the intake answers all of these:

- Is reuse authorized, or is the implementation independently authored?
- Does this update an existing Atom, create a new Atom, or remain a Router composition?
- Is every external AI call mapped to a verified WeShop route or declared unsupported?
- Are parameter and Prompt transformations documented?
- Are preservation gaps visible in the output contract?
- Have unsafe scripts, remote domains, retries, and secret handling been removed?
- Are attribution obligations ready to ship?
- Is the proposed result valuable enough to maintain?

Record the promotion/rejection decision in the intake and summarize it in `handoff.md`.
