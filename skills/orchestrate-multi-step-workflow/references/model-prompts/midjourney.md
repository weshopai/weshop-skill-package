# Midjourney prompt guide

- Best fit: pure text-to-image artistic exploration, concept art, decorative patterns, covers, and illustration when readable copy and exact identity/product fidelity are not required.
- Put subject and one coherent medium first. Keep the prose short, concrete, and visually selective; use native model/aspect fields instead of embedding unsupported flags.
- Choose one medium rather than mixing photography, oil painting, anime, and 3D cues.
- Treat text as unreliable and add important copy deterministically or through GPT Image 2.
- Current WeShop Agent supports one optional reference, Midjourney 6.1/7/Niji 6, and five aspect ratios. This differs from the reviewed MiniMax wrapper; never use its V8.1, Niji 7, `--s`, `--chaos`, `--tile`, or no-reference assumptions unless the live WeShop schema later exposes them.
- Receive the Agent's full response set; do not silently reinterpret a four-result exploration as one deterministic final.
