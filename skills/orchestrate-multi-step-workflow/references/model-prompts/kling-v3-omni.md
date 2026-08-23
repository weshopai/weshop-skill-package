# Kling V3 Omni prompt guide

- Best fit: multimodal video with up to four image references, an optional reference video, native audio, several characters, or motion/camera reference transfer.
- Map every input by ordinal and role: identity, product, environment, style, or motion. Never leave references anonymous.
- Write action before dialogue so speaker identity has a visual anchor. Give each character one stable name and voice/performance descriptor; avoid pronoun-only speaker changes.
- Use one camera move per atomic shot. For a requested sequence, label timed shots explicitly and keep their total within the selected duration.
- Describe dialogue, SFX, ambience, and music separately enough to inspect. Do not treat native audio as exact-copy post-production when wording or mix must be guaranteed.
- Current WeShop Agent is `kling-v3-omni` with `modelName: Kling_V3_Omni`, 0–4 images, up to one video, 3–15 seconds, `16:9|9:16|1:1`, and optional `generateAudio`. Source-only 4K, placeholder, and variant rules are not WeShop fields.
