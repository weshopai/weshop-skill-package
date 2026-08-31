# WeShop capability substitution: minimal-zine-poster

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Generate one raster zine poster | Host image tool; unspecified | One metaphor, sparse paper layout, short copy, one accent | `gpt-image` v1.0 / GPT Image 2 | `prompt`, supported portrait ratio, `quality: "medium"`, `imageSize: "2K"`, `batchCount: 1` | State paper, negative-space share, focal position/scale, type, hue, print defects, and exclusions in concise semantic prose. | Exact type is not guaranteed; `3:5` is undocumented, so use a supported requested ratio or `3:4`. | `models/catalog.json` lists generation, editing, typography, layout adherence, and 1K/2K/4K; shared policy requires Medium/2K for text. |
| Transform a supplied photo | Host image editing | Actual source, declared role, preservation invariants | `gpt-image` v1.0 / GPT Image 2 | Source asset plus the same fields | Separate must-preserve, may-change, and may-introduce clauses; prefer a crop or printed fragment at high preservation. | Identity and multi-reference consistency are cataloged as unknown; disclose drift. | `models/catalog.json` marks edit support and unknown identity/multi-reference consistency. |
| Analyze references into a style system | Host reasoning and inspection | Only accessible images; evidence separate from interpretation | Local Agent reasoning and image inspection | Supplied image metadata; no generation unless requested | Return fixed rules, variable rules, sample residue, avoid list, reusable prompt, and confidence. | Missing files cannot be analyzed; do not infer collection-wide ranges from one sample. | Upstream `SKILL.md` and reference-analysis contract. |

## Deterministic operations retained locally

- Reduce an article or idea to one imageable relation.
- Assign image roles and preservation invariants.
- Select a coherent layout, focal structure, type distribution, paper tone, accent, and texture.
- Inspect negative space, focal scale, copy, preservation, crop, and commercial drift.

## Unsupported parity

- No arbitrary folder scan, guaranteed `3:5`, exact long text, identity, exact composition, or unknown multi-reference fidelity.
- No source-specific attachment flags, scripts, assets, fonts, or provider behavior.

## Proposed Atom boundaries

- Own one sparse vertical aged-paper editorial poster, its prompt-only form, or analysis of references into the same system.
- Exclude general poster exploration, promotional flyers, multipage layouts, article-body illustration sets, thumbnails, carousels, infographics, publication, and animation.
