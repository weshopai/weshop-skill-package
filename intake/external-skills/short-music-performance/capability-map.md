# WeShop capability substitution: short-music-performance

| External behavior | Inputs and constraints | WeShop decision | Evidence |
| --- | --- | --- | --- |
| A bounded performance-led music short; full multi-shot music projects remain their own workflow. | Authorized assets/facts, explicit preservation constraints, and observable acceptance | Split candidate: `make-short-music-video`; use only a current verified route if promoted | Source entrypoint review and current Router contract |
| Multi-step handoff or execution state | Accepted upstream outputs, one operation key per non-idempotent run | Router DAG and owning Atom; no source runtime, plugin, or hidden provider state | `weshop-router` adaptive planning and execution policy |

## Deterministic operations retained locally

- Source/fact ledgers, accepted-output bindings, exact-copy finishing, frame inspection, and final acceptance reporting.

## Unsupported parity

- Source application UI/state, plugins, Canvas/graph APIs, hidden model controls, automatic fallbacks, autonomous publication, and unverified standalone audio.

## Proposed Atom boundaries

- Split candidate: `make-short-music-video`.
- Adjacent current ownership: `make-music-video`, `generate-video`.
