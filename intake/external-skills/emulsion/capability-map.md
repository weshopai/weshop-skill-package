# WeShop capability substitution: emulsion

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Block and preview a 3D shot | Local three.js application | Scene objects, keyframes, camera, duration | No native Atom parity | Not applicable | Could translate an accepted export into a shot brief | Interactive state editing is absent | Pinned source inspection |
| Use motion reference downstream | External video model | Exported authorized MP4 plus references | `plan-film-storyboard` then `generate-video` | Reference video and shot constraints | Preserve blocking as reference, not ground truth | Model adherence varies | Current package routes |

## Deterministic operations retained locally

- None packaged; a future companion application could retain scene state, playback, export, and framing QA.

## Unsupported parity

- Interactive browser bridge, shared live editing, scene persistence, MP4 export, and automatic upstream contribution.

## Proposed Atom boundaries

- No Atom. Reconsider only as a separately maintained application integration.
