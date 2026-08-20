# WeShop capability substitution: ai-visual-director

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Character references | Abstract image backend | Character anchors and style | `character-reference-sheet` | Existing Skill-owned GPT Image 2 fields | Preserve identity block and prohibited changes | Cross-asset consistency needs inspection | Existing Atom |
| Storyboard and comic pages | Abstract image backend | Accepted story, characters, scenes and page plan | `plan-comic-storyboard` → `render-comic-page` | Existing planning and GPT Image 2 contracts | Keep exact manifest handoff | Film storyboards are not comic pages | Existing Atoms |
| Poster or layout | Abstract image backend | Accepted assets, copy and placement | Existing poster/layout Atoms | Existing Skill-owned fields | Outcome-specific prompt | Exact lettering may need repair | Existing Atoms |
| Video shot | Abstract video backend | One shot, references, action, camera and sound | `generate-video` or narrower video Atom | Cataloged model fields | One observable shot | Multi-shot assembly is separate | Existing Atoms |

## Deterministic operations retained locally

- Source extraction, anchor manifests, stage approval, continuity ledger, and acceptance reporting.

## Unsupported parity

- No single Atom promises an entire story-to-video production package; Router composition remains explicit and inspectable.

## Proposed Atom boundaries

- No new Atom. Preserve the current narrow Atom set and use `weshop-router` for the multi-stage DAG.
