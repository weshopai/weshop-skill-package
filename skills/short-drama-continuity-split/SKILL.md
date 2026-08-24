---
name: short-drama-continuity-split
description: Group an ordered short-drama clip or beat list into coherent scene units while preserving narrative, spatial, temporal, and action continuity. Use when supplied clips need continuity-aware grouping; do not use to author shots from a script, write episodes, edit footage, or generate video.
---
# Short Drama Continuity Split

## Catalog

- Display name: Short Drama Continuity Split
- Category: Narrative and comics
- Status: Ready
- Route label: Agent-authored continuity grouping
- Tone: blue
- Short description: Group supplied drama clips into coherent continuity-safe scene units.

## What this skill does

- Groups adjacent supplied clip descriptions by shared narrative focus and continuous time/place/action.
- Reports the exact boundary evidence and resulting start/end state without altering the source list.

## How to use

Provide the ordered clips or beats with duration, characters, location/time, action, and any known continuity locks.

#### Example

```text
Group these 18 ordered clip descriptions into coherent short-drama scene units. Do not reorder or rewrite them; explain each split.
```

## Workflow

1. Preserve order, identifiers, durations, facts, and supplied state. Flag missing time/place/action information.
2. Group only adjacent units that retain a material narrative focus and continuous place, time, action, and emotional direction. Split on a real spatial/time change, new conflict focus, or discontinuous state.
3. Resolve a unit that could join either neighbor by retaining the stronger causal/action chain and avoiding an orphaned fragment; record the decision rather than hiding ambiguity.
4. Return every source ID exactly once, grouped units, duration totals, start/end state, and boundary rationale. Do not claim editorial pacing or generated-footage approval.

This Atom processes supplied text or clip metadata only. Use `$short-drama-narrative-breakdown` to create new shot text, `$plan-film-storyboard` for production continuity, and `$combine-videos` for existing-media assembly.

Read [source attribution](../short-drama-source-attribution.md) when reviewing provenance or redistributing this adapted Skill.

## User-facing output

- Media type: Structured text
- Default quantity: One ordered grouping report
- Content per group: Member IDs, total duration, shared continuity, start/end state, and boundary rationale
- Default layout: Markdown table or JSON
- Model policy: Agent-authored; no paid media call
- Downstream use: Storyboard and assembly planning
