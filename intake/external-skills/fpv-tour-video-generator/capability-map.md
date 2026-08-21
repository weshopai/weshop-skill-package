# WeShop capability substitution: fpv-tour-video-generator

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Plan a scene-first continuous FPV route | MiniMax Hub; model unspecified | Authorized scene, duration, ratio, landmarks, optional character/motion reference | Proposed `make-fpv-tour-video` planning contract | Current Router asset roles, ratio, operation-key and polling contracts | Make scene/world and character-identity roles explicit; retain one action/route per segment | No Hub route geometry or source interaction parity | Source Steps 1–6; current Router/video contracts |
| Generate a flight segment | MiniMax H3 recommended upstream | One timed route segment, scene/character references and continuity anchors | `generate-video`; choose from current catalog, with H3 only for justified large motion | Selected live model fields only | Describe camera path, altitude, banking, landmarks and end-state; forbid cuts/resets | Current source-reference limits and duration must be verified live | Source Steps 6–7; `generate-video` |
| Assemble connected segments | Hub video edit | Accepted segments over a verified duration limit | `combine-videos` | Accepted clip order and deterministic editor inputs | Preserve direction, speed, lighting and guide visibility across joins | No source canvas-edit parity | Source Step 8; `combine-videos` |

## Deterministic operations retained locally

- Route storyboard, asset-role ledger, continuity manifest, segment timing, and first/middle/last-frame inspection.

## Unsupported parity

- Source Hub tools, automatic paper-airplane substitution, unverified duration parity, and automatic publication.

## Proposed Atom boundaries

- Candidate `make-fpv-tour-video` owns a finished spatial one-take; retain `generate-video`, `animate-image`, and `combine-videos` as independent handoffs.
