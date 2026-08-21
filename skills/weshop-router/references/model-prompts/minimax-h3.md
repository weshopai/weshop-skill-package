# MiniMax H3 prompt guide

- Best fit: large-amplitude or natural human motion, photoreal people, multimodal references, first/last-frame transitions, and reference-driven video.
- Lead with subject and one concrete action arc, then camera, environment, lighting, mood, audio intent, and reference-role mapping.
- Use `MiniMax_H3_I2V` for one first frame or first+last frames; use `MiniMax_H3_Reference` for text and multimodal reference work. Do not mix I2V frame anchors with Reference-mode videos/audios.
- In Reference mode, name each image/video/audio by ordinal and role. Audio cannot be assumed to provide exact dialogue or lip sync.
- Keep critical titles, signs, captions, and subtitles out of generated footage and add them deterministically.
- Current WeShop H3 supports up to nine images, up to three videos and three audios in Reference mode, 5–15 seconds, and the live aspect rules. It does not expose the reviewed MiniMax Hub `resolution` or `generate_audio` fields; do not invent them.
- For continuation or video editing, proceed only when the selected WeShop route exposes the source-video contract; catalog labels alone are insufficient.
