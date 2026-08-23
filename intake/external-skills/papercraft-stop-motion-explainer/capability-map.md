# WeShop capability substitution: papercraft-stop-motion-explainer

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Create papercraft explainer package | Source hub documents/cards | Topic, learning goal, audience, delivery scope | Agent-authored production plan | User text, approved choices, asset IDs, optional Canvas document | Describe visual metaphor, paper mechanics, layers, depth, storyboard, and QA | No source card parity; Canvas document only when Agent support exists | Reviewed `SKILL.md` steps 1–19 |
| Generate approved stills and stop-motion shots | Source image/video/audio tools | Approved style, diorama, ratio, clips | Current verified image route then `generate-video` and `combine-videos` | Live schemas and accepted clip IDs | Preserve physical paper material, shadows, parallax, stepped mechanics | Voice/audio and exact stop-motion fidelity unverified | Reviewed `SKILL.md` steps 8–18 |

## Deterministic operations retained locally

- Learning-goal extraction, metaphor, asset/staging plan, storyboards, and review checklist.

## Unsupported parity

- Source-specific cards, automatic voice/music, fixed route, and source tools. Canvas-capable Agents may retain the package and approvals there.

## Proposed Atom boundaries

- Candidate owns educational papercraft production direction; existing Atoms own media execution and assembly.
