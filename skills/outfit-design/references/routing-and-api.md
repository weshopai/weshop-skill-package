# Routing and API

## Dedicated route

Agent: `outfit-generator` v1.0.

| Field | Rule |
| --- | --- |
| `input.images` | Require exactly one public person-image URL. |
| `images` | Repeat the same image URL; maximum one. |
| `textDescription` | Describe the new outfit and preservation locks. Omit component-board language from the upstream default. |
| `batchCount` | Use `1` per named direction. |

The endpoint exposes no mask, aspect-ratio, image-size, quality, garment-reference, or background-reference fields. Do not invent them.

## Route boundary

- Outfit Generator: invent or redesign clothing from text on one supplied person.
- GPT Image 2 Medium: reference-aware or exact local redesign, several protected pieces, readable garment text, or dedicated-agent mismatch.
- Virtual Try-On: apply one or more supplied real garment references without redesigning them.
- Clothes Changer mode: replace a worn garment with one supplied garment while preserving the scene.
- Fashion Model Replacement: keep clothing and replace the person.
- Change Pose: keep person and clothing and change pose.

The API default contains useful preservation anchors but ends by requesting a composite diagram. That layout contradicts the Atom's one-finished-image contract, so the cleaned compiler retains identity/body/pose/background preservation and removes the diagram request.
