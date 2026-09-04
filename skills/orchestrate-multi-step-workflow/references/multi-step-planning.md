# Multi-step planning contract

Use this reference after the harness-level Router has determined that a request needs several operations, current research, deterministic processing, or clarification. One clear Atom request never enters this workflow.

## Canonical Router plan seed path

A handoff with `schemaVersion: "1.0.0"` is already classified. Its `signature`, `routeShape`-derived `planning`, selected `recipeId`, materialized optional `steps`, artifact `inputs`, `executionWaves`, and `finalAcceptance` are canonical. Do not re-infer the intent or recreate the DAG.

1. If `nextAction` is `select-workflow-recipe`, compare only the `candidateRecipeIds` hints and instantiate one through the Router plan compiler only when it matches the complete dependency shape. If none fits, take the declared custom runtime-DAG fallback rather than forcing a recipe.
2. If populated `steps` are present, preserve their IDs, dependencies, bindings, outputs, optional-node decisions, and wave order.
3. Score the listed `candidateSkillIds` for each Skill node against that node's complete contract. Use current runtime descriptions only when `runtimeDiscoveryRequired` is true, an indexed ID is unavailable, or none owns the full node outcome.
4. Fill `skillId`, request-specific `candidates`, and `selectionReason`; deterministic and research nodes retain their declared kind.
5. Expand `repeatFor` mechanically after its source manifest or list is available. Stable child IDs inherit the template node's bindings and dependencies; dependent nodes wait for the complete required fan-out. Recompute waves without changing the recipe.
6. Run deterministic validation, then execute. If the seed has `nextAction: ask-one-question`, ask only its `question` and emit no nodes.

An `expand-with-orchestrator` seed with no steps is an explicit `runtime-fallback` custom-DAG handoff. Only that path, or a handoff with no valid seed, uses the legacy planning process below.

## Legacy fallback intent card

Infer rather than keyword-match:

```yaml
outcome: the user's final usable result
assets: supplied inputs and their roles
constraints: preservation, exact copy, platform, safety, budget, and format
deliverables: separate files or artifacts the user expects
requires_research: true only when current external facts affect execution
confidence: 0..1
ambiguities: unresolved facts that could materially change the route
```

Confidence is evidence for a decision, not a universal threshold. Clarify only when an ambiguity changes the selected Skill, required input, irreversible work, cost, or final contract. Otherwise state the assumption and proceed.

## Planning decision

Record this before creating execution nodes:

```yaml
planning:
  reason: dependency_chain | multi_deliverable | ambiguity | research | risk
  clarification_required: true | false
```

This is a multi-step workflow: an executable plan has at least two meaningful nodes. `dependency_chain` requires an actual dependency, not merely multiple user phrases. `multi_deliverable` covers two or more independently owned outputs that can share one execution wave without inventing a dependency. `research` requires `requires_research: true` and a research node. `risk` covers irreversible, high-cost, or preservation-sensitive execution that needs explicit acceptance and safe submission handling.

When `clarification_required` is true, set the reason to `ambiguity`, ask one material question, and do not emit execution nodes until it is answered. Do not use this workflow as a keyword classifier or a global entry point: an unambiguous single-Atom request proceeds directly to its selected Skill.

## Route DAG

Create one node per meaningful operation:

```yaml
id: stable local identifier
kind: skill | research | deterministic
skill_id: required only for skill nodes; must be visible in the runtime registry
objective: one atomic job
depends_on: upstream node IDs
inputs: role-to-user-asset or role-to-upstream-output bindings
output: the artifact handed downstream
selection_reason: why this Skill's use case is narrower than alternatives
candidates:
  - skill_id: a visible runtime Skill
    intent_match_score: 0..1
    reason: how its description matches or misses this exact operation
```

Every Skill node must list all plausible candidates, not the full unrelated registry. Score semantically from the complete intent card: outcome, asset roles, constraints and preservation, requested deliverable, exclusions, and description relationships. The selected `skill_id` must equal a candidate with the maximum `intent_match_score`; deterministic validation rejects a lower score. When candidates tie at the maximum, keep the narrower output contract or better input/preservation fit and explain the tie-break in `selection_reason`.

Frontmatter relationship scores are static discovery metadata showing how adjacent two Skills are. They help find candidates but never substitute for the request-specific `intent_match_score`.

Prefer several operation nodes when the request changes artifact responsibility, for example scene creation then poster composition, or product cutout then detail-page assembly. Do not split prompt writing, polling, downloading, and QA into separate operations; those belong to the selected Skill or execution harness.

## Stage handoffs

Treat each route node as a small contract, not as a new agent role. Before a dependent node starts, bind only the accepted upstream artifacts and the preservation facts it actually needs. Keep the handoff compact: a stable artifact identifier, its role, immutable facts, requested transformation, and observable acceptance target are enough.

Plan the full DAG when it helps the user understand dependencies, but do not materialize, pay for, or claim a downstream artifact while its required upstream decision or media is unresolved. A node that produces a selectable set ends after registering its candidates; create a separate selection node only when the user's choice becomes a real downstream input. Do not make generic “approve the plan” nodes.

Put detailed guidance in the narrowest owner: model quirks in the selected model guide, source-specific evidence in a research record, and media acceptance in the owning Atom. This orchestrator retains plan selection, handoff bindings, and final acceptance; it must not become a planner/executor/director layer.

One node may satisfy several user phrases when one Skill explicitly owns the combined outcome. Conversely, do not force one broad Skill to own distinct outputs merely because it can technically generate them.

### Comic workflow example

For a story-to-comic request, use `$plan-comic-storyboard` to produce the validated project manifest. Create only missing canonical identities with `$create-character`. Inside that Atom, submit and inspect one canonical design sheet, then ask whether the seven additional character assets are needed; do not submit the expansion without post-QA confirmation. The canonical sheet alone is sufficient to continue into `$render-comic-page` when accepted. Bind that sheet plus the manifest's style and character IDs into every page node. Bind a preceding accepted page only when its visible state is needed for continuity. If exact dialogue alone fails on an otherwise accepted page, use `$add-speech-bubble` downstream instead of regenerating the story, character assets, or accepted artwork.

## Research

Add a research node when current platform specifications, laws, market facts, competitor evidence, placement dimensions, or other unstable external facts affect downstream work. Bind its verified output into the consuming node. Research is not automatically required because the user used a marketplace name when the requested task does not depend on current specifications.

## Final acceptance

Define one final contract for the complete route. Preserve only the critical handoff invariants between nodes. Follow the Router QA budget; do not duplicate every Atom's internal acceptance checks.

## Example

For “Research Amazon US requirements, place this blender in a kitchen, then make an A+ detail set”:

1. `research`: verify current Amazon US A+ requirements.
2. `scene`: select `ai-product` because its use case owns product-faithful placement; bind the product and relevant researched constraints.
3. `detail-set`: select `product-detail-page` because its use case owns modular buyer-decision sequencing and platform-ready exports; bind the accepted scene and research record.

The final contract covers product identity, verified claims, module compliance, and requested files once, after the last production node.
