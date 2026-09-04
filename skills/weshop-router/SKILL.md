---
name: weshop-router
description: Guide an Agent from an open-ended WeShop request to the right runtime-visible Skill or maintained multi-Skill workflow. Use when the best creative capability or combination is not already obvious; this is an instruction router, not a Tool or executor.
---

# WeShop Router

## Catalog

- Display name: WeShop Router
- Visibility: system
- Categories: Utility
- Status: Ready
- Route label: Skill and workflow guide
- Tone: ink
- Short description: Decide which Skill or workflow should own the request.

## Role

Use this Skill as the top-level guide for the WeShop Skill system. Its job is to understand the requested outcome, select the smallest capable owner, and hand control to that owner without another Router Tool call.

The Router may choose:

- one runtime-visible Skill for a complete single outcome;
- one maintained workflow when several separately owned results have a real dependency or the user explicitly requests multiple independent deliverables; or
- one focused clarification when the answer changes the selected Skill, selected workflow, or a required routing input.

The Agent Runtime already owns context, memory, permissions, tools, authentication, execution, receipts, recovery, and publication. The selected Skill owns its working method, model and prompt choices, execution contract, and acceptance checks. The selected workflow owns DAG materialization, artifact handoffs, execution order, and final acceptance. Do not reproduce those responsibilities in the Router.

## Fast route

Follow this sequence once. Reading this file must end routing; do not start a second planning loop.

1. Identify the final outcome, supplied source roles, preservation constraints, requested deliverables, and whether current external evidence is independently required.
2. Match the complete intent against the embedded task map below. If one Skill owns the result, read only that Skill and execute it now.
3. If no exact row matches, compare at most four plausible runtime-visible Skill names and descriptions. Pick the closest complete-outcome owner; do not inspect all Skill bodies.
4. Select one embedded workflow only for a real cross-owner artifact dependency or independently accepted outputs with different owners, then hand it immediately to `orchestrate-multi-step-workflow`.
5. Ask at most one routing question, only when the answer changes the owner or supplies a required input. Otherwise proceed with a reasonable default.

### Hard stop after routing

After reading this file, the next action must be exactly one of these:

- read the selected Skill and execute it;
- invoke `orchestrate-multi-step-workflow` with the selected workflow and available inputs; or
- ask one route-changing clarification.

Do not read `task-routing.md`, `workflow-recipes.md`, `routing-map.json`, catalog source files, model-selection references, neighboring Skill bodies, or CLI help to keep deciding. Those are maintenance or post-selection execution resources. A missing path, denied Tool, unsupported flag, or failed command after selection is execution recovery and must not reopen routing.

Planning budget: one Router read, one selected-owner read, zero confirmation passes. A genuine tie may compare descriptions of at most four candidates without reading their bodies.

## Task classes

Use this table to jump to the right part of the task index. These classes accelerate selection; they are not a closed capability list.

| Task class | Use when | Typical owners |
| --- | --- | --- |
| `single-creative-output` | One new image, video, graphic, or other self-contained creative result | Creation or generation Skill |
| `precision-edit` | One supplied asset must be changed while named content stays fixed | Narrow edit, repair, removal, recolor, or restoration Skill |
| `commerce-fashion` | Product fidelity, apparel transfer, commerce layout, packaging, or model replacement matters | Product, fashion, packaging, or detail-page Skill |
| `portrait-character` | Identity, appearance, casting, character creation, or reusable character consistency matters | Portrait, appearance, casting, or character Skill |
| `layout-social-series` | Copy, hierarchy, layout, carousel, deck, poster, banner, or information design is central | Layout or information-design Skill |
| `narrative-sequence` | Ordered scenes, shots, pages, timing, continuity, or story progression is required | Story, storyboard, comic, or video Skill/workflow |
| `campaign-bundle` | A shared brief must produce several independently usable formats | Campaign workflow |
| `post-production` | Existing media needs editing, assembly, grading, effects, subtitles, repair, or upscale | Post-production Skill |
| `spatial-technical` | Space, CAD, floor plans, diagrams, evidence visuals, or technical accuracy dominates | Spatial or technical Skill |
| `prompt-planning-diagnostics` | The requested result is a prompt, plan, model choice, or failure diagnosis | Prompt, planning, advisor, or diagnostic Skill |
| `meta-system` | The user wants to create, install, validate, or organize Skills | Skill-management Skill |

## Complete common task map

These 38 routes are the maintained fast paths. Match the whole outcome and boundary, not a keyword. A more specific runtime-visible Skill may win when its description owns the exact outcome.

| # | Requested outcome | Select | Decisive boundary |
| ---: | --- | --- | --- |
| 1 | Product-faithful commercial scene | `$ai-product` | Preserve the supplied product while changing its scene. |
| 2 | White-background product mockup | `$create-white-background-product-mockup` | White catalog result; use `$remove-background` only for true alpha. |
| 3 | Product detail-page set | `$product-detail-page` | It owns research, fact control, modules, preview, and final set. |
| 4 | Product packaging design | `$product-packaging` | Concept direction and simplified structure, not manufacturing artwork. |
| 5 | Virtual garment try-on | `$virtual-try-on` | Preserve both supplied garment and person. |
| 6 | Fashion model replacement | `$fashion-model-replacement` | Preserve outfit and pose while changing the model. |
| 7 | Change subject pose | `$change-pose` | Preserve identity, outfit, and scene; change pose only. |
| 8 | End-to-end product commercial | `$make-product-commercial` | One finished product-benefit film remains one owner despite internal shots. |
| 9 | Logo design | `$create-logo` | One selected mark or lockup, not a campaign system. |
| 10 | Campaign banner | `$ai-banner-design` | One placement-specific banner with current safe-area and crop rules. |
| 11 | Poster | `$poster-design` | One-page hierarchy; not banner, thumbnail, or multipage set. |
| 12 | Social carousel | `$create-social-carousel` | Ordered mobile pages form one coherent series owned by one Skill. |
| 13 | Image deck | `$create-image-deck` | Slide manifest plus inspected deck package. |
| 14 | Social/video thumbnail | `$make-thumbnail` | Small-preview legibility and platform occlusion decide. |
| 15 | Infographic | `$make-infographic` | One source-backed visual explanation; its internal research stays direct. |
| 16 | Translate copy in artwork | `$translate-image-text` | Replace language while preserving layout and non-text imagery. |
| 17 | Remove background | `$remove-background` | True transparent alpha and clean edges are the final result. |
| 18 | Expand image canvas | `$expand-image` | Extend surroundings to a new ratio without redesigning content. |
| 19 | Remove image object | `$remove-object` | Remove a depicted object and reconstruct the reveal. |
| 20 | Combine source images | `$image-combiner` | Subjects coexist naturally; use `$photo-collage` for visible panels. |
| 21 | Canonical character identity | `$create-character` | Reusable original identity and canonical production sheet. |
| 22 | Avatar | `$create-avatar` | Small profile-icon readability is decisive. |
| 23 | Professional headshot | `$professional-headshot` | Professional-use portrait, not ID formatting or avatar. |
| 24 | Comic storyboard plan | `$plan-comic-storyboard` | Manifest, pages, panels, dialogue, and character bible; no final art. |
| 25 | Render one comic page | `$render-comic-page` | One page from approved manifest/references is the stable final. |
| 26 | Film storyboard plan | `$plan-film-storyboard` | Shot manifest and reviewable previs frames; no final video. |
| 27 | Generate one video shot | `$generate-video` | One observable shot; use a narrower specialist when available. |
| 28 | Animate a supplied image | `$animate-image` | Supplied composition and identity remain the anchor. |
| 29 | Combine video clips | `$combine-videos` | Deterministic ordered assembly, not new footage generation. |
| 30 | Edit a social video | `$edit-social-video` | Platform pacing, hook, captions, and delivery are one final. |
| 31 | Restyle a room | `$restyle-room` | Preserve architecture while changing interior direction. |
| 32 | Visualize a floor plan | `$visualize-floor-plan` | Preserve topology and supplied dimensions. |
| 33 | Create a flowchart | `$make-flowchart` | Source process or decision logic is already explicit. |
| 34 | Create a CAD model | `$create-cad` | Dimensioned manufacturable STEP is primary. |
| 35 | Write cinematic video prompt | `$cinematic-video-prompt` | Prompt is the final artifact, not generated media. |
| 36 | Diagnose video prompt failure | `$video-prompt-failure-diagnosis` | Requires an observed failed result and returns diagnosis/revision. |
| 37 | Select a video model | `$video-model-advisor` | Current model recommendation is the final decision artifact. |
| 38 | Create or revise a Skill | `$create-custom-skill` | Skill lifecycle artifact, not creative media. |

### Direct specialist overrides

- Identity photo → `$id-photo-format`; pet portrait → `$make-pet-portrait`; NPC → `$create-npc`; casting package → `$casting`.
- One bounded appearance change → the exact edit Skill such as `$apply-makeup`, `$hair-color-change`, `$hairstyle-change`, `$remove-glasses`, or `$retouch-blemish`.
- One visible image mark → `$remove-image-mark`; one object recolor → `$recolor-object`; filter application/removal → `$apply-photo-filter` or `$remove-photo-filter`.
- Photo panel layout → `$photo-collage`; source-photo/reference recreation → `$recreate-social-photo`.
- Technical color normalization → `$correct-video-color`; whole-video style → `$restyle-video`; upscale or ordinary overlay removal → `$upscale-video` or `$remove-video-mark`.
- Finished specialist sequence such as `$brand-promo-video-generator`, `$make-explainer-video`, `$make-music-video`, or `$make-podcast-video` stays direct when that Skill promises the assembled final.

### Sets, batches, and named variations

More than one file does not by itself mean Workflow. Route directly when one Skill owns every item under one acceptance contract—for example a portrait story set, carousel, deck, detail-page module set, localized variants handled by one owner, or several named visual variations. The selected Skill executes the batch and keeps identity/style invariants.

Choose Workflow only when different owners must exchange accepted artifacts or the requested outputs are independently accepted across owners. If no exact indexed Skill exists for a same-owner set, select the closest runtime-visible complete-outcome owner and pass the set/variation contract to it; do not repeatedly search for a perfect label.

## How to choose one Skill

Choose one Skill directly when all of these are true:

- it owns the user's final deliverable, rather than only an intermediate artifact;
- it accepts the supplied source roles or can legitimately work without them;
- its preservation and fidelity boundary matches the request;
- it does not require a separately accepted upstream result; and
- the user has not asked for another independently usable deliverable.

Treat an end-to-end professional Skill as one owner even when it has internal stages. Do not split its private SOP into several Router steps.

After selection:

1. read the selected Skill in full;
2. let that Skill choose its supported model, prompt structure, parameters, and QA;
3. use Runtime tools and permissions exactly as exposed by the host; and
4. finish with the selected Skill's user-facing result and acceptance boundary.

Do not keep neighboring Skills loaded after one owner wins. Do not call a second Router, search layer, or compiler to confirm the same decision.

## When to choose a workflow

Use a workflow only when at least one of these is true:

- a downstream Skill requires an artifact produced and accepted by another Skill;
- multiple ordered shots, scenes, pages, or localized variants require continuity;
- the user explicitly requests two or more independently usable deliverables; or
- independently verified current evidence must feed a later creative deliverable.

Select the smallest matching maintained workflow:

| Workflow | Select when | Execution seed passed to orchestrator |
| --- | --- | --- |
| `product-detail-production` | A separately accepted product-faithful scene must feed a modular detail-page set | freeze product facts → `$ai-product` hero/source scene → `$product-detail-page` modules → delivery manifest |
| `multi-format-campaign` | One frozen campaign brief must produce at least two independently usable outputs with different owners | freeze shared brief → requested banner/carousel/video branches in parallel → delivery manifest |
| `comic-production` | A story/manifest must become multiple comic pages with reusable identities | `$plan-comic-storyboard` → missing `$create-character` sheets → repeated `$render-comic-page` → optional bubble repair |
| `multi-shot-video` | No finished-outcome Skill owns the final and separately generated shots require continuity and assembly | `$plan-film-storyboard` → repeated `$generate-video` by dependency wave → `$combine-videos` → optional `$correct-video-color` |
| `visual-localization-set` | Several source/locale pairs must preserve one frozen copy and visual system and may feed a separate series owner | freeze localization matrix → repeated `$translate-image-text` in parallel → optional carousel/deck composition → manifest |
| `cutout-to-layout` | A separately delivered transparent master must feed another layout owner | `$remove-background` → selected layout Skill → export package |
| `research-to-deliverable` | A distinct dated evidence artifact materially controls a later visual | verify facts → freeze evidence brief → selected visual owner → source manifest |

Pass `workflowId`, the execution seed above, available inputs, required preserved invariants, requested outputs, and any missing required input to `orchestrate-multi-step-workflow`. Invoke it immediately; do not read another Router reference first. The orchestrator expands nodes, dependencies, parallel waves, optional branches, artifact bindings, recovery, and final acceptance.

Do not use a workflow merely because a Skill has several internal stages, because the task sounds important, or because more than one Skill is semantically related.

## Clarification rule

Ask one concise question only when missing information would select a different owner or when a maintained workflow lacks a required input role. Prefer a concrete request for the missing role.

Do not ask about implementation details already owned by the selected Skill. Do not ask the user to choose among internal models unless that Skill requires the choice. When a reasonable default does not change the route, proceed.

## Handoff

Keep the routing handoff minimal and internal:

```yaml
ownerType: skill | workflow
ownerId: selected-skill-or-workflow-id
reason: one sentence explaining the complete-outcome match
availableInputs:
  - semantic-role
missingRequiredInputs: []
```

This is guidance for the Agent, not a Tool schema and not a user-facing result. Do not expose a routing manifest unless the user explicitly asks how the request was routed.

## Loading policy

- Start with this file only when routing is genuinely needed.
- Do not load [task-routing.md](references/task-routing.md), [workflow-recipes.md](references/workflow-recipes.md), or [routing-map.json](references/routing-map.json) during ordinary routing. They are maintenance sources for tests, audits, and future map edits only.
- Read the full selected Skill before executing it.
- Never load every Skill body to make one decision; runtime names and descriptions are the first-pass catalog.
- After owner selection, model files, CLI documentation, and execution references may be read only when the selected owner explicitly requires them. They cannot change the route unless the owner proves incapable of the promised final outcome.

## Acceptance

Routing is complete when exactly one of these is true:

- one available Skill has been selected and its full instructions are now being followed;
- one maintained workflow has been selected and handed to the orchestrator; or
- one route-changing clarification has been asked.

Do not report the Router itself as the completed creative result.
Do not remain in Router thinking after this condition is met: begin the selected owner's first executable step in the same Run.
