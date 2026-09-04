# Kling 3.0 prompt guide

- Best fit: one image-to-video shot with precise first/last frames, supplied product/layout preservation, controllable camera, and optional native audio.
- Start with preservation and visible frame evolution, then one subject action, one primary camera move, environment response, lighting/texture, and audio.
- Use motion verbs with pacing; generic `moves` is weaker than a concrete track, push, pull-back, orbit, pan, or locked camera.
- One clip should contain one coherent action arc. Split incompatible camera moves, multi-stage actions, or multiple speakers into separate shots.
- Refer to image 1 as first frame and image 2 as last frame. Do not import MiniMax placeholder syntax; WeShop binds the `images` array natively.
- Current WeShop `kling` supports 1–2 images, `Kling_3_0` and listed earlier variants, 3–15 seconds for 3.0, and audio for supported versions. Use the live schema rather than fixed five-second assumptions.
- For terminal quality failure, revise only the failed property. Do not silently downgrade or retry an identical prompt.
