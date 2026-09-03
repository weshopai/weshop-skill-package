# WeShop capability substitution: mono-color

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Generate an original one/two-ink editorial artifact from text or a theme | Unspecified host image-generation capability | Subject or idea; exact short copy; 1–2 inks; neutral substrate; ratio; plate roles; composition; print treatment | `gpt-image` v1.0 / GPT Image 2 | `prompt`, requested supported ratio, `quality: "medium"`, `imageSize: "2K"`, `batchCount: 1`, durable operation key | Convert the resolved recipe into concise natural prose: exact copy, one concrete visual metaphor, assigned ink plates with hex values, paper exposure, type/image relationship, one focal event, print process, and exclusions | Model typography may require one focused retry; raster output is not a physical spot-color separation or print-ready file | `models/catalog.json` catalogs GPT Image 2 for readable text, posters, layout adherence, generation, editing, and Medium/2K defaults; `poster-design` uses the same route for text-bearing poster output |
| Transform an authorized reference photo into the editorial print system | Unspecified host reference-aware image generation | Original image plus declared identity/factual anchors; crop or abstraction permission; exact copy; same plate constraints | `gpt-image` v1.0 / GPT Image 2 reference-aware edit | Original image as an authorized reference, `prompt`, source-preserving supported ratio unless changed, `quality: "medium"`, `imageSize: "2K"`, `batchCount: 1`, durable operation key | Separate must-preserve identity/content, exact copy, and permitted reinterpretation; describe crop, screening, plate separation, exposed paper, and typography without copying a style reference's structure | Multi-reference and identity consistency remain cataloged as unknown; disclose unresolved drift and do not promise deterministic anchor locking | `models/catalog.json` records GPT Image 2 edit support and poster/layout strength; package image-edit Atoms use it for consistency-sensitive reference transformations |

## Deterministic operations retained locally

- Resolve subject, intent, exact copy, representation, ratio, substrate, mode, named inks, plate roles, paper exposure, focal event, release zone, typography role, and print treatment before generation.
- Keep user choices and exact wording stable across a retry; inspect ink count, copy, subject anchors, focal hierarchy, paper exposure, ratio, and originality after generation.
- Return the final Prompt and a compact recipe naming palette, plate roles, layout family, type direction, and print process.

## Unsupported parity

- Do not reproduce the source repository's JSON catalogs, stable-hash imperfection implementation, Python board builders, local file layout, example imagery, or physical print-separation implications.
- GPT Image 2 cannot guarantee exact pixel-level repeatability, long-copy typesetting, measured ink coverage, registration offsets, or press-ready spot-color plates; deterministic finishing is a separate downstream task.

## Proposed Atom boundaries

- Own exactly one raster editorial print artifact using one or two assigned ink plates, exposed neutral paper, a dominant subject/type event, controlled mechanical reproduction texture, and an originality firewall.
- Do not own general poster/flyer exploration, 70–90% aged-paper minimal-zine styling, unchanged-composition photo filtering, multipage editorial layout, prepress separations, or print manufacturing files.
