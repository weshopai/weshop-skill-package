---
name: remove-video-mark
description: Remove an ordinary user-authorized overlay, logo, timestamp, or annotation from supplied video while preserving motion and reconstructing the covered region consistently. Use for legitimate video cleanup; do not use for safety, provenance, authenticity, evidence, or rights-management marks, or for removing objects that belong to the filmed scene.
---
# Remove Video Mark

## Catalog

- Display name: Remove Video Mark
- Category: Video and audio
- Status: Ready
- Route label: WeShop authorized video mark removal
- Tone: slate
- Short description: Remove an ordinary user-authorized overlay or annotation while preserving motion and reconstructing the covered region consistently.

## What this skill does

- Removes a specified mark only when the user is authorized to edit it.
- Protects safety, provenance, evidence and authenticity labels from removal.

## How to use

Provide authorized video, mark location and timing, ownership context and protected content.

#### Example

```text
Remove my red review arrow from 00:01–00:04; keep product and other overlays; rebuild background consistently.
```

## Workflow

1. Confirm authorization and classify the mark; refuse safety, provenance or evidence-label removal.
2. Map time range, motion, opacity, occlusions and protected content.
3. Use video-watermark-remover or the narrowest current WeShop cleanup route.
4. Inspect affected interval for remnants, shimmer, drift, collateral loss and timing changes.

## User-facing output

- Media type: One MP4 video
- Default quantity: 1
- Content per video: The authorized source without the approved mark
- Default layout: User-requested delivery format
- Model policy: WeShop authorized video mark removal
- Downstream use: Authorized asset cleanup
