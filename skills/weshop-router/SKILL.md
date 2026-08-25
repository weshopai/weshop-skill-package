---
name: weshop-router
description: Route any WeShop creative request. Use it to infer the complete intent, choose the highest-scoring Atom for one complete operation, or escalate compound, research-dependent, ambiguous, or risk-sensitive work to $orchestrate-multi-step-workflow. This is the package's only Router.
---

# WeShop Router

## Catalog

- Display name: WeShop Router
- Category: Platform tooling
- Status: Ready
- Route label: Intent-aware Skill routing
- Tone: ink
- Short description: Select the best matching WeShop Skill for one clear operation or escalate a genuinely multi-step request.

## What this skill does

- Interprets the complete creative intent instead of keyword matching.
- Selects the highest-scoring appropriate Atom or escalates only when a multi-step plan is needed.

## How to use

Use this package-level router when the user needs the correct Skill selected from an open-ended WeShop request.

#### Route a creative request

```text
Route this request to the best available WeShop Skill: turn this product image into a clean commercial scene while preserving the exact product.
```

1. Infer a lightweight intent card: outcome, supplied assets and their roles, preservation constraints, deliverables, current-fact research need, confidence, and material ambiguities. Do not keyword-match.
2. Ask one focused question only when an unresolved fact would change the selected Atom, required asset, irreversible work, cost, or final contract. Record `clarify`; do not emit an execution choice first.
3. If one Atom can fully deliver one clear result, identify every plausible Atom and assign each an `intentMatchScore` from `0..1` against the complete intent: outcome, asset roles, constraints, deliverable, exclusions, and description boundary. Invoke the highest-scoring Atom directly. Do not call `$orchestrate-multi-step-workflow` merely to choose one Atom.
4. Escalate to `$orchestrate-multi-step-workflow` only for several independent operations, an actual artifact dependency, current research that affects execution, a material choice that becomes downstream input, or irreversible/high-cost/strong-preservation risk. State the escalation reason: `dependency_chain`, `ambiguity`, `research`, or `risk`.
5. The static relationship score in Skill descriptions is discovery metadata only. It never replaces request-specific intent scoring or permits merging independent Atoms.
6. After a direct Atom is selected, let that Atom own model choice, execution, safety, and its acceptance contract. Before the first direct-Atom `weshop_cli` call, read the shared [tool-call assembly reference](../../tool-call-assembly.md) and assemble the wrapper envelope explicitly. After any schema or argument-assembly validation error, read it again and correct the same intended call; a local validation failure is not a WeShop execution failure.
7. After escalation, let the multi-step orchestrator own the DAG, handoffs, and final route acceptance.

## User-facing output

- Media type: Route decision
- Default quantity: 1 selected Skill or one escalation decision
- Content per image: Not applicable
- Default layout: Structured intent and routing record
- Model policy: The selected Skill owns model choice
- Downstream use: Starting point for creative execution

The package validator `validateRouterDecision` checks that direct selection names an available Atom, records candidate reasons, and selects a maximum score. It also rejects research-dependent direct dispatch and use of the multi-step orchestrator as a direct Atom.
