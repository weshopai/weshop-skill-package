# WeShop capability substitution: ip-as-logo

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Generate one simple square mascot candidate | Runtime-configured image generator; modern examples include GPT Image 2 | Product brief, subject/direction, exactly two mascot color families plus one background, 1:1, one candidate per asset | `gpt-image` v1.0 / GPT Image 2 Medium | `params.textDescription`, `params.quality: "medium"`, `params.imageSize: "2K"`, `params.aspectRatio: "1:1"`, `params.batchCount: 1` | Convert the source's provider branches into one semantic image-only prompt; omit logo/app-icon use-case wording from `textDescription` | Exact 32 px recognition and solid-color compliance remain stochastic; report failures and do not claim vector output | Existing catalog route and package GPT Image 2 policy; upstream `SKILL.md` at pinned revision |

## Deterministic operations retained locally

- Product-context reading, three-direction proposal, candidate labels, per-candidate operation keys, receipt collation, and acceptance reporting.

## Unsupported parity

- No vector/SVG deliverable, trademark clearance, guaranteed pixel dimensions, or automatic six-way parallel execution.

## Proposed Atom boundaries

- One new `create-mascot-logo` Atom. Keep general `create-logo` and standalone `create-character` boundaries unchanged.
