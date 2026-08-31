# WeShop capability substitution: ian-xiaohei-illustrations

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Generate one article-body illustration from one selected cognitive anchor | Runtime-native `image_gen`; provider not fixed | Complete article or one explicit idea; one metaphor; separate 16:9 image; white background; sparse black hand-drawn lines; restrained red, orange, and blue notes; deadpan black action character; no copied example composition | `gpt-image` v1.0 / GPT Image 2 Medium | `params.textDescription`, `params.quality: "medium"`, `params.imageSize: "2K"`, `params.aspectRatio: "16:9"`, `params.batchCount: 1`; authorized reference via `assetVersionIds` only when supplied | Convert the selected passage, role of the image, fresh physical metaphor, character action, whitespace, label limits, palette roles, and negative constraints into one image-only brief; omit provider-selection and local-copy commands | Chinese handwriting, exact whitespace percentage, and character consistency remain stochastic; inspect each result, reduce optional labels, and report unresolved defects | Upstream `SKILL.md` plus `style-dna.md`, `composition-patterns.md`, `prompt-template.md`, and `qa-checklist.md` at pinned revision; existing Package GPT Image 2 route |

## Deterministic operations retained locally

- Parse the supplied article, distinguish verified source claims from interpretation, choose only useful cognitive anchors, write an ordered shot list, assign stable image IDs and operation keys, preserve accepted outputs, and report passage placement and QA.

## Unsupported parity

- No exact handwritten-text guarantee, editable SVG/HTML/PPT delivery, bundled upstream examples, automatic article fetching, automatic publication, or overwrite of existing assets.

## Proposed Atom boundaries

- One new `article-handdrawn-illustrations` Atom. Keep sourced infographic, social carousel, image-deck, poster, and generic single-image boundaries unchanged.
