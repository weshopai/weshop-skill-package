# WeShop capability substitution: micro-expression-video-generator

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Create acting prompt pack | Source analysis/Canvas workflow | Character image, script beat, or emotion phrase; duration and intensity | Agent-authored performance plan | User text, asset IDs, duration, optional Canvas document | Direct gaze, brow, mouth, breath, hands, tempo, and climax reset | No source reference-library parity; Canvas delivery is conditional | Reviewed `SKILL.md` and seven reference files |
| Generate approved performance clip | Source video call | Locked identity, scene, dialogue, camera, acting direction | `generate-video` with catalog-selected route | Live execution schema | Retain scene/camera while changing only performance layer | Fine facial control unverified | Reviewed `SKILL.md` workflow |

## Deterministic operations retained locally

- Performance direction, timing/intensity plan, and QA.

## Unsupported parity

- Mandatory source Canvas writes, facial-rigging/lip-sync claims, fixed route, and blind fallback. Canvas-capable Agents may store the approved pack there.

## Proposed Atom boundaries

- Candidate owns nuanced acting direction; `generate-video` owns the approved shot execution.
