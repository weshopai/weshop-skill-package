# WeShop capability substitution: official-brand-ad

| External behavior | Inputs and constraints | WeShop decision | Evidence |
| --- | --- | --- | --- |
| A short official brand or product campaign with verified identity assets and claims. | Authorized assets/facts, explicit preservation constraints, and observable acceptance | Differentiate to `brand-promo-video-generator`; use only a current verified route if promoted | Source entrypoint review and current Router contract |
| Multi-step handoff or execution state | Accepted upstream outputs, one operation key per non-idempotent run | Router DAG and owning Atom; no source runtime, plugin, or hidden provider state | `weshop-router` adaptive planning and execution policy |

## Deterministic operations retained locally

- Source/fact ledgers, accepted-output bindings, exact-copy finishing, frame inspection, and final acceptance reporting.

## Unsupported parity

- Source application UI/state, plugins, Canvas/graph APIs, hidden model controls, automatic fallbacks, autonomous publication, and unverified standalone audio.

## Proposed Atom boundaries

- Differentiate to `brand-promo-video-generator`.
- Adjacent current ownership: `brand-promo-video-generator`, `make-product-commercial`.
