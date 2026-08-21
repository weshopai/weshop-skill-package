---
name: review-custom-skill
description: "Perform a read-only quality and safety review of an existing user-authored Agent Skill and return a Pass, Revise, or Reject verdict with prioritized evidence. Use when the user asks to review, audit, preflight, validate, or check a custom Skill before installation; unlike create-custom-skill (relationship 0.82), this Skill never authors, fixes, installs, or publishes files. It complements external intake (relationship 0.74): intake owns third-party provenance and WeShop substitution, while this reviewer judges the resulting native Skill contract."
---
# Review Custom Skill

## Catalog

- Display name: Review Custom Skill
- Category: Platform tooling
- Status: Ready
- Route label: Read-only custom Skill quality gate
- Tone: purple
- Short description: Audit one custom Skill before it can enter an Agent's runtime discovery path.

## What this skill does

- Reviews every file in one custom Skill directory as text without modifying or executing it.
- Separates deterministic structural blockers from semantic discovery, workflow, execution, and security findings.
- Tests the description against positive and near-neighbor requests, including related installed Skills and relationship boundaries.
- Returns a clear verdict that gates—but does not itself perform—local installation or official-package promotion.

## How to use

Provide a Skill directory or `SKILL.md`, the intended outcome, target harness, and example requests when available. If the draft came from `create-custom-skill`, also provide its `intake.md`, trigger cases, and walkthrough evidence.

#### Review before installation

```text
Review ~/.weshop-skill-package/custom-skills/weekly-campaign-directions before I install it. Check that it will not collide with our existing marketing Skills.
```

## Read-only review workflow

1. Resolve the exact target and inventory every file. Read `SKILL.md`, `intake.md` when present, every referenced document, and every bundled script as source text. Never execute scripts, install dependencies, edit files, copy the directory, reload an Agent, publish, or make paid WeShop calls.
2. Run the bundled deterministic validator against the directory when local execution is available: `node <this-skill-directory>/scripts/review-custom-skill.mjs <target-directory>`. Treat its output as mechanical evidence only. Do not expose suspected secret values in the report.
3. Check structural blockers: valid frontmatter, lowercase kebab-case `name`, directory/name alignment, non-empty discriminating `description`, required content sections, no unfinished placeholders, and existence of every referenced file. Optional resources must have a concrete caller and purpose.
4. Review discovery using only the name and description. Verify the stated outcome, inputs, preservation scope, deliverable, exclusions, and materially related Skills. Score all plausible installed neighbors for at least three intended and three near-neighbor requests; the custom Skill should win only its declared cases. Similarity is not a reason to merge, but missing two-way boundaries is a `Revise` finding.
5. Review workflow quality: one coherent reusable result, complete input/output handoffs, generalization beyond the original example, proportionate confirmation before costly or externally mutating actions, bounded failure paths, observable acceptance, and no instructions that depend on unavailable tools or hidden context.
6. For WeShop execution, require a verified native Agent/model and fields, native harness or official `weshop` CLI only, environment-only API keys, stable operation tracking, terminal polling, and no blind resubmission after timeout or ambiguous receipt. Static review cannot prove a new paid route works; mark it unverified until an separately authorized representative run succeeds.
7. Review security and ownership: no embedded secrets, unrelated file/environment access, implicit global installation, unreviewed downloads or remote execution, hidden uploads/telemetry, unauthorized identity/assets, destructive broad paths, or overwrite of unmanaged Skill directories. Record non-WeShop domains and bundled scripts for explicit human review.
8. Classify each finding as `Blocker`, `Major`, or `Minor`, cite file and line, explain the user-visible consequence, and propose the smallest correction. Do not rewrite the file or supply a cosmetic numeric score that could hide a blocker.
9. Return one verdict:
   - `Pass`: no Blocker or Major findings; mechanical checks pass; discovery and workflow cases are coherent. Installation may be proposed separately.
   - `Revise`: the outcome is valuable, but at least one Blocker/Major finding is fixable. Keep the draft isolated and hand findings back to `create-custom-skill`.
   - `Reject`: the request is unsafe, cannot be bounded to one maintainable result, depends on unsupported capabilities, or materially misrepresents what it can deliver.
10. State explicitly that `Pass` does not install the Skill, promote it into the official package, authorize paid execution, or prove an untested route. Installation requires a separate user confirmation; official promotion additionally requires the maintainer workflow and repository gates.

## Report contract

Return:

- target path, reviewed files, and mechanical validator result;
- intended outcome and nearest related Skills with relationship/intent evidence;
- findings grouped by severity with file/line evidence;
- three should-trigger and three should-not-trigger verdicts;
- execution-route verification state and security notes;
- final `Pass`, `Revise`, or `Reject` verdict;
- permitted next action without performing it.

Read [references/source-attribution.md](references/source-attribution.md) when auditing why this review gate differs from MiniMax Hub publishing review.

## User-facing output

- Media type: Read-only custom Skill review report
- Default quantity: One report for one Skill directory
- Content per artifact: Inventory, mechanical evidence, semantic findings, trigger cases, route/security state, verdict, and next action
- Default layout: Structured Markdown with file/line evidence and severity groups
- Model policy: Agent-authored platform tooling; no paid media generation
- Downstream use: Targeted revision, user-approved local installation, or maintainer promotion review
