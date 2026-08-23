# WeShop capability substitution: short-drama-multilingual-dubbing

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Build localization tables | Hub analysis/transcription tools | Authorized video/audio, optional subtitle file, target language | Agent-authored deterministic table workflow | Source timestamps and confirmed text | Preserve source as master clock and require wording confirmation | No verified ASR/subtitle parser route | Reviewed source Steps 1–4 |
| Replace source lines in another language | SeedAudio replication or official voices | Per-line source reference, duration, confirmed translation | Future extension when a verified audio model or Agent exists | Add only then from the live schema | Preserve one line per durable receipt, confirmed text, source timing, performance lock, and bounded repair | No source-line timbre/emotion parity until verified | Source Steps 5–9 and package audio policy |
| Export subtitle and final mux | Hub video editor | Confirmed subtitle timing, localized audio, silent source video | `combine-videos` only after compatible audio assets exist | Explicit timeline and audio policy | Keep subtitle timing separate from generated speech length | No guaranteed mux/subtitle-file API parity | Source Steps 10–11 |

## Deterministic operations retained locally

- Master-clock ledger, dialogue/subtitle tables, confirmation gate, and slot manifest specification.

## Unsupported parity

- Audio separation, transcription, source-line voice replication, official multilingual voices, standalone audio generation/editing, and automated subtitle burn-in remain unverified. A verified audio model or Agent is the explicit future trigger to add this candidate's execution route.

## Proposed Atom boundaries

- Candidate owns source-dialogue localization rules. When a verified audio model or Agent exists, add its live schema, per-line durable execution records, timing/mix validation, and error-responsive repair here; until then it remains active but non-executable.
