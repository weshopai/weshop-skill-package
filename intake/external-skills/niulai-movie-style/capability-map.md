# WeShop capability substitution: niulai-movie-style

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Transform source into primitive failed-3D still | Source image edit call | Source image, broad anchors, user-selected strength | Current verified image-edit route selected by Atom | Live image-edit schema | State retained anchors and observable geometry/rigging/material/light degradation | Exact source aesthetic unverified | Reviewed `SKILL.md` steps 1–7 and prompt/style references |
| Add awkward motion/camera continuation | Source video call | Approved transformed still, confirmed motion intent | `generate-video` with catalog-selected route | Live execution schema | Use stiff pivots, sliding contacts, simple camera behavior | Controlled failure motion unverified | Reviewed `SKILL.md` step 5A and motion reference |

## Deterministic operations retained locally

- Anchor extraction, style preset selection, negative constraints, diagnosis, and QA.

## Unsupported parity

- Source naming as product-facing behavior, fixed route, repeated blind retries, and source tools.

## Proposed Atom boundaries

- Candidate owns broad-anchor-preserving primitive-3D reconstruction; routes own image and optional video execution.
