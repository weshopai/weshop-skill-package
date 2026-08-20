# WeShop capability substitution: brand-promo-video-generator

Complete one row per external AI operation. Do not combine behaviors that require different preservation or media contracts.

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Generate a non-identity brand/promo still or motion-ready plate | MiniMax Design image generation; exact model not declared | Approved campaign direction, ratio, palette, authorized product/brand references; never redraw identity assets | Existing appropriate image Atom selected by Router | Current image route's authorized asset/reference, ratio, prompt, operation-key, and polling fields | Generate only atmosphere, transition geometry, conceptual context, or a product-preserving plate; exact logos/UI/copy remain supplied/deterministic | No guarantee of exact typography, UI, logo, packaging, or upstream canvas layout | Source `SKILL.md` Steps 2, 6, and 8; current package preservation contracts |
| Generate one promo video shot | MiniMax H3 recommended upstream | One timed beat, product/brand proof, authorized references, camera/action, ratio, audio plan, forbidden additions | `generate-video`; model selected by current catalog semantics, with H3 reserved for justified large motion | Current model-specific duration, ratio, references, audio, prompt, `operationKey`, `executionId`, and polling fields | Keep one primary action and one proof point; preserve product/brand geometry; exclude generated exact copy, logo reconstruction, fake UI, and unverified metrics | Authenticity and exact-copy parity require supplied assets and deterministic finishing; native audio varies by model | Source `SKILL.md` Steps 5–9; current `skills/generate-video/SKILL.md` and `skills/make-product-commercial/SKILL.md` |
| Generate controllable narration, speech, music, or BGM | MiniMax Design audio/music/speech tools or H3 native audio | Approved script/voice rights/music brief, duration, language, mix plan | No implied standalone route; use native video audio only when the selected verified model supports it, otherwise supplied or separately authorized audio | Current selected route's audio fields, or deterministic editor inputs | Keep exact approved words and rights constraints; do not duplicate native and separate soundtracks | Package does not guarantee standalone synthesis or an exact reusable voice through this intake | Source `SKILL.md` Steps 7–9; current package audio boundaries |

## Deterministic operations retained locally

- Brand truth sheet, asset provenance manifest, claim/copy ledger, timed treatment, and shot manifest.
- Exact logo/UI/product plates, CTA/end card, subtitles, voiceover/music placement, transitions, mixing, and export through deterministic editing.
- Inspect source authenticity before generation and inspect every accepted shot plus the final film before delivery.

## Unsupported parity

- MiniMax Design canvas grouping, tool names, cover media, or platform-specific interaction semantics.
- Universal MiniMax H3 selection, guaranteed native audio, or silent provider fallback.
- Generated or approximated identity-bearing logos, product UI, packaging, mascots, people, fonts, claims, or metrics.
- Automatic commercial-publication clearance, dependency installation, publication, or unbounded retry/spend.

## Proposed Atom boundaries

- Create `brand-promo-video-generator` as a complete-outcome Atom candidate. Its description must distinguish it from `make-product-commercial` (0.86), `make-explainer-video` (0.58), `generate-video` (0.49), and `combine-videos` (0.36).
- Keep all related Skills independent. At invocation, score the campaign subject, proof/claim structure, inputs, and requested deliverable; select the highest intent match.
