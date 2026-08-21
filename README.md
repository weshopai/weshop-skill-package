<p align="center">
  <img src="assets/readme/weshop-skills-banner.png" alt="WeShop Skills" width="100%" />
</p>

<p align="center">
  Creative AI Skills for Codex, Claude Code, Cursor, and any Agent Skills-compatible runtime.
</p>

<p align="center">
  <img alt="92 Skills" src="https://img.shields.io/badge/Skills-92-7530FE?style=flat-square" />
  <img alt="Codex" src="https://img.shields.io/badge/Codex-ready-10A37F?style=flat-square" />
  <img alt="Claude Code" src="https://img.shields.io/badge/Claude_Code-ready-D97757?style=flat-square" />
  <img alt="Cursor" src="https://img.shields.io/badge/Cursor-ready-2563EB?style=flat-square" />
  <img alt="MIT License" src="https://img.shields.io/badge/License-MIT-F2C94C?style=flat-square" />
</p>

WeShop Skills turns plain-language creative requests into production-ready image, video, product, portrait, layout, and spatial workflows powered by WeShop OpenAPI. Install the complete collection or pick only the Skills you need.

> This repository contains **89 focused Atom Skills + 2 user-authoring Skills + 1 adaptive Router**. It is a content-first package: media execution uses a native WeShop harness tool or the official `weshop` CLI, never a package-owned fallback client.

## 🚀 Install with one prompt

Open Codex, Claude Code, or Cursor and paste this:

```text
Install the latest stable `weshop-skill-package` from npm globally, run `weshop-skills install` for the agent you are running in, verify the managed Skill installation, and tell me whether I need to restart the agent. Do not ask me to paste or print my WeShop API key. Preserve all user-owned custom Skills.
```

The Agent should use the npm package and install the Skills into its own global Skill directory.

## 📦 Install manually

### 1. Install the npm package

```bash
npm install -g weshop-skill-package
weshop-skills version
```

Node.js 22 LTS and npm are required. The npm version matches the stable GitHub Release version.

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

### 3. Update

Every stable GitHub Release publishes the same version to npm. Update the package, then synchronize managed installations:

```bash
npm update -g weshop-skill-package
weshop-skills sync --all
weshop-skills status --all
```

Symlink installations follow the upgraded npm package immediately; `sync --all` also discovers newly added official Skills. Copy installations are refreshed only by `sync`. Package updates never scan, modify, upload, or delete user-owned custom Skills.

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

You do not need to memorize Skill names. Describe the result you want and the Router will select and combine the right Skills.

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

Ask for a reusable user-owned Skill in plain language. The Router composes `$create-custom-skill` and `$review-custom-skill`: creation stays in an isolated draft, review is read-only, and installation into your Agent's user Skill directory requires your confirmation.

```text
Save the workflow we just completed as my own reusable Skill. Keep it local, compare it with similar installed Skills, review it, and show me the install target before copying anything.
```

Drafts default to `~/.weshop-skill-package/custom-skills/` and are not visible to the Agent until reviewed and approved. They remain user-owned and are not overwritten by package updates. Deterministic scaffolding and mechanical review are also available:

```bash
weshop-skills custom init my-custom-skill
weshop-skills custom review ~/.weshop-skill-package/custom-skills/my-custom-skill
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
| 🧠 Multi-step routing | Natural-language planning, parallel or ordered Skills, asset handoff, final QA |
| 🛡️ Safe execution | Stable operation keys, duplicate-spend protection, polling, recovery records |

The Router discovers installed Skills from their descriptions, decomposes compound requests, connects outputs to downstream inputs, selects verified WeShop models or Agents, and performs one focused acceptance check on the final result.

## Complete Skill inventory 🧩

The `skills/` directory contains 89 creative Atom Skills, two platform-tooling Skills, and one Router. Categories below are for browsing only and do not participate in hard-coded Router selection.

| Category | Skills |
| --- | --- |
| Router | `weshop-router` |
| User authoring and review | `create-custom-skill`, `review-custom-skill` |
| Commercial products and apparel | `ai-product`, `change-pose`, `create-white-background-product-mockup`, `fashion-model-replacement`, `outfit-design`, `product-packaging`, `virtual-try-on` |
| Layout and marketing | `ai-banner-design`, `add-speech-bubble`, `apply-photo-filter`, `compose-lookbook`, `create-image-deck`, `create-social-carousel`, `image-combiner`, `make-infographic`, `make-silhouette`, `make-thumbnail`, `photo-collage`, `poster-design`, `product-detail-page`, `recolor-object`, `recreate-social-photo`, `translate-image-text` |
| Personal appearance | `add-braces`, `add-tattoo`, `apply-makeup`, `change-bangs`, `eye-color-change`, `hair-color-change`, `hairstyle-change`, `make-selfie`, `shave-head` |
| Portrait production | `id-photo-format`, `professional-headshot` |
| Image repair and utilities | `clean-room`, `colorize-image`, `expand-image`, `remove-background`, `remove-glasses`, `remove-image-mark`, `remove-object`, `remove-photo-filter`, `retouch-blemish`, `smooth-wrinkles` |
| Characters, animals, and brands | `character-reference-sheet`, `create-animal`, `create-avatar`, `create-character`, `create-flag`, `create-logo`, `create-mascot-logo`, `create-npc`, `make-pet-portrait` |
| Narrative and comics | `develop-story`, `plan-comic-storyboard`, `plan-film-storyboard`, `render-comic-page`, `write-short-drama-series`, `write-short-video-hooks` |
| Spaces, diagrams, and CAD | `create-cad`, `make-flowchart`, `preview-landscape`, `preview-paint`, `restyle-room`, `visualize-floor-plan` |
| Video | `3d-animation-short-generator`, `add-video-effect`, `animate-image`, `brand-promo-video-generator`, `combine-videos`, `correct-video-color`, `edit-social-video`, `generate-video`, `make-beat-synced-video`, `make-explainer-video`, `make-kinetic-typography`, `make-music-video`, `make-podcast-video`, `make-product-commercial`, `make-talking-video`, `make-video-intro`, `remove-video-mark`, `restyle-video`, `upscale-video` |
| Social and commemorative | `make-birthday-video`, `make-holiday-card`, `make-mugshot-photo`, `make-wallet-photo`, `make-wedding-photo` |

List them from your terminal:

```bash
weshop-skills list
```

Install only what you need:

```bash
weshop-skills install create-logo --agent codex
weshop-skills install weshop-router --agent codex
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

Inspect one managed Skill at any time:

```bash
weshop-skills status create-logo --agent codex
```

## 🏗️ For maintainers

Start with [CONTRIBUTING.md](CONTRIBUTING.md) and the [maintainer guide](docs/maintainers/README.md). The repository includes separate workflows for [creating a Skill](docs/maintainers/adding-skills.md) and [adapting an external project to WeShop](docs/maintainers/importing-external-projects.md).

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm run build` | Clean and compile the Router validation library |
| `npm run check` | Run TypeScript checks |
| `npm test` | Test routing, safety policy, installation, and updates |
| `npm run models:validate` | Validate the model catalog |
| `npm run models:routing-validate` | Validate model routes across all 89 creative Atom Skills |
| `npm run docs:validate` | Validate this README and Skill inventory |
| `npm run maintainers:validate` | Validate maintainer documentation |
| `npm run web:build` | Build the generated visual Skill catalog |
| `npm run skills:intake -- ...` | Start a provenance-safe external Skill intake |
| `npm run skills:custom:init -- ...` | Start an isolated user-owned custom Skill draft |
| `npm run skills:custom:review -- ...` | Run read-only mechanical checks on a custom Skill |
| `npm run skills:auto-update -- ...` | Install or inspect the Release-based background updater |
| `npm run api-key:check` | Check local WeShop API key presence without printing it |
| `npm run package:check` | Inspect the exact npm package contents before publishing |
| `npm run package:check` | Inspect the exact npm package contents before publishing |

## 🔒 Security

- `WESHOP_API_KEY` is read from the environment and sent only to `https://openapi.weshop.ai`.
- Every generation uses a durable operation key before submission.
- A missing or ambiguous execution receipt blocks automatic resubmission to avoid duplicate output and spend.
- Accepted runs are polled by execution ID; downstream download or publication failures do not trigger regeneration.

## 📄 License

Available under the [MIT License](https://github.com/weshopai/weshop-skill-pakage/blob/main/LICENSE).

---

Built with ❤️ by the WeShop AI team.
