# Router architecture

This is the maintainer outline for the WeShop routing system. Runtime routing should keep only the short protocol in `weshop-router/SKILL.md` resident and load the task, recipe, node-owner, prompt, or model material named below only when its decision has already been made.

## Layer model

```text
WeShop creative routing system
|
+-- 1. Always-resident authority
|   +-- host-contract: real tools, schemas, auth, receipts, safety, recovery
|   +-- router-decision: one signature, outcome owner, route mode
|   `-- execution-base: plan state, bindings, waves, final acceptance
|
+-- 2. Context data
|   `-- memory-context: user and project facts; data, never routing rules
|
+-- 3. Selected production owner
|   +-- creative-atom: one stable final outcome and its internal SOP
|   +-- prompt-specialist: prompt-only output, no media execution claim
|   `-- meta-system: Skill/package management, not creative execution
|
+-- 4. Compound-work layer
|   `-- orchestration: the sole owner of cross-Atom DAG execution
|       +-- selected recipe or explicit runtime-composed DAG
|       +-- artifact bindings and dependency-safe waves
|       `-- one route-level final acceptance contract
|
`-- 5. Optional overlay
    `-- professional-pack: selected specialist direction only
        `-- cannot override host, runtime registry, execution base, or Atom owner
```

## Plan compiler state machine

```text
host extracts router-plan-request
              |
              v
      compile signature once
              |
      +-------+-------------------+
      | common task fast path     | unknown/custom task
      | routing-map.json          | runtime Skill descriptions
      +------------+--------------+
                   |
          evaluate routeShape
                   |
       +-----------+-------------------------------+
       |           |               |               |
       v           v               v               v
 direct seed   recipe choices   custom-DAG      clarify seed
 score <=4     select one only  empty seed       one question
 candidates    if shape fits    no recipe/steps  no steps
       |           |               |               |
       v           v               v               `-- recompile after answer
 selected Atom expanded recipe   sole orchestrator composes runtime DAG
 one step      fixed bindings
       |           |
       `-----------+-------------------------------> execution
```

The five observable seed states are:

1. `direct + score-direct-candidates`: one owner, compact shortlist, no repeated classification.
2. `direct + invoke-selected-atom`: shortlist scored; one Atom call is ready.
3. `orchestrate + select-workflow-recipe`: candidate recipe hints only; no speculative DAG.
4. `orchestrate + expand-with-orchestrator`: either a populated, immutable recipe DAG or an explicit empty runtime-fallback seed.
5. `clarify + ask-one-question`: one material blocker and no speculative execution steps.

## Tool and Skill responsibilities

| Owner | Decides | Must not decide |
| --- | --- | --- |
| Host Tool | Live registry, input schema, auth, receipts, submission state, recovery | Creative outcome ownership from keywords |
| Router Skill | Signature semantics, direct/escalate/clarify boundary, what references to load | Model parameters, API wrapper behavior, DAG execution |
| Router Tool compiler | Deterministic seed shape, recipe materialization, optional nodes, bindings, waves, schema guards | Raw-text keyword classification, semantic scores |
| Atom Skill | One final outcome, its internal SOP, node-level acceptance | Cross-Atom route ownership |
| Multi-step orchestrator | Runtime node scoring, preserved DAG handoff, execution order, final route acceptance | Reclassifying or rebuilding a valid Router seed |
| Professional pack | A specialist direction artifact bound into a selected node | Replacing the Router, Atom, host contract, or model/tool authority |

## Reference loading

- Read `task-routing.md` only for the matched task class and common task boundary.
- Read `workflow-recipes.md` only after orchestration is required and only for the candidate recipe being compared.
- Read full Atom instructions only for a selected owner, a genuine scoring candidate, or a materialized workflow node.
- Read model, prompt, music, provider, and technical QA guides only inside the node that owns that decision.
- Do not load professional packages unless one is explicitly selected or its distinct direction artifact resolves a declared downstream constraint.

## Public compiler path

1. Validate input against `schemas/router-plan-request.schema.json`.
2. Call `prepareRouterPlan(request, availableSkills)`.
3. For direct scoring, score the seed shortlist and recompile with `directDecision`; replacing the shortlist requires explicit runtime-fallback provenance.
4. For recipe selection, recompile with the chosen `recipeId`, or set `useRuntimeWorkflowFallback: true` when no hint fits.
5. For a populated recipe, score each node shortlist and call `compileRouterOrchestrationPlan`; the adapter rejects stale intent, incomplete scoring, changed bindings, and changed waves.
6. Validate or serialize the seed with `schemas/router-plan.schema.json`.
