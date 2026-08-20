# WeShop capability substitution: seedance-tvc-director

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Generate controlled product shot | Seedance-oriented generator | Product references, one action, camera, duration, ratio and sound | Kling 3.0 for reference/product control; Seedance 2.5 for audio-visual/artistic work | Current route fields owned by downstream video Skill | One observable product action with explicit preservation locks | Label/text and exact pack geometry need frame inspection | Existing model catalog and `generate-video` policy |
| Generate audiovisual commercial shot | Seedance-oriented generator | Accepted shot plan, sound/VO beat and visual action | Seedance 2.5 | Current route fields owned by downstream video Skill | Align action, camera and sound event on the same time beat | Lip sync and exact VO timing may require editing | Existing model catalog |
| Assemble accepted shots | Local or editor workflow | Terminal-success clips in timeline order | Existing `combine-videos` | Local deterministic media operation | No generative prompt | Transitions/mix beyond the assembly contract remain separate | Existing package Atom |

## Deterministic operations retained locally

- Brief lock, claim ledger, shot timing, continuity sheet, operation keys, acceptance report, and deterministic assembly where supported.

## Unsupported parity

- No guarantee of exact generated packaging text, legal claim clearance, or automatic publishing.

## Proposed Atom boundaries

- `make-product-commercial` owns the treatment and final acceptance while delegating individual media operations to verified package routes.
