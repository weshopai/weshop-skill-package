# WeShop capability substitution: lip-product-ad-generator

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Create model/product anchors and storyboard | Source image/Canvas workflow | Lip product brief or references, model optional | Current verified image route plus agent storyboard | Live image schema, asset IDs, optional Canvas storyboard | Make anchors explicit: package, shade, finish, copy-safe space | Readable package text unverified; Canvas storage is conditional | Reviewed `SKILL.md` steps 1–4 |
| Render shot segments and assemble TVC | Source video/audio/editor workflow | Approved portrait, still life, storyboard | `generate-video` then `combine-videos` | Live video schema, accepted clip IDs | One proof claim per shot; preserve identity, pack, application, and finish | No automatic music or exact 30-second parity | Reviewed `SKILL.md` steps 5–7 |

## Deterministic operations retained locally

- Asset gates, storyboard, shot plan, text-safe checks, and final QA.

## Unsupported parity

- Autonomous music generation, mandatory source Canvas prompts, and blind segment retry. A Canvas-capable Agent may retain approved anchors and storyboard there.

## Proposed Atom boundaries

- Candidate owns lip-product commercial proof; existing Atoms own image, video, and assembly execution.
