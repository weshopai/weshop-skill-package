# WeShop capability substitution: music-video-subtitle-generator

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Analyze music window and lyrics | MiniMax Hub analysis | Authorized exact recording, lyrics, timing and language | `make-music-video` deterministic music map/EDL | Local authorized media inputs; no provider field assumed | Lock only words present in the recording and mark uncertainties | No automatic lyric-recognition claim | Source Steps 1–2; `make-music-video` |
| Generate supplemental MV visuals | MiniMax H3 default upstream | One atomic scene, approved reference roles, ratio and continuity | `generate-video` with current catalog selection | Selected live route fields, operation key, execution ID | Use one observable clip action and preserve reference roles | H3 and source Canvas parity unverified | Source Steps 3–6, 9; `generate-video` |
| Time/animate subtitle packaging | Hub video edit | Approved exact text, cues, font/license, contrast and safe area | `make-music-video` deterministic finishing; `$make-kinetic-typography` for standalone insert | Editor/typography contract only | Keep lyrics unchanged and make them readable | No source renderer parity | Source Steps 4–9; current type/MV contracts |

## Deterministic operations retained locally

- Rights/source manifest, lyric lock, beat map, EDL, subtitle cue sheet, audio-preserving render, and whole-export QC.

## Unsupported parity

- Hub/Canvas state, automatic lyrics/BGM, assumed H3 route, external tools, and autonomous publication.

## Proposed Atom boundaries

- Candidate `music-video-subtitle-generator` owns the subtitle-first MV outcome. Keep it distinct from `make-music-video` and `make-kinetic-typography`; hand off only approved clips or isolated typography inserts.
