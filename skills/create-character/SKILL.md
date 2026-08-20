---
name: create-character
description: "Create one complete original character production pack as eight separate reference-bound images: a canonical multi-panel design sheet first, then front, back, close-up, lighting study, final-look portrait, and two scene images. Use when creating a reusable hero or recurring character for comics, storyboards, images, or video; also owns requests previously phrased as character reference sheets. Do not use for game-role-specific NPC design, small avatars, fashion lookbooks, or changing an existing person's appearance."
---
# Create Character

## Catalog

- Display name: Create Character
- Category: Character and brand
- Status: Ready
- Route label: Eight-run GPT Image 2 character production pack
- Tone: purple
- Short description: Build one canonical identity, then derive seven consistent character assets from it.

## What this skill does

- Turns a brief or authorized identity reference into one reusable original character.
- Establishes the character with one canonical multi-panel design sheet before any derived image is submitted.
- Produces eight separate assets for identity, wardrobe, lighting, portrait, and scene continuity.
- Replaces the former standalone `character-reference-sheet` generation workflow.

## How to use

Provide the role, species, apparent age, world, body and face anchors, hair, wardrobe construction, palette, signature features or props, personality, visual style, and any authorized references. Provide two scene briefs when their content matters; otherwise derive two distinct story-relevant environments from the character's world.

#### Example

```text
Create a complete character pack for Lin, a tired 24-year-old night courier with a blunt black bob, amber raincoat, red parcel bag, and guarded expression. Use a graphic Chinese webcomic style. Scene 1 is a rain-soaked parcel depot; scene 2 is a quiet rooftop at dawn.
```

## Character contract

1. Resolve an original character brief. Reject exact copying of a protected character; references may guide declared traits without reproducing a protected identity or design.
2. Lock the canonical invariants before generation: face and apparent age, hair, body proportions, wardrobe construction and materials, palette, distinctive marks, and signature props.
3. If the user supplies an authorized identity reference, use it to establish the first canonical sheet. Never inherit an unrelated reference background, action, layout, or pose.
4. Keep the same character and default wardrobe across all eight assets. Change only the task-owned property such as viewpoint, crop, lighting, portrait treatment, or scene.

## Eight-run workflow

Plan exactly eight atomic image tasks. Persist one stable `operationKey` per task and use `batchCount: 1` for every submission.

1. **Canonical character design sheet — submit first.** Create one intentional multi-panel sheet containing readable identity views, a useful expression set, wardrobe and signature-prop details, plus concise visual invariant callouts. Use a neutral production background. This output becomes the canonical identity reference for tasks 2–8.
2. **Full-body front view.** Neutral full-body front view with the complete canonical wardrobe and proportions visible.
3. **Full-body rear view.** Genuine full-body back view showing the canonical hair, garment construction, accessories, and silhouette from behind.
4. **Head close-up.** Head-and-shoulders identity close-up with a readable canonical face, apparent age, hairline, and distinctive marks.
5. **Lighting study.** Show the same canonical character under a deliberate set of different lighting conditions without redesigning the face, hair, body, wardrobe, palette, or props. A controlled multi-panel lighting study is allowed inside this one asset.
6. **Final-look portrait.** Produce the character's definitive makeup, grooming, and wardrobe portrait. Preserve the canonical identity; interpret `定妆照` as a production final-look portrait, not permission to redesign the character.
7. **Character scene 1.** Place the canonical character into the first supplied or story-derived environment with one observable action and intentional composition.
8. **Character scene 2.** Place the same character into the second supplied or story-derived environment with a distinct story beat and composition.

Submit task 1 alone and poll it to terminal success. Visually accept its originality, identity coherence, anatomy, panel usefulness, expressions, wardrobe, props, and invariant readability before submitting any later task. Bind the accepted task-1 image in the `images` field of every task 2–8 request. The brief remains authoritative where small rendered callout text is imperfect.

After task 1 is accepted, tasks 2–8 are independent planned slots and may execute separately when their briefs fully define continuity. Sequence scene 2 after scene 1 only when scene 2 depends on scene 1's visible state. Never submit tasks 2–8 before the canonical reference exists merely to reduce latency.

## Route and execution

Use `gpt-image` v1.0 / GPT Image 2 for all eight tasks with one complete `textDescription`, `quality: "medium"`, `imageSize: "2K"`, the task-appropriate supported `aspectRatio`, and `batchCount: 1`.

- Default the canonical sheet and lighting study to a layout-capable ratio selected for readable panels; default the front, back, close-up, final-look portrait, and scene images to `3:4` unless the user requests another supported ratio.
- Do not route any task to Midjourney merely because the user requests manga, anime, comic, concept-art, or another artistic style. Midjourney's four-image response violates the one-result-per-task contract.
- Require a non-empty `executionId` for every accepted submission and poll that exact run to terminal state.
- An unknown create outcome freezes only that task. Reconcile its existing `operationKey`; never submit a replacement blindly.
- A known terminal or visual failure may replace only the failed slot with a new linked operation key and a materially revised request. Never regenerate accepted slots or increase the eight-task plan.

## Acceptance

Apply one final pack gate after task 8 while preserving the task-1 canonical identity between runs:

- Exactly eight separate image assets exist, one per named task; no task returns an unrequested four-image batch.
- Tasks 2–8 visibly preserve the canonical face, age, hair, proportions, wardrobe construction, palette, marks, and signature props.
- Front and rear views are genuine opposing views; the close-up clearly establishes identity.
- Lighting changes illumination rather than character design.
- The final-look portrait reads as the definitive same character.
- Both scene images contain the intended same character, required props, distinct environments or story beats, and no extra duplicate character.

Record each task name, reference bindings, parameters, exact Prompt, operation key, execution ID, terminal state, and any replacement reason.

## User-facing output

- Media type: Image pack
- Default quantity: 8 separate images from 8 tasks; `batchCount: 1` for each task
- Content: Canonical design sheet, full-body front, full-body back, head close-up, lighting study, final-look portrait, scene 1, and scene 2
- Default layout: One canonical multi-panel sheet plus seven separate task-specific images
- Model policy: GPT Image 2 Medium/2K for all eight tasks
- Downstream use: Canonical identity and production references for comics, storyboards, images, and video
