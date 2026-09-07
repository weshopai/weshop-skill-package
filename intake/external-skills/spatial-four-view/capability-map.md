# WeShop capability substitution: spatial-four-view

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Multi-angle sheet | Unspecified in document; user requests Nano Banana 2 and GPT Image 2 support | Actual scene refs, fixed geometry, four camera classes | nano-banana-edit / nano2 or gpt-image / GPT Image 2 | Verified CLI --image, --prompt, --model nano2, --image-size 2K, --aspect-ratio 1:1, --batch 1 | Joint 2x2 generation with world-space ledger and role-bound references | No guaranteed geometry or unseen detail recovery | Official weshop-cli command help inspected 2026-09-07; models/catalog.json; no paid test |
| Optional overhead anchor then angle refinement | Unspecified | Original evidence plus reviewed overhead anchor and optional camera guide | nano-banana-edit / nano2 or gpt-image / GPT Image 2 | Same verified flags; ordered references, at most 9 | Layout authority only after QA; camera guide cannot donate scene objects; regenerate only inside authorized scope | Generated anchor can preserve an error; dual references cannot prove missing walls | Same CLI schema; source's reported success is anecdotal |

## GPT Image 2 route

Official `weshop gpt-image --help` inspected 2026-09-07: up to 5 ordered `--image` references, `--prompt`, `--quality medium`, `--image-size 2K`, explicit `--aspect-ratio 1:1`, `--batch 1`. Do not pass Nano's model flag. This applies to both sheet generation and optional anchor refinement. GPT Image 2 is a direct selection, not a fallback requiring a Nano attempt. Other user-selected models require live capability/schema verification. Neither route has paid spatial QA evidence.

## Deterministic operations retained locally

- Scene inventory, role mapping, camera ledger, comparison, optional panel crop and assembly.

## Unsupported parity

- Exact surveyed 3D reconstruction, guaranteed unseen backsides, automatic correctness, native CAD, seven-view delivery or unlimited retries.

## Proposed Atom boundaries

- One spatial four-view reference sheet. No furniture replacement, scene redesign, photo collage-only task or automatic downstream video.
