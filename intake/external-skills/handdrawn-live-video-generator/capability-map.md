# WeShop capability substitution: handdrawn-live-video-generator

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Draft timed contact-to-morph prompt | Source hub prompt workflow | Scene, hand/object, mood, language | Atom-authored route plan | User text, asset IDs, ratio, duration; optional Canvas document | Express five beats and exclusions semantically | No source card parity; Canvas document only when the Agent supports it | Reviewed `SKILL.md` steps 1–4 |
| Generate fusion clip | Source video call | One 15-second 16:9 scene, optional reference | `generate-video` with catalog-selected route | Live execution schema | Preserve opening contact, traceability, delayed camera | Exact source-model parity unverified | Reviewed `SKILL.md` step 5 |

## Deterministic operations retained locally

- Same-language prompt formatting, beat plan, and QA.

## Unsupported parity

- Source hub calls, mandatory provider selection, and blind model switching.

## Proposed Atom boundaries

- Candidate owns the fusion-shot contract; `generate-video` owns execution.
