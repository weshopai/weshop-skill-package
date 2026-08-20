# Adding or changing an Atom

Use this workflow for a first-party capability request or when an external intake has been approved for promotion.

## 1. Decide the unit

Create one Atom only when it owns one clear user result, input contract, execution route, output contract, and acceptance boundary. Reuse or update an existing Atom when the distinction is only a Prompt variant. Use the Router to compose several existing results. A recurring composition becomes an Atom only when it has one stable deliverable of its own.

## 2. Define discovery boundaries

Choose a lowercase kebab-case slug. Write frontmatter `name` and a discriminating `description` that states the positive use case and adjacent exclusions. The runtime Skill list is the registry; do not add a Router operation enum or keyword table.

## 3. Build the contract

Every publishable Atom defines:

- one user result and required/optional asset roles;
- preservation invariants and neighboring Skill exclusions;
- `Catalog`, `What this skill does`, `How to use`, and at least one Prompt example;
- the verified WeShop Agent/model and native OpenAPI fields;
- Prompt construction, defaults, output quantity and media contract;
- observable acceptance, stopping conditions, and error-responsive retries;
- stable `operationKey`, terminal polling, and no blind resubmission.

Use `references/` for conditional API schemas or substantial acceptance rules, `scripts/` for repeated deterministic work, and `assets/` only for files used in output. Do not create empty resource folders.

## 4. Verify the route

Use an existing active entry in `models/catalog.json` when possible. If the Agent or model is new, verify its current WeShop schema and capability before adding it to the catalog. Discoverability is not execution approval.

The built-in `weshop-skill` command is the fallback executor when the harness has no native WeShop tool. It requires a stable `--operation-key`, uploads explicit `file:` inputs, polls the accepted run, and records the receipt.

## 5. Promote into the package

Only complete Atoms belong under `skills/<slug>/`. Then:

1. Add the slug to the correct README inventory category and update displayed counts.
2. Build the website; its catalog is generated from the Skill sections.
3. Validate the Skill and full repository using [the quality gates](README.md#quality-gates).
4. For a new execution route, perform an authorized representative run or keep the route visibly unverified.
5. Record decisions, validation, artifacts, and pending work in `handoff.md`.
6. Request commit and push authorization separately.

The installer discovers completed directories automatically; after release, users can install the new slug or sync an existing package installation.
