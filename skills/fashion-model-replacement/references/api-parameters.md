# WeShop AI Model Parameters

Current verified route: `aimodel` v1.0.

## Inputs

| Field | Required | Use |
| --- | --- | --- |
| `input.originalImage` | Yes | Already-dressed person or mannequin source URL. |
| `params.originalImage` | Yes | Repeat the same source URL in the run parameters. |

## Parameters

| Parameter | Values | Routing rule |
| --- | --- | --- |
| `generatedContent` | `freeCreation`, `referToOrigin` | Use `freeCreation` when only `textDescription` defines a new model. Use `referToOrigin` with an explicit `fashionModelId` when source continuity is primary. |
| `maskType` | See mask table below | Defines what is protected, not what the Prompt asks for. |
| `textDescription` | string | Short model/scene instruction. At least one of this, `fashionModelId`, or `locationId` is required. |
| `fashionModelId` | integer | Use only when explicitly provided by the user; do not ask users to blind-pick an unpreviewed library ID. |
| `locationId` | integer | Scene replacement input. Omit for model-only replacement and use only when explicitly supplied. |
| `fashionModelTagIds` | integer array | Optional model-library tags. Omit in the normal Skill flow because users cannot preview the catalog. |
| `locationTagIds` | integer array | Optional location-library tags. Omit for Keep BG and from the normal Skill flow. |
| `negTextDescription` | string | State a few high-risk prohibited changes. |
| `pose` | `originalImagePose`, `referenceImagePose`, `freePose` | Default model replacement to `originalImagePose`. `referenceImagePose` depends on a location reference; `freePose` releases pose. |
| `customMaskUrl` | PNG URL | Required only with `maskType: "custom"`; use when a verified mask pipeline precisely defines protected regions. |
| `customMask` | base64 PNG payload | Legacy execution alternative for `custom`; same dimensions as the source and without a data-URL prefix. Prefer the verified URL field in the current wrapper. |
| `resultImageFormat` | `png`, `jpg` | Optional legacy output format; default `png`. |
| `resizeToOriginalImage` | boolean | Optional legacy resize to original dimensions; default `false`. Do not use as a substitute for correct generation framing. |
| `batchCount` | 1–16 | Default to `1`; named variants run separately. |

## Mask semantics

| `maskType` | Protected region | Appropriate use |
| --- | --- | --- |
| `autoHumanSegment` | Body and background | Default identity/head replacement without changing the background, outfit, body, pose, or composition. |
| `autoApparelSegment` | Full-body clothing | Whole-model regeneration where apparel is locked but body and background may change. Do not use when background must remain unchanged. |
| `autoUpperApparelSegment` | Upper garment | Regenerate everything except the protected upper garment. |
| `autoLowerApparelSegment` | Lower garment | Regenerate everything except the protected lower garment. |
| `autoSubjectSegment` | Foreground subject | Background replacement only. |
| `inverseAutoHumanSegment` | Face | Preserve face while changing outfit and background; not Fashion Model Replacement. |
| `custom` | Caller-defined mask | Precise protected-region workflow when a real mask is supplied. |

`autoHumanSegment` changes model identity primarily through the head/face while retaining the original body. If the user requests a materially different body type, height, limb shape, or whole-body identity, route to GPT Image 2 or a verified custom-mask workflow instead of promising that `autoHumanSegment` will perform it.

## Keep BG and location reference

The API exposes no standalone `referToSelectedLocation` boolean. The UI label maps to location-reference behavior assembled from:

- `locationId` or `locationTagIds` to select/reference a location;
- `pose: "referenceImagePose"` when the pose should follow the selected location;
- `pose: "originalImagePose"` to retain the source pose.

For model-only replacement with Keep BG:

```json
{
  "maskType": "autoHumanSegment",
  "pose": "originalImagePose"
}
```

Omit `locationId` and `locationTagIds`. Official documentation states that `locationId` does not take effect with `autoHumanSegment`, but omission prevents misleading execution metadata and makes the invariant explicit.

## UI labels versus callable parameters

- **Refer to Selected Location:** no matching boolean field is documented. Treat it as UI state derived from a selected `locationId`/`locationTagIds` and, when applicable, `pose: "referenceImagePose"`.
- **Keep BG:** implement with `maskType: "autoHumanSegment"`, `pose: "originalImagePose"`, and no location fields.
- **0% Original Image Pose:** the successful execution response exposed `oriSubRotate: 0`, which may drive this UI label, but `oriSubRotate` is not documented as a request parameter. Do not send it until the API contract documents it.
- **WeShop 1.0 / Old Version:** the current `aimodel` v1.0 request contract does not document a separate engine/version selector matching these UI labels. Do not invent one.

The execution response also exposed `skinTexture: 0`; this is observed metadata rather than a documented caller-controlled field.
