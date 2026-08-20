# WeShop Skill Package

WeShop Skill Package is a creative production toolkit for Codex and other runtimes that support the Agent Skills standard. It turns image, video, product, character, layout, and spatial work into independently installable Atom Skills, with an adaptive Router for compound requests.

This README is for installation and use. Maintainers who add, change, or adapt Skills from external projects should start with [CONTRIBUTING.md](CONTRIBUTING.md) and the dedicated [maintainer documentation](docs/maintainers/README.md).

The repository currently contains:

- one package-wide Router: `weshop-router`;
- 73 independently installable Atom Skills;
- a validated routing catalog for image and video models;
- TypeScript routing, model selection, duplicate-submission protection, and plan validation;
- Skill installation, synchronization, documentation, and model-validation tooling.

> This is a private source package, not a public npm package. GitHub repository access and WeShop API access require separate authorization.

## Contents

- [Architecture](#architecture)
- [Quick start](#quick-start)
- [Configure the WeShop API key](#configure-the-weshop-api-key)
- [Built-in WeShop CLI](#built-in-weshop-cli)
- [Install all or selected Skills](#install-all-or-selected-skills)
- [Track and update installations](#track-and-update-installations)
- [Router implementation](#router-implementation)
- [Skill structure](#skill-structure)
- [Complete Skill inventory](#complete-skill-inventory)
- [Model and execution safety](#model-and-execution-safety)
- [Development, validation, and release](#development-validation-and-release)
- [Repository structure](#repository-structure)
- [Visual catalog](#visual-catalog)
- [Design references](#design-references)

## Architecture

```text
User outcome
  ↓
Harness model reads the visible Skill names and descriptions
  ↓
WeShop Router builds an intent card
  ↓
Decompose into Skill, research, and deterministic operations
  ↓
Build a dependency-aware route DAG and bind user assets and upstream outputs
  ↓
Each Atom selects its verified WeShop Agent or model
  ↓
Execute, poll, and run one risk-tiered final acceptance check
  ↓
Deliver one or more explicit files
```

The package has only two Skill layers:

1. **WeShop Router** understands simple and compound outcomes, discovers currently installed Skills, and builds ordered or parallel plans.
2. **Atom Skill** owns one user outcome, input contract, execution route, output contract, and acceptance boundary.

There is no manually maintained intermediate category layer, and adding a Skill does not require a new Router operation enum. A new Skill becomes eligible for runtime discovery when its frontmatter description accurately states its use case.

## Quick start

### Requirements

- macOS or Linux; use WSL on Windows
- Git
- Node.js 22 LTS
- npm, with `package-lock.json` as the dependency source of truth
- access to this private GitHub repository
- a server or execution harness that securely provides `WESHOP_API_KEY` for live WeShop calls
- no separate installation of the official `weshop-cli`; this package includes the `weshop-skill` command for direct WeShop OpenAPI execution

### Clone and validate

```bash
git clone https://github.com/Jason12196/weshop-skill-package.git
cd weshop-skill-package
npm ci
npm test
npm run models:validate
npm run models:routing-validate
```

## Configure the WeShop API key

Before the first asset upload or run creation, the execution harness must verify that `WESHOP_API_KEY` is non-empty:

```bash
npm run api-key:check
```

If it is not configured:

1. Get or manage a key on the [WeShop API Key page](https://www.weshop.ai/apiKey).
2. Add `WESHOP_API_KEY` to the trusted harness, server, or secret manager that will execute WeShop calls.
3. Restart or reload the executor if it captures environment variables at startup.

For a temporary macOS or Linux terminal session, avoid leaving the key in shell history:

```bash
read -s WESHOP_API_KEY && export WESHOP_API_KEY
```

Never paste the key into chat or store it in a Skill, README, frontend bundle, Git history, URL, command argument, or log. Only a trusted server-side executor may send it to `https://openapi.weshop.ai`. A missing key is a configuration prerequisite, not a generation failure; the Router stops before upload or execution and provides setup guidance.

## Built-in WeShop CLI

The built-in `weshop-skill` command calls WeShop OpenAPI directly and supports every Standard or Premium Agent authorized for the account. It does not depend on the official `weshop-cli` npm package and does not change server-side permissions or credits.

Use it from the repository:

```bash
npm run cli -- --help
npm run cli -- info aiproduct
npm run cli -- upload ./product.png
```

After installing this package, use `weshop-skill` directly. For example:

```bash
weshop-skill run gpt-image \
  --operation-key campaign-logo-v1 \
  --params '{"textDescription":"Create a clean geometric logo","quality":"medium","imageSize":"2K","batchCount":1}'
```

Strings beginning with `file:` inside `--input` or `--params` JSON are uploaded as local images:

```bash
weshop-skill run aiproduct \
  --operation-key product-scene-v1 \
  --input '{"originalImage":"file:./product.png"}' \
  --params '{"textDescription":"Place the unchanged product in a warm studio scene","batchCount":1}'
```

Every submission requires an explicit, stable `operationKey`. The CLI waits for a terminal state by default; `--no-wait` returns an `executionId` for later lookup with `weshop-skill status <executionId>`. Before submission, the CLI atomically records the key in `~/.weshop-skill-package/operations.json`; inspect it with `weshop-skill operation <operationKey>`. An ambiguous create response becomes `outcome-unknown` and blocks blind resubmission, protecting against duplicate output and spend. Run `weshop-skill help` for the full command reference.

## Install all or selected Skills

The `skills:manage` command installs to `~/.codex/skills` by default. Symlinks keep this repository as the single source of truth; `--copy` creates an isolated copy.

### List available Skills

```bash
npm run skills:manage -- list
```

### Install the complete package

```bash
npm run skills:manage -- install --all
```

This installs all 73 Atoms plus `weshop-router`. Use this option for natural-language routing and multi-Skill composition.

### Install one Skill

```bash
npm run skills:manage -- install create-logo
```

Install the Router as well if the selected Skill should participate in compound tasks:

```bash
npm run skills:manage -- install create-logo
npm run skills:manage -- install weshop-router
```

### Custom target or copy mode

```bash
npm run skills:manage -- install create-logo --target /absolute/path/to/skills
npm run skills:manage -- install create-logo --copy
```

Symlinks are best for continuously tracking the repository. Copy mode is useful for isolated delivery, but copied installations must be synchronized after updates. The target directory's `.weshop-skill-lock.json` records the source repository, source commit, installation mode, and content hash.

## Track and update installations

### Update the complete package

```bash
git fetch origin
git status -sb
git pull --ff-only origin main
npm ci
npm test
npm run models:validate
npm run models:routing-validate
npm run skills:manage -- sync --all
```

- Symlink installations point to the updated files immediately after `git pull`; `sync --all` refreshes the lock record.
- `sync --all` updates copied installations.
- `git pull --ff-only` refuses to create an implicit merge commit when the local branch has diverged.

### Synchronize one installed Skill

```bash
git fetch origin
git pull --ff-only origin main
npm run skills:manage -- status create-logo
npm run skills:manage -- sync create-logo
```

`status` returns `current`, `update available`, or `missing installation`. A single-Skill update synchronizes only the selected Skill into the Agent installation directory. Upstream versions still come from this Git repository, preserving commit history, private authentication, and shared policy.

## Router implementation

### Adaptive Router

The extension points are [src/adaptive-router.ts](src/adaptive-router.ts) and [skills/weshop-router/SKILL.md](skills/weshop-router/SKILL.md). The harness model performs semantic planning:

- selects Skills from their runtime descriptions;
- works backward from the final outcome into operations;
- chooses the narrowest Skill for each operation;
- binds user assets and upstream outputs to downstream inputs;
- adds a research node when current platform specifications, regulations, or market facts affect execution;
- asks a focused question only when ambiguity changes the Skill, material, cost, irreversible action, or delivery contract.

TypeScript does not replace model judgment with keyword routing. It validates the proposed plan: Skill IDs exist, step IDs are unique, dependencies are complete and acyclic, research-dependent plans contain research nodes, and clarifications contain substantive questions.

```ts
type AdaptiveRouteStep = {
  id: string;
  kind: "skill" | "research" | "deterministic";
  skillId?: string;
  objective: string;
  dependsOn: string[];
  inputs: Record<string, string>;
  output: string;
  selectionReason: string;
};
```

See [adaptive-planning.md](skills/weshop-router/references/adaptive-planning.md) for the complete intent, DAG, and handoff contracts.

### Compatibility Router

[src/router.ts](src/router.ts) retains `routeNaturalLanguage` for existing callers. It contains the earlier operation detection and verified hard routes, but it is no longer the extension point for new Skills.

```ts
import { routeNaturalLanguage } from "@jason12196/weshop-skill-package";

const plan = routeNaturalLanguage(
  "Generate four virtual try-on images with this garment and preserve its logo",
  { assets: ["garment"] }
);
```

### QA budget

- Ordinary generation and editing: one final checkpoint covering the first result and anything already flagged.
- Identity, apparel, product, and pose work: inspect only the declared preservation invariants.
- Strict per-output inspection: reserve for hard file or safety contracts such as transparent PNG delivery and fictional mugshot labeling.
- Download, ingestion, or publication failure: repair only the failed downstream stage; do not regenerate accepted content.

## Skill structure

```text
skills/example-skill/
├── SKILL.md                 # Required: name, description, and execution guidance
├── agents/openai.yaml       # Optional: Codex UI metadata and default invocation prompt
├── references/              # Optional: parameters, rules, and acceptance details
├── scripts/                 # Optional: repeatable deterministic processing
└── assets/                  # Optional: templates, fonts, or static output resources
```

Progressive disclosure has three stages: the harness first sees the Skill name, description, and path; it reads `SKILL.md` after a match; and it reads references or runs scripts only for the selected branch. The description must therefore state the capability, positive use case, and necessary exclusions.

A publishable Atom defines one user outcome, trigger and adjacent boundaries, input roles, preservation invariants, verified route, output contract, observable acceptance, non-identical retry and stopping rules, and execution-record requirements.

## Complete Skill inventory

The `skills/` directory currently contains 73 Atoms. Categories are for browsing only and do not participate in hard-coded Router selection.

| Category | Skills |
| --- | --- |
| Router | `weshop-router` |
| Commercial products and apparel | `ai-product`, `change-pose`, `create-white-background-product-mockup`, `fashion-model-replacement`, `outfit-design`, `product-packaging`, `virtual-try-on` |
| Layout and marketing | `ai-banner-design`, `add-speech-bubble`, `apply-photo-filter`, `compose-lookbook`, `image-combiner`, `make-infographic`, `make-silhouette`, `make-thumbnail`, `photo-collage`, `poster-design`, `product-detail-page`, `recolor-object`, `recreate-social-photo`, `translate-image-text` |
| Personal appearance | `add-braces`, `add-tattoo`, `apply-makeup`, `change-bangs`, `eye-color-change`, `hair-color-change`, `hairstyle-change`, `make-selfie`, `shave-head` |
| Portrait production | `id-photo-format`, `professional-headshot` |
| Image repair and utilities | `clean-room`, `colorize-image`, `expand-image`, `remove-background`, `remove-glasses`, `remove-image-mark`, `remove-object`, `remove-photo-filter`, `retouch-blemish`, `smooth-wrinkles` |
| Characters, animals, and brands | `character-reference-sheet`, `create-animal`, `create-avatar`, `create-character`, `create-flag`, `create-logo`, `create-npc`, `make-pet-portrait` |
| Spaces, diagrams, and CAD | `create-cad`, `make-flowchart`, `preview-landscape`, `preview-paint`, `restyle-room`, `visualize-floor-plan` |
| Video | `add-video-effect`, `animate-image`, `combine-videos`, `correct-video-color`, `edit-social-video`, `generate-video`, `make-podcast-video`, `make-talking-video`, `make-video-intro`, `remove-video-mark`, `restyle-video`, `upscale-video` |
| Social and commemorative | `make-birthday-video`, `make-holiday-card`, `make-mugshot-photo`, `make-wallet-photo`, `make-wedding-photo` |

`npm run docs:validate` checks this inventory against the directories on disk, so there is no second production ledger.

## Model and execution safety

[models/catalog.json](models/catalog.json) is the source of truth for model IDs, media types, status, capabilities, limits, strengths, exclusions, default use, sources, and verification dates. `unknown` does not mean supported, and discoverability does not mean an executable API contract exists. Shared selection rules live in [model-selection-policy.md](model-selection-policy.md).

Every atomic generation run persists a unique `operationKey` before submission. Only a non-empty `executionId` proves normal acceptance. A create timeout, transport error, empty or malformed response, or missing ID becomes `outcome-unknown` and requires reconciliation rather than blind resubmission. Download, ingestion, and Canvas publication failures retry only their downstream stage. See [src/execution.ts](src/execution.ts).

## Development, validation, and release

| Command | Purpose |
| --- | --- |
| `npm ci` | Install root dependencies from the lockfile |
| `npm run build` | Compile TypeScript and prepare the CLI binary |
| `npm run check` | Run TypeScript static checks |
| `npm test` | Test routing and execution safety |
| `npm run models:validate` | Validate the model catalog |
| `npm run models:routing-validate` | Validate model routes across all 73 Atoms |
| `npm run skills:manage -- ...` | Install, inspect, and synchronize Skills |
| `npm run skills:intake -- ...` | Create an isolated provenance and WeShop substitution record for an external project |
| `npm run api-key:check` | Check whether the execution environment provides a WeShop API key |
| `npm run cli -- ...` | Upload, submit, poll, and inspect WeShop runs through the built-in CLI |
| `npm run docs:validate` | Validate README inventory, local links, and required command documentation |
| `npm run maintainers:validate` | Validate maintainer entrypoints, external intake guidance, and local links |
| `npm run web:build` | Generate and build the visual catalog from current Skill documents |

Run before release:

```bash
npm run check
npm test
npm run models:validate
npm run models:routing-validate
npm run docs:validate
npm run maintainers:validate
npm run web:build
git diff --check
```

For each changed Skill, also run `skill-creator`'s `quick_validate.py`. Commit and push are separate permissioned actions; do not perform either without explicit authorization.

## Repository structure

```text
.
├── CONTRIBUTING.md                 # Maintainer entrypoint
├── docs/maintainers/               # Atom creation and external intake workflows
├── intake/external-skills/         # Isolated external project analysis; created on demand
├── skills/                         # 73 Atoms plus one Router
├── src/                            # Routing, model selection, execution safety, CLI, and tests
├── models/catalog.json             # Model source of truth
├── schemas/model-catalog.schema.json
├── scripts/                        # Installation, intake, build, and validation tooling
├── web/                            # Visual Skill catalog; not installed with Skills
├── model-selection-policy.md       # Shared model policy
└── package.json                    # Installation, build, test, and validation commands
```

`dist/`, `node_modules/`, website build output, and temporary `output/` files do not enter the repository. Production research, smoke-test checklists, execution records, and generated samples are also excluded from the release package.

## Visual catalog

The standalone `web/` application displays the name, use case, route, output contract, Prompt examples, and installation entrypoint for each installable Skill. It contains no API keys, generated samples, or production files, and `skills:manage` never installs it into an Agent's Skill directory.

```bash
npm --prefix web ci
npm run web:dev
```

At startup and build time, the website generates its data directly from `skills/*/SKILL.md`. Adding a Skill does not require a second hard-coded frontend list.

## Design references

- [OpenAI Codex Skills documentation](https://developers.openai.com/codex/skills) for runtime discovery and progressive disclosure.
- [OpenAI Skills catalog](https://github.com/openai/skills) for official repository organization and installation patterns.
- [Agent Skills specification](https://agentskills.io/specification) for portable frontmatter and resource-directory conventions.
- [Anthropic Skills](https://github.com/anthropics/skills) for decomposing complex capabilities into instructions, scripts, and on-demand references.
- [Vercel skills CLI](https://github.com/vercel-labs/skills) for multi-source installation, lockfiles, update checks, and cross-Agent distribution.
- [Microsoft Skills](https://github.com/microsoft/skills) for large catalogs, browsing, and continuous validation.

This package adopts a front-loaded quick start, complete inventory, generated catalog, source locks, external-update checks, and progressive disclosure. It does not automatically trust public registries, overwrite unreviewed content, depend on vendor-specific hooks, treat marketing pages as executable capability, or bypass private repository and WeShop API authorization.
