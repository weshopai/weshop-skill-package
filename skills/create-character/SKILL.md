---
name: create-character
description: Create one standalone original character image from a brief or references, with a coherent identity and no copied protected character. Use for a hero character concept or finished single-character artwork; do not use for multi-view reference sheets, game-role-specific NPC design, small avatars, or changing an existing person's appearance.
---
# Create Character

## Catalog

- Display name: Create Character
- Category: Character and brand
- Status: Ready
- Route label: GPT Image 2 character synthesis
- Tone: purple
- Short description: Create one original character image from a brief or references, with a coherent identity and no copied protected character.

## What this skill does

- Turns role, silhouette, wardrobe, palette and personality cues into one original character.
- Uses references by declared role while avoiding exact imitation of a named protected character.

## How to use

Provide role, age range, world, visual traits, wardrobe, mood, style and references.

#### Example

```text
Create one original solar-city bicycle courier with copper goggles, teal utility jacket and optimistic energy; full-body 3:4 image.
```

## Workflow

1. Resolve an original character brief and reject requests to copy a protected character exactly.
2. Lock silhouette, face, palette, wardrobe and signature props before generation.
3. Generate with GPT Image 2 Medium, one 3:4 result.
4. Verify originality, anatomy, readable silhouette, trait coherence and absence of extra characters.

When this Skill selects GPT Image 2, use `quality: "medium"` and `imageSize: "2K"` by default; change either only when the user explicitly requests another tier.

Every GPT Image 2 call in this Skill defaults to Medium at 2K; use another tier only when the user explicitly requests it.

## User-facing output

- Media type: One character image
- Default quantity: 1
- Content per image: One original character in one intentional composition
- Default layout: User-requested or source-preserving format
- Model policy: GPT Image 2 character synthesis
- Downstream use: Concept art and character development
