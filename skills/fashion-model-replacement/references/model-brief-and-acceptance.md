# Model Brief and Acceptance

## Minimal model brief

Specify only attributes that materially change the commercial result:

- adult presentation and approximate adult age band;
- target market or explicitly requested appearance;
- body build only when relevant to garment presentation;
- hair shape and length, expression, and visible grooming;
- pose, crop, camera, and scene locks;
- supplied target-person reference, when present.

Do not invent ethnicity, nationality, disability, religion, gender identity, or other sensitive traits from the garment. If the user gives no model direction and the target audience would materially change the image, ask one short question. Otherwise use a neutral adult commercial fashion model with natural features and expression. Never generate a child model unless the user explicitly requests an age-appropriate children's apparel use case.

## Source preflight

- Require an already-dressed person or mannequin image with the garment sufficiently visible.
- Identify every apparel lock: silhouette, length, neckline, sleeves, seams, panels, pockets, closures, material, texture, pattern, color blocking, logos, labels, accessories, and footwear.
- Identify pose, crop, camera, lighting, background, and object locks.
- Flag hair/hand occlusion, cropped garment regions, extreme pose, motion blur, low resolution, and multiple people.
- When a target-person reference is supplied, require visible face and useful body/framing cues. Do not promise biometric identity reproduction.

## Acceptance

1. Exactly one intended adult model replaces the source model; no duplicate, before/after, grid, or extra person appears.
2. Locked garments and accessories retain their category, geometry, fit cues, construction, material, texture, color, pattern, hardware, logo, and visible markings.
3. The new head, neck, skin, hands, limbs, and body connect naturally; anatomy, scale, perspective, lighting, and skin transitions are credible.
4. Hair, hands, apparel, and accessories overlap in the correct depth order without halos, bleeding, floating edges, or erased garment regions.
5. Locked pose, crop, camera, background, lighting, and composition remain stable unless the user released them.
6. A supplied target-person reference remains recognisable at the promised level. A text-generated model matches the material adult presentation and commercial brief; fine face and hair details are guidance unless supported by a target reference.

Model replacement is a generated commercial visualization. Do not claim that the result represents a real person unless a supplied reference was supplied, and do not infer or assert sensitive traits from appearance.
