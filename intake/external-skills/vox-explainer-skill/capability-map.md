# WeShop capability substitution: vox-explainer-skill

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Keyframe creation | Seedream via Atlas | Accepted beat and shared visual anchor | Existing image Atom / cataloged image model | Downstream-owned fields | Stable neutral documentary visual system | No exact provider/style parity | Package image catalog |
| Per-beat animation | Gemini Omni Flash via Atlas | Keyframe, measured beat duration, subtle motion | Existing `animate-image` or `generate-video` | Downstream-owned fields | One beat and restrained observable motion | Duration increments vary | Package video catalog |
| Narration/music | xAI TTS / MiniMax Music | Script and music brief | User-supplied or separately authorized supported audio | None | Preserve timing manifest | Standalone generation unsupported | Router tests |

## Deterministic operations retained locally

- Fact/script beats, narration timing, subtitles, clip conformity, assembly, ducking, and QC.

## Unsupported parity

- No named-brand imitation, Atlas execution, stale price/model claims, or unsupported standalone audio.

## Proposed Atom boundaries

- `make-explainer-video` owns the final explainer and delegates media nodes.
