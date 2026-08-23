# WeShop capability substitution: ip-toy-grid-motion

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Make identity-preserved six-panel toy poster | Source image call | One character image, vertical 9:16, irregular six panels | Current verified image route selected by Atom | Live schema only | Specify panel geometry and observable character anchors; do not copy templates | Exact layout success unverified | Reviewed `SKILL.md` step 1 and references |
| Animate Panel 4 expansion and grid return | Source video call | Approved poster, six-second vertical timeline | `generate-video` with catalog-selected route | Live execution schema | State Panel 4 0–2s, return 2–3s, stable grid thereafter | Per-panel motion isolation unverified | Reviewed `SKILL.md` step 2 and references |

## Deterministic operations retained locally

- Character evidence extraction, panel-layout specification, and QA.

## Unsupported parity

- Verbatim prompt templates, source grouping tools, fixed route, and blind retry.

## Proposed Atom boundaries

- Candidate owns toy-grid structure and handoff gates; image/video routes own generation.
