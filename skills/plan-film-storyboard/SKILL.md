---
name: plan-film-storyboard
description: Convert a script, scene, synopsis, dialogue draft, or existing film storyboard into a production-ready shootable shot manifest with traceable facts, blocking, camera, sound, timing, continuity, coverage, and per-shot generation handoffs. Use for live-action, AI-video, or hybrid film and vertical-drama planning; do not use for comic-page layouts, prose writing, final video generation, editing supplied footage, or unauthorized story rewrites.
---
# Plan Film Storyboard

## Catalog

- Display name: Plan Film Storyboard
- Category: Narrative and comics
- Status: Ready
- Route label: Agent-authored shootable shot manifest
- Tone: blue
- Short description: Turn narrative material into timed atomic film shots with continuity and generation handoffs.

- Similar skills: develop-story, plan-comic-storyboard, render-comic-page
## What this skill does

- Freezes source facts and adaptation permission before translating abstract writing into visible or audible evidence.
- Plans actor blocking, props, screen direction, camera, sound, duration, and coverage as atomic shots.
- Produces a validated shot manifest and downstream task brief without claiming unexecuted footage is production-approved.

## How to use

Provide the source, live/AI/hybrid production mode, duration, ratio, language, fixed facts, cast/assets, and allowed change level: faithful, visual, pacing, or explicitly scoped story changes.

#### Example

```text
Turn episode 1 into a 75-second 9:16 AI-video storyboard. Stay faithful to the plot, externalize internal thoughts through behavior and sound, and keep each generated shot under six seconds.
```

## Workflow

1. Record source/version, fixed facts, unknowns, rights/consent status, and change permission. Default to faithful; never treat “improve” as permission to alter plot causality.
2. Extract scenes, characters, knowledge states, locations, time, props, dialogue, sound, and must-preserve beats. Convert internal explanation into observable action, reaction, composition, on-screen information, or sound without inventing a fact.
3. Before expanding the full manifest, propose a compact design pass: visual concept, recurring motif with establishment/variation/break, spatial power geometry, one justified non-default choice, and style coordinates. Get direction approval when these choices materially affect production; then break beats on changes in action, information, power, attention, place, time, or physical result.
4. Plan blocking and screen direction before camera. Make every formal shot atomic: one continuous time/place, one primary purpose, one dominant shot size, one main action, and at most one simple camera move. Record start/end state, subject/action, composition, angle, duration, dialogue, sound, props, continuity locks, source trace, production method, editorial motivation, and acceptance.
5. Confirm dialogue, action, reaction, camera, and sound fit the duration. For material action, make the preparation, exertion/contact, result, and settling end state observable; include secondary physical effects only when story-relevant and feasible. Split overloaded shots, especially multi-person dialogue, complex hands/props, action chains, large framing changes, or hidden edits.
6. Validate adjacent end/start states, eyelines, axis, entrances/exits, wardrobe, injuries, prop handoffs, knowledge, time, and sound bridges. Maintain coverage for every fixed beat and required reaction.
7. Inventory which recurring character, subject, scene, style, first-frame, and end-frame references actually exist. Propose only missing reference assets and require approval before generating them; do not create full frame sets by default.
8. For each AI shot, compile an execution brief with authorized references, first/end state, one action, camera, duration, ratio, sound, preservation locks, risks, and a simpler fallback. Do not submit generation here.
9. Deliver source/fact ledger, shot manifest, continuity/coverage report, change log, and generation handoffs. Claim “plan validated” only; actual media requires separate inspection.

Read [source-attribution.md](references/source-attribution.md) when reviewing provenance or redistributing this adapted Skill.

## User-facing output

- Media type: Structured film storyboard manifest
- Default quantity: One manifest containing the required atomic shots
- Content per artifact: Facts, permissions, scenes, timed shots, blocking, camera, sound, continuity, coverage, risks, and downstream briefs
- Default layout: Validated Markdown or JSON with stable scene/shot IDs
- Model policy: Agent-authored planning; no paid media generation
- Downstream use: Live production, video-generation Atoms, and editing/assembly
