---
name: correct-video-color
description: Correct white balance, exposure, contrast, and shot-to-shot color consistency in supplied video without changing its content or intended creative look. Use for technical color correction and clip matching; do not use for stylized restyling, adding effects, repairing objects, or editing the sequence.
---
# Correct Video Color

## Catalog

- Display name: Correct Video Color
- Category: Video and audio
- Status: Ready
- Route label: MiniMax H3 temporal video correction
- Tone: orange
- Short description: Correct white balance, exposure and shot-to-shot consistency without changing content or creative look.

## What this skill does

- Restores plausible neutrals, skin tones, highlight detail and shadow separation over time.
- Distinguishes technical correction from an optional creative grade.

## How to use

Provide footage, lighting issue, neutral or skin references, protected brand colors and delivery space.

#### Example

```text
Correct the mixed green fluorescent and daylight cast; keep skin natural and preserve the blue jacket exactly.
```

## Workflow

1. Inspect representative frames for exposure, white balance, contrast and temporal shifts.
2. Define neutral, skin and brand-color anchors; exclude creative grading.
3. Run MiniMax H3, the cataloged source-video editing model, with correction-only temporal instructions; do not regenerate frames independently.
4. Verify skin, neutrals, clipping, flicker and shot-to-shot continuity.

## User-facing output

- Media type: One MP4 video
- Default quantity: 1
- Content per video: The same footage with technically balanced color
- Default layout: User-requested delivery format
- Model policy: MiniMax H3 for source-video editing; use deterministic grading when generative rewriting is unnecessary
- Downstream use: Video finishing
