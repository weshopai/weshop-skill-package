# WeShop capability substitution: 3d-animation-short-generator

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Generate a character or transformation reference card | External image generation; exact model not declared | Approved character identity, visual direction, views, expressions, costume/props, ratio | Existing `create-character` workflow and its current verified image route | Use the downstream Atom's current asset/reference, ratio, prompt, operation-key, and polling contract | Convert the approved character facts into a canonical identity sheet; keep dialogue/mouth samples as optional production notes | No guarantee of exact upstream card layout, labels, or canvas node behavior | Source `SKILL.md` Steps 3 and 7; current `create-character` Router ownership |
| Generate an environment-only scene reference | External image generation; exact model not declared | Approved location, lighting, landmarks, props, ratio; exclude people | Appropriate existing image-generation Atom selected by Router | Current image route fields and terminal-result contract | Describe one clean environment reference with continuity anchors and explicit human exclusion | No dedicated scene-card Atom or upstream canvas grouping parity | Source `SKILL.md` Step 4; existing general image routing |
| Generate one animation shot | MiniMax H3 default upstream | One atomic timed shot, authorized references, camera, action, ratio, audio, continuity, speaker/mouth constraints | `generate-video`; MiniMax H3 only when large-amplitude motion justifies it, otherwise current catalog policy selects Kling 3.0, Seedance 2.5, or Seedance 2.0 | Current model-specific duration, ratio, reference, audio, prompt, `operationKey`, `executionId`, and polling fields | Strip planning labels; keep one observable action, authorized reference roles, start/end state, speaker binding, mouth constraints, sound, and acceptance | Model support for native dialogue, face binding, exact mouth state, 2K, and duration must be verified per current route; no pixel-identical parity | `references/model-selection.md`; current `skills/generate-video/SKILL.md` |
| Generate controllable narration, dialogue, music, or BGM | External audio/music/speech tools | Approved script/track brief, language/voice rights, exact timing, audio-mode plan | No implied route; use only a separately supported and authorized audio capability | Depends on a future/current verified audio route; otherwise accept supplied audio | Preserve exact approved copy and timing; never infer a voice identity or music right | Package does not currently promise standalone audio generation through this intake | Source `SKILL.md` and `references/qc-checklist.md`; current package audio boundaries |

## Deterministic operations retained locally

- Story, fixed-fact, character, prop, continuity, speaker, mouth-state, and shot ledgers.
- Atomic shot splitting, clip manifest ordering, media probing, trimming, audio preservation/mixing, and export validation.
- Inspect first/middle/last frames per shot and watch the assembled film; replace only the failing stage.

## Unsupported parity

- Source-specific canvas nodes, grouping semantics, choice-card-only approvals, and bundled tool names.
- A guaranteed MiniMax H3 default, 768P/2K support, native lip sync, or automatic fallback without live capability verification.
- Default imitation of Pixar, Disney, or another living studio/artist's signature style.
- Automatic generation of a complete film from one approval, autonomous publication, or unbounded retry/spend.

## Proposed Atom boundaries

- Create `3d-animation-short-generator` as a complete-outcome Atom candidate. Its description must distinguish complete-film requests from `develop-story` (0.55), `plan-film-storyboard` (0.78), `generate-video` (0.62), `combine-videos` (0.38), and `make-product-commercial` (0.34).
- Keep the related Atoms independent. The new Skill may orchestrate their contracts, but runtime selection must score the user's requested deliverable and choose the highest intent match.
