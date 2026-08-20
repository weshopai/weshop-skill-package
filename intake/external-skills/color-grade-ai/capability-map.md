# WeShop capability substitution: color-grade-ai

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Plan, analyze, or transform | Agent-authored/local upstream tools | Authorized source and fixed constraints | Local reasoning or existing narrow Atom | No fields or downstream-owned native fields | One explicit outcome and acceptance contract | Provider/tool parity is not assumed | Pinned MIT source and package catalog |

## Deterministic operations retained locally

- Input audit, structured plan, state/timing checks, output validation, and issue-local repair.

## Unsupported parity

- Copying preset LUT binaries/code, assuming Rec.709 before conversion, hardware-specific encoders, fixed universal skin/exposure targets, and destructive source overwrite.

## Proposed Atom boundaries

- Update `correct-video-color` with transfer-curve detection, ambiguity gate, measured correction, shot matching, and LUT/export validation.
