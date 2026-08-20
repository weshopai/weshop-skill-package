# API and routing

## WeShop AI Product

Verified agent: `aiproduct` v1.0.

| Field | Required | Rule |
| --- | --- | --- |
| `input.originalImage` | Yes | One product URL. |
| `params.originalImage` | Yes | Repeat the same URL. |
| `generatedContent` | Yes | Default `freeCreation` when placing the protected product into a supplied or generated custom Location. This controls generation freedom versus reference-to-origin style; it is not an aspect-ratio field. |
| `maskType` | Yes | Default `autoSubjectSegment`; use `custom` only with a real `customMaskUrl`. |
| `textDescription` | Conditional | Describe one coherent background/scene when no explicit `locationId` is supplied. |
| `negTextDescription` | No | State product drift and extra-object risks. |
| `locationId` | Conditional | Prefer a custom Location created from the accepted background image. An explicitly supplied ID may pass through. |
| `customMaskUrl` | Conditional | Required with `maskType: "custom"`. |
| `batchCount` | No | Always `1` for named deliverables. |

The task contract exposes no aspect-ratio, output-size, direct scene-image, or multiple-product-reference parameter. Convert a background image into a Location first:

1. `POST /openapi/v1/agent/myLocation/create` with public `image`, `name`, `agentName: "aiproduct"`, and `agentVersion: "v1.0"`.
2. Poll `GET /openapi/v1/agent/myLocation/query?locationId=...` until `status: "complete"`.
3. Pass that `locationId` to the AI Product execution with `freeCreation` and `autoSubjectSegment`.

The official page documents the custom-Location endpoint under AI Model, but a live 2026-08-19 request verified that `agentName: "aiproduct"` is accepted. Treat this as a tested API behavior and reverify if the endpoint changes. `oriSubRotate` and `skinTexture` may appear in execution metadata but are not documented caller fields.

## Route boundaries

| Need | Route |
| --- | --- |
| Preserve one real product; replace background | AI Product |
| Pure white/solid catalog mockup | White Background Product Mockup |
| Transparent cutout | Background Removal |
| User describes a scene but supplies no background | GPT Image 2 medium/2K creates one empty background; register it as a custom AI Product Location |
| User supplies a background | Register it as a custom AI Product Location; do not regenerate it |
| Background composition/pixels or a named object must remain exact | GPT Image 2 medium/2K with numbered product/background roles; AI Product Location may reinterpret the scene |
| Custom Location creation fails or product-scene integration fails twice | GPT Image 2 medium/2K with numbered product/background roles |
| Extend to exact ratio after scene acceptance | Expand Image |
| Add exact copy/layout | Poster Design, Banner Design, or Layout Composition |
| Create or redesign packaging | Product Packaging |

Do not infer an unshown back, interior, accessory, use result, measurement, claim, or certification from a single product view.
