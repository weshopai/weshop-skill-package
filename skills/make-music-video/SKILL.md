---
name: make-music-video
description: Analyze one authorized song and supplied or rights-cleared footage, design a lyric- and music-aware edit decision list, render one synchronized music video, and inspect the final cut. Use for montage, performance, narrative, or archival music-video edits from existing media; do not use for downloading copyrighted sources, generating a song, editing dialogue-led podcasts, simple clip concatenation, or adding one isolated effect.
---
# Make Music Video

## Catalog

- Display name: Make Music Video
- Category: Video and audio
- Status: Ready
- Route label: Music-aware EDL and deterministic render
- Tone: purple
- Short description: Cut authorized footage to one song through a validated lyric, rhythm, and visual-arc EDL.

## What this skill does

- Maps song sections, dynamics, beats, lyrics, and emotional turns before selecting shots.
- Builds an edit decision list with source in/out points, cut rationale, continuity, repetition, and rights metadata.
- Renders one deterministic final cut and audits synchronization, visual quality, source balance, and audio integrity.

## How to use

Provide a local or authorized song file, local/authorized footage, intended audience/platform, ratio, desired feeling or narrative, lyric source when relevant, required/forbidden moments, and proof or declaration that the assets may be edited.

#### Example

```text
Make a 90-second 9:16 music video from this licensed track and these six travel clips. Build from quiet departure to euphoric arrival, cut key transitions on musical changes, keep faces unwarped, and use no generated footage.
```

## Workflow

1. Inventory each supplied asset with path, owner/license status, duration, resolution, frame rate, audio role, and restrictions. Stop on unresolved rights for requested redistribution; never search for or download copyrighted footage/audio without explicit authorization.
2. Verify the intended song/version and clean audio. When lyrics drive the edit, use user-supplied or authoritative lyrics, mark uncertainties, and align only words actually present in this recording.
3. Analyze duration, tempo/beat grid, sections, dynamics, transients, vocal entries, lyrical images, emotional turns, and silence. Produce a timecoded music map before reviewing footage for selections.
4. Analyze footage into usable source ranges with subject/action, shot size, motion, light, palette, emotion, quality, and excluded frames. Reject corrupt, duplicate, watermarked, dialogue-contaminated, or technically unusable ranges unless explicitly accepted.
5. Define one editorial framework: visual premise, section-by-section role, lyric relationship (literal, metaphorical, contrast, or performance), pacing curve, recurring motif, color logic, and ending. Avoid arbitrary cut-count/source-count quotas.
6. Build an EDL with source ID, source in/out, timeline in/out, duration, musical/lyric cue, visual content, transition, speed treatment, audio rule, and rationale. Respect physical/graphic continuity where intended; vary scale, motion, light, and subject to support the song.
7. Validate exact timeline coverage, non-overlap, source bounds, frame-rate/resolution conformity, cut rhythm, repeated shots, excessive single-source dominance, lyric mismatch, flash/health risks, and forbidden content. Present the EDL or concise edit plan for approval before rendering unless full-run authorization is explicit.
8. Render locally with deterministic media tools. Keep the selected master track unchanged unless approved; normalize format, preserve aspect safely, mix only authorized audio, and never add a watermark, crop, speed change, or attribution not requested or legally required.
9. Watch the entire export and sample frame boundaries. Check A/V sync, beat/phrase cuts, lyric alignment, narrative/emotional arc, repetition, source quality, black frames, freeze/loop artifacts, crop, color discontinuity, final audio, duration, and file playability. Repair the originating EDL/source/render issue only.

Read [source-attribution.md](references/source-attribution.md) when reviewing provenance or redistributing this adapted Skill.

## User-facing output

- Media type: One final MP4 plus source manifest, music map, EDL, and validation report
- Default quantity: 1
- Content per video: One complete music-led edit from authorized sources
- Default layout: User-requested ratio, duration, resolution, and platform format
- Model policy: Deterministic analysis/editing by default; generated media requires separately invoked Atoms
- Downstream use: Human rights, creative, and publication review
