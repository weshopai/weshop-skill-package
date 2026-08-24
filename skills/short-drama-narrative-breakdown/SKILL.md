---
name: short-drama-narrative-breakdown
description: Turn an approved short-drama script segment into a timed sequence of visual narrative shots, preserving facts and dialogue. Use for ordinary dialogue, plot progression, and scene transitions; do not use for a full shootable storyboard, specialist emotional/action treatment, series writing, or video generation.
---
# Short Drama Narrative Breakdown

## Catalog

- Display name: Short Drama Narrative Breakdown
- Category: Narrative and comics
- Status: Ready
- Route label: Agent-authored narrative shot sequence
- Tone: blue
- Short description: Break an approved short-drama scene into timed, visible narrative shots.

## What this skill does

- Converts each story beat into an observable shot with a purpose, framing, action, dialogue, sound cue, and duration.
- Keeps the source order, named characters, dialogue, place, time, and causal action intact.

## How to use

Provide the approved scene, fixed dialogue and facts, target duration/ratio, and any asset or content constraints.

#### Example

```text
Break this approved 60-second 9:16 confrontation into timed visual shots. Preserve every line and keep the reveal as the final hook.
```

## Workflow

1. Freeze supplied facts, exact dialogue, character knowledge, place/time, and end state. Ask before changing any of them.
2. Break on a material change in action, information, relationship, attention, place, time, or physical result. Keep a shot when a cut adds no new information.
3. Give every shot one dominant visual purpose, observable action, camera/framing direction, duration, dialogue/sound allocation, and start/end state. Split long static dialogue with reaction, object, or motivated action coverage while retaining every word.
4. Validate source order, dialogue equality, timing, spatial continuity, visible causality, and the requested hook. Report unresolved ambiguity instead of inventing a beat.

This Atom produces text only. Hand a complete production manifest to `$plan-film-storyboard`; hand one approved atomic shot to `$generate-video`.

Read [source attribution](../short-drama-source-attribution.md) when reviewing provenance or redistributing this adapted Skill.

## User-facing output

- Media type: Structured text
- Default quantity: One ordered shot sequence
- Content per shot: ID, purpose, duration, framing, visible action, dialogue/sound, and continuity state
- Default layout: Markdown table or JSON
- Model policy: Agent-authored; no paid media call
- Downstream use: Storyboard review or approved atomic video generation
