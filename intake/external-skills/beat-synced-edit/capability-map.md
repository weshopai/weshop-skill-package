# WeShop capability substitution: beat-synced-edit

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Analyze, plan, and render edit | Local Python/ffmpeg | Authorized music and visuals | `make-beat-synced-video` deterministic tools | Beat map, clip manifest, EDL, export | No model prompt | Available local codecs vary | Pinned MIT source |

## Deterministic operations retained locally

- Beat/section analysis, clip inspection, EDL validation, rendering, and export QC.

## Unsupported parity

- Upstream scripts, dependency bundle, example media, and fixed effect recipes.

## Proposed Atom boundaries

- One new deterministic edit Atom; it does not generate source footage or music.
