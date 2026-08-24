---
name: short-drama-emotion-breakdown
description: Break an approved short-drama dialogue scene into visible emotional and power-shift shots while preserving dialogue and character facts. Use for confession, argument, interrogation, negotiation, or emotional climax; do not use for general scenes, physical action scenes, full storyboards, or video generation.
---
# Short Drama Emotion Breakdown

## Catalog

- Display name: Short Drama Emotion Breakdown
- Category: Narrative and comics
- Status: Ready
- Route label: Agent-authored emotional dialogue shots
- Tone: blue
- Short description: Make dialogue power shifts and reactions visible in timed shots.

## What this skill does

- Converts emotional and relational changes into observable performance, spatial distance, framing, and reaction shots.
- Protects fixed dialogue and avoids treating abstract emotion as a visible result.

## How to use

Provide the approved dialogue scene, character facts, exact lines, relationship/power context, duration, and content limits.

#### Example

```text
Split this two-person interrogation into 3–6 second shots. Preserve dialogue and show the power reversal through camera-visible behavior.
```

## Workflow

1. Lock dialogue, character setup, physical positions, knowledge states, and permitted intensity.
2. Identify information, power, commitment, or emotional changes; give each important turn a visible action or reaction rather than an abstract label.
3. Use framing, eyelines, distance, prop interaction, breath, and movement only when supported by the scene. Keep escalating conflict visually progressive rather than repetitive flat shot-reverse-shot.
4. Return timed shots with source dialogue, observed behavior, camera direction, and continuity state. Check that neither character behavior nor dialogue has been invented or contradicted.

This Atom produces text only. Use `$short-drama-narrative-breakdown` for ordinary scene breakdown and `$plan-film-storyboard` for complete blocking/coverage.

Read [source attribution](../short-drama-source-attribution.md) when reviewing provenance or redistributing this adapted Skill.

## User-facing output

- Media type: Structured text
- Default quantity: One emotional-dialogue shot sequence
- Content per shot: Timed beat, visible performance, framing, dialogue, and continuity lock
- Default layout: Markdown table or JSON
- Model policy: Agent-authored; no paid media call
- Downstream use: Storyboard review or approved atomic video generation
