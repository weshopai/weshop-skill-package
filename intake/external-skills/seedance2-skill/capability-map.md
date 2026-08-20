# WeShop capability substitution: seedance2-skill

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Compile and generate one video shot | Volcengine Seedance models | Text/image/video/audio references, one action, duration, ratio and sound | Existing `generate-video` catalog routing | Downstream Skill-owned fields | Add creative change and asset/camera compatibility without provider syntax | Exact Volcengine multimodal parity is not assumed | Current package video catalog |

## Deterministic operations retained locally

- Asset diagnosis, creative-direction selection, atomic prompt compilation, and frame-level acceptance.

## Unsupported parity

- No Volcengine client, callbacks, trend scraping, automatic model fallback, or stale platform limits.

## Proposed Atom boundaries

- Update `generate-video`; keep neighboring image-animation and commercial outcomes separate.
