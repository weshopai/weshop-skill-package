---
name: music-video-subtitle-generator
description: Create one subtitle-first music aesthetic video from an authorized recording, an exact lyric lock, visual references, multi-shot continuity plan, timed subtitle treatment, assembled export, and audio-integrity QC. Use when lyric/caption packaging and music-window continuity govern the finished MV. Unlike make-music-video (relationship 0.91), choose this when its subtitle-first visual contract is central; choose make-music-video for a general authorized-footage music edit. Unlike make-kinetic-typography (0.64), this owns a complete music video rather than an isolated type animation. It may call generate-video (0.43) for supplemental shots. Do not use for downloading copyrighted audio, generating a song, fabricating lyrics, or a standalone lyric card.
---
# Music Video Subtitle Generator

## Catalog

- Display name: Music Video Subtitle Generator
- Category: Video and audio
- Status: Ready
- Route label: Lyric-locked visual MV composition
- Tone: purple
- Short description: Produce a music-led visual video with exact timed subtitles and audio-continuity QC.
- Cover image: /skill-covers/music-video-subtitle-generator.png
- Cover motion: /skill-covers/music-video-subtitle-generator.mp4

## What this skill does

- Locks the authorized recording, song window, exact lyrics, subtitle language, and viewing format before visual work.
- Plans visual clips and subtitle behavior around musical sections without altering the master track.
- Assembles one subtitle-first MV and checks lyric, timing, visual, and audio continuity end to end.

## How to use

Provide a local or authorized recording, authoritative lyrics when subtitles are required, duration/window, ratio, visual direction, authorized footage or references, subtitle language/style, required moments, and rights declaration.

#### Example

```text
Create a 30-second 9:16 lyric-led MV from this licensed track and the supplied night-street references. Show only the provided Mandarin lyrics, keep each line readable for its sung timing, preserve the master audio, and transition from quiet neon to energetic motion at the chorus.
```

## Workflow

1. Inventory the recording and visual assets with ownership, duration, format, source role, and restrictions. Do not search for, download, or infer copyrighted music or lyrics.
2. Lock the exact song version, time window, lyrics, subtitle language, ratio, delivery duration, visual premise, audio plan, and prohibited content. Align only words present in the user-authorized source; mark uncertainty rather than inventing transcription.
3. Build a music map for sections, dynamics, beat/transient changes, vocal entries, lyric cues, emotional arc, and subtitle holds. Build a scene and subtitle EDL with timeline bounds, visual action, transition, exact text, styling, safe area, and acceptance.
4. Select or generate only missing visual clips. For generated clips, select one current model per atomic shot: Kling V3 Omni for complex/motion references, Kling 3.0 for precise frames, Seedance 2.5 for audiovisual/artistic work, Seedance 2.0 for routine motion, and H3 for justified large motion. Persist an `operationKey`, require `executionId`, and poll to terminal state.
5. Apply subtitles deterministically from the approved lyric/cue sheet. Protect exact text, reading order, shaping, contrast, safe areas, and enough hold time; use `make-kinetic-typography` only when a self-contained lyric-motion insert is requested.
6. Assemble accepted clips to the locked music window without changing the master audio unless approved. Check source bounds, cut timing, subtitle timing/spelling, repeated footage, A/V sync, duration, ratio, and no blank/corrupt frames. Repair the originating EDL, subtitle, source, or shot issue only; never publish automatically.

Read [source-provenance.md](references/source-provenance.md) when reviewing the external-source lineage.

## User-facing output

- Media type: One final MP4 plus music map, subtitle cue sheet, EDL, asset manifest, and operation receipts
- Default quantity: 1 subtitle-first MV
- Content per video: Authorized music, timed exact subtitles, and a coherent visual arc
- Default layout: User-requested ratio, music window, subtitle language/style, and resolution
- Model policy: Deterministic subtitle/audio finishing; current catalog video route only for needed visual clips
- Downstream use: Human rights, lyric, audio, creative, and publication review
