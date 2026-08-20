# Comic page Prompt compiler

Compile one semantic Prompt in this order. Omit empty fields; do not send bracket labels without content.

```text
Create one complete <ratio> comic page, page <page number>, read <reading direction>.

Visual system: <medium, linework, rendering, palette, lighting, background density, mood>. Keep this visual system consistent with the supplied project and previous-page references, but do not copy their actions or layouts.

Canonical character references:
- <character name>: Image <n> owns <face, hair, body, wardrobe, palette>. Preserve <identity anchors and must-not-change list>. Do not inherit the reference pose or background.

Continuity entering this page: <location, time, weather, wardrobe state, injuries, props and which hand holds them, emotional state>.

Panel plan: use exactly <count> panels in <layout logic>. Keep gutters and reading order unambiguous.
- Panel 1: <shot, camera, setting, characters, visible action, expression, continuity locks>.
- Panel 2: ...

Dialogue and captions: render only this exact copy, once, in its assigned panel and language.
- Panel <n>, <speech|thought|caption>, <speaker>: "<exact text>"

Constraints: no extra panels, duplicated characters, invented text, logos, signatures, watermarks, unrelated props, or action from reference images. Keep speech-bubble tails attached to the correct speaker and do not cover faces, hands, or required story evidence.
```

Keep prose concrete and visual. Do not paste the whole story into the image Prompt. Do not ask one panel to show before-and-after states simultaneously. When exact dialogue is too long for the panel, flag the layout conflict before generation rather than shrinking it into unreadable type.
