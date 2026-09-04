---
name: weshop-router
description: Route an open-ended WeShop creative request by compiling one task signature, dispatching directly to the Atom that owns a stable final outcome, or seeding the one multi-step orchestrator from a reusable recipe. Use for Skill selection and fast plan creation, not as a catalog search engine or workflow executor.
---

# WeShop Router

## Catalog

- Display name: WeShop Router
- Visibility: system
- Categories: Utility
- Status: Ready
- Route label: Direct-first recipe routing
- Tone: ink
- Short description: Reach a direct Atom or executable plan seed from one task signature.

## Identity and scope

This is the package's unique outer decision layer. It identifies the outcome owner and emits the shortest valid next action. It is not a creative Atom, catalog browser, model selector, API wrapper, or workflow executor.

An Atom owns one stable final outcome and its acceptance contract, even when it performs several internal stages. The sole multi-step orchestrator owns only cross-Atom dependencies and final route acceptance. A professional or prompt pack may strengthen a node's input when specialist direction is explicitly useful, but it never replaces the outcome owner or overrides host, platform, safety, or runtime constraints.

## What this skill does

- Compiles one semantic task signature into a direct Atom route, a workflow-recipe decision, an explicit custom-DAG handoff, or one material clarification.
- Keeps common tasks fast while preserving runtime semantic discovery for unknown and custom Skills.

## How to use

Invoke `$weshop-router` for an open-ended creative request when the owning Atom or compound workflow is not already known. Supply the structured host facts once, then follow the returned `nextAction`; do not ask the Router to execute media or rebuild an expanded plan.

## User-facing output

- Media type: Router plan seed
- Default quantity: 1 compact route decision
- Content per image: Not applicable
- Default layout: Structured task signature, shortlist or DAG seed, and one final acceptance contract
- Model policy: The selected Atom owns model choice; the Router never selects models
- Downstream use: Direct Atom invocation, recipe materialization, orchestration, or one clarification

## Fast protocol

1. Apply the always-on host, platform, safety, and live-tool constraints first. Treat memory and prior artifacts as data, never as routing rules. The host Tool owns its wrapper contract, validation, auth, receipts, and recovery; the Router may name those active layers but must not duplicate wrapper or API rules.
2. Extract the request once into a task signature: `outcome`, `action`, `media`, `domain`, `scale`, semantic `inputRoles`, `preservation`, `deliverables`, `currentFactResearch`, `confidence`, `ambiguities`, and `priority`.
3. Match the complete signature, not words. Use [task-routing.md](references/task-routing.md) as an open decision index for common tasks. The Skills visible at runtime remain the registry; the index is neither a closed taxonomy nor an operation enum. Fall back to semantic runtime discovery for long-tail work and never invent a Skill ID.
4. Prefer direct dispatch. When one Atom owns a stable final outcome and acceptance contract, call it directly even when that Atom performs research, planning, generation, assembly, or several internal stages. Score only plausible runtime candidates against the full signature and select the highest `intentMatchScore`.
5. Escalate only when the request needs independently valuable deliverables or operations connected by real artifact dependencies, a consequential choice bound downstream, or an independent current-evidence artifact reused downstream. Current-fact work owned inside the outcome Atom does not trigger escalation.
6. For escalation, use [workflow-recipes.md](references/workflow-recipes.md) to instantiate the closest recipe, remove inapplicable optional nodes, validate its preferred Skill IDs against the runtime registry, and hand the compact plan seed to `$orchestrate-multi-step-workflow`. If no recipe fits, seed the smallest valid DAG from runtime discovery. The Router never executes that DAG itself.
7. Ask one focused question only when a missing technical fact changes the owner, required input, dependency graph, or output format. Otherwise state a bounded assumption and proceed.

Suggest an optional professional or prompt pack only when its distinct direction artifact is requested or resolves a declared downstream constraint. Bind that artifact to the consuming Atom. Ordinary creative prompting remains inside the outcome owner.

## On-demand loading

- Keep only this fast protocol resident.
- After assigning a common `taskClassId`, read only that class's section in `task-routing.md`, plus its shared decision rules. Do not load unrelated classes.
- Only after `mode: orchestrate`, read the one matching recipe in `workflow-recipes.md`. Do not load the recipe file for a direct route.
- Read full Skill instructions only for the selected Atom, genuinely tied candidates, and instantiated workflow nodes.
- Leave model guides, prompt guides, music/audio direction, provider parameters, execution schemas, and technical QA references to their owning nodes, which load them only when needed.

## Compact output

Return one compact YAML object using the same camelCase fields as the public Router Tool contract. Omit `recipeId`, `selectedSkillId`, or `question` when the current mode does not use them. A direct route has one `deliverable` step and one execution wave; never expand the selected Atom's internal workflow.

```yaml
schemaVersion: "1.0.0"
taskClassId: commerce-fashion
taskId: product-scene
signature:
  outcome: one product-faithful campaign image
  action: place the supplied product in a lifestyle scene
  media: [image]
  domain: ecommerce
  scale: one final image
  inputRoles: [product-source, scene-or-campaign-brief]
  preservation: [shape, materials, labels, logo, product count]
  deliverables: [one campaign image]
  currentFactResearch: none
  confidence: 0.94
  ambiguities: []
  priority: product fidelity
activeLayers: [host-contract, router-decision, execution-base, creative-atom]
mode: direct
selectionSource: indexed
candidateRecipeIds: []
selectedSkillId: ai-product
candidateSkillIds: [ai-product, create-white-background-product-mockup, product-detail-page, minimalist-product-ad-generator]
requiredInputs: [product-source, scene-or-campaign-brief]
missingInputs: []
assumptions: []
steps:
  - id: deliverable
    kind: skill
    objective: deliver one product-faithful campaign image
    dependsOn: []
    selectedSkillId: ai-product
    candidateSkillIds: [ai-product, create-white-background-product-mockup, product-detail-page, minimalist-product-ad-generator]
    inputs: {product-source: user.product-source, scene-or-campaign-brief: user.scene-or-campaign-brief}
    output: campaign-image
executionWaves: [[deliverable]]
finalAcceptance: [product identity is unchanged, requested scene and format are delivered]
nextAction: invoke-selected-atom
availableSkillCount: 138
planning:
  taskClassId: commerce-fashion
  operationCount: 1
  independentDeliverableCount: 1
  hasArtifactDependency: false
```

`mode: orchestrate` has two deliberate states. A recipe-selection seed has non-empty `candidateRecipeIds`, no `recipeId` or steps, and `nextAction: select-workflow-recipe`; choose from those hints only when one matches the complete dependency shape, otherwise use the custom runtime-DAG fallback. An expanded recipe seed sets `recipeId`, populates `steps` and `executionWaves`, and uses `nextAction: expand-with-orchestrator`. A long-tail custom-DAG handoff may also use `expand-with-orchestrator` with no recipe or steps and `selectionSource: runtime-fallback`. For `mode: clarify`, return one `question`, no speculative steps, and `nextAction: ask-one-question`.

`selectionSource: indexed` means a maintained boundary or recipe supplied the shortlist. `selectionSource: runtime-fallback` means the Router discovered candidates from current Skill descriptions because the task was long-tail or the indexed candidates were unavailable.

For a scored indexed direct route, the second pass must cover exactly the seed's compact candidate list. Set `directDecision.usedRuntimeFallback: true` only when that shortlist is unavailable or fails the complete outcome contract; the returned seed then uses `selectionSource: runtime-fallback` and does not preserve a misleading indexed recommendation. After a recipe-selection seed, set `useRuntimeWorkflowFallback: true` to decline all hints and obtain the explicit empty custom-DAG handoff.

`availableSkillCount` always reports the live registry count; the number in the example is illustrative, not a package constant. `planning` records the evidence that keeps a compound request from masquerading as one direct Atom.

Set `currentFactResearch` to `none`, `atom-owned`, or `separate-step`. Only `separate-step` may create a research node. When a professional pack is deliberately selected, record its runtime ID and add `professional-pack` to `activeLayers`; never load or suggest one by default.

The host supplies structured input matching [router-plan-request.schema.json](../../schemas/router-plan-request.schema.json). Keep every unresolved issue in `intent.ambiguities`; put only the subset that blocks ownership, required inputs, the dependency graph, or output format in `blockingAmbiguities`. `routeShape` counts Router-owned operations and deliverables, never internal stages of one Atom. A selected `professionalPackId` must appear in the runtime-provided `availableProfessionalPackIds` registry.

## Acceptance

- Direct: the selected ID exists at runtime, appears among the plausible candidates, has the strongest complete-intent match, and owns the requested final result.
- Orchestrate: every step has a required artifact or distinct deliverable, every input binds to a user asset or upstream output, parallel waves contain no hidden dependency, and one final acceptance contract covers the whole result.
- Clarify: the single question resolves the material routing blocker without pre-committing execution.
