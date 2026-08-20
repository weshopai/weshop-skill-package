# WeShop capability substitution: ai-storyboard-director-v5-2

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Design and expand storyboard | Agent-authored | Source, facts, production constraints | `plan-film-storyboard` | Design pass and shot manifest | Convert prose contract to concise traceable fields | Upstream versioned schema not reproduced | Pinned MIT source |
| Generate accepted shots | Multiple named providers | Approved shot brief and assets | `generate-video` | Native per-shot fields | One atomic operation per shot | Provider parity not assumed | Current Router |

## Deterministic operations retained locally

- Concept/motif pass, beat decomposition, editorial motivation, continuity, and acceptance review.

## Unsupported parity

- Versioned archive, copied all-in-one prompts, provider-specific syntax, and automatic media generation.

## Proposed Atom boundaries

- Merge into `plan-film-storyboard`; final video remains separate.
