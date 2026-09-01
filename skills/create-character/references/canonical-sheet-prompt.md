# Canonical character sheet prompt compiler

Use this contract only for task 1 of `create-character`. It combines the package's former identity-anchor workflow with the user's first-party AI Comic Generator character-design requirements, adapted to GPT Image 2 and the current WeShop output contract.

## Resolve the brief

Translate the user's concept into observable design facts before compiling the image request:

- identity and archetype: name, role, species, apparent age, gender presentation when relevant, personality expressed visually;
- anatomy: height impression, build, head-to-body proportion, posture, facial structure, skin or surface traits, distinctive marks;
- hair: silhouette, length, parting, texture, color, and repeatable construction;
- wardrobe: every layer from inner to outer, silhouette, seams, closures, wear state, footwear, accessories, and material behavior;
- palette: primary, secondary, accent, skin or surface, hair, metal, and prop colors;
- signature elements: props, scars, jewelry, tools, motifs, or other plot-critical anchors;
- prohibitions: protected-character copying, unwanted redesigns, extra people, logos, watermarks, signatures, scenery, and decorative clutter.

When the brief is sparse, complete only the missing visual logic needed for a coherent original design. Do not add unrelated lore, costume complexity, or ornamental detail merely to fill the sheet.

## Sheet composition

Compile one continuous English `textDescription` for a single polished square production sheet on a clean warm-light-gray studio background. Make the hierarchy explicit:

1. A dominant full-body neutral front view establishes the canonical silhouette and proportions.
2. Aligned full-body side and genuine rear views show the same scale, anatomy, hairstyle construction, garment layers, closures, accessories, and footwear.
3. One large head-and-shoulders identity close-up establishes facial structure, apparent age, hairline, eyes, skin or surface treatment, and distinctive marks.
4. Three smaller expression studies show neutral or calm, high-tension or alarmed, and warm or relieved states while preserving identical facial geometry and age.
5. Close-up tiles show plot-critical wardrobe construction, material transitions, signature props, and distinctive marks without inventing new variants.
6. A restrained palette strip visually repeats the locked primary, secondary, and accent colors.

Use an orderly concept-art grid with generous breathing room, consistent scale, stable soft directional studio light, a subtle rim light, and soft grounding shadows. The result must read as a professional animation, comic, game, or cinematic production asset rather than a poster, scene, mood board, fashion collage, or collection of alternate characters.

## Identity enforcement

Repeat the following constraints semantically inside the compiled Prompt:

- every panel depicts exactly the same individual;
- identical facial proportions, apparent age, body proportions, hairstyle construction, wardrobe construction, palette, marks, and signature props;
- front, side, and rear are viewpoint changes, not redesigns;
- expressions change muscle state only, not facial identity;
- detail tiles magnify canonical elements and do not introduce alternatives;
- neutral poses, complete limbs, correct hands and feet, no duplicated body parts, no extra character, no cropped turnaround views;
- no scene action, dramatic camera distortion, environmental storytelling, logos, watermarks, signatures, or illegible decorative pseudo-text.

Do not ask GPT Image to render prose invariant lists. The image owns visual anchors; after inspection, return a separate concise text invariant manifest for downstream prompts.

## Request contract

Submit task 1 through `gpt-image` v1.0 / GPT Image 2 with:

```json
{
  "input": { "images": ["<optional supplied user reference URLs>"] },
  "params": {
    "images": ["<same optional supplied user reference URLs>"],
    "textDescription": "<compiled continuous English prompt>",
    "aspectRatio": "1:1",
    "quality": "medium",
    "imageSize": "2K",
    "batchCount": 1
  }
}
```

Omit both image arrays when no user reference exists. When references exist, declare what each reference owns and prohibit inheriting unrelated backgrounds, poses, actions, framing, or layouts.
