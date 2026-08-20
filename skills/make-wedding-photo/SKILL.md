---
name: make-wedding-photo
description: Create one wedding-style portrait of consenting adults from authorized references while preserving both identities and avoiding false-event claims. Use for clearly framed fictional, preview, or commemorative wedding imagery; do not use to fabricate documentary evidence, create invitations or cards, edit a full wedding video, or depict non-consenting people.
---
# Make Wedding Photo

## Catalog

- Display name: Make Wedding Photo
- Category: Social and memory
- Status: Ready
- Route label: GPT Image 2 consistency-sensitive edit
- Tone: rose
- Short description: Create one wedding-style portrait of consenting adults from authorized references while preserving both identities and avoiding false-event claims.

## What this skill does

- Places authorized adults in a chosen wedding setup with controlled wardrobe, pose and venue.
- Preserves both identities independently and treats generated scenes as creative composites, not event evidence.

## How to use

Provide authorized photos of each adult, wardrobe, pose, venue, cultural details and ratio.

#### Example

```text
Create one clearly synthetic editorial wedding portrait from these two consenting adults; garden at dusk, modern red qipao.
```

## Workflow

1. Confirm consent for each adult and clarify fictional, editorial or real-event reconstruction.
2. Assign each reference to one identity; lock attire, pose, relative height and cultural details.
3. Run `gpt-image` v1.0 with `quality: "medium"`, `imageSize: "2K"`, the supplied references, the requested or source-preserving ratio, `batchCount: 1`, and one result.
4. Compare each face, hands, rings, garments, geometry, extra people and deceptive-documentary risk.

## User-facing output

- Media type: One wedding-style photo
- Default quantity: 1
- Content per image: One consent-cleared wedding portrait
- Default layout: User-requested or print-defined format
- Model policy: GPT Image 2 Medium/2K for consistency-sensitive final image editing
- Downstream use: Creative portraits and private keepsakes
