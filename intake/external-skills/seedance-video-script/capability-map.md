# WeShop capability substitution: seedance-video-script

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Plan timed video shots | Agent-authored | Intent, duration, ratio, references, dialogue | `plan-film-storyboard` | Structured shot manifest | Translate provider syntax into atomic shot fields | No claim of provider-limit parity | Pinned MIT source and current Atom |
| Generate or edit video | Seedance/Dreamina/Ark | Authorized references and accepted shot brief | `generate-video` or focused edit Atom | Native video operation fields | One operation per shot with preservation locks | Provider syntax is not preserved | Current routing and model policy |

## Deterministic operations retained locally

- Input audit, reference-role assignment, timed segmentation, camera conflict checks, and prompt compilation.

## Unsupported parity

- Volatile platform limits, proprietary mention syntax, and prompt-only success claims.

## Proposed Atom boundaries

- No new Atom; compose `plan-film-storyboard` with `generate-video` or the relevant edit Atom.
