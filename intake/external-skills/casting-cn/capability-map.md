# WeShop capability substitution: casting-cn

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Initial face-setting portrait | Generic image-generation capability, default `image_2` | Six-field role card; vertical portrait; white background | `gpt-image` / GPT Image 2 | `params.textDescription`, `quality: medium`, `imageSize: 2K`, `batchCount: 1` | Compile the role brief with native locked blocks | Exact framing/geometry remains generative; inspect before approval | `models/catalog.json` entry; inspect current schema before execution |
| Identity-bound derivatives | Generic reference-image capability | Accepted portrait; full body also for turnaround; no auto-expansion | `gpt-image` / GPT Image 2 only when current schema supports public references | `input.images` and `params.images`; operation key per asset | Replace asset-marker syntax with exact accepted public URL and preserve ordering | Catalog marks identity/multi-reference unknown; do not promise a lock | Catalog and `create-character` binding convention |
| Confirmation/selection | Generic question capability | Approval after visual QA; optional assets | Native conversation/UI | No image API call | Ask explicit choices where multi-select is unavailable | UI varies | Package approval-gate convention |

## Deterministic operations retained locally

- State reasonable missing role-card fields before generation; switch to CG only for 漫剧, 3D漫剧, 3D角色, 三维, CG, or 三渲二; never mix rendering modes.
- Require an approved portrait before derivatives and an approved full body before turnaround; retain reference order.

## Unsupported parity

- Asset-archive marker syntax is not a WeShop API contract; use accepted public image URLs only.
- A `cast-style-*.json` file is optional project state and must not be created outside an authorized workspace.
- Do not claim deterministic grid layout, exact ratios, or perfect identity continuity; inspect results and offer one bounded revised retry for known failures.

## Proposed Atom boundaries

- `casting-cn` owns screen casting: portrait approval before optional white-background production assets.
- It does not own canonical eight-asset production packs, game-role concepting, or real-person appearance changes.
