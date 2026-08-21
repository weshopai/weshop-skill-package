# External Skill intake: MiniMax skill-creator

## Provenance

- Source: `/Users/jasonjiang/Downloads/skill-creator/`
- Source revision: content fingerprints recorded below
- Author or organization: MiniMax Design / MiniMax Hub export
- Reviewed date: 2026-08-21
- Files inspected: `SKILL.md`, `meta.yaml`, `references/NAMING.cn.md`, `references/NAMING.md`, `references/SKILL-TEMPLATE.md`
- SHA-256: `SKILL.md` `c76393aa89e9beacd4f5357a3d01056c33658804ca3ff2dbc8d4b87c0d27abb9`; `meta.yaml` `2e9455bf34aab3a50502757eb2911f4f53247fb04dd0098b74a9cd3441b51d40`; `NAMING.cn.md` `bfee2a137fa074c4dda739c30d42900d4d0d233c696ae8d8dbe6bef085c096d8`; `NAMING.md` `d14c9132779a0d9b30aa6412b9a8fe031614edc6229fdca5ad9baf53c08f9732`; `SKILL-TEMPLATE.md` `61b1d5b84d1c2947ea5fe4ae958504f8ee700ec4fab5eb046fdc64aa73d60794`

## Product decomposition

- User-visible outcomes: create a reusable Skill from a new brief, an existing workflow, or a requested modification; validate it; save it to a user-owned directory.
- Required inputs: desired reusable outcome or an existing Skill directory.
- Optional inputs: conversation history, example requests, constraints, target Agent Skill directory, supporting references/scripts.
- External AI operations: none required; authoring is performed by the current Agent.
- Deterministic operations: scaffold a draft directory, validate frontmatter/name/references, and copy only after approval.
- State, chaining, polling, and publication: draft remains outside discovery; review precedes optional local installation; package publication remains a separate maintainer workflow.
- Preservation and quality claims: preserve user intent, generalize reusable decisions, keep descriptions discriminating, and avoid embedding secrets or unsupported execution surfaces.

## Package decision

- Intake result: create an independent platform-tooling Skill named `create-custom-skill`.
- Router compositions: compose with `review-custom-skill` before local installation; external-source requests additionally use the existing external intake workflow.
- Rejected or unsupported behavior: MiniMax Hub directories, Skill Plaza UI, `SKILL.cn.md`, `meta.yaml`, Hub reload calls, Hub tag enums, Hilo tokens, fixed eight-step media templates, automatic marketplace publication, and mandatory bilingual mirrors.
- Promotion rationale: interactive user-owned authoring is a distinct outcome not owned by the maintainer-only Atom creation guide.

## Similar Skill boundaries

| Related Skill | Relationship score (0-1) | Shared use case | Use this intake when | Use the related Skill when | Composition or handoff |
| --- | ---: | --- | --- | --- | --- |
| `review-custom-skill` | 0.82 | User-authored Skill quality | The user wants to create, capture, or modify a draft | A draft already exists and the user wants an independent report | Creator hands the isolated draft to Reviewer |
| maintainer Atom workflow | 0.63 | Skill authoring conventions | The result is user-local and user-owned | A reviewed capability is proposed for the official package | A passed custom Skill may open a separate maintainer promotion review |
| external Skill intake | 0.55 | Source-aware adaptation | The workflow originates with the user or their conversation | The source is a third-party Skill/project | External intake precedes any native rewrite |

- Proposed frontmatter distinction: creation owns requirement capture, isolated drafting, trigger examples, and revision; it does not issue an independent review verdict or publish an official Atom.
- Highest-risk ambiguity: treating user-local installation as official package promotion.
- Router scoring evidence: creation phrases such as "make my own Skill" score above review-only phrases such as "audit this Skill".

## Security review

- Secret and environment access: never write API keys, tokens, or unrelated environment values into a Skill.
- Remote domains and uploads: none required.
- Installation and executable code: scripts are optional and must be reviewed before execution; installation requires an explicit target and user confirmation.
- Retry and provider-spend behavior: authoring performs no paid media generation.
- Unsafe or removed behavior: no automatic global-directory mutation, marketplace publication, remote download, or hidden reload.

## Validation evidence

- Official WeShop schema checked: not applicable until a custom Skill declares a WeShop execution route.
- Representative execution: static scaffold/review/install smoke tests only; no paid generation.
- Acceptance result: promoted as independent platform tooling. The initializer created an isolated `SKILL.md` plus `intake.md`; its untouched TODO draft was correctly rejected by mechanical review; the finished Creator passed quick and mechanical validation.
- Source record packaged: this intake and capability map.
