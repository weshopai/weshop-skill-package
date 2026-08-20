# Geometry and routing

## Verified API

Agent: `expandimage` v1.0.

| Field | Rule |
| --- | --- |
| `input.originalImage` | Required public source URL. |
| `targetWidth` | Required integer; final width, maximum 4096. |
| `targetHeight` | Required integer; final height, maximum 4096. |
| `fillLeft` | Optional original-image horizontal offset; omission centers automatically. Valid range is `-sourceWidth + 8` through `targetWidth - 8`. |
| `fillTop` | Optional original-image vertical offset; omission centers automatically. Valid range is `-sourceHeight + 8` through `targetHeight - 8`. |
| `batchCount` | Use `1` for one named deliverable; documented range 1–16. |

The endpoint exposes no Prompt, negative Prompt, model tier, or semantic-content field. It generates the uncovered canvas rather than stretching the source.

## Common ratios

| Ratio | Typical use | Minimal expansion from a square source |
| --- | --- | --- |
| 1:1 | Square social/catalog | No ratio change. Route to upscale or crop if another size is requested. |
| 4:5 | Portrait social/product | Keep width; extend height to `width × 5/4`. |
| 3:4 | Portrait/editorial | Keep width; extend height to `width × 4/3`. |
| 9:16 | Stories/Reels vertical | Keep width; extend height to `width × 16/9`. |
| 16:9 | Video thumbnail/banner | Keep height; extend width to `height × 16/9`. |
| 21:9 | Ultrawide hero | Keep height; extend width to `height × 21/9`. |

For named platforms, research current official dimensions and safe areas before choosing target pixels. Ratio alone does not define a safe delivery asset.

## Placement math

For a source `W × H` within target `TW × TH`:

- centered: `fillLeft = floor((TW-W)/2)`, `fillTop = floor((TH-H)/2)`;
- source left / space right: `fillLeft = 0`;
- source right / space left: `fillLeft = TW-W`;
- source top / space below: `fillTop = 0`;
- source bottom / space above: `fillTop = TH-H`.

Negative offsets crop source pixels and therefore release preservation. Use only with explicit authorization.
