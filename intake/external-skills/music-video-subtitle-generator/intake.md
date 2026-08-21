# External Skill intake: music-video-subtitle-generator

## Provenance

- Source: /Users/jasonjiang/Downloads/minimax skill/music-video-subtitle-generator
- Source revision: sha256:b3cefabb964f1459341c2eb5d831860714d7c1aff9bb9a7d8dd92052afd09064 (SKILL.md); sha256:e77f5e9bd2980fc699ba7059ca0083d42b78c48b0b4cb21ab06295adb22c4735 (meta.yaml)
- Author or organization: MiniMax Design (`official-featured` export)
- Reviewed date: 2026-08-21
- Files inspected: `SKILL.md`, `meta.yaml` (both files in the supplied export)

## Product decomposition

- User-visible outcomes: A music-led visual MV with synchronized lyric/caption treatment, references, audio continuity, and final assembly
- Required inputs: Authorized music, lyrics if shown, format/duration, rights-cleared visuals or generation brief, and approval of exact text
- Optional inputs: Style preset, references, scene order, subtitle language, and platform
- External AI operations: Atomic reference-led video clips; no implied music generation
- Deterministic operations: Music-window/lyrics lock, beat map, subtitle timing and typography, EDL, audio-preserving assembly, QC
- State, chaining, polling, and publication: Approve plan before paid generation; one key per clip, terminal polling, accepted-clip assembly, user-controlled publication
- Preservation and quality claims: Authorized song version, exact lyrics, timing/readability, visual continuity, ratio/duration, and unchanged master audio unless approved

## Package decision

- Intake result: Standalone Atom candidate
- Proposed standalone Atom: `music-video-subtitle-generator`
- Router compositions: Owns the subtitle-first MV outcome; may use `generate-video` for accepted supplemental clips and `make-kinetic-typography` for a dedicated approved lyric insert
- Rejected or unsupported behavior: Hub/Canvas delivery, assumed H3 availability, standalone BGM/music generation, fabricated/transcribed lyrics without user source, and blind retries
- Promotion decision and rationale: Subtitle-first music-video planning, lyric lock, and visual/audio continuity are a coherent outcome. Keep this candidate independent despite overlap with `make-music-video`; promotion remains pending verification.

## Similar Skill boundaries

Complete one row for every materially similar or adjacent installed Skill. Similar Skills remain independent.

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `make-music-video` | 0.91 | Music-synchronized video edit | The requested final result is a subtitle-first visual MV with the source's lyrics-first and multi-shot continuity contract | The request is a general music-video edit from authorized media | Independent candidates may exchange accepted clips/EDL artifacts |
| `make-kinetic-typography` | 0.64 | Readable animated lyric type | The song/video edit is the primary outcome | Typography/lyrics alone are the deliverable | Generate an approved typography insert |
| `generate-video` | 0.43 | Generated visual clips | A whole music-led assembly is required | One coherent supplemental video shot | Clip handoff |

- Proposed frontmatter distinction: Use for a subtitle-first music aesthetic MV with an explicit lyric lock and visual/audio continuity system; unlike `make-music-video` (0.91), choose it when these are the finished outcome's governing invariants.
- Highest-risk ambiguity: “Music video subtitles” can mean burned-in captions, lyric animation, or a complete MV.
- Router scoring evidence: Lyrics-first fallback, subtitle packaging, and multi-shot audio continuity select this candidate; a general authorized-source music edit selects `make-music-video`.

## Security review

- Secret and environment access: No source code/tool ran; credentials remain environment-only.
- Remote domains and uploads: Use user-authorized songs, lyrics, footage, and existing WeShop routes only.
- Installation and executable code: No dependencies, browser tools, or Hub bindings adopted.
- Retry and provider-spend behavior: Stable key per generated clip; no new submission after unknown receipt.
- Unsafe or removed behavior: Copyright downloading, lyric invention, voice/music cloning, auto publication, and unverified audio routes.

## Validation evidence

- Official WeShop schema checked: Current `make-music-video`, `make-kinetic-typography`, `generate-video`, and Router audio policy reviewed.
- Representative execution: Not authorized or not run
- Acceptance result: Independent candidate recorded; no installable Skill change until promotion validation.
- Source record packaged: This isolated intake and capability map retain provenance.
