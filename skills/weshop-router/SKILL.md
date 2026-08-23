---
name: weshop-router
description: Route any WeShop creative request. Use it to infer the complete intent, choose the highest-scoring Atom for one complete operation, or escalate compound, research-dependent, ambiguous, or risk-sensitive work to $orchestrate-multi-step-workflow. This is the package's only Router.
---

# WeShop Router

1. Infer a lightweight intent card: outcome, supplied assets and their roles, preservation constraints, deliverables, current-fact research need, confidence, and material ambiguities. Do not keyword-match.
2. Ask one focused question only when an unresolved fact would change the selected Atom, required asset, irreversible work, cost, or final contract. Record `clarify`; do not emit an execution choice first.
3. If one Atom can fully deliver one clear result, identify every plausible Atom and assign each an `intentMatchScore` from `0..1` against the complete intent: outcome, asset roles, constraints, deliverable, exclusions, and description boundary. Invoke the highest-scoring Atom directly. Do not call `$orchestrate-multi-step-workflow` merely to choose one Atom.
4. Escalate to `$orchestrate-multi-step-workflow` only for several independent operations, an actual artifact dependency, current research that affects execution, a material choice that becomes downstream input, or irreversible/high-cost/strong-preservation risk. State the escalation reason: `dependency_chain`, `ambiguity`, `research`, or `risk`.
5. The static relationship score in Skill descriptions is discovery metadata only. It never replaces request-specific intent scoring or permits merging independent Atoms.
6. After a direct Atom is selected, let that Atom own model choice, execution, safety, and its acceptance contract. After escalation, let the multi-step orchestrator own the DAG, handoffs, and final route acceptance.

The package validator `validateRouterDecision` checks that direct selection names an available Atom, records candidate reasons, and selects a maximum score. It also rejects research-dependent direct dispatch and use of the multi-step orchestrator as a direct Atom.
