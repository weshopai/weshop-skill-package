# WeShop capability substitution: pov-short-film-generator

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Define POV film spec and storyboard | MiniMax Hub planning | Premise, subjective action, forbidden views, references, format/duration | Candidate `make-pov-short-film`, with `plan-film-storyboard` handoff | Router asset roles and approved planning artifacts | Rewrite external-camera language into first-person sensory/action language | No source UI/choice-card parity | Source Steps 1–8; `plan-film-storyboard` |
| Generate an atomic POV clip | MiniMax video generation; model unspecified | One subjective action, scene, hand/fragment visibility, end-state, ratio/duration | `generate-video` selected by current catalog | Selected live fields, operation key, execution ID | Make POV viewpoint and forbidden third-person reveals explicit | Reference duration and POV fidelity require run validation | Source Steps 8–9; `generate-video` |
| Assemble the short film | Hub video edit | Accepted clips, continuity and approved audio plan | `combine-videos` plus deterministic QC | Accepted clip manifest/editor inputs | Preserve screen direction, subjective viewpoint and audio continuity | No source Canvas parity | Source Step 10; `combine-videos` |

## Deterministic operations retained locally

- POV spec, asset-role/continuity ledger, storyboard, anti-lottery checks, accepted-clip manifest, assembly and frame/playback review.

## Unsupported parity

- Source UI/tools, auto fallback, native-audio guarantee, automatic film generation after failed checks, and publication.

## Proposed Atom boundaries

- Candidate `make-pov-short-film` owns an assembled first-person narrative; retain planning, atomic generation, and editing Atoms as independent handoffs.
