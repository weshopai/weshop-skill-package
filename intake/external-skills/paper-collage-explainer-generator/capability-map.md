# WeShop capability substitution: paper-collage-explainer-generator

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Plan visual metaphors and style manifest | Hub question/canvas tools | Concept, beats, delivery context | Agent-authored plan | Beat list and user approvals | Translate prose into visual metaphors and stop-motion sequence | No Hub document/canvas parity | Reviewed source Steps 1–2 |
| Create approved final still | Hub image route | Segment spec, ratio, paper-material constraints | Current verified image route selected by Atom | Live schema only | Halftone cut-outs, color field, depth, no text | Exact visual fidelity unverified | Source Steps 3–4 |
| Animate collage assembly | MiniMax H3 via Hub | Approved still, one segment, tactile assembly | `generate-video` selected from current catalog | Selected model's live fields | Paper pieces slide/pop/press; end on approved composition | No guaranteed collage SFX or H3 parity | Source Steps 5–7 |
| Assemble accepted segments | Hub video editor | Ordered clips and audio policy | `combine-videos` | Clip order, trims, audio handling | Preserve useful native clip audio when present | No source editor parity | Source Step 8 |

## Deterministic operations retained locally

- Beat decomposition, style manifest, approval gates, and final-frame QA.

## Unsupported parity

- Automatic BGM, voiceover, subtitle generation, editable layers, Hub APIs, and a fixed provider model.

## Proposed Atom boundaries

- Candidate owns the complete paper-collage explainer contract; existing Atoms own generation and deterministic assembly.
