---
name: character-reference-sheet
description: Create a consistent multi-view cinematic character reference sheet from a brief or supplied identity reference. Use when downstream creation needs canonical front, back, close-up, wardrobe, and identity guidance; do not use for one standalone character image, a game-role-specific NPC, a small profile avatar, or a fashion lookbook.
---

# Character Reference Sheet

Use this workflow for character casting sheets, front/back views, close-up identity anchors, and reusable film character references.

## Catalog

- Display name: Character Reference Sheet
- Category: Film
- Status: Ready
- Route label: WeShop image model stack
- Tone: peach
- Short description: Build a reusable cinematic identity from text or reference images.

## What this skill does

- Turns a written character concept or one or more reference images into a canonical visual identity for later film, advertising, and video work.
- Plans the sheet around identity anchors: facial structure, age, body proportions, hair, wardrobe construction, materials, accessories, and distinctive marks.
- Routes text-only creation to a layout-capable WeShop image model and reference-led work to a confirmed identity-aware editing model.
- Produces an explicit front view, rear view, and close-up while keeping the character, costume, lighting, and photographic register consistent.
- Evaluates the result against composition and continuity gates instead of accepting a visually attractive but unusable sheet.
- Returns the generated asset together with the selected WeShop model and any fidelity limitations that downstream skills should preserve.

## How to use

Attach a reference image when identity already exists. Otherwise describe the character with observable physical, wardrobe, and production details. State any required views, aspect ratio, and visual register; let the skill choose the current WeShop model from the capability matrix.

### Prompt examples

#### Create a new film character

```text
Create a cinematic character reference sheet for a 32-year-old female orbital mechanic. She has a compact athletic build, a blunt black bob, a small scar through her right eyebrow, and wears a weathered cobalt technical coat over charcoal workwear. Include a full-body front view, genuine rear view, and head-and-shoulders close-up. Keep her identity, proportions, hair, coat construction, and lighting consistent across all views.
```

#### Build from a reference image

```text
Use the attached image as the canonical identity reference. Create a film-ready character sheet with full-body front, full-body back, and a close-up. Preserve the exact face, apparent age, body proportions, hairstyle, jacket silhouette, materials, accessories, and color palette. Use a neutral studio background and stable soft directional lighting. Do not add text, logos, extra people, or additional panels.
```

#### Create a downstream consistency anchor

```text
Turn this character concept into a reusable identity anchor for later storyboard and video generation. Prioritize a clearly readable face, distinctive wardrobe construction, neutral poses, and consistent studio light. Return the reference sheet plus a concise list of identity and wardrobe invariants that every downstream WeShop generation must preserve.
```

## User-facing output

- Media type: Image
- Default quantity: Task-dependent; start with one canonical sheet and add separate views or variants when the brief requires them
- Content per image: 3 views — full-body front, genuine full-body rear, and head-and-shoulders close-up
- Default layout: A canonical sheet, separate view files, or both, selected from the requested downstream use
- Video output: Optional downstream handoff; the core identity stage produces images
- Model policy: GPT Image 2 Medium/2K for the final consistency-sensitive sheet; use Midjourney only for optional text-free artistic exploration before identity is fixed
- Downstream use: Identity and wardrobe reference for storyboard, image, and video skills
