# WeShop capability substitution: drama-skills

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Narrative analysis and series writing | Agent-authored text | Source facts, market and episode constraints | Local agent reasoning | No WeShop API fields | Bible, outline, scripts and continuity ledger | Human editorial judgment required | Package planning convention |
| Character and scene assets | Abstract image backend | Accepted bible and visual anchors | Existing `character-reference-sheet` plus current image Atoms | Skill-owned GPT Image 2 fields | One asset outcome per operation with fixed anchors | Cross-image consistency requires inspection | Existing package routes |
| Shot generation | Abstract video backend | Accepted shot prompt, references, duration, ratio and sound | Existing `generate-video` or narrower video Atom | Selected catalog route fields | One observable shot per operation | Full episode assembly is separate | Existing package routes |

## Deterministic operations retained locally

- Source-fact ledger, stage confirmations, continuity manifests, prompt export, and review reporting.

## Unsupported parity

- No single WeShop operation provides end-to-end series production; editing and publication require explicit downstream work.

## Proposed Atom boundaries

- Merge narrative work into `write-short-drama-series`; compose existing generation Atoms through `weshop-router`.
