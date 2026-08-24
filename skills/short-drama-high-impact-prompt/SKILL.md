---
name: short-drama-high-impact-prompt
description: Rewrite an approved high-intensity short-drama moment into concise, high-impact per-shot video prompts while preserving facts and dialogue. Use for action peaks, reveal moments, and urgent openings; do not use for neutral scenes, slow emotional scenes, invented spectacle, or video generation.
---
# Short Drama High-Impact Prompt

## Catalog

- Display name: Short Drama High-Impact Prompt
- Category: Video
- Status: Ready
- Route label: Agent-authored high-impact prompt text
- Tone: purple
- Short description: Format approved dramatic peaks as high-impact video prompts.

## What this skill does

- Emphasizes already-supported visual stakes, decisive actions, reactions, camera energy, and environmental motion.
- Retains exact dialogue and rejects invented spectacle, violence, claims, or assets.

## How to use

Provide approved high-intensity scene/shot text, exact dialogue, content limits, duration/ratio, and authorized references.

#### Example

```text
Turn this approved 12-second reveal into high-impact 9:16 video prompts. Preserve all dialogue; do not add damage or new props.
```

## Workflow

1. Confirm that the scene is genuinely high-intensity and lock facts, dialogue, assets, permitted intensity, and end state.
2. Express only source-supported urgency through concrete action, reaction, framing, movement, light, and physical environment. Favor readable causality over decorative overload.
3. Keep one primary action and one visual payoff per prompt. Do not force fast camera movement, extreme angles, damage, alarms, or effects absent from the approved material.
4. Check dialogue equality, fact preservation, duration, content limits, and prompt readability. Mark an unsupported dramatic request for revision.

This Atom is text-only. Use `$short-drama-action-breakdown` for action shot planning and `$generate-video` only after an atomic prompt is approved.

Read [source attribution](../short-drama-source-attribution.md) when reviewing provenance or redistributing this adapted Skill.

## User-facing output

- Media type: Structured text
- Default quantity: One prompt per approved high-impact shot
- Content per prompt: Duration, action, reaction, camera, lighting, environment, dialogue, and visible payoff
- Default layout: Ordered Markdown
- Model policy: Agent-authored; no paid media call
- Downstream use: Human review or approved atomic video generation
