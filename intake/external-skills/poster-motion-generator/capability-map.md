# WeShop capability substitution: poster-motion-generator
| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Analyze poster and plan motion | Source hub workflow | Poster, ratio, direction | Agent-authored plan | Asset ID, ratio, duration, optional Canvas document | Express layer order and final-lock constraints semantically | No source card UI parity | Reviewed source steps 1–7 |
| Animate approved poster | Source video call | Poster as final lock frame | `generate-video` catalog route | Live execution schema | Preserve readable text and final composition | Text fidelity unverified | Reviewed source steps 8–11 |
## Deterministic operations retained locally
- Ratio mapping, timed plan, and final-frame QA.
## Unsupported parity
- Fixed provider, automatic audio, source templates, and blind retry.
## Proposed Atom boundaries
- Candidate owns poster lock-frame motion; `generate-video` owns execution.
