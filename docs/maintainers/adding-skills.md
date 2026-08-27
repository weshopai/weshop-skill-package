# Adding or changing an Atom

Use this workflow for a first-party capability request or when an external intake has been approved for promotion.

## 1. Decide the unit

Create one Atom when it owns one clear user result, input contract, execution route, output contract, and acceptance boundary. Similarity to an existing Atom never requires fusion: keep independently named outcomes separate and let runtime intent scoring choose between them. Use the Router to compose several existing results. A recurring composition becomes an Atom only when it has one stable deliverable of its own.

## 2. Define discovery boundaries

Choose a lowercase kebab-case slug. Write frontmatter `name` and a detailed, discriminating `description` that states the positive use case, inputs, preservation scope, promised deliverable, and adjacent exclusions. For each materially similar Skill, name it, include a `0..1` relationship score, say when this Skill wins, say when the related Skill wins, and state any valid composition/handoff. The relationship score describes adjacency; it is not the invocation score. The runtime Skill list is the registry; do not add a Router operation enum or keyword table.

At invocation time, the Router assigns every plausible candidate an intent-match score from `0..1` using the complete user intent card and these descriptions. The selected Skill must have the highest score; a validator rejects a lower-scoring choice. Ties are allowed only when both candidates truly satisfy the same intent, and the selection reason must explain the tie-break.

## 3. Build the contract

Every publishable Atom defines:

- one user result and required/optional asset roles;
- preservation invariants and neighboring Skill exclusions;
- `Catalog`, `What this skill does`, `How to use`, and at least one Prompt example;
- a complete client catalog record: display name, category, short description, and optional media URLs under the controlled `https://ai-image.weshop.com/desktop/coverImage`, `sourceImage`, and `coverVideo` directories. Use the exact Skill ID as the filename; ordered multi-source images add `-1`, `-2`, and so on. The build normalizes these into the published `catalog/skills.json`; missing cover art receives that Skill's remote SVG fallback;
- the verified WeShop Agent/model and native OpenAPI fields;
- Prompt construction, defaults, output quantity and media contract;
- observable acceptance, stopping conditions, and error-responsive retries;
- stable `operationKey`, terminal polling, and no blind resubmission.

Use `references/` for conditional API schemas or substantial acceptance rules, `scripts/` for repeated deterministic work, and `assets/` only for files used in output. Do not create empty resource folders.

## 4. Verify the route

Use an existing active entry in `models/catalog.json` when possible. If the Agent or model is new, verify its current WeShop schema and capability before adding it to the catalog. Discoverability is not execution approval.

When the harness has no native WeShop tool, execution uses only the official `weshop` CLI from the `weshop-cli` npm package. Do not add a package-owned OpenAPI client or fallback executor. Inspect the selected Agent command's current `--help` output before documenting parameters.

## 5. Promote into the package

Only complete Atoms belong under `skills/<slug>/`. Then:

1. Add the slug to the correct README inventory category and update displayed counts.
2. Run `npm --prefix web run catalog:check`; it generates and validates the published `catalog/skills.json` consumed by Canvas and other clients, as well as the website copy. Never hand-edit either generated catalog.
3. Validate the Skill and full repository using [the quality gates](README.md#quality-gates).
4. For a new execution route, perform an authorized representative run or keep the route visibly unverified.
5. Record decisions, validation, artifacts, and pending work in `handoff.md`.
6. Request commit and push authorization separately.

The installer discovers completed directories automatically; after release, users can install the new slug or sync an existing package installation.
