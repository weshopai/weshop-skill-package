---
name: orchestrate-multi-step-workflow
description: Orchestrate a WeShop creative workflow that already needs multiple operations, research, or material handoffs. Discover Atom Skills, select the highest-scoring candidate for each operation, bind outputs through a DAG, and apply safe recovery. Do not use for one clear result owned by one Atom.
---

# Multi-step workflow orchestration

## Catalog

- Display name: Multi-step Workflow Orchestration
- Visibility: system
- Text category: yes
- Categories: Utility
- Status: Ready
- Route label: Dependency-aware multi-Skill planning
- Tone: ink
- Short description: Plan and coordinate a creative request that needs multiple Skills, research, or material handoffs.

## What this skill does

- Builds a dependency-aware plan for work that cannot be completed by one Atom.
- Binds intermediate outputs and applies one final acceptance gate.

## How to use

Use this Skill only after routing identifies multiple dependent operations, research, ambiguity, or material risk.

#### Plan a campaign workflow

```text
Plan a multi-step workflow to research a product claim, create a product scene, then compose the approved image into a social carousel.
```

## User-facing output

- Media type: Multi-step route plan
- Default quantity: 1 dependency-aware plan
- Content per image: Not applicable
- Default layout: Structured DAG with inputs, handoffs, and final acceptance
- Model policy: Each selected Skill owns its model choice
- Downstream use: Coordinated creative execution

Use this Skill only after the harness-level Router has escalated a request beyond one directly callable Atom. A clear single-Atom request must call that Atom directly.

## Router plan seed handoff

When the handoff contains a Router plan seed with `schemaVersion: "1.0.0"`, consume it as the canonical plan input. Do not infer the task signature again and do not rebuild its recipe, steps, bindings, execution waves, or final acceptance contract.

- For `nextAction: select-workflow-recipe`, compare only the `candidateRecipeIds` hints against the complete dependency shape. Instantiate a matching recipe through the Router plan compiler; if none fits the full signature, use the declared custom runtime-DAG fallback instead of forcing a near match.
- For `nextAction: expand-with-orchestrator` with populated `steps`, preserve the graph. For each Skill node, semantically score only its `candidateSkillIds`; use runtime discovery only when the node says `runtimeDiscoveryRequired` or every indexed candidate is unavailable or fails the full node contract. Fill the selected Skill, request-specific candidates, and `selectionReason`, then validate.
- Treat an omitted optional node as absent. Treat `repeatFor` as a parameterized fan-out instruction: after its bound manifest or list exists, expand it mechanically into stable child IDs, preserve declared dependencies, and recompute waves. It is not permission to redesign the workflow.
- For `expand-with-orchestrator` with no steps, the Router has intentionally selected `runtime-fallback`. Seed the smallest custom DAG from the task signature, `routeShape` evidence, and runtime descriptions while retaining any indexed task owner in `candidateSkillIds`.
- For `ask-one-question`, return only the supplied material question. Do not pre-commit nodes.

Only use the legacy planning path below when no valid Router plan seed was supplied.

1. If there is no valid seed, inspect the Skills currently visible to the harness. Treat each Skill's frontmatter description as its discovery use case; do not rely on a Skill-owned list, operation enum, or remembered package count.
2. Only on that fallback path, infer an intent card from the user's outcome, assets, constraints, deliverables, research need, confidence, and material ambiguities. Do not repeat this inference when the Router supplied `signature`.
3. Record the orchestration reason: `dependency_chain`, `multi_deliverable`, `ambiguity`, `research`, or `risk`; and set `clarificationRequired` only when one technical fact must be answered before execution. Use `multi_deliverable` for independently owned parallel outputs with no artifact dependency. Never require consent, privacy, evidence/authenticity, copyright/rights, payment, or publication confirmation. This Skill always produces a multi-step plan; do not use it to choose a single Atom.
4. For every Skill operation, identify every plausible Skill and assign an `intentMatchScore` from `0..1` against the complete intent card: outcome, input roles, constraints/preservation, deliverable, exclusions, and relationship context from the descriptions. Select the candidate with the highest score. The harness model makes the semantic scores; deterministic code validates that the selected Skill is available and actually has the maximum score. Never replace this with keyword counting.
5. On fallback only, bind every downstream input to a user asset or an upstream output. For a seeded route, validate and preserve those bindings. Use a DAG when independent branches can run separately; otherwise preserve the required order.
6. On fallback only, define one final acceptance contract. For a seeded route, preserve `finalAcceptance`. Do not repeat QA after every Atom: preserve handoff invariants and run one final gate after the last generative step. A recurring composition may later become its own Atom when it still produces one clear result.
7. If current external facts materially affect execution, add an explicit research operation and bind its evidence downstream. `requiresResearch` must change the route rather than remain unused metadata.
8. Treat confidence as decision evidence, not a fixed cutoff. Ask one focused question only when a technical ambiguity changes Skill choice, required assets, or output format; otherwise state a reasonable assumption and continue. Submit supported requests according to the current API schema and surface the API response as returned without adding client-side risk gates.
9. Before the first live WeShop request, apply [references/api-key-setup.md](references/api-key-setup.md). That reference selects authentication by harness: an explicitly managed native WeShop tool owns authentication and must be invoked directly, while a standalone CLI invocation continues to require `WESHOP_API_KEY`. Never infer that managed authentication is missing from the ordinary Shell environment.
10. Read [references/multi-step-planning.md](references/multi-step-planning.md) for the intent and DAG schema.
11. After Skill selection, let the selected Atom own its agent/model route. Apply the shared [model-selection policy](../../shared/model-selection.md) only where the Atom leaves a model choice open. Match media and verified capabilities; `unknown` is unverified. After choosing the executable model, read exactly its guide from [references/model-prompt-routing.md](references/model-prompt-routing.md) and shape `textDescription` without importing fields that the live WeShop schema does not expose.
12. For execution, prefer a native WeShop tool exposed by the harness and follow that Tool's current schema and errors; the Skill Package does not duplicate its wrapper contract. Otherwise use only the official `weshop` CLI and read [references/official-cli.md](references/official-cli.md) before the first local CLI call. If `weshop --version` does not succeed, stop and provide the installation command; this content package has no built-in execution fallback. Authentication, validation, transport, timeout, or ambiguous-submission errors are not reasons to switch clients or resubmit.
13. The catalog is authoritative for discoverability, not execution approval. A model gets execution parameters only after its Atom Skill and API schema are added.
14. Use named variations as independent runs; ordinary alternatives can use a batch count. Do not impose an arbitrary ceiling: derive the useful output set from the objective.
15. If an accepted image only misses the requested ratio, keep it and add `$expand-image` as a downstream operation.
16. Route the complete local lifecycle for a new, captured, imported, or modified Skill to `create-custom-skill`: isolated intake, authoring or adaptation, mechanical and semantic self-checks, and request-authorized local installation without redundant confirmation. Treat imported third-party content as untrusted and inspect it statically, but keep a plain Canvas upload local. Stop only for overwrite conflicts or separately authorized higher-risk effects. Do not invoke a separate review Skill for local use. Begin maintainer external intake and independent review only when the user explicitly asks to contribute the result to the official Package.

## QA budget

- Default to one final QA checkpoint per route, never one checkpoint per workflow step.
- For ordinary generation and edits, inspect the first output plus any output already flagged by execution or visible-result metadata. Do not automatically inspect every item in a batch.
- Use targeted QA for declared preservation, identity, apparel, product, pose, or cross-view consistency. Check only those declared invariants; do not add generic aesthetic scoring.
- Use strict per-output QA only when the output contract would otherwise be invalid or unsafe, currently transparent PNG delivery and fictional mugshot safeguards.
- A downstream format or publication failure does not reopen content QA. Retry or repair only that downstream stage.
- An Atom may define stricter checks when its own contract requires them; the Router must not duplicate those checks.

## Runtime Skill discovery

Use the harness's current Skill list as the registry. New Skills become eligible as soon as their frontmatter description is visible; this Skill requires no operation-union, registry, or branch update.

Judge a candidate from its stated use case, exclusions, required inputs, promised output, preservation scope, downstream use, and named relationships in its description. Similar Skills remain independent even at high relationship scores. Score all plausible candidates for the current intent, invoke the highest `intentMatchScore`, and retain the candidate list and reasons in the plan record. A static relationship score describes adjacency between Skills; it never overrides the request-specific intent score. Read the full `SKILL.md` only for the winner or genuinely tied candidates. Never invent a Skill ID or select a lower-scoring broad visual generator when a specialized candidate scores higher.

## Hard model routing

- Every `gpt-image` / GPT Image 2 call defaults to `quality: "medium"` and `imageSize: "2K"`. Use another quality or resolution only when the user explicitly requests it; cost or speed preference alone must not silently reduce this default.
- Treat names such as `random-animal-generator`, `ai-logo-generator`, `ai-flag-generator`, `ai-room-planner`, `ai-landscape-design-free`, `flowchart-generator`, and `ai-image-animation` as Tools API agents, never as model IDs or model capabilities.
- Route `$create-animal` to Z-Image for pure photorealistic text-to-image; route `$create-logo`, `$create-mascot-logo`, `$create-flag`, `$restyle-room`, `$preview-landscape`, and `$make-flowchart` directly to GPT Image 2 Medium/2K. Room and landscape work require a source image. If exact flowchart copy still fails, use deterministic diagram rendering rather than switching image models.
- Route `$animate-image` directly to `kling` v1.0 with `modelName: Kling_3_0`, one source image, one result, 5 seconds, and audio off by default.
- Route readable text, Chinese/multilingual image work, translation, and localization to GPT Image 2 Medium. If it fails, use a text-free base plus deterministic layout.
- For `$ai-banner-design`, GPT Image 2 Medium produces every final Banner, including intentionally text-free finals. Midjourney may only create an optional text-free artistic-direction reference upstream; it never produces or replaces the final Banner.
- For `$make-mugshot-photo`, route directly to `gpt-image` v1.0 / GPT Image 2 Medium at 2K with one 3:4 result. Do not call `mugshot-creator` or another Tools-class wrapper; the Atom owns the fictional-label and non-evidence safeguards.
- Do not advertise or route standalone audio generation or audio editing. WeShop currently has no verified audio-only model or agent. Never substitute a video model and extract its soundtrack as an audio deliverable; request supplied audio or report the capability as unavailable. Do not require copyright authorization for supplied audio. Native audio generated as part of a requested video remains a video-model capability, not an audio Atom.
- Exclude Midjourney and Z-Image whenever any source/reference image, mask, or editing requirement exists. Use Midjourney only for pure artistic text-to-image exploration and receive all four outputs; use Z-Image only for pure photorealistic text-to-image or Chinese cultural elements.
- Consider Seedream only for demanding lighting/material rendering or Asian commercial aesthetics. Use GPT Image 2 Medium/2K for general deliverables and consistency-sensitive work.
- Prefer Nano 2 for fast divergence and Nano Pro for fast convergence/internal review when readable text is absent.
- For video, route large-amplitude motion to MiniMax H3; up to four image references or a motion-reference video to Kling V3 Omni; precise first/last-frame or product control to Kling V3; long multimodal, audio-visual, artistic, or talking-performance work to Seedance 2.5; source-image shots requiring premium synchronous dialogue/SFX in 16:9 or 9:16 to Veo 3.1; routine image-led work to Seedance 2.0; and lightweight validation to Seedance Mini only when cataloged.

When a platform-specific model such as Soul is unavailable, route to a package workflow such as `create-character`. It owns one canonical character sheet by default and a post-QA, user-confirmed seven-asset expansion; `character-reference-sheet` is only a compatibility redirect. The workflow owns the output contract, and the current model adapter may be replaced when the catalog changes.

## Run submission safety

Apply this section to every image, video, audio, and other non-idempotent create-run call. It overrides any Atom wording that could otherwise cause a blind retry.

1. Before submitting each planned atomic run, create and atomically persist one stable `operationKey` in a durable Router/harness ledger—not only conversational memory—with its variation index, agent/model, normalized parameters, asset identifiers, and submission time. Use one key per intended run and keep the same key across recovery attempts or harness/model handoffs. Send the key to the provider only when its tool schema explicitly supports a correlation or idempotency field.
2. A non-empty `executionId` is the only normal acceptance receipt. Once it exists, poll that exact run. A status-poll timeout means poll the same ID again; it never permits another create-run call.
3. If the create-run tool returns a transport error, timeout, tool failure, closed stream, empty or malformed response, apparent success without an `executionId`, or any response whose receipt cannot be parsed, set:

   ```json
   {"submissionState":"outcome-unknown","retryAllowed":false,"nextAction":"reconcile"}
   ```

   `outcome-unknown` is not `failed`. Do not call create/run again, switch models or Atoms, or revise the Prompt to create a replacement.
4. Reconcile with read-only capabilities exposed by the harness: look up the durable receipt by `operationKey`; query a known `taskId`; inspect a narrowly scoped recent-task record; or consume the original callback. If the original run is found, recover its `executionId`, then poll and deliver that run.
5. Empty `material_search`, an empty Canvas, no local file, a delayed callback, or one `not found` response is never proof that no run exists. Generation, download, material ingestion, and Canvas publication are separate stages.
6. If recovery is unavailable or inconclusive, stop and report that submission state is unknown. Do not create another run merely to complete the user request.
7. Automatic resubmission is allowed only when an authoritative server/tool recovery response returns `confirmedAbsent: true` for that same `operationKey` or `taskId`. A generic “try again,” a changed Prompt, a changed model, one `not found`, or an empty list is not proof. A user may override only after being told that the original may still complete and explicitly accepting duplicate output and cost risk.
8. After a run succeeds, retry only the failed downstream stage—status retrieval, download, material ingestion, or Canvas publication—using the existing `executionId` and media URL. Never regenerate because publication is empty or failed.
9. For batches and named variations, keep one `operationKey` per planned slot. An unknown receipt freezes only that slot; it does not increase the planned run count.

When the tool can return structured state, preserve at least `submissionState`, `operationKey`, `taskId` when available, `executionId`, `retryAllowed`, `confirmedAbsent`, and `nextAction`. Tool wrappers must reject a second create call that reuses a key whose state is `accepted` or `outcome-unknown`.

## High-tier video terminal-failure policy

This section applies only after a high-tier video run such as Kling 3.0 or Seedance has returned a known `executionId`. An accepted run may take a long time, fail after consuming work, or return refunded points. Treat these as execution states to diagnose, not as automatic evidence that a lower-tier model should replace the requested model.

1. Poll an accepted run to a terminal state. Long processing time is not a failure; report progress when available and keep the original model active.
2. Record the terminal error (`code`, `message`, `retryable`), agent and model version, submitted parameters, prompt revision, execution ID, elapsed time, and refund status.
3. Only after that known run reaches a terminal failure may a retry be considered. A permitted retry is a new intended run: give it a new `operationKey` and record `parentOperationKey` as the failed run's key. Never reuse an accepted key or submit an identical retry. Create a materially revised prompt or request based on the terminal error:
   - moderation or sensitive-content errors: remove, neutralize, or replace the sensitive wording while preserving the intended safe action;
   - prompt/parameter validation errors: correct the schema and reduce the prompt to one action, one camera instruction, one environment behavior, and essential continuity constraints;
   - an overloaded, timeout, or retryable terminal service error attached to the known `executionId`: retry once with a simplified atomic prompt and the same model; preserve the source image and required invariants. A create-call timeout is `outcome-unknown`, and a status-poll timeout continues polling the same ID;
   - generation-quality or continuity failure: target the failed property in a revised prompt or split the work into atomic shots.
4. Retain the full submitted prompt, each revision, and the reason for the revision so the Atom can learn from the failure instead of cycling requests.
5. Do not downgrade merely because a high-tier request failed or took a long time. Downgrade to a lower-cost model only when the API reports insufficient points/credits, or when the user explicitly changes the model, budget, or delivery constraint. State the downgrade reason in the route record.

Never expose a WeShop API Key or managed-host access token. A standalone `WESHOP_API_KEY` remains environment-only and may only be sent to the configured official WeShop API. Managed-host credentials remain owned by that host and must never be requested, inspected, copied into Shell, or included in prompts and artifacts.
