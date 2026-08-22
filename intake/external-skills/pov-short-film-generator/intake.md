# External Skill intake: pov-short-film-generator

## Provenance

- Source: /Users/jasonjiang/Downloads/minimax skill/pov-short-film-generator
- Source revision: sha256:35d60fe91d6754a67774af7a123d122e8f48f90dd71309401d87e4306b88a409 (SKILL.md); sha256:8dc192505d297f88fc11ac2928d83b504e49a8f7c6d6a1690b1209d83fb48d49 (meta.yaml)
- Author or organization: MiniMax Design (`official-featured` export)
- Reviewed date: 2026-08-21
- Files inspected: `SKILL.md`, `meta.yaml` (both files in the supplied export)

## Product decomposition

- User-visible outcomes: A coherent immersive first-person short film with subjective-camera rules, storyboard, atomic clips and final assembly
- Required inputs: Narrative premise, duration/ratio, authorized references, POV identity/action constraints and prohibited elements
- Optional inputs: One of the supplied style modes, audio plan, custom visual direction and supporting assets
- External AI operations: Atomic reference-led video shots and optional approved still anchors
- Deterministic operations: POV spec, reference-role ledger, storyboard, continuity/anti-lottery gate, clip manifest, assembly and QC
- State, chaining, polling, and publication: Get film-spec approval before paid runs; stable key per clip, terminal polling, accepted-only assembly; no publication
- Preservation and quality claims: First-person grammar, continuity, authorized references, action readability, duration/ratio and no unintended third-person face reveal

## Package decision

- Intake result: Standalone Atom candidate
- Proposed standalone Atom: `pov-short-film-generator`
- Router compositions: `plan-film-storyboard` supplies planning when requested separately; `generate-video` owns atomic clips; `combine-videos` assembles; `make-music-video` owns a music-led edit instead
- Rejected or unsupported behavior: Source Canvas tools/state, automatic provider fallback, unverified native audio, blind generation after failed POV checks, and publication
- Promotion decision and rationale: POV grammar is a complete-film invariant that general storyboarding and one-shot generation do not own; promotion awaits live route and output verification

## Similar Skill boundaries

Complete one row for every materially similar or adjacent installed Skill. Similar Skills remain independent.

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `plan-film-storyboard` | 0.77 | Film plan and shot breakdown | The finished POV film is requested | Only a storyboard/shot plan is requested | Approved storyboard handoff |
| `generate-video` | 0.69 | Atomic generated scene | Multi-clip POV continuity and assembly are required | One POV shot is requested | Generate each accepted clip |
| `combine-videos` | 0.44 | Final assembly | Film spec/generation/QC are needed | Accepted clips are supplied for edit only | Assemble manifest |
| `make-music-video` | 0.41 | Multi-clip audiovisual edit | Narrative subjective POV drives the outcome | An authorized song drives the editorial structure | May provide an insert only |

- Proposed frontmatter distinction: Use for a complete narrative whose camera is materially the protagonist’s subjective view; not an ordinary film storyboard, one video shot, or music edit.
- Highest-risk ambiguity: “POV video” may mean a GoPro-like single shot rather than a first-person narrative film.
- Router scoring evidence: Required subjective grammar, visible protagonist fragments, and multi-clip continuity make this candidate win.

## Security review

- Secret and environment access: No source code executed; credentials stay environment-only.
- Remote domains and uploads: Authorized assets through existing WeShop routes only.
- Installation and executable code: No source dependency/tool binding adopted.
- Retry and provider-spend behavior: Stable key per clip and Router outcome-unknown recovery rule.
- Unsafe or removed behavior: Source tool state, third-person contradiction, unsupported audio, automatic fallback and publication.

## Validation evidence

- Official WeShop schema checked: Current `plan-film-storyboard`, `generate-video`, `combine-videos`, and Router policy reviewed.
- Representative execution: Not authorized or not run
- Acceptance result: Promoted as an independent Atom; static route verification passed. Representative paid execution remains unrun and does not imply a capability guarantee.
- Source record packaged: `skills/pov-short-film-generator/references/source-provenance.md`
