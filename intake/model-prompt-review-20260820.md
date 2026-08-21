# Local model-prompt review

## Source

- Path: Confidential local application model-prompt snapshot
- Reviewed: 2026-08-20 to 2026-08-21
- Files: `README.md`, `gpt-image-2.md`, `kling.md`, `kling-omni.md`, `midjourney.md`, `minimax-h3.md`, `nano-banana.md`, `seedance.md`, `seedream.md`, `veo.md`
- Source type: local application knowledge snapshot; treated as reference material, never executed

## File fingerprints

- `README.md`: `sha256:8544bf2586d1a3046d8d2cf42f35afd388eec4838de64cbeeb4fc9456597be68`
- `gpt-image-2.md`: `sha256:ce7eef195bc73bbda91f85a877a00c412822f8c23b7cb489f0101b2a2032bfba`
- `kling.md`: `sha256:ce6c75f888b832ac640aee089b13b4d884494fba926386a9bb0634b1e17629e8`
- `kling-omni.md`: `sha256:d9e1d4005ac6b8dea07b0a349bf1afae54324a4c0477e6043011b66fee443423`
- `midjourney.md`: `sha256:e355be4065a518fb91b3e7f9c066186e0ef402c5a23bfbb199dbc3568f4932bb`
- `minimax-h3.md`: `sha256:13789cb5880772da73aa7470207a2f7890ce13fefdbcc4072fb5fda01d4622f`
- `nano-banana.md`: `sha256:a8eab0cfc0d120d2e70aa7470207a2f7890ce13fefdbcc4072fb5fda01d4622f`
- `seedance.md`: `sha256:3bdcdcd5e5fb34d1d146f1de6d4b2d209a6d94d5d894bb1a6c82d07aa612a501`
- `seedream.md`: `sha256:8bc02a010450d1a9d73b64941f6ed2eaca0364e35194e1df59d93a91f60d8b09`
- `veo.md`: `sha256:2b2e0e4f41f5bcb6e8b63e53a0fe3d2361964e64a077b8662c07c306be598301`

## Accepted concepts

- Route first, then load exactly one model-specific prompt guide.
- Keep model identity, strengths, weaknesses, prompt shape, reference semantics, editing pattern, anti-patterns, and examples separate from executable API fields.
- Use labeled creative-brief blocks for GPT Image 2; descriptive iterative prompts for Nano; concise lighting/material briefs for Seedream; short single-medium briefs for Midjourney.
- Name every reference and role; repeat preservation invariants during edits.
- For video, use one coherent action and primary camera move per atomic shot; explicitly bind characters, actions, dialogue, audio, and timed beats.
- Keep exact text out of video generation and finish it deterministically.

## Rejected or corrected concepts

- Source tool names, vendor fields, model aliases, hidden wrapper behavior, automatic fallbacks, and platform-specific limits.
- Midjourney V8.1/Niji 7 and no-reference assumptions: current WeShop exposes 6.1/7/Niji 6 and one optional reference.
- H3 `resolution` and `generate_audio`: not exposed by the current WeShop `minimax-h3` schema.
- Kling placeholder/4K/variant claims that are not WeShop fields.
- Veo ingredients, first/last frame, extension, resolution, and explicit audio controls: current WeShop `veo-ai` requires one image and exposes only model, ratio, and 4/6/8-second duration controls.

## Live WeShop verification

Checked the Premium OpenAPI Skill on 2026-08-20/21. Confirmed `kling-v3-omni`, `kling`, `minimax-h3`, `seedance-2-5`, `seedance`, `seedream`, `midjourney`, and `veo-ai` Agent fields used by the adapted guides. The live schema overrides this snapshot and all local guides.
