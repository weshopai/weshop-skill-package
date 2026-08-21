# WeShop capability substitution: fallback-video-workflow

| External behavior | Inputs and constraints | WeShop decision | Evidence |
| --- | --- | --- | --- |
| A source fallback topology; WeShop routes to the narrowest installed Atom rather than a catch-all runtime workflow. | Authorized assets/facts, explicit preservation constraints, and observable acceptance | Integrate architecture only; use only a current verified route if promoted | Source entrypoint review and current Router contract |
| Multi-step handoff or execution state | Accepted upstream outputs, one operation key per non-idempotent run | Router DAG and owning Atom; no source runtime, plugin, or hidden provider state | `weshop-router` adaptive planning and execution policy |

## Deterministic operations retained locally

- Source/fact ledgers, accepted-output bindings, exact-copy finishing, frame inspection, and final acceptance reporting.

## Unsupported parity

- Source application UI/state, plugins, Canvas/graph APIs, hidden model controls, automatic fallbacks, autonomous publication, and unverified standalone audio.

## Proposed Atom boundaries

- Integrate architecture only.
- Adjacent current ownership: `weshop-router`, `generate-video`.
