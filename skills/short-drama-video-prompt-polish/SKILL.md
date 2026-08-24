---
name: short-drama-video-prompt-polish
description: Rewrite an approved ordinary short-drama scene into concise, per-shot video prompts with fixed fields and preserved dialogue. Use for neutral narrative video-prompt text; do not use for scene breakdown, high-impact or slow-cinematic styling, provider-specific syntax, or video generation.
---
# Short Drama Video Prompt Polish

## Catalog

- Display name: Short Drama Video Prompt Polish
- Category: Video
- Status: Ready
- Route label: Agent-authored neutral video prompt text
- Tone: purple
- Short description: Format approved short-drama shots as neutral, observable video prompts.

## What this skill does

- Turns approved shots or scene text into concise subject, setting, action, dialogue, camera, light, and environment prompts.
- Retains named characters, exact dialogue, and stated scene facts.

## How to use

Provide approved scene/shot text, exact dialogue, authorized asset labels, duration/ratio, and non-negotiable facts.

#### Example

```text
Polish these three approved short-drama shots into neutral video prompts. Preserve every word of dialogue and the supplied reference labels.
```

## Workflow

1. Freeze source facts, exact dialogue, authorized assets, and requested output language. Do not infer assets or add people, props, or events.
2. For each approved shot, write only observable subject/action, setting, dialogue, camera, lighting, and physical environment/sound details that the source supports.
3. Keep fields compact, concrete, and in source order; identify any missing detail as open rather than fabricating it.
4. Verify field completeness, dialogue equality, asset-label preservation, timing, and that no provider/model claim or generation outcome is implied.

This Atom is text-only. `$short-drama-narrative-breakdown` owns new shot selection; `$generate-video` owns a paid, authorized render.

Read [source attribution](../short-drama-source-attribution.md) when reviewing provenance or redistributing this adapted Skill.

## User-facing output

- Media type: Structured text
- Default quantity: One prompt per approved shot
- Content per prompt: Duration, subject, setting, action, dialogue, camera, light, and environment/sound
- Default layout: Ordered Markdown
- Model policy: Agent-authored; no paid media call
- Downstream use: Human review or approved atomic video generation
