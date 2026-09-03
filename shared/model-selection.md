# Shared model selection policy

Source: [WeShop AI Model Selection Guide](https://open.weshop.ai/doc/guides/ai-generation-model-guide), last updated 2026-08-17. This policy is shared by the Router and Atom Skills; individual Skills may narrow it only for a documented capability or verified acceptance reason.

## Selection order

1. Classify the requested operation before choosing a command: pure text-to-image, reference generation, image editing, multi-image consistency, video generation, or a dedicated processing tool.
2. Fix the delivery stage: draft, internal review, routine deliverable, or premium final.
3. Bind hard constraints such as readable text, references, subject consistency, demanding lighting, Asian commercial aesthetics, first/last frames, multimodal inputs, duration, speed, and cost.
4. Choose the lowest-cost currently executable route that satisfies every hard constraint.
5. Validate the selected route against the native tool schema or the installed CLI command help. Execution metadata validates availability and arguments; it does not reopen business routing.
6. On failure, correct the inputs or failed property before changing the model or tier. Never blind-retry.

## Image routing

- Readable text, Chinese or multilingual output, translation, or localization: GPT Image 2 Medium at 2K. If it still fails, create a text-free base and use deterministic layout.
- General reference-led generation, local editing, product/person consistency, masks, or complex composition: GPT Image 2 Medium at 2K.
- Pure artistic or illustrative text-to-image exploration: Midjourney. One call returns four images and every result must be accounted for.
- `ai-banner-design` narrows that general rule: Midjourney may only create an optional text-free artistic-direction reference, while GPT Image 2 Medium produces every final Banner and all Banner copy.
- Pure photorealistic text-to-image or Chinese cultural elements without readable text: Z-Image.
- Demanding lighting/material rendering or Asian fashion/e-commerce aesthetics: consider Seedream 5 Pro. Use it only when one of those conditions exists, and never for readable text.
- Seedream 5 Lite is an explicit route for 3K output, more than ten references, or optional web-search enrichment; it is not a silent cost fallback.
- Nano 2 is for fast draft divergence. Nano Pro is for faster high-quality convergence or internal review. Neither owns readable text.
- Any source/reference image, mask, product/person consistency requirement, or editing operation excludes Midjourney and Z-Image.
- Every GPT Image 2 route defaults to Medium at 2K, including drafts and validation. Change quality or resolution only when the user explicitly requests another tier.

Only GPT Image 2 exposes a quality tier. Do not invent an equivalent quality argument for Nano, Seedream, Midjourney, or Z-Image. For text-bearing images, preserve the requested copy verbatim and specify its language, casing, placement, style, and hierarchy.

## Video routing

- MiniMax H3: large or natural human motion, dynamic camera work, and H3 multimodal or first/last-frame modes.
- Kling V3 Omni: several image roles or one motion-reference video.
- Kling 3.0: precise one/two-frame control or product image-to-video.
- Seedance 2.5: long multimodal, audiovisual, artistic, or talking-performance video.
- Veo 3.1: one-source-image premium synchronous dialogue or sound effects at 16:9 or 9:16.
- Seedance 2.0: routine image-led video.
- Seedance 2.0 Mini: only an explicitly requested low-cost draft, preview, or concept-validation route.

Do not silently downgrade when a fallback would lose multi-image reference, precise last-frame control, large-amplitude motion, audio, duration, resolution, or another core capability. Split conflicting goals into shots or ask which goal has priority.

## Dedicated processing tools

- Prefer Remove BG when its exact contract can produce the requested transparent or solid-color background without generative synthesis.
- Prefer Virtual Try-On for its supported single-garment input contract.
- Prefer Expand Image only when the task is to enlarge the canvas and synthesize the added region.
- Route newly composed environments or material content changes to an image-generation model.
- Do not choose a command only because its name resembles the request. An owning Atom may document a narrower route that remains consistent with this policy.

## Execution and fallback boundary

- After model selection, load only the matching prompt guide from `skills/orchestrate-multi-step-workflow/references/model-prompt-routing.md` when prompt shaping is needed.
- The active native tool schema or installed CLI help is authoritative for command names, arguments, enums, input limits, dimensions, duration, and defaults.
- Never maintain or scan a static exhaustive CLI command inventory inside a Skill. Discover only the already-selected command's current contract.
- A Skill may recommend a route, but the host owns credentials, approval, paid-operation identity, receipts, retry enforcement, recovery, and artifact delivery.
- Once an execution ID exists, reconcile that execution instead of rebuilding and resubmitting the request.
- Before changing models after a failed paid execution, explain capability and cost changes and obtain user direction unless the user already authorized that bounded fallback.

## Availability rule

The Guide defines conceptual routing; the live catalog and executable schema define availability. Do not select a tier or variant until its adapter and parameters are currently exposed. Report the closest supported route instead of inventing an API field.
