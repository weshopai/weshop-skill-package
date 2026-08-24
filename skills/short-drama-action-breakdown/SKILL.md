---
name: short-drama-action-breakdown
description: Turn an approved short-drama action scene into timed, physically continuous action shots with visible cause and result. Use for fights, chases, escapes, and action reversals; do not use for dialogue-focused scenes, a full production storyboard, stunt-safety certification, or video generation.
---
# Short Drama Action Breakdown

## Catalog

- Display name: Short Drama Action Breakdown
- Category: Narrative and comics
- Status: Ready
- Route label: Agent-authored action shot sequence
- Tone: blue
- Short description: Break approved action into continuous, visible cause-and-effect shots.

## What this skill does

- Plans readable action beats, motion continuity, spatial orientation, and physical results.
- Keeps dramatic story anchors and injury/prop state visible without claiming stunt safety or footage quality.

## How to use

Provide the approved action, starting positions, fixed plot beats, weapons/props, allowed intensity, target duration, and ratio.

#### Example

```text
Break this 45-second alley chase into 9:16 shots. Preserve the dropped key and show the escape route and final injury state.
```

## Workflow

1. Freeze every action fact, spatial relationship, story anchor, prop, injury, and final physical state; surface any impossible or missing transition.
2. Treat pivotal actions as preparation, exertion/contact, result, and settling state. Keep ordinary continuous movement together when a cut would obscure direction or cause.
3. Allocate one readable action line per shot, with camera/framing, duration, visible physical feedback, and source-supported emotional response. Do not invent violence, weapons, stunts, or damage.
4. Validate adjacent positions, screen direction, prop possession, injuries, action timing, and all required narrative reversals.

This Atom produces text only. `$plan-film-storyboard` owns full blocking/coverage; `$generate-video` owns authorized execution and visual QC.

Read [source attribution](../short-drama-source-attribution.md) when reviewing provenance or redistributing this adapted Skill.

## User-facing output

- Media type: Structured text
- Default quantity: One action shot sequence
- Content per shot: Timed action, camera direction, physical result, sound cue, and state transition
- Default layout: Markdown table or JSON
- Model policy: Agent-authored; no paid media call
- Downstream use: Storyboard review or approved atomic video generation
