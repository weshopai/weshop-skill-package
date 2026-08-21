# External Skill intake: 3d-animation-short-generator

## Provenance

- Source: Confidential local external Skill package
- Source revision: Content fingerprint `sha256:2476848bb32f50c6167cbb53d46de790774bcdd99e3e1f69d802549b87d506de`
- Author or organization: Not surfaced in the package
- Reviewed date: 2026-08-20
- Files inspected: `SKILL.md`, `meta.yaml`, and all five Markdown files in `references/`; `.DS_Store` ignored

## Product decomposition

- User-visible outcomes: One story-driven stylized 3D animated short, from premise through character/scene references, timed shots, clips, audio, assembly, and final review
- Required inputs: Story premise, target duration, aspect ratio, visual direction, audio mode, and fixed story facts
- Optional inputs: Character/scene references, dialogue, language, music, props, first/last frames, resolution, and requested delivery stage
- External AI operations: Generate character and scene references, generate atomic video shots, and optionally generate supported audio assets
- Deterministic operations: Story/continuity ledgers, shot manifest, dialogue and mouth-state checks, clip ordering, trimming, mixing, and export inspection
- State, chaining, polling, and publication: Lock upstream decisions before paid runs; use stable operation keys per asset; poll each run to terminal state; assemble accepted clips only; never publish automatically
- Preservation and quality claims: Character identity, environment, prop ownership, screen direction, lighting, dialogue speaker, mouth state, duration, ratio, shot order, audio clarity, and absence of storyboard labels in final media

## Package decision

- Intake result: Keep as an independent complete-outcome Skill candidate
- Proposed standalone Atom: `3d-animation-short-generator`
- Router compositions: `develop-story` → `create-character` and other approved reference-asset Atoms → `plan-film-storyboard` → one `generate-video` run per accepted shot → `combine-videos` and deterministic audio finishing
- Rejected or unsupported behavior: Mandatory platform-canvas ordering, unavailable tool bindings, unsupported standalone BGM/voice generation, unverified model guarantees, contradictory narration rules, automatic retries, and automatic publication
- Promotion decision and rationale: Promoted as standalone `skills/3d-animation-short-generator` because the requested result is one finished 3D animated short; similarity to component Atoms does not require fusion

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `develop-story` | 0.55 | Story premise, protagonist, causal beats, emotional payoff | The requested deliverable is a finished stylized 3D animation short | The user wants story development text without media production | May consume an accepted `develop-story` package |
| `plan-film-storyboard` | 0.78 | Timed shots, continuity, dialogue, sound, generation handoffs | One owner must carry an animated short through asset generation, clips, assembly, and final QC | The deliverable is a validated production storyboard only | May use or emit a compatible shot manifest |
| `generate-video` | 0.62 | Generative video clips | The result needs multiple story-linked shots and a finished film | The request is one coherent standalone shot | Calls it once per accepted atomic shot |
| `combine-videos` | 0.38 | Ordered final video assembly | Story, animation assets, and generation are also required | The user already supplied the clips and only needs editing | Hands accepted clips to deterministic assembly |
| `make-product-commercial` | 0.34 | Multi-shot planned short video | The core is fictional/narrative 3D animation | A truthful supplied product and commercial claim drive a 5–30 second ad | Can hand off a branded animated insert when explicitly requested |

- Proposed frontmatter distinction: Use for one complete story-driven stylized 3D animated short; unlike `plan-film-storyboard` (relationship 0.78), this owns reference assets, rendered clips, assembly, and final media QC; unlike `generate-video` (0.62), it owns multiple causally linked shots; use the related Skill for planning-only or one-shot requests.
- Highest-risk ambiguity: A request for “animated storyboard” may mean a planning artifact or a finished short; score deliverable and requested production stage most heavily.
- Router scoring evidence: The standalone Skill should win only when the user's final deliverable is a complete animated short; component Atoms should score higher for their narrower standalone outputs.

## Security review

- Secret and environment access: No source code was executed; WeShop credentials remain environment-only
- Remote domains and uploads: Upload only user-authorized assets through existing WeShop routes; the supplied cover URL is metadata evidence, not an authorized production input
- Installation and executable code: No upstream dependency, script, or package installation was requested or performed
- Retry and provider-spend behavior: One durable key per shot; inspect terminal output; retry only a failed/rejected shot with a changed prompt and a new linked key; no blind model cascade
- Unsafe or removed behavior: Remove trademarked-studio style defaults, false capability guarantees, autonomous publication, and rules tied only to source-specific canvas tools

## Validation evidence

- Official WeShop schema checked: Current package model-routing policy and the contracts of `develop-story`, `create-character`, `plan-film-storyboard`, `generate-video`, and `combine-videos` reviewed
- Representative execution: Not authorized or run; intake is static and does not imply paid generation
- Acceptance result: Promoted with explicit relationship scores, highest-intent-match routing boundaries, current catalog model policy, durable per-shot operations, and final-film QC
- Source record packaged: `skills/3d-animation-short-generator/references/source-provenance.md`
