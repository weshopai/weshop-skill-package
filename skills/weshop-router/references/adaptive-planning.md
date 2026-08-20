# Adaptive planning contract

Use this reference when one request may require several Skills, current research, deterministic processing, or clarification.

## Intent card

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
