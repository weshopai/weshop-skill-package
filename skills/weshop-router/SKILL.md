---
name: weshop-router
description: Plan simple or compound WeShop creative requests by discovering currently available Atom Skills, scoring each plausible Skill against the complete user intent, invoking the highest-scoring match, decomposing multi-operation outcomes, binding outputs, and applying safe recovery. Use when a request needs Skill selection, ordered transformations, research, or a choice between similar specialized Atoms; unlike an individual Atom (relationship varies by request), this Router chooses and composes Atoms rather than producing their media result itself.
---

# WeShop Router

1. Inspect the Skills currently visible to the harness. Treat each Skill's frontmatter description as its discovery use case; do not rely on a Router-owned list, operation enum, or remembered package count.
2. Infer an intent card from the user's outcome, assets, constraints, deliverables, research need, confidence, and material ambiguities. Do not reduce the request to one keyword label.
3. Decompose compound requests into meaningful operations. For each operation, identify every plausible Skill and assign an `intentMatchScore` from `0..1` against the complete intent card: outcome, input roles, constraints/preservation, deliverable, exclusions, and relationship context from the descriptions. Select the candidate with the highest score. The harness model makes the semantic scores; deterministic code validates that the selected Skill is available and actually has the maximum score. Never replace this with keyword counting.
4. Bind every downstream input to a user asset or an upstream output. Use a DAG when independent branches can run separately; otherwise preserve the required order.
5. If several Atoms are required, define one final acceptance contract. Do not repeat QA after every Atom: preserve handoff invariants and run one final gate after the last generative step. A recurring composition may later become its own Atom when it still produces one clear result.
6. If current external facts materially affect execution, add an explicit research operation and bind its evidence downstream. `requiresResearch` must change the route rather than remain unused metadata.
7. Treat confidence as decision evidence, not a fixed cutoff. Ask one focused question only when an ambiguity changes Skill choice, required assets, irreversible work, cost, or the final contract; otherwise state a reasonable assumption and continue.
8. Before the first live WeShop request, apply [references/api-key-setup.md](references/api-key-setup.md). If `WESHOP_API_KEY` is absent, stop before upload or generation and give the configuration and key-acquisition guidance there.
9. Read [references/adaptive-planning.md](references/adaptive-planning.md) for the intent and DAG schema whenever a request is compound, research-dependent, or materially ambiguous.
10. After Skill selection, let the selected Atom own its agent/model route. Apply the shared root `model-selection-policy.md` only where the Atom leaves a model choice open. Match media and verified capabilities; `unknown` is unverified. After choosing the executable model, read exactly its guide from [references/model-prompt-routing.md](references/model-prompt-routing.md) and shape `textDescription` without importing fields that the live WeShop schema does not expose.
11. For execution, prefer a native WeShop tool exposed by the harness. Otherwise use only the official `weshop` CLI. Read [references/official-cli.md](references/official-cli.md) before the first local CLI call. If `weshop --version` does not succeed, stop and provide the installation command; this content package has no built-in execution fallback. Authentication, validation, transport, timeout, or ambiguous-submission errors are not reasons to switch clients or resubmit.
12. The catalog is authoritative for discoverability, not execution approval. A model gets execution parameters only after its Atom Skill and API schema are added.
13. Use named variations as independent runs; ordinary alternatives can use a batch count. Do not impose an arbitrary ceiling: derive the useful output set from the objective.
14. If an accepted image only misses the requested ratio, keep it and add `$expand-image` as a downstream operation.

## QA budget

- Default to one final QA checkpoint per route, never one checkpoint per workflow step.
- For ordinary generation and edits, inspect the first output plus any output already flagged by execution or visible-result metadata. Do not automatically inspect every item in a batch.
- Use targeted QA for declared preservation, identity, apparel, product, pose, or cross-view consistency. Check only those declared invariants; do not add generic aesthetic scoring.
- Use strict per-output QA only when the output contract would otherwise be invalid or unsafe, currently transparent PNG delivery and fictional mugshot safeguards.
- A downstream format or publication failure does not reopen content QA. Retry or repair only that downstream stage.
- An Atom may define stricter checks when its own contract requires them; the Router must not duplicate those checks.

## Runtime Skill discovery

Use the harness's current Skill list as the registry. New Skills become eligible as soon as their frontmatter description is visible; the Router requires no operation-union, registry, or branch update.

Judge a candidate from its stated use case, exclusions, required inputs, promised output, preservation scope, downstream use, and named relationships in its description. Similar Skills remain independent even at high relationship scores. Score all plausible candidates for the current intent, invoke the highest `intentMatchScore`, and retain the candidate list and reasons in the route record. A static relationship score describes adjacency between Skills; it never overrides the request-specific intent score. Read the full `SKILL.md` only for the winner or genuinely tied candidates. Never invent a Skill ID or select a lower-scoring broad visual generator when a specialized candidate scores higher.

## Hard model routing

- Every `gpt-image` / GPT Image 2 call defaults to `quality: "medium"` and `imageSize: "2K"`. Use another quality or resolution only when the user explicitly requests it; cost or speed preference alone must not silently reduce this default.
- Treat names such as `random-animal-generator`, `ai-logo-generator`, `ai-flag-generator`, `ai-room-planner`, `ai-landscape-design-free`, `flowchart-generator`, and `ai-image-animation` as Tools API agents, never as model IDs or model capabilities.
- Route `$create-animal` to Z-Image for pure photorealistic text-to-image; route `$create-logo`, `$create-mascot-logo`, `$create-flag`, `$restyle-room`, `$preview-landscape`, and `$make-flowchart` directly to GPT Image 2 Medium/2K. Room and landscape work require a source image. If exact flowchart copy still fails, use deterministic diagram rendering rather than switching image models.
- Route `$animate-image` directly to `kling` v1.0 with `modelName: Kling_3_0`, one source image, one result, 5 seconds, and audio off by default.
- Route readable text, Chinese/multilingual image work, translation, and localization to GPT Image 2 Medium. If it fails, use a text-free base plus deterministic layout.
- For `$ai-banner-design`, GPT Image 2 Medium produces every final Banner, including intentionally text-free finals. Midjourney may only create an optional text-free artistic-direction reference upstream; it never produces or replaces the final Banner.
- For `$make-mugshot-photo`, route directly to `gpt-image` v1.0 / GPT Image 2 Medium at 2K with one 3:4 result. Do not call `mugshot-creator` or another Tools-class wrapper; the Atom owns the fictional-label and non-evidence safeguards.
- Do not advertise or route standalone audio generation or audio editing. WeShop currently has no verified audio-only model or agent. Never substitute a video model and extract its soundtrack as an audio deliverable; request user-supplied licensed audio or report the capability as unavailable. Native audio generated as part of a requested video remains a video-model capability, not an audio Atom.
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

Never expose `WESHOP_API_KEY`; it belongs server-side and may only be sent to `https://openapi.weshop.ai`.
