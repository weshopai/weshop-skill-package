---
name: create-custom-skill
description: "Create, revise, check, and locally install one user-owned Agent Skill from a new brief, the current conversation, or an existing local Skill. Use when the user asks to make, save, capture, customize, validate, or update their own reusable local Skill. This Skill owns the complete local lifecycle; official package submission is a separate maintainer intake and review workflow and is never implied by local creation."
---
# Create Custom Skill

## Catalog

- Display name: Create Custom Skill
- Category: Platform tooling
- Status: Ready
- Route label: Isolated user-owned Skill authoring
- Tone: purple
- Short description: Turn a reusable workflow into a checked, user-owned local Agent Skill.

## What this skill does

- Creates one custom `SKILL.md` from a new requirement, a completed conversation workflow, or a requested revision.
- Keeps unfinished work outside every Agent's auto-discovered Skill directory so a partial draft cannot trigger accidentally.
- Distinguishes related installed Skills with relationship scores and explicit two-way boundaries rather than merging similar outcomes.
- Checks the completed draft itself and can install it locally after showing the destination and receiving explicit user confirmation.
- Keeps official package submission separate; maintainer intake and independent review begin only when the user asks to upload or contribute the Skill.

## How to use

Provide the reusable outcome or existing Skill, representative requests, inputs, deliverable, constraints, common corrections, and target Agent when known. Existing conversation evidence should be reused before asking questions already answered.

#### Create from a workflow

```text
把我们刚才做的商品发布流程保存成我自己的 Skill，以后换一个商品也能复用。
```

#### Create from a new idea

```text
Create a custom Skill that turns my weekly campaign brief into three channel-specific creative directions, but does not generate media.
```

## Authoring workflow

1. Classify the request as new authoring, conversation capture, or revision. Read an existing target Skill before editing it. For conversation capture, extract the actual successful sequence, user decisions, reusable corrections, and stopping conditions; do not encode incidental filenames, one-off content, or failed approaches as universal rules.
2. Decide whether the requested result is reusable enough to merit a Skill. Explain when an ordinary saved prompt would be simpler, but respect the user's choice to continue.
3. Create an isolated draft at `~/.weshop-skill-package/custom-skills/<slug>/` unless the user names another draft root. Use lowercase kebab-case and refuse to overwrite an existing directory without explicit permission. `weshop-skills custom init <slug>` may create the initial `SKILL.md` and `intake.md` worksheets.
4. Complete `intake.md` as a user-authored intake, not an external-source record. Capture origin/ownership, one user-visible outcome, inputs, preservation constraints, deliverable, reusable decisions, execution behavior, safety, intended harness, and installation state. Do not add a license gate or invent source revisions for the user's own workflow.
5. Inspect the Skills visible to the current harness. For every plausible neighbor, record a relationship score from `0..1`, the shared use case, when the custom Skill wins, when the related Skill wins, and valid handoffs. Similarity never requires fusion. Put the material distinctions directly in frontmatter `description` so the Router can score the current request.
6. Write the smallest complete `SKILL.md`: required `name` and discriminating `description`, then purpose, inputs, workflow, constraints with reasons, acceptance/stopping conditions, examples, and user-facing output. Add `references/`, `scripts/`, or `assets/` only when the workflow genuinely needs them. Do not require MiniMax-specific `SKILL.cn.md`, `meta.yaml`, market tags, Hub paths, Hilo tokens, or fixed eight-step media templates.
7. For an executable WeShop Skill, use only a native WeShop harness tool or the official `weshop` CLI, select a currently verified Agent/model, use its native fields, delegate durable submission identity and recovery state to the Runtime or harness, and prohibit blind resubmission after ambiguous create outcomes. The Skill must not create its own ledger or invent an operation-key field absent from the tool schema. Never embed `WESHOP_API_KEY`, credentials, unrelated environment access, implicit package installation, or unreviewed remote execution.
8. Create three realistic requests that should select the Skill and three near-neighbor requests that should not. Check the name and description alone against all six. Walk through a different example to verify every step has its required input, expensive actions have proportionate confirmation, and failures reach a bounded stopping state.
9. Run the bundled mechanical check: `weshop-skills custom check <draft-directory>`. Repair structural blockers, then self-check the description against the trigger cases, walk through one different example, inspect bundled scripts and remote behavior as source, and record the result in `intake.md`. This is local authoring QA, not independent publication approval.
10. Show the proposed installation target and ask for confirmation because copying into an Agent Skill directory changes runtime behavior. On confirmation, copy the checked directory without `intake.md` into that Agent's user-owned Skill root, verify references again, and report whether the harness requires a restart or new session. Refuse to overwrite an unmanaged target without explicit permission.
11. Never copy a local Skill into this repository's official `skills/` directory automatically. If the user later asks to upload, publish, or contribute it, stop the local lifecycle and hand the source to the maintainer intake and independent review workflow. A local check is evidence, not publication approval.

## Draft contract

- Draft root and installation root are different locations.
- `intake.md` is authoring/review evidence and is not installed as runtime instruction content.
- A custom Skill remains owned by the user and is not managed by the package auto-updater.
- Existing unmanaged target directories are never overwritten automatically.
- Local creation, revision, checking, and approved installation belong to this one Skill.
- Independent review is deferred until official upload or package contribution is requested.

Read [references/source-attribution.md](references/source-attribution.md) when auditing why this workflow differs from the MiniMax reference.

## User-facing output

- Media type: User-owned Agent Skill draft
- Default quantity: One isolated Skill directory plus one user-custom intake record
- Content per artifact: `SKILL.md`, only necessary resources, trigger tests, walkthrough evidence, and local check evidence
- Default layout: Agent Skills-compatible folder outside runtime discovery until approval
- Model policy: Agent-authored platform tooling; no paid media generation
- Downstream use: User-approved local installation or separate maintainer intake for an official-package proposal
