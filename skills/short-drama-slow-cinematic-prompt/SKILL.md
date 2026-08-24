---
name: short-drama-slow-cinematic-prompt
description: Rewrite an approved quiet or emotional short-drama moment into restrained, slow-cinematic per-shot video prompts while preserving facts and dialogue. Use for intimate reflection, subtle tension, and poetic atmosphere; do not use for action peaks, invented imagery, unsafe content softening, or video generation.
---
# Short Drama Slow Cinematic Prompt

## Catalog

- Display name: Short Drama Slow Cinematic Prompt
- Category: Video
- Status: Ready
- Route label: Agent-authored slow-cinematic prompt text
- Tone: purple
- Short description: Format quiet drama moments as restrained cinematic video prompts.

## What this skill does

- Uses source-supported performance, composition, light, sound, and pacing to make subtle emotional beats observable.
- Keeps the result concrete and restrained rather than adding symbolism, new events, or unapproved mood assets.

## How to use

Provide approved quiet/emotional scene or shot text, exact dialogue, duration/ratio, desired restraint level, and fixed facts/assets.

#### Example

```text
Polish this approved 18-second goodbye into slow-cinematic 9:16 prompts. Keep the rain, dialogue, and final hand release exactly as written.
```

## Workflow

1. Lock source facts, dialogue, emotional context, character state, environment, and allowed content. Do not replace difficult content with a different story.
2. Translate supported inner tension into observable micro-actions, distance, eyelines, paced framing, light, and physical ambience; use empty/detail shots only when they carry a stated narrative function.
3. Keep one emotional change per prompt and preserve causal continuity. Avoid forced slow motion, poetic objects, weather, or effects that are not grounded in the source.
4. Validate dialogue equality, source order, visible action, duration, and restraint. Report missing visual evidence rather than inventing it.

This Atom is text-only. Use `$short-drama-emotion-breakdown` when shot selection needs emotional-beat analysis and `$generate-video` for an approved atomic render.

Read [source attribution](../short-drama-source-attribution.md) when reviewing provenance or redistributing this adapted Skill.

## User-facing output

- Media type: Structured text
- Default quantity: One prompt per approved quiet/emotional shot
- Content per prompt: Duration, visible performance, setting, dialogue, camera, light, and ambient sound
- Default layout: Ordered Markdown
- Model policy: Agent-authored; no paid media call
- Downstream use: Human review or approved atomic video generation
