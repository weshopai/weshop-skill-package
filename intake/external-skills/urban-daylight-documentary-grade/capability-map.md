# WeShop capability substitution: urban-daylight-documentary-grade

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Correct one urban daylight photograph for controlled exposure, clean midtones, detailed shadows, stable neutrals, subtle local warm/cool separation, and restrained sharpness without changing its scene or lighting structure. | No provider or model named. | One authorized source; preserve ratio, crop, content, geometry, texture, text, light direction, weather, and depth of field; forbid redraw, relighting, HDR flattening, global casts, grain, flare, and artificial texture. | `gpt-image` v1.0 / GPT Image 2, Medium, 2K, one edit result. | Source image reference; semantic edit Prompt; source ratio; `quality: "medium"`; `imageSize: "2K"`; `batchCount: 1`; one output; durable operation key. | Reorder the supplied Prompt into invariants, tonal targets, local color constraints, texture constraints, and acceptance checks; interpret selective background darkening only as refinement of existing tonal relationships. | No pixel-identical, RAW, calibrated-color, or missing-detail recovery guarantee; stop and disclose unresolved drift after one narrow retry. | `models/catalog.json` catalogs GPT Image 2 for editing, local edits, and consistency-sensitive Medium/2K image work; `apply-photo-filter` uses the same route for broader grading. |

## Deterministic operations retained locally

- Record source dimensions, clipping, protected neutrals, text, faces, object boundaries, and composition landmarks.
- Inspect highlight/shadow detail, neutral drift, hue stability, invented lighting, scene drift, texture loss, halos, noise, and vignette strength.
- Preserve the source and save the edit as a new artifact; do not publish automatically.

## Unsupported parity

- Exact RAW recovery, scopes, editable curves/masks, LUT export, reversible adjustment layers, calibrated color science, and pixel-identical preservation.
- Detail absent from the supplied raster cannot be truthfully described as recovered original evidence.

## Proposed Atom boundaries

- Own realistic urban daylight tonal-depth recovery for one supplied still image.
- Exclude broad filter looks, filter removal, object recoloring, relighting, weather change, compositing, background blur, and professional video/RAW grading.
