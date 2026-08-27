---
name: make-mugshot-photo
description: Create one clearly fictional or novelty mugshot-style portrait that cannot be mistaken for an official booking record.
---
# Make Mugshot Photo

## Catalog

- Display name: Make Mugshot Photo
- Categories: Portrait
- Status: Ready
- Route label: GPT Image 2 novelty mugshot-style portrait
- Tone: gray
- Short description: Create one clearly fictional or novelty mugshot-style portrait that cannot be mistaken for an official booking record.
- Cover image: https://ai-image.weshop.com/desktop/coverImage/make-mugshot-photo.png
- Source images: https://ai-image.weshop.com/desktop/sourceImage/make-mugshot-photo.png
## What this skill does

- Applies a lineup-inspired visual convention to an authorized adult portrait for entertainment.
- Excludes agency insignia, real case numbers, accusations and document-like evidence framing.

## How to use

Provide an authorized adult portrait, fictional or novelty context, crop and non-official styling.

#### Example

```text
Create a clearly fictional mugshot-style portrait of this consenting adult; generic height lines, no agency or case number.
```

## Workflow

1. Confirm the subject is an authorized adult and request is novelty, fictional or self-directed.
2. Forbid real agency branding, charges, IDs, dates or claims implying an arrest.
3. Run `gpt-image` v1.0 / GPT Image 2 with the portrait as the identity reference, `quality: "medium"`, `imageSize: "2K"`, `aspectRatio: "3:4"`, and `batchCount: 1`. Do not call `mugshot-creator` or another Tools-class wrapper for this Atom.
4. Ask for a generic height-line background and a clearly readable `FICTIONAL` label while preserving the subject's face and recognizable traits.
5. Verify identity, exact label text, neutral framing, no official identifiers, no accusation and clear non-documentary styling.

## User-facing output

- Media type: One novelty mugshot-style image
- Default quantity: 1
- Content per image: One clearly fictional lineup-style portrait
- Default layout: User-requested or print-defined format
- Model policy: GPT Image 2 Medium/2K at 3:4; one result; no Tools-class API route
- Downstream use: Entertainment and fictional character art
