---
name: weshop-router
description: Identify an open-ended WeShop request and select the best runtime-visible Skill, maintained workflow, or one routing clarification. Use for fast routing, not execution, memory, host policy, model selection, or workflow planning.
---

# WeShop Router

## Catalog

- Display name: WeShop Router
- Visibility: system
- Categories: Utility
- Status: Ready
- Route label: Skill and workflow selector
- Tone: ink
- Short description: Match one request to one Skill, one workflow, or one question.

## Scope

The Router has one job: recognize the user's requested outcome and return the shortest valid route.

It may select:

- one runtime-visible Skill;
- one maintained workflow when several Skills have a real dependency or independently requested outputs; or
- one focused clarification when a missing input changes that selection.

The Agent Runtime already owns context, memory, permissions, tools, authentication, execution, receipts, recovery, and publication. The selected Skill owns its execution method and result contract. The selected workflow owns its DAG, artifact handoffs, execution order, and final acceptance. Do not restate or reproduce those responsibilities here.

## Routing protocol

1. Extract only the semantic facts needed to distinguish routes: final outcome, supplied input roles, preservation constraints, requested deliverables, current-fact research need, and material ambiguities.
2. Read the matching section of [task-routing.md](references/task-routing.md). Use an exact maintained task only when its complete boundary matches; never route from a keyword alone.
3. For a direct result, return the maintained shortlist of no more than four runtime-visible Skills. Score the full outcome contract and select the strongest match.
4. For compound work, read [workflow-recipes.md](references/workflow-recipes.md) and select one workflow ID only when its complete dependency shape matches. Do not expand or execute its DAG.
5. For unknown or custom work, score current runtime-visible Skill descriptions. The maintained map is a fast index, not a closed operation enum.
6. Ask one question only when the answer changes the selected Skill, selected workflow, or a required input. Otherwise route with the facts already available.

## Output

Return one compact routing decision matching [router-plan.schema.json](../../schemas/router-plan.schema.json).

### Direct shortlist

```yaml
schemaVersion: "2.0.0"
kind: direct
taskClassId: commerce-fashion
taskId: product-scene
selectionSource: indexed
recommendedSkillId: ai-product
candidateSkillIds:
  - ai-product
  - create-white-background-product-mockup
  - product-detail-page
  - minimalist-product-ad-generator
candidateWorkflowIds:
  - product-detail-production
requiredInputs:
  - product-source
  - scene-or-campaign-brief
missingInputs: []
reason: One product-faithful scene is the complete requested result.
nextAction: score-skill-candidates
availableSkillCount: 138
```

After scoring the returned shortlist, call the Router once more with `directDecision`. The selected route then returns `nextAction: invoke-selected-skill`.

### Workflow

```yaml
schemaVersion: "2.0.0"
kind: workflow
taskClassId: narrative-sequence
selectionSource: indexed
candidateSkillIds: []
workflowId: multi-shot-video
candidateWorkflowIds:
  - multi-shot-video
requiredInputs:
  - film-brief-or-script
  - format-and-duration
missingInputs: []
reason: Separately generated continuity-linked shots must be assembled into one master.
nextAction: invoke-selected-workflow
availableSkillCount: 138
```

The Router stops at `workflowId`. The workflow and Agent Runtime own planning and execution.

### Clarification

```yaml
schemaVersion: "2.0.0"
kind: clarify
taskClassId: narrative-sequence
selectionSource: indexed
candidateSkillIds: []
candidateWorkflowIds:
  - multi-shot-video
requiredInputs:
  - film-brief-or-script
  - format-and-duration
missingInputs:
  - format-and-duration
reason: Routing needs the required input role format-and-duration.
question: Please provide or identify the format-and-duration input.
nextAction: ask-one-question
availableSkillCount: 138
```

## Loading

- Keep this file short and resident only when Router is invoked.
- Read only the matched task class in [task-routing.md](references/task-routing.md).
- Read only the candidate workflow in [workflow-recipes.md](references/workflow-recipes.md).
- Read a full Skill only after it is selected or is a genuine tied candidate.
- Leave model, prompt, provider, execution, and QA instructions to the selected Skill or workflow.

## Acceptance

- Direct: the selected Skill exists at runtime, appears in the focused candidate set, and has the strongest complete-outcome match.
- Workflow: the workflow exists, supports the task class, and its required inputs are present.
- Clarify: the single question changes the route or supplies a required routing input.
