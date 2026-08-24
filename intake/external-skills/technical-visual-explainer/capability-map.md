# WeShop capability substitution: technical-visual-explainer

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Assemble an interactive technical explanation | No required provider | Verified facts, requested HTML output, and optional project tokens | Native deterministic HTML and approved browser preview | Self-contained HTML, embedded CSS/JS, and local output path | Convert facts into accessible sections, diagrams, and tables without adding claims | Live browser interactions depend on local viewer support | Upstream SKILL.md and local package boundary review |

## Deterministic operations retained locally

- Local HTML/CSS/JS assembly, accessibility checks, and deterministic diagram rendering remain candidate-owned.

## Unsupported parity

- Do not retain optional third-party image generation, automatic browser opening, or home-directory output paths.

## Proposed Atom boundaries

- Produces an HTML explanation artifact; it does not replace the static-image contract of make-infographic.
