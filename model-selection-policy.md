# Shared model selection policy

Source: [WeShop AI Model Selection Guide](https://open.weshop.ai/doc/guides/ai-generation-model-guide), last updated 2026-08-17. This policy is shared by the Router and Atom Skills; individual Skills may narrow it only for a documented capability or verified acceptance reason.

## Selection order

1. Classify pure text-to-image, reference generation, local editing, multi-image consistency, or dedicated processing tool.
2. Fix the delivery stage: draft, internal review, routine deliverable, or premium final.
3. Bind hard constraints: readable text, references, consistency, demanding lighting, Asian commercial aesthetics, speed, and cost.
4. Choose the lowest-cost route that satisfies every hard constraint.
5. On failure, correct inputs or the failed property before changing model or tier. Never blind-retry.

## Hard rules

- Readable text, Chinese/multilingual output, translation, or localization: GPT Image 2 Medium. If it still fails, create a text-free base and use deterministic layout.
- Any source/reference image, mask, local edit, product/person consistency, or first/last frame: exclude Midjourney and Z-Image.
- Pure artistic/illustrative exploration: Midjourney; one call always returns four images.
- `ai-banner-design` narrows that general rule: Midjourney may only create an optional text-free artistic-direction reference, while GPT Image 2 Medium produces every final Banner and all Banner copy.
- Pure photorealistic text-to-image or Chinese cultural elements: Z-Image.
- Demanding lighting/material rendering or Asian fashion/e-commerce aesthetics: consider Seedream. Use it only when one of those conditions exists, and never for readable text.
- Every GPT Image 2 route defaults to Medium at 2K, including drafts, validation, references, edits, and final deliverables. Change quality or resolution only when the user explicitly requests a different tier; do not silently lower either setting for cost or speed.
- Nano 2 is for fast draft divergence. Nano Pro is for faster high-quality convergence/internal review. Neither owns readable text.
- Dedicated tools precede generation models when their exact contract matches: transparent cutout → Remove BG; supported try-on input set → Virtual Try-On; size/canvas utility → Expand Image. Route generative fill or content changes to an image model.

## Availability rule

The Guide defines conceptual routing; the live catalog and API schema define executability. Do not select a tier or variant until its adapter and parameters are cataloged. Record the closest supported route instead of inventing an API field.
