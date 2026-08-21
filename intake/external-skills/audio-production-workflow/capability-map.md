# WeShop capability substitution: audio-production-workflow

| External behavior | Inputs and constraints | WeShop decision | Evidence |
| --- | --- | --- | --- |
| A disabled source workflow with unsupported standalone audio claims. | Authorized assets/facts, explicit preservation constraints, and observable acceptance | Reject disabled/unsupported route; use only a current verified route if promoted | Source entrypoint review and current Router contract |
| Multi-step handoff or execution state | Accepted upstream outputs, one operation key per non-idempotent run | Router DAG and owning Atom; no source runtime, plugin, or hidden provider state | `weshop-router` adaptive planning and execution policy |

## Deterministic operations retained locally

- Source/fact ledgers, accepted-output bindings, exact-copy finishing, frame inspection, and final acceptance reporting.

## Unsupported parity

- Source application UI/state, plugins, Canvas/graph APIs, hidden model controls, automatic fallbacks, autonomous publication, and unverified standalone audio.

## Proposed Atom boundaries

- Reject disabled/unsupported route.
- Adjacent current ownership: `make-podcast-video`, `combine-videos`.
