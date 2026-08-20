---
name: generate-video
description: Generate one coherent video from a text or multimodal shot brief using a deliberately selected current model and one observable action. Use for new cinematic footage when no narrower video Atom owns the outcome; do not use for animating one supplied still, editing supplied footage, talking portraits, intros, or multi-clip assembly.
---
# Generate Video

## Catalog

- Display name: Generate Video
- Category: Video and audio
- Status: Ready
- Route label: Guide-routed cataloged video model
- Tone: purple
- Short description: Generate one coherent video from a shot brief using a deliberately selected current model and one observable action.

## What this skill does

- Turns text into one shot with explicit subject, action, environment, camera, duration and sound.
- Selects a current model from capabilities, not from the phrase text-to-video.

## How to use

Provide subject, one action, setting, camera, duration, ratio, style and audio preference.

#### Example

```text
Generate a 5-second 16:9 video of a paper boat drifting through a rain puddle; slow low tracking shot; natural rain audio.
```

## Workflow

1. Compile one atomic shot with subject, action, setting, camera, light, duration, ratio and audio.
2. Select exactly one cataloged model before submission: MiniMax H3 for large-amplitude/high-dynamic motion; Kling 3.0 for precise first/last-frame, product, image-animation, or complex-reference control; Seedance 2.5 for audio-visual synchronization or artistic expression; Seedance 2.0 for routine video generation. Do not trial models in sequence.
3. Start one WeShop run, poll to terminal success and download MP4.
4. Inspect first, middle and last frames, motion continuity, camera, duration, ratio and audio.

## User-facing output

- Media type: One MP4 video
- Default quantity: 1
- Content per video: One coherent generated shot
- Default layout: User-requested delivery format
- Model policy: MiniMax H3 for large motion; Kling 3.0 for precise frames/products/complex references; Seedance 2.5 for audio-visual or artistic work; Seedance 2.0 for routine generation
- Downstream use: General video generation
