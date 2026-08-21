# External Skill intake: MiniMax skill-reviewer

## Provenance

- Source: `/Users/jasonjiang/Downloads/skill-reviewer/`
- Source revision: content fingerprints recorded below
- Author or organization: MiniMax Design / MiniMax Hub export
- Reviewed date: 2026-08-21
- Files inspected: `SKILL.md`, `meta.yaml`
- SHA-256: `SKILL.md` `dd3ecf68181a127101ed7c48dc6489adfc50bd2f05a503bd793fa3b0ca7a29d4`; `meta.yaml` `591020331e0f031674ceb59fb5efd31a1923e5e484fe8bae9915a81efe035960`

## Product decomposition

- User-visible outcomes: a read-only Skill quality report with prioritized findings and a release/install verdict.
- Required inputs: one Skill directory or `SKILL.md`.
- Optional inputs: intended trigger/non-trigger requests, target harness, related installed Skills, and declared execution route.
- External AI operations: none.
- Deterministic operations: structure, name, reference, placeholder, and secret-risk checks.
- State, chaining, polling, and publication: review produces evidence only; it never edits, installs, publishes, or reloads.
- Preservation and quality claims: separate mechanical failures from semantic discovery, workflow, execution, and security findings.

## Package decision

- Intake result: create an independent platform-tooling Skill named `review-custom-skill` and connect it to user-custom intake rather than replacing external intake.
- Router compositions: follows `create-custom-skill`; may independently audit any local Skill; a third-party source still requires external intake.
- Rejected or unsupported behavior: MiniMax Hub `meta.yaml` publishing rules, Hub category enums, bilingual market mapping, arbitrary trigger-length targets, fixed body headings, and a numeric score that could conceal blockers.
- Promotion rationale: reviewer is a read-only quality gate, whereas intake records provenance/product decomposition and creator writes files.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `create-custom-skill` | 0.82 | User-authored Skill lifecycle | A draft already exists and needs independent assessment | The user wants a new or modified draft | Creator hands off; Reviewer returns verdict |
| external Skill intake | 0.74 | Quality and safety evaluation | Review the native draft itself | Analyze third-party provenance/provider substitution | External intake can feed a native draft into Reviewer |
| maintainer validation | 0.61 | Structural checks | The user needs one understandable report | The official package is being released | A passed review does not replace repository gates |

- Proposed frontmatter distinction: reviewer never modifies or installs; creator never self-certifies final quality.
- Highest-risk ambiguity: treating a static pass as proof that an untested paid execution route works.
- Router scoring evidence: review/audit/preflight requests score reviewer highest; create/save/modify requests score creator highest.

## Security review

- Secret and environment access: report embedded-secret risks without printing secret values.
- Remote domains and uploads: none.
- Installation and executable code: inspect scripts as text; do not execute them during review.
- Retry and provider-spend behavior: review performs no generation and cannot authorize paid execution.
- Unsafe or removed behavior: no auto-fix, install, publication, or market submission.

## Validation evidence

- Official WeShop schema checked: only when the reviewed Skill declares a WeShop route.
- Representative execution: not part of read-only review.
- Acceptance result: promoted as independent read-only platform tooling. The Reviewer passed quick and mechanical validation, rejected an incomplete generated draft, and its bundled script worked from an isolated copy-mode installation.
- Source record packaged: this intake and capability map.
