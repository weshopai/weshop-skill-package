# WeShop workflow guide

This is a package reference for executing a workflow already selected by the routing guide. It is not a Skill, Tool, Agent, second planning loop, scheduler, permission layer, or durable-operation ledger.

## Ownership

- The workflow definition owns cross-Skill dependencies, handoff roles, parallelizable branches, optional branches, and final acceptance.
- Each selected Skill owns its operation method, model choice, prompt construction, Tool usage, and operation-level acceptance.
- The Host Runtime owns capabilities, approvals, authentication, paid-operation confirmation, durable execution identity, receipts, retries, recovery, publication, and cancellation.

No workflow instruction may bypass or duplicate a Host responsibility.

## Execution

1. Load the selected entry from `catalog.json`. Do not repeat intent classification or select another workflow unless a required input proves the chosen workflow inapplicable.
2. Bind every required input either to a user-provided asset or an accepted output from an upstream step. Ask one focused question only when a required binding is missing and no safe default exists.
3. Resolve each `skill` step against the current runtime registry. Read that Skill in full immediately before executing the step. A definition may name a fixed `skillId` or a narrow `skillSelector`; never invent an unavailable Skill.
4. Materialize only meaningful operations. Prompt writing, polling, download, ingestion, and QA remain part of the owning Skill or Host operation, not separate workflow steps.
5. Execute steps only after their `dependsOn` outputs are accepted. Independent ready steps may run in parallel when the Host supports it. Expand `forEach` steps once per bound item without increasing the requested output set.
6. Evaluate an optional step only when its `when` condition is true. A failed or missing upstream result blocks dependent steps but does not reopen routing or discard accepted independent results.
7. Apply the definition's `finalAcceptance` once after all required outputs exist. Preserve named invariants across handoffs; do not duplicate every Skill's internal checks.

## Dynamic Skill selectors

A `skillSelector` is a constrained slot, not a new discovery pass. Compare only runtime-visible Skills whose descriptions satisfy the selector's outcome, input roles, preservation boundary, and output kind. Read only the winner, or genuinely tied candidates when the descriptions cannot break the tie.

## Host interaction

Before paid generation or a costly dependent sequence, use the Host's existing interaction contract to present the complete workflow and obtain the current task's execution mode. Do not create a package-specific confirmation or execution protocol.

## Recovery

Treat Tool failures as execution recovery under the Host contract. Retry or resume only the failed stage using the Host's existing receipt and recovery state. Never call the routing guide again because a Tool path, parameter, download, or publication step failed.

## Completion

A workflow is complete when all required outputs satisfy `finalAcceptance`, optional skipped branches are recorded as skipped, and the Host has delivered or durably represented the requested results. Report the user-facing outputs, not the internal workflow manifest, unless the user asks for implementation details.
