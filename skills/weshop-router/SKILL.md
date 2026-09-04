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

Follow this sequence once. Do not add a second planning loop after the owner is clear.

1. Identify the final outcome, supplied source roles, preservation constraints, requested deliverables, and whether current external evidence is independently required.
2. If one Skill clearly owns the complete result, read that Skill and continue directly.
3. Otherwise match one of the common task classes below and read only its section in [task-routing.md](references/task-routing.md).
4. Compare no more than four plausible Skills by their complete outcome boundary. Prefer the Skill that owns the whole requested result, not the one sharing the most keywords.
5. If the work has a genuine cross-Skill dependency or several separately usable deliverables, select one workflow from [workflow-recipes.md](references/workflow-recipes.md) and hand it to `orchestrate-multi-step-workflow`.
6. If the maintained index does not cover the request, compare current runtime-visible Skill names and descriptions. Installed and custom Skills remain authoritative.
7. Ask at most one routing question, and only when its answer changes steps 2–5.

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

| Workflow | Select when |
| --- | --- |
| `product-detail-production` | An accepted product-faithful scene must feed a separate modular detail-page set |
| `multi-format-campaign` | One fixed campaign brief must produce at least two independently usable formats or media types |
| `comic-production` | A story must become multiple ordered comic pages with reusable identities and continuity |
| `multi-shot-video` | Multiple separately generated shots need timing or continuity and final assembly |
| `visual-localization-set` | Several locales or formats must preserve one visual system while replacing copy |
| `cutout-to-layout` | A separately accepted transparent cutout must feed a later layout |
| `research-to-deliverable` | Independently verified current evidence materially controls a later visual deliverable |

After workflow selection, read the matching entry in [workflow-recipes.md](references/workflow-recipes.md), then invoke `orchestrate-multi-step-workflow`. The Router stops choosing. The orchestrator owns nodes, dependencies, parallel waves, optional branches, artifact bindings, recovery, and final acceptance.

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
- Read only the matched task-class section in [task-routing.md](references/task-routing.md).
- Read only the selected workflow entry in [workflow-recipes.md](references/workflow-recipes.md).
- Use [routing-map.json](references/routing-map.json) only for deterministic maintenance, validation, or exact ID lookup; ordinary Agent routing should not load the full JSON map.
- Read the full selected Skill before executing it.
- Never load every Skill body to make one decision; runtime names and descriptions are the first-pass catalog.

## Acceptance

Routing is complete when exactly one of these is true:

- one available Skill has been selected and its full instructions are now being followed;
- one maintained workflow has been selected and handed to the orchestrator; or
- one route-changing clarification has been asked.

Do not report the Router itself as the completed creative result.
