# WeShop capability substitution: transcript-broll-planner
| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Segment transcript and make B-roll plan | Source analysis/canvas workflow | Transcript, evidence assets, text constraints | Agent-authored plan | Text, asset IDs, optional Canvas document | Mark exact claims for deterministic/evidence handling | No source grouping UI parity | Reviewed source steps 1–5 |
| Generate approved visual beats | Source media workflow | Approved beat and asset roles | `generate-video` catalog route | Live video schema | One semantic idea per shot | Readable-text parity unverified | Reviewed source steps 6–7 |
## Deterministic operations retained locally
- Semantic segmentation, material audit, and evidence flags.
## Unsupported parity
- Automatic subtitle/text rendering, source tools, and blind retry.
## Proposed Atom boundaries
- Candidate owns transcript-to-B-roll planning; video route owns approved visuals.
