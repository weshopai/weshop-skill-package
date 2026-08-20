# WeShop capability substitution: yaml-image-deck

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Generate a slide visual | Codex built-in image generation | One approved slide brief, ratio, style lock, authorized references | GPT Image 2 through WeShop image route | Prompt, aspect ratio, references, preservation constraints | Compile one page manifest into one image request | Small text and exact charts may drift | Model catalog and pinned source |
| Package inspected pages | Presentation tooling | Terminal accepted page images and optional editable overlays | Deterministic local packaging | Ordered page IDs and asset paths | No model prompt | Tool availability varies by environment | Package boundary review |

## Deterministic operations retained locally

- Source audit, slide manifest, layout selection, exact-text ledger, cardinality checks, montage review, and packaging.

## Unsupported parity

- Guaranteed rendered typography, automatic subagent use, Windows-specific commands, or precise data rendered inside generated pixels.

## Proposed Atom boundaries

- New `create-image-deck` owns planning, per-page generation orchestration, inspection, and packaging; it does not own research or presentation software internals.
