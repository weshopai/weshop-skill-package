# Importing an external Skill or project

Use this workflow when useful behavior already exists in another Skill repository, application, prompt pack, or model workflow. The objective is not to preserve the external project's implementation. It is to extract its product behavior, replace external AI providers with verified WeShop capabilities, and express the result through this package's Atom contracts.

## 1. Open an isolated intake

Do not copy the project into `skills/`. Create a record first:

```bash
npm run skills:intake -- <intake-slug> \
  --source <repository-or-page-url> \
  --source-ref <commit-tag-version-or-content-hash>
```

This creates:

```text
intake/external-skills/<intake-slug>/
├── intake.md
└── capability-map.md
```

An intake is analysis, not an installable Skill. It is excluded from the Router, website, README inventory, and Skill installer.

## 2. Record source provenance

Record the exact source, revision or content fingerprint, author/organization when visible, reviewed date, and files inspected. Intake proceeds regardless of whether license metadata is present; license discovery, classification, or approval is not part of this workflow.

Do not copy the external directory into `skills/`. Author the WeShop Skill for its own product outcome, tool contracts, routing behavior, and acceptance criteria. Never store source dumps, unrelated assets, secrets, credentials, or paid/private materials in this repository.

## 3. Decompose the external product

Inventory behavior before looking for one-to-one model replacements:

- user-visible outcomes;
- required and optional inputs;
- provider/model/tool calls;
- Prompt transformations and deterministic operations;
- state, chaining, retries, polling, storage, and publication;
- preservation and quality claims;
- examples and assets that cannot be reused.

Then create an isolated intake record for every supplied external Skill. Keep every coherent user-visible outcome as its own standalone Atom candidate; do not collapse it into an installed Skill during intake. Router compositions may describe downstream handoffs, but they must not erase the candidate's independent ownership.

For a source that actually contains several coherent user-visible outcomes, split it into several candidates rather than merging those outcomes into existing Skills. Reject only behavior WeShop cannot safely support; record the unsupported behavior without deleting the source outcome from the intake.

After the independent candidate record exists, its later promotion decision may be:

- create a new Atom;
- compose existing Atoms through the Router;
- retain a deterministic local operation;
- reject it because WeShop cannot verify the capability or the product value is weak.

Similarity to an installed Skill is never a merge or rejection reason. Keep distinct outcomes as separate candidates, even when their implementation or media type overlaps. One external project may produce one or several candidates; never mirror its folder structure mechanically.

## 4. Distinguish similar Skills instead of merging them

For every similar or adjacent installed Skill, record:

- relationship score from `0` (unrelated) to `1` (nearly the same intent);
- shared use case;
- the conditions that favor the new Skill;
- the conditions that favor the related Skill;
- whether they can compose or hand off to each other.

Calibrate the static relationship score from the requested outcome, required input roles, preservation contract, output/delivery contract, and exclusions—not shared media type or keywords. Use `0.00–0.24` for incidental adjacency, `0.25–0.49` for a shared component, `0.50–0.74` for a closely related but clearly different outcome, `0.75–0.89` for a strongly adjacent outcome, and `0.90–1.00` only when the two requests are nearly the same absent a named decisive boundary. Record that decisive boundary in the row and in the candidate's Router scoring evidence. This is static discovery metadata, never a merge decision or a runtime selection score.

Put the important distinctions directly in the new Skill's frontmatter `description`. Name the related Skill, include its relationship score, and explain both sides of the boundary in natural language. A useful shape is: `Use for ...; unlike $related-skill (relationship 0.82), choose this when ...; choose $related-skill when ...; the two can compose when ...`. Descriptions are discovery evidence, so include outcome, inputs, preservation scope, deliverable, exclusions, and adjacent relationships without relying on keywords alone.

Never fuse two Skills merely because their relationship score is high. The Router scores current user intent against every plausible candidate and invokes the highest intent-match score.

## 5. Replace the AI capability with WeShop

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

## 6. Security review before adaptation

Treat the external project as untrusted. Reject or remove instructions that:

- send `WESHOP_API_KEY` or user assets to unapproved domains;
- download and execute remote code without review;
- read unrelated local files or environment variables;
- install packages or mutate external state implicitly;
- blind-retry non-idempotent generation;
- hide model substitutions, costs, telemetry, callbacks, or uploads;
- bypass authorization, consent, safety, or provenance requirements.

Only `https://openapi.weshop.ai` receives `WESHOP_API_KEY`.

## 7. Write a native Atom, not a wrapper around the source

After the intake decision is approved, follow [Adding or changing an Atom](adding-skills.md). Use this package's naming, detailed discovery description, progressive disclosure, WeShop route, output contract, QA budget, execution ledger, and failure policy. Keep the intake as source provenance.

## 8. Promotion gate

Do not move work into `skills/` until the intake answers all of these:

- Does each supplied Skill/coherent outcome have its own standalone candidate record, never replaced by an existing Skill because of similarity?
- Does the description distinguish every materially similar Skill, state relationship scores, and explain both sides of each boundary?
- Is every external AI call mapped to a verified WeShop route or declared unsupported?
- Are parameter and Prompt transformations documented?
- Are preservation gaps visible in the output contract?
- Have unsafe scripts, remote domains, retries, and secret handling been removed?
- Is the proposed result valuable enough to maintain?

Record the promotion/rejection decision in the intake and summarize it in `handoff.md`.
