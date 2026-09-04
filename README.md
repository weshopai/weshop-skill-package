<p align="center">
  <img src="assets/readme/weshop-skills-banner.png" alt="WeShop Skills" width="100%" />
</p>

<p align="center">
  Creative AI Skills for Codex, Claude Code, Cursor, and any Agent Skills-compatible runtime.
</p>

<p align="center">
  <img alt="136 Atom Skills" src="https://img.shields.io/badge/Atom_Skills-136-7530FE?style=flat-square" />
  <a href="https://www.npmjs.com/package/weshop-skill-package"><img alt="npm version" src="https://img.shields.io/npm/v/weshop-skill-package?style=flat-square&color=CB3837" /></a>
  <a href="https://www.npmjs.com/package/weshop-skill-package"><img alt="npm downloads" src="https://img.shields.io/npm/dm/weshop-skill-package?style=flat-square&color=CB3837" /></a>
  <img alt="Codex" src="https://img.shields.io/badge/Codex-ready-10A37F?style=flat-square" />
  <img alt="Claude Code" src="https://img.shields.io/badge/Claude_Code-ready-D97757?style=flat-square" />
  <img alt="Cursor" src="https://img.shields.io/badge/Cursor-ready-2563EB?style=flat-square" />
  <img alt="MIT License" src="https://img.shields.io/badge/License-MIT-F2C94C?style=flat-square" />
</p>

WeShop Skills turns plain-language creative requests into production-ready image, video, product, portrait, layout, and spatial workflows powered by WeShop OpenAPI. Install the complete collection or pick only the Skills you need.

> This repository contains **137 focused Atom Skills + 1 user-authoring Skill + 1 Router + 1 multi-step orchestration Skill (140 Skills total)**. `weshop-router` selects a focused Skill shortlist, one maintained workflow, or one route-changing clarification; it does not plan or execute the selected route. Media execution uses a native WeShop harness tool or the official `weshop` CLI, never a package-owned fallback client.

## Package boundaries

- `skills/` contains user-facing creative workflows and routing metadata.
- `shared/` contains Package-owned guidance shared by several Skills, such as model selection. Skills link to it only when the current task needs that decision.
- `scripts/weshop-skills.mjs` installs and updates Skill content; it is not the media-generation CLI.
- A native host Tool or the separately versioned official `weshop` CLI owns execution. Tool schemas, credentials, approval, receipts, retries, and artifact delivery are not duplicated in this Package.

This keeps routine Skill releases independent from the executable CLI and from any host application's release cycle.

## 🚀 Install with one prompt

Open Codex, Claude Code, or Cursor and paste this:

```text
Install the latest stable `weshop-skill-package` from npm globally, run `weshop-skills install` for the agent you are running in, verify the managed Skill installation, and tell me whether I need to restart the agent. Do not ask me to paste or print my WeShop API key. Preserve all user-owned custom Skills.
```

The Agent should use the npm package and install the Skills into its own global Skill directory.

## 📦 Install manually

### 1. Download the latest stable package

```bash
npm install -g weshop-skill-package@latest
weshop-skills version
```

Node.js 22 LTS and npm are required. The npm package is public and does not require a GitHub checkout. Its version always matches the corresponding stable [GitHub Release](https://github.com/weshopai/weshop-skill-package/releases).

### 2. Choose your agent

<details open>
<summary><strong>Codex</strong></summary>

```bash
weshop-skills install --agent codex
```

The default destination is `~/.codex/skills`.

</details>

<details>
<summary><strong>Claude Code</strong></summary>

```bash
weshop-skills install --agent claude
```

</details>

<details>
<summary><strong>Cursor</strong></summary>

```bash
weshop-skills install --agent cursor
```

</details>

Restart the agent after the first installation so it can discover the new Skills.

For another Agent Skills-compatible runtime or a project-local setup, choose the destination explicitly:

```bash
weshop-skills install --all --target /absolute/path/to/skills
```

Use `weshop-skills list` to inspect the package or install one Skill by name instead of the full collection.

### 3. Check for and install updates

Compare the version installed on your machine with the latest version published to npm:

```bash
weshop-skills version
npm view weshop-skill-package version
```

You can also use npm's outdated report. It prints nothing when the global package is current:

```bash
npm outdated -g weshop-skill-package
```

Every stable GitHub Release publishes the same version to npm. Upgrade explicitly to the current `latest` version, then synchronize managed installations:

```bash
npm install -g weshop-skill-package@latest
weshop-skills sync --all
weshop-skills status --all
```

By default, managed installations are symlinks. Existing symlinked Skills follow the upgraded npm package immediately, while `sync --all` also installs newly added official Skills. Copy installations are refreshed only by `sync`. Restart the Agent after an update when it caches Skill metadata.

Package updates never scan, modify, upload, or delete user-owned custom Skills. Custom drafts remain under `~/.weshop-skill-package/custom-skills/`, and user-installed custom Skills remain owned by the user.

To follow future releases without running a command, use [GitHub Releases](https://github.com/weshopai/weshop-skill-package/releases), subscribe through the repository's **Watch → Custom → Releases** option, or follow the [release Atom feed](https://github.com/weshopai/weshop-skill-package/releases.atom).

By default, installation uses symlinks. Add `--copy` if you need an isolated copy:

```bash
weshop-skills install --agent codex --copy
```

### 4. Configure WeShop OpenAPI

Get a key from [WeShop OpenAPI](https://open.weshop.ai/authorization/apikey), then provide it only to the trusted local process that performs generation:

```bash
read -s WESHOP_API_KEY && export WESHOP_API_KEY
weshop-skills api-key check
```

Never paste the key into chat, source files, frontend code, Git history, URLs, or command arguments.

## 💬 Use it

You do not need to memorize Skill names. `$weshop-router` first checks a maintained common-task map, shortlists at most four genuinely adjacent Skills, and sends a clear one-result request straight to its Atom. Long-tail and custom work falls back to the descriptions of Skills actually available at runtime. Only real cross-Skill dependencies or independently valuable deliverables enter a workflow recipe and the multi-step orchestration Skill.

Try prompts like:

```text
Turn this product photo into a clean white-background marketplace hero image. Keep the product shape, label, and colors unchanged.
```

```text
Put this jacket on the model, preserve the garment logo and fit, then create a matching lifestyle campaign image.
```

```text
Remove the person in the background, expand this photo to 16:9, and animate it into a five-second cinematic shot.
```

```text
Create one minimal logo for NORTHLINE COFFEE: an original N plus mountain-path symbol in black and cream.
```

You can also invoke a Skill directly, for example `$remove-background`, `$virtual-try-on`, `$create-logo`, or `$generate-video`.

### Create your own Skill

Ask for a reusable user-owned Skill in plain language. `$create-custom-skill` owns the complete local lifecycle: it creates or revises an isolated draft, checks structure and routing boundaries, and installs it locally after validation. The create, save, import, or upload request itself authorizes that local installation; only conflicts or higher-risk side effects stop for separate permission. Independent review begins only if you later ask to contribute the Skill to the official package.

```text
Save the workflow we just completed as my own reusable Skill. Keep it local, compare it with similar installed Skills, run intake and validation, then install it into my local Skill directory.
```

Drafts default to `~/.weshop-skill-package/custom-skills/` and are not visible to the Agent until intake and validation pass. They remain user-owned and are not overwritten by package updates. Deterministic scaffolding and mechanical review are also available:

```bash
weshop-skills custom init my-custom-skill
weshop-skills custom check ~/.weshop-skill-package/custom-skills/my-custom-skill
```

## ✨ What you get

| Capability | Examples |
| --- | --- |
| 🛒 Product & e-commerce | Product scenes, packaging, white-background mockups, virtual try-on, model replacement |
| 🎨 Image creation | Logos, characters, animals, banners, posters, thumbnails, infographics |
| ✂️ Image editing | Remove objects or backgrounds, expand, recolor, retouch, clean, restore |
| 🧑 Portrait & appearance | Headshots, ID photos, makeup, hair, pose, glasses, tattoos |
| 🎬 Video | Image animation, talking video, intros, effects, editing, combining, upscaling |
| 🏠 Space & design | Room restyling, landscape previews, floor plans, flowcharts, CAD |
| 🧠 Multi-step orchestration | Parallel or ordered Skills, asset handoff, final QA for compound work |
| 🛡️ Safe execution | Stable operation keys, duplicate-spend protection, polling, recovery records |

For compound work, `weshop-router` selects the smallest matching workflow and stops. `orchestrate-multi-step-workflow` owns its DAG, artifact bindings, execution waves, runtime Skill choices, and final acceptance. It is not the Router: a clear single-Skill request never enters it.

### Router guidance

`weshop-router` is an instruction Skill, not a Tool or plan compiler. When routing is needed, the Agent reads its guide once and selects:

- one complete-outcome Skill;
- one maintained workflow for real cross-Skill dependencies or independently requested deliverables; or
- one route-changing clarification.

The maintained [`routing-map.json`](skills/weshop-router/references/routing-map.json) accelerates common work without becoming a keyword classifier or closed operation enum. Human-readable task boundaries and recipe rationale live beside it in [`task-routing.md`](skills/weshop-router/references/task-routing.md) and [`workflow-recipes.md`](skills/weshop-router/references/workflow-recipes.md). Runtime Skill availability remains authoritative.

The Router guide considers only outcome, supplied input roles, preservation constraints, requested deliverables, current-evidence needs, and route-changing ambiguity. Host policy, memory, permissions, execution state, receipts, recovery, DAG nodes, execution waves, and final acceptance remain owned by the Agent Runtime or selected target. There is no second Router Tool roundtrip.

## Complete Skill inventory 🧩

The `skills/` directory contains 137 creative Atom Skills, one platform-tooling Skill, one Router, and one multi-step orchestration Skill—140 Skills in total. Categories below are for browsing only. Router planning uses its separate, versioned common-task map as a fast shortlist seed; that map remains open-ended and yields to runtime semantic discovery for unknown or custom Skills.

### Client catalog contract

Published packages include [`catalog/skills.json`](catalog/skills.json), a versioned, client-neutral catalog generated from the installed `SKILL.md` files. Its 138 public entries cover the 137 Atom Skills and the user-authoring Skill; the two system-only routing Skills are intentionally hidden from the client catalog. It provides each public Skill's cover reference, category and tags, description, usage summary and examples, plus up to three differentiated related Skills. Clients may use it for presentation, but must continue to discover and execute Skills from `SKILL.md`: the catalog is optional so individually copied Skills, older package versions, and third-party/custom directories remain compatible.

| Category | Skills |
| --- | --- |
| Router | `weshop-router` |
| Multi-step orchestration | `orchestrate-multi-step-workflow` |
| User authoring | `create-custom-skill` |
| Commercial products and apparel | `ai-product`, `change-pose`, `create-white-background-product-mockup`, `fashion-model-replacement`, `outfit-design`, `product-packaging`, `virtual-try-on` |
| Layout and marketing | `ai-banner-design`, `add-speech-bubble`, `apply-photo-filter`, `article-handdrawn-illustrations`, `compose-lookbook`, `create-image-deck`, `create-social-carousel`, `image-combiner`, `legal-diagram-redraw`, `legal-evidence-timeline`, `make-infographic`, `make-silhouette`, `make-thumbnail`, `minimal-zine-poster`, `mono-color`, `photo-collage`, `poster-design`, `product-detail-page`, `recolor-object`, `recreate-social-photo`, `social-knowledge-notes`, `technical-visual-explainer`, `translate-image-text`, `urban-daylight-documentary-grade` |
| Personal appearance | `add-braces`, `add-tattoo`, `apply-makeup`, `change-bangs`, `eye-color-change`, `hair-color-change`, `hairstyle-change`, `make-selfie`, `shave-head` |
| Portrait production | `id-photo-format`, `professional-headshot` |
| Image repair and utilities | `clean-room`, `colorize-image`, `expand-image`, `remove-background`, `remove-glasses`, `remove-image-mark`, `remove-object`, `remove-photo-filter`, `retouch-blemish`, `smooth-wrinkles` |
| Characters, animals, and brands | `casting`, `character-reference-sheet`, `create-animal`, `create-avatar`, `create-character`, `create-flag`, `create-logo`, `create-mascot-logo`, `create-npc`, `make-pet-portrait` |
| Narrative and comics | `develop-story`, `narrative-video-storyboard`, `plan-comic-storyboard`, `plan-film-storyboard`, `render-comic-page`, `write-short-drama-series`, `write-short-video-hooks` |
| Spaces, diagrams, and CAD | `create-cad`, `make-flowchart`, `preview-landscape`, `preview-paint`, `restyle-room`, `visualize-floor-plan` |
| Video | `3d-animation-short-generator`, `add-video-effect`, `animate-image`, `backrooms-dreamcore`, `brand-promo-video-generator`, `brand-stream-mg`, `cinematic-video-prompt`, `character-toy-grid-motion`, `children-english-story-episode`, `co-op-game-intro-generator`, `combine-videos`, `correct-video-color`, `cross-model-video-prompt-adapter`, `data-driven-ad-creative-video`, `decorative-print-short`, `detail-page-skill-course`, `digital-product-promo-generator`, `dodge-game-video-generator`, `dot-matrix-brand-wordmark-motion`, `editorial-cutout-explainer`, `edit-social-video`, `film-reference-prompt-writer`, `fpv-tour-video-generator`, `generate-video`, `h3-prompt-expert`, `handdrawn-live-action-fusion`, `handdrawn-story-video`, `line-doodle-explainer`, `lip-product-commercial`, `live-sketch-motion`, `make-beat-synced-video`, `make-explainer-video`, `make-kinetic-typography`, `make-music-video`, `make-podcast-video`, `make-product-commercial`, `make-talking-video`, `make-video-intro`, `micro-expression-performance`, `minimalist-product-ad-generator`, `music-video-subtitle-generator`, `narrative-video-prompt`, `paper-collage-explainer-generator`, `papercraft-stop-motion-explainer`, `poster-motion`, `pov-short-film-generator`, `primitive-folk-cgi-restyle`, `product-launch-video`, `remove-video-mark`, `restyle-video`, `short-audiovisual-prompt`, `suspense-title-sequence-generator`, `testimonial-quote-video`, `transcript-broll-plan`, `upscale-video`, `video-model-advisor`, `video-prompt-failure-diagnosis` |
| Social and commemorative | `make-birthday-video`, `make-holiday-card`, `make-mugshot-photo`, `make-wallet-photo`, `make-wedding-photo` |

List them from your terminal:

```bash
weshop-skills list
```

Install only what you need:

```bash
weshop-skills install create-logo --agent codex
weshop-skills install weshop-router --agent codex
weshop-skills install orchestrate-multi-step-workflow --agent codex
```

## ⌨️ Official WeShop CLI

Execution uses a native WeShop tool exposed by the agent when available. Otherwise it uses only the official `weshop` CLI. Install and verify it separately:

```bash
npm install -g weshop-cli
weshop --version
weshop --help
```

Use its native Agent commands:

```bash
weshop gpt-image --help
weshop gpt-image --prompt "Create a clean geometric logo"
```

The label GPT Image 2 maps to the Agent ID `gpt-image`, not `gpt-image-2`. The official CLI does not support `list-agents`; use `weshop --help` or `weshop info <agent>`.

If `weshop` is absent, stop before upload or generation and install it; this repository intentionally contains no OpenAPI client or execution fallback. An authentication, validation, timeout, or ambiguous submission error is **not** a signal to change clients or retry the create call.

## 🔄 Inspect updates

Inspect one managed Skill at any time, or compare the local package version with npm:

```bash
weshop-skills status create-logo --agent codex
weshop-skills version
npm view weshop-skill-package version
```

`status` checks installed Skill content; it does not query npm. Use the two version commands above to determine whether a new package release exists.

## 🏗️ For maintainers

Start with [CONTRIBUTING.md](CONTRIBUTING.md) and the [maintainer guide](docs/maintainers/README.md). The repository includes separate workflows for [creating a Skill](docs/maintainers/adding-skills.md) and [adapting an external project to WeShop](docs/maintainers/importing-external-projects.md).

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm run build` | Clean and compile the multi-step orchestration validation library |
| `npm run check` | Run TypeScript checks |
| `npm test` | Test routing, safety policy, installation, and updates |
| `npm run router:validate` | Validate the Router task map, recipe DAGs, and referenced Skills |
| `npm run models:validate` | Validate the model catalog |
| `npm run models:routing-validate` | Validate model routes across all 137 creative Atom Skills |
| `npm run docs:validate` | Validate this README and Skill inventory |
| `npm run maintainers:validate` | Validate maintainer documentation |
| `npm run web:build` | Build the generated visual Skill catalog |
| `npm run skills:intake -- ...` | Start a provenance-safe external Skill intake |
| `npm run media:upload -- ...` | Upload and verify a Skill cover, source image, or cover video in the reviewed Tencent COS prefix |
| `npm run skills:custom:init -- ...` | Start an isolated user-owned custom Skill draft |
| `npm run skills:custom:check -- ...` | Run mechanical local checks on a custom Skill |
| `npm run skills:auto-update -- ...` | Install or inspect the Release-based background updater |
| `npm run api-key:check` | Check local WeShop API key presence without printing it |
| `npm run package:check` | Inspect the exact npm package contents before publishing |

## 🔒 Security

- `WESHOP_API_KEY` is read from the environment and sent only to `https://openapi.weshop.ai`.
- Every generation uses a durable operation key before submission.
- A missing or ambiguous execution receipt blocks automatic resubmission to avoid duplicate output and spend.
- Accepted runs are polled by execution ID; downstream download or publication failures do not trigger regeneration.

## 📄 License

Available under the [MIT License](https://github.com/weshopai/weshop-skill-package/blob/main/LICENSE).

---

Built with ❤️ by the WeShop AI team.
