# WeShop capability substitution: xhs-visual-director

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Create visual master | Unspecified image generator | Brief, style direction, palette, subject and 3:4 layout | `gpt-image` v1.0 / GPT Image 2 Medium | `textDescription`, optional references, `quality`, `imageSize`, `batchCount` | Describe one reusable composition and consistency anchor without protected style imitation | Exact text rendering can fail | Package model catalog and existing image Atoms |
| Generate carousel page | Unspecified image generator | Approved master, frozen page copy, page role, shared anchors | `gpt-image` v1.0 / GPT Image 2 Medium | Same fields, one operation per page | Include master anchors, observable page layout and exact copy | Cross-page typography and identity require inspection | Existing GPT Image 2 execution contract |

## Deterministic operations retained locally

- Discovery, page outline, copy freeze, caption/tag drafting, page ordering, and acceptance reporting.

## Unsupported parity

- No automatic social publishing. No guarantee that generated lettering is exact; repair or regenerate the affected page.

## Proposed Atom boundaries

- One `create-social-carousel` Atom owns the ordered set because page planning and cross-page visual locks are inseparable.
