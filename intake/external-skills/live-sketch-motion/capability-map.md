# WeShop capability substitution: live-sketch-motion

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Prepare source/preview and motion plan | Source image analysis/Canvas workflow | Real photo, video, or text scene | Current verified image route for text-only preview; agent plan | Live image schema, asset IDs, optional Canvas plan | Require live motion, occlusion plan, pen path, and three-layer sketch | No source document parity; Canvas plan only when supported | Reviewed `SKILL.md` core rules and steps 1–2 |
| Generate pen-driven conversion clip | Source video call | Approved source, one moving target, marker constraints | `generate-video` with catalog-selected route | Live execution schema | Preserve marker-tip timing and ongoing target motion | Frame-perfect reveal unverified | Reviewed `SKILL.md` steps 3–4 |

## Deterministic operations retained locally

- Preview gate, motion/occlusion plan, sketch-layer specification, and QA.

## Unsupported parity

- Mandatory source Canvas writes, mandatory provider route, and unrequested audio/subtitles. Canvas-capable Agents may keep the approved plan and prompt there.

## Proposed Atom boundaries

- Candidate owns the marker-driven live-sketch contract; routes own actual generation.
