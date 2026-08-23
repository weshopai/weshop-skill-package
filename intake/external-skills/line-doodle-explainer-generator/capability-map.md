# WeShop capability substitution: line-doodle-explainer-generator

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Develop teaching plan, narration, diagrams, storyboard | Source hub documents/cards | Topic, audience, duration, source material | Agent-authored production plan | User text, approved asset IDs, optional Canvas document | Turn source steps into compact diagram-first beats | No source card UI parity; save plan to Canvas only when available | Reviewed `SKILL.md` steps 0–10 |
| Generate and assemble approved visual explanation | Source media/editor tools | Approved visual plan, line-doodle grammar | `generate-video` then `combine-videos` | Live video schema, accepted clip IDs | Preserve sparse figures and teaching logic; no decorative dividers | Audio/subtitle parity unverified | Reviewed `SKILL.md` steps 11–12 |

## Deterministic operations retained locally

- Concept extraction, narration, diagram system, storyboard, and QA.

## Unsupported parity

- Source-specific cards, automated subtitle/audio production, and source tools. Canvas plan storage remains available only to Canvas-capable Agents.

## Proposed Atom boundaries

- Candidate owns line-doodle educational direction; existing Atoms own generation and assembly.
