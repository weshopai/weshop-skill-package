# Photo Collage Layout Modes

Choose one construction system. Styles may vary inside a mode, but geometry and source behavior must remain legible.

| Mode | Construction | Best for | Reject when |
| --- | --- | --- | --- |
| `clean-grid` | Equal or deliberately weighted aligned cells with consistent gutters | Family sets, product comparisons, travel summaries, print arrangements | Expressive overlap or integrated material is the main request |
| `masonry` | Mixed cell heights or widths preserving source aspect ratios | Varied landscape/portrait sets | Reading order or equal comparison is critical |
| `editorial-overlap` | One large hero plus two to five subordinate crops with controlled overlap | Product stories, magazine-like social layouts | Every image needs equal weight or evidence-preserving visibility |
| `polaroid-scrapbook` | Framed photos with limited rotation, paper, tape, or handwriting-like marks | Memories, parties, casual social content | Exact text, formal brand work, or dense random decoration |
| `moodboard` | Images paired with purposeful color, material, or object samples | Direction setting and visual research | The user needs a poster, product board, or manufacturing specification |
| `street-art` | One anchor plus torn paper, print marks, paint, stickers, and graphic interruptions | Music, youth culture, expressive portraits | Clean product comparison or strict source-pixel preservation |
| `artistic-collage` | One concept controls fragmentation, repetition, scale, masking, juxtaposition, and material | Art, culture, memory, identity, conceptual editorial, expressive personal work | The request only needs an efficient photo arrangement or strict evidentiary presentation |

## Artistic directions

Choose one direction as a construction system, not a named aesthetic filter:

| Direction | Primary visual operation | Useful for | Common failure |
| --- | --- | --- | --- |
| Photomontage | Cut and juxtapose photographic evidence into one new argument | Culture, politics, identity, editorial themes | Unrelated fragments with no dominant reading |
| Surreal collage | Use one impossible scale, spatial, or object relationship | Dreams, emotion, conceptual campaigns | Generic floating objects and fantasy scenery |
| Analog paper | Reveal physical cuts, overlaps, paper fibers, glue, tape, and print variation | Personal memory, music, tactile editorial work | Scrapbook decoration without a concept |
| Archival documentary | Layer dates, places, documents, and photographs while preserving provenance | History, family archives, research narratives | Invented documents, dates, captions, or context |
| Constructivist geometry | Use diagonals, hard crops, scale contrast, and controlled geometric force | Movement, industry, social themes | Copying historical propaganda or reducing the idea to red/black styling |
| Abstract geometric | Translate relationships into masks, repetitions, voids, and shape tension | Music, systems, nonliteral themes | Decorative shapes unrelated to source meaning |
| Editorial mixed media | Combine photography with one controlled drawing, ink, type, or material layer | Fashion editorial, culture, magazines | Too many materials competing equally |
| Minimal conceptual | Use radical negative space and one precise collision or interruption | Quiet ideas, premium art direction | Empty composition without a readable event |

## Artistic concept compiler

Resolve internally:

1. Theme: what the collage is about.
2. Tension: the contradiction, transition, memory, relationship, or emotion that makes it worth seeing.
3. Visible operation: layer, repeat, erase, cut, mask, scale, fragment, fold, or transform.
4. Source roles: which photo supplies hero, evidence, texture, counterpoint, or background.
5. Fidelity: `pixel-preserving`, `appearance-preserving`, or `interpretive` for every important source.
6. Restraint: one primary operation, one material system, and one hierarchy.

Do not imitate a living artist. Extract general composition, material, rhythm, and color behavior from references instead.

## Crop policy

1. Identify faces, eyes, hands, products, logos, gestures, and landmarks before calculating panels.
2. Preserve the complete subject when recognition depends on silhouette or outfit.
3. Prefer padding or a different cell ratio over cutting a protected region.
4. Let decorative layers overlap expendable background, never eyes, faces, product labels, or necessary source evidence.
5. If automatic crop confidence is low, use the full photo or ask for a focal point.

## Source fidelity levels

- `pixel-preserving`: deterministic placement; resize and crop only.
- `appearance-preserving`: model may integrate edges or lighting, but identity/product/clothing must remain recognisable.
- `interpretive`: model may stylize material and crop aggressively while retaining the semantic subject.

Default people, products, logos, documents, and evidence photos to `pixel-preserving` or `appearance-preserving`. Use `interpretive` only when requested.
