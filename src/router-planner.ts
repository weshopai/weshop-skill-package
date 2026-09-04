import { readFileSync } from "node:fs";
import {
  buildExecutionWaves,
  validateOrchestrationPlan,
  type OrchestrationPlan,
  type OrchestrationProposal,
  type RuntimeSkill,
  type SkillIntentMatch
} from "./multi-step-orchestrator.js";
import {
  requiresSeparateResearch,
  validateRouterDecision,
  type DirectAtomDecision,
  type RouterIntent,
  type RouterPlanningEvidence
} from "./router.js";

export interface RouterLayerDefinition {
  id: string;
  [key: string]: unknown;
}

export interface RouterTaskClassDefinition {
  id: string;
  label: string;
  defaultMode: "direct" | "orchestrate";
  useWhen: string;
  directWhen: string;
  orchestrateWhen: string;
  commonSkillIds: string[];
  recipeIds: string[];
}

export interface RouterTaskRouteDefinition {
  id: string;
  label: string;
  taskClassId: string;
  useWhen: string;
  requiredInputRoles: string[];
  preferredSkillId: string;
  neighborSkillIds: string[];
  directWhen: string;
  escalateWhen: string;
  recipeId?: string;
}

export interface RouterRecipeStepDefinition {
  id: string;
  kind: "skill" | "research" | "deterministic";
  objective: string;
  dependsOn: string[];
  inputs: Record<string, string>;
  /** Bind only when the user role or optional upstream step is present. */
  optionalInputs?: Record<string, string>;
  output: string;
  preferredSkillIds?: string[];
  optional?: boolean;
  condition?: string;
  /** Structured-role condition that the planner can resolve without text keywords. */
  includeWhenInputMissing?: string;
  repeatFor?: string;
  parallelGroup?: string;
}

export interface RouterWorkflowRecipeDefinition {
  id: string;
  label: string;
  taskClassIds: string[];
  useWhen: string;
  directInsteadWhen: string;
  requiredInputRoles: string[];
  minimumOptionalSteps?: number;
  steps: RouterRecipeStepDefinition[];
  finalAcceptance: string[];
}

export interface RouterRoutingMap {
  schemaVersion: string;
  layers: RouterLayerDefinition[];
  taskClasses: RouterTaskClassDefinition[];
  tasks: RouterTaskRouteDefinition[];
  recipes: RouterWorkflowRecipeDefinition[];
}

export interface RouterTaskSignatureInput {
  action: string;
  media: string[];
  domain: string;
  scale: string;
  priority: string;
}

export interface RouterTaskSignature extends RouterTaskSignatureInput {
  outcome: string;
  inputRoles: string[];
  preservation: string[];
  deliverables: string[];
  currentFactResearch: "none" | "atom-owned" | "separate-step";
  confidence: number;
  ambiguities: string[];
}

export interface RouterRouteShape {
  /** Count only independently owned Router operations; Atom-internal stages count as one. */
  operationCount: number;
  independentDeliverableCount: number;
  hasArtifactDependency: boolean;
}

export interface RouterPlanRequest {
  intent: RouterIntent;
  /** Optional for an indexed taskId; the planner infers its maintained class. */
  taskClassId?: string;
  taskId?: string;
  signature: RouterTaskSignatureInput;
  /** Authoritative supplied-role list when present; otherwise intent.assets is used. */
  availableInputRoles?: string[];
  recipeId?: string;
  /** Explicitly decline indexed recipe hints and request an empty custom-DAG seed. */
  useRuntimeWorkflowFallback?: boolean;
  includeOptionalSteps?: string[];
  assumptions?: string[];
  blockingAmbiguities?: string[];
  directDecision?: DirectAtomDecision;
  /** Lets the compiler select a task's escalation recipe without re-reading prose. */
  routeShape?: RouterRouteShape;
  memoryAvailable?: boolean;
  professionalPackId?: string;
  /** Runtime-visible overlay IDs used to reject invented professional packs. */
  availableProfessionalPackIds?: string[];
}

export interface RouterPlanSeedStep {
  id: string;
  kind: "skill" | "research" | "deterministic";
  objective: string;
  dependsOn: string[];
  inputs: Record<string, string>;
  output: string;
  candidateSkillIds: string[];
  selectedSkillId?: string;
  optional?: boolean;
  condition?: string;
  repeatFor?: string;
  parallelGroup?: string;
  runtimeDiscoveryRequired?: boolean;
}

export type RouterPlanNextAction =
  | "invoke-selected-atom"
  | "score-direct-candidates"
  | "select-workflow-recipe"
  | "expand-with-orchestrator"
  | "ask-one-question";

export interface RouterPlanSeed {
  schemaVersion: "1.0.0";
  taskClassId: string;
  taskId?: string;
  signature: RouterTaskSignature;
  activeLayers: string[];
  professionalPackId?: string;
  mode: "direct" | "orchestrate" | "clarify";
  selectionSource: "indexed" | "runtime-fallback";
  recipeId?: string;
  candidateRecipeIds: string[];
  recommendedSkillId?: string;
  selectedSkillId?: string;
  candidateSkillIds: string[];
  requiredInputs: string[];
  missingInputs: string[];
  assumptions: string[];
  steps: RouterPlanSeedStep[];
  executionWaves: string[][];
  finalAcceptance: string[];
  question?: string;
  nextAction: RouterPlanNextAction;
  availableSkillCount: number;
  planning: RouterPlanningEvidence;
}

export interface RouterStepSelection {
  stepId: string;
  selectedSkillId: string;
  candidates: SkillIntentMatch[];
  selectionReason: string;
  /** Required when selecting outside the indexed node shortlist. */
  usedRuntimeFallback?: boolean;
}

export class RouterPlanError extends Error {}

type ResolvedRouterPlanRequest = Omit<RouterPlanRequest, "taskClassId"> & { taskClassId: string };

let cachedRoutingMap: RouterRoutingMap | undefined;

/** Load the package-owned common-task index. Runtime Skills remain authoritative. */
export function loadRouterRoutingMap(): RouterRoutingMap {
  if (!cachedRoutingMap) {
    const path = new URL("../skills/weshop-router/references/routing-map.json", import.meta.url);
    cachedRoutingMap = JSON.parse(readFileSync(path, "utf8")) as RouterRoutingMap;
  }
  return cachedRoutingMap;
}

/**
 * Compiles one semantic task classification into a compact direct route or an
 * orchestration seed. It intentionally does not classify raw text or replace
 * runtime intent scoring with keyword counts.
 */
export function prepareRouterPlan(
  request: RouterPlanRequest,
  availableSkills: RuntimeSkill[],
  routingMap: RouterRoutingMap = loadRouterRoutingMap()
): RouterPlanSeed {
  const registry = new Set(availableSkills.map((skill) => skill.id));
  const task = request.taskId ? routingMap.tasks.find((candidate) => candidate.id === request.taskId) : undefined;
  if (request.taskId && !task) {
    throw new RouterPlanError(`Unknown indexed task ID: ${request.taskId}. Omit taskId for runtime semantic fallback.`);
  }
  const taskClassId = request.taskClassId?.trim() || task?.taskClassId || "runtime-other";
  if (task && request.taskClassId?.trim() && task.taskClassId !== request.taskClassId) {
    throw new RouterPlanError(`Task ${task.id} belongs to ${task.taskClassId}, not ${request.taskClassId}.`);
  }
  const resolvedRequest: ResolvedRouterPlanRequest = { ...request, taskClassId };
  validateRequest(resolvedRequest);
  const taskClass = routingMap.taskClasses.find((candidate) => candidate.id === taskClassId);
  const separateResearch = requiresSeparateResearch(resolvedRequest.intent);
  const signature = buildSignature(resolvedRequest, separateResearch);
  const assumptions = unique(resolvedRequest.assumptions ?? []);
  const blockingAmbiguities = unique(resolvedRequest.blockingAmbiguities ?? []);
  const availableInputRoles = new Set([
    ...inputRolesFor(resolvedRequest),
    "outcome",
    "deliverables",
    "constraints"
  ]);
  const workflowRequired = requiresWorkflow(resolvedRequest.routeShape) || separateResearch;
  const classDefaultWorkflow = !resolvedRequest.routeShape && !task && taskClass?.defaultMode === "orchestrate";
  if (resolvedRequest.useRuntimeWorkflowFallback && !(workflowRequired || classDefaultWorkflow)) {
    throw new RouterPlanError("Runtime workflow fallback requires a compound route shape, separate research, or an orchestration-first task class.");
  }

  const recipe = resolvedRequest.useRuntimeWorkflowFallback
    ? undefined
    : resolveRecipe(resolvedRequest, taskClass, task, routingMap);
  if (recipe && !separateResearch && recipe.steps.some((step) => step.kind === "research" && !step.optional)) {
    throw new RouterPlanError(`Recipe ${recipe.id} requires currentFactResearch separate-step.`);
  }
  if (resolvedRequest.directDecision && workflowRequired) {
    throw new RouterPlanError("A compound route shape or separate research artifact cannot use a direct Atom decision.");
  }
  if (resolvedRequest.directDecision && recipe) {
    throw new RouterPlanError("Choose either a direct Atom decision or a workflow recipe, not both.");
  }

  if (!recipe) {
    const indexedCandidates = resolvedRequest.taskId
      ? task ? [task.preferredSkillId, ...task.neighborSkillIds] : []
      : [];
    const candidateSkillIds = unique(indexedCandidates).filter((id) => registry.has(id)).slice(0, 4);
    if (!resolvedRequest.directDecision && (workflowRequired || classDefaultWorkflow)) {
      return buildRecipeSelectionSeed({
        request: resolvedRequest,
        signature,
        assumptions,
        blockingAmbiguities,
        availableSkills,
        taskClass,
        task,
        routingMap,
        candidateSkillIds
      });
    }
    return buildDirectSeed({
      request: resolvedRequest,
      signature,
      assumptions,
      blockingAmbiguities,
      availableSkills,
      registry,
      taskClass,
      task,
      routingMap,
      candidateSkillIds
    });
  }

  const requiredInputs = unique(recipe.requiredInputRoles);
  const missingInputs = requiredInputs.filter((role) => !availableInputRoles.has(role));
  const blockers = [...blockingAmbiguities, ...missingInputs.map((role) => `missing input: ${role}`)];
  if (blockers.length) {
    return {
      schemaVersion: "1.0.0",
      taskClassId,
      ...(task ? { taskId: task.id } : {}),
      signature,
      activeLayers: activeLayers(routingMap, resolvedRequest, "clarify"),
      ...(resolvedRequest.professionalPackId ? { professionalPackId: resolvedRequest.professionalPackId } : {}),
      mode: "clarify",
      selectionSource: "indexed",
      recipeId: recipe.id,
      candidateRecipeIds: [recipe.id],
      candidateSkillIds: [],
      requiredInputs,
      missingInputs,
      assumptions,
      steps: [],
      executionWaves: [],
      finalAcceptance: finalAcceptance(resolvedRequest.intent, recipe.finalAcceptance),
      question: blockingAmbiguities[0] ?? `Please provide the required input${missingInputs.length === 1 ? "" : "s"}: ${missingInputs.join(", ")}.`,
      nextAction: "ask-one-question",
      availableSkillCount: availableSkills.length,
      planning: planningEvidence(taskClassId, 1, resolvedRequest.intent.deliverables.length || 1, false, recipe.id)
    };
  }

  const selectedOptionalSteps = new Set(request.includeOptionalSteps ?? []);
  const knownOptionalSteps = new Set(recipe.steps.filter((step) => step.optional).map((step) => step.id));
  for (const stepId of selectedOptionalSteps) {
    if (!knownOptionalSteps.has(stepId)) throw new RouterPlanError(`Unknown optional recipe step: ${stepId}.`);
  }
  if (task) {
    for (const step of recipe.steps) {
      if (step.optional && step.preferredSkillIds?.includes(task.preferredSkillId)) selectedOptionalSteps.add(step.id);
    }
  }
  for (const step of recipe.steps) {
    if (step.optional && step.kind === "research" && separateResearch) {
      selectedOptionalSteps.add(step.id);
    }
    if (step.optional && step.includeWhenInputMissing && !availableInputRoles.has(step.includeWhenInputMissing)) {
      selectedOptionalSteps.add(step.id);
    }
  }
  if (selectedOptionalSteps.size < (recipe.minimumOptionalSteps ?? 0)) {
    throw new RouterPlanError(
      `Recipe ${recipe.id} requires at least ${recipe.minimumOptionalSteps} selected optional output steps; received ${selectedOptionalSteps.size}.`
    );
  }
  const includedSteps = recipe.steps.filter((step) => !step.optional || selectedOptionalSteps.has(step.id));
  if (!separateResearch && includedSteps.some((step) => step.kind === "research")) {
    throw new RouterPlanError(`Research steps require currentFactResearch separate-step: ${recipe.id}.`);
  }
  const includedStepIds = new Set(includedSteps.map((step) => step.id));
  let steps = includedSteps
    .map((step): RouterPlanSeedStep => {
      const candidateSkillIds = unique(step.preferredSkillIds ?? []).filter((id) => registry.has(id)).slice(0, 4);
      return {
        id: step.id,
        kind: step.kind,
        objective: step.objective,
        dependsOn: step.dependsOn.filter((dependency) => includedStepIds.has(dependency)),
        inputs: materializeStepInputs(step, includedStepIds, availableInputRoles),
        output: step.output,
        candidateSkillIds,
        ...(step.optional ? { optional: true } : {}),
        ...(step.condition ? { condition: step.condition } : {}),
        ...(step.repeatFor ? { repeatFor: step.repeatFor } : {}),
        ...(step.parallelGroup ? { parallelGroup: step.parallelGroup } : {}),
        ...(step.kind === "skill" && candidateSkillIds.length === 0 ? { runtimeDiscoveryRequired: true } : {})
      };
    });
  if (separateResearch && !steps.some((step) => step.kind === "research")) {
    steps = prependResearchEvidenceStep(steps, resolvedRequest.intent.outcome);
  }
  const candidateSkillIds = unique(steps.flatMap((step) => step.candidateSkillIds));
  const runtimeFallback = steps.some((step) => step.runtimeDiscoveryRequired);
  const operationCount = steps.filter((step) => step.kind !== "research" || separateResearch).length;
  const hasArtifactDependency = steps.some((step) => step.dependsOn.length > 0);

  return {
    schemaVersion: "1.0.0",
    taskClassId,
    ...(task ? { taskId: task.id } : {}),
    signature,
    activeLayers: activeLayers(routingMap, resolvedRequest, "orchestrate"),
    ...(resolvedRequest.professionalPackId ? { professionalPackId: resolvedRequest.professionalPackId } : {}),
    mode: "orchestrate",
    selectionSource: runtimeFallback ? "runtime-fallback" : "indexed",
    recipeId: recipe.id,
    candidateRecipeIds: [recipe.id],
    candidateSkillIds,
    requiredInputs,
    missingInputs: [],
    assumptions,
    steps,
    executionWaves: buildExecutionWaves(steps),
    finalAcceptance: finalAcceptance(resolvedRequest.intent, recipe.finalAcceptance),
    nextAction: "expand-with-orchestrator",
    availableSkillCount: availableSkills.length,
    planning: planningEvidence(
      taskClassId,
      Math.max(2, operationCount, resolvedRequest.routeShape?.operationCount ?? 0),
      Math.max(1, resolvedRequest.routeShape?.independentDeliverableCount ?? resolvedRequest.intent.deliverables.length),
      hasArtifactDependency || (resolvedRequest.routeShape?.hasArtifactDependency ?? false),
      recipe.id
    )
  };
}

/**
 * Converts a populated Router recipe seed into the existing orchestration
 * validator contract without reclassifying the request or rebuilding its DAG.
 */
export function materializeOrchestrationProposal(
  seed: RouterPlanSeed,
  originalIntent: RouterIntent,
  selections: RouterStepSelection[]
): OrchestrationProposal {
  if (seed.schemaVersion !== "1.0.0") throw new RouterPlanError(`Unsupported Router plan seed version: ${seed.schemaVersion}.`);
  if (seed.mode !== "orchestrate" || seed.nextAction !== "expand-with-orchestrator" || !seed.recipeId || seed.steps.length < 2) {
    throw new RouterPlanError("Only a populated expand-with-orchestrator seed can be materialized.");
  }
  if (seed.planning.taskClassId !== seed.taskClassId || seed.planning.recipeId !== seed.recipeId || !seed.candidateRecipeIds.includes(seed.recipeId)) {
    throw new RouterPlanError("The populated Router seed has inconsistent task-class or recipe planning metadata.");
  }
  const actualHasDependency = seed.steps.some((step) => step.dependsOn.length > 0);
  if (actualHasDependency && !seed.planning.hasArtifactDependency) {
    throw new RouterPlanError("The Router seed planning evidence omits an artifact dependency present in its DAG.");
  }
  if (seed.planning.operationCount < seed.steps.length) {
    throw new RouterPlanError("The Router seed planning evidence undercounts its materialized operations.");
  }
  const expectsResearchStep = seed.signature.currentFactResearch === "separate-step";
  if (seed.steps.some((step) => step.kind === "research") !== expectsResearchStep) {
    throw new RouterPlanError("The Router seed research nodes do not match currentFactResearch.");
  }
  validateOriginalIntentMatchesSeed(originalIntent, seed.signature);
  const skillSteps = seed.steps.filter((step) => step.kind === "skill");
  const selectionByStep = new Map<string, RouterStepSelection>();
  for (const selection of selections) {
    if (selectionByStep.has(selection.stepId)) throw new RouterPlanError(`Duplicate Skill selection for step ${selection.stepId}.`);
    if (!skillSteps.some((step) => step.id === selection.stepId)) throw new RouterPlanError(`Selection references a non-Skill or missing step: ${selection.stepId}.`);
    selectionByStep.set(selection.stepId, selection);
  }
  if (selectionByStep.size !== skillSteps.length) {
    const missing = skillSteps.filter((step) => !selectionByStep.has(step.id)).map((step) => step.id);
    throw new RouterPlanError(`Missing Skill selection for step${missing.length === 1 ? "" : "s"}: ${missing.join(", ")}.`);
  }

  const steps = seed.steps.map((step) => {
    const selection = selectionByStep.get(step.id);
    if (step.kind === "skill") {
      if (!selection) throw new RouterPlanError(`Missing Skill selection for step ${step.id}.`);
      if (!step.candidateSkillIds.includes(selection.selectedSkillId) && !selection.usedRuntimeFallback) {
        throw new RouterPlanError(`Step ${step.id} selected ${selection.selectedSkillId} outside its indexed candidates without runtime fallback evidence.`);
      }
      const scoredIds = new Set(selection.candidates.map((candidate) => candidate.skillId));
      if (!selection.usedRuntimeFallback) {
        const omittedIndexedCandidates = step.candidateSkillIds.filter((candidateId) => !scoredIds.has(candidateId));
        if (omittedIndexedCandidates.length) {
          throw new RouterPlanError(`Step ${step.id} omitted indexed candidate${omittedIndexedCandidates.length === 1 ? "" : "s"} from semantic scoring: ${omittedIndexedCandidates.join(", ")}.`);
        }
        const unindexedCandidates = selection.candidates
          .map((candidate) => candidate.skillId)
          .filter((candidateId) => !step.candidateSkillIds.includes(candidateId));
        if (unindexedCandidates.length) {
          throw new RouterPlanError(`Step ${step.id} scored candidate${unindexedCandidates.length === 1 ? "" : "s"} outside its indexed shortlist without runtime fallback evidence: ${unique(unindexedCandidates).join(", ")}.`);
        }
      }
      return {
        id: step.id,
        kind: step.kind,
        skillId: selection.selectedSkillId,
        objective: step.objective,
        dependsOn: [...step.dependsOn],
        inputs: { ...step.inputs },
        output: step.output,
        selectionReason: selection.selectionReason,
        candidates: selection.candidates,
        ...(step.optional ? { optional: true } : {}),
        ...(step.condition ? { condition: step.condition } : {}),
        ...(step.repeatFor ? { repeatFor: step.repeatFor } : {}),
        ...(step.parallelGroup ? { parallelGroup: step.parallelGroup } : {})
      };
    }
    return {
      id: step.id,
      kind: step.kind,
      objective: step.objective,
      dependsOn: [...step.dependsOn],
      inputs: { ...step.inputs },
      output: step.output,
      selectionReason: step.kind === "research"
        ? "The Router seed requires an independent evidence artifact for downstream use."
        : "The Router recipe declares a deterministic artifact transformation.",
      ...(step.optional ? { optional: true } : {}),
      ...(step.condition ? { condition: step.condition } : {}),
      ...(step.repeatFor ? { repeatFor: step.repeatFor } : {}),
      ...(step.parallelGroup ? { parallelGroup: step.parallelGroup } : {})
    };
  });

  return {
    intent: {
      raw: originalIntent.raw,
      outcome: seed.signature.outcome,
      assets: [...seed.signature.inputRoles],
      constraints: [...seed.signature.preservation],
      deliverables: [...seed.signature.deliverables],
      requiresResearch: seed.signature.currentFactResearch === "separate-step",
      confidence: seed.signature.confidence,
      ambiguities: [...seed.signature.ambiguities]
    },
    planning: {
      reason: seed.signature.currentFactResearch === "separate-step"
        ? "research"
        : seed.planning.hasArtifactDependency
          ? "dependency_chain"
          : "multi_deliverable",
      clarificationRequired: false
    },
    steps,
    finalAcceptance: [...seed.finalAcceptance],
    decision: "execute"
  };
}

/** Materialize and validate one Router seed in a single host call. */
export function compileRouterOrchestrationPlan(
  seed: RouterPlanSeed,
  originalIntent: RouterIntent,
  selections: RouterStepSelection[],
  availableSkills: RuntimeSkill[]
): OrchestrationPlan {
  const plan = validateOrchestrationPlan(
    materializeOrchestrationProposal(seed, originalIntent, selections),
    availableSkills
  );
  if (JSON.stringify(plan.executionWaves) !== JSON.stringify(seed.executionWaves)) {
    throw new RouterPlanError("The Router seed execution waves do not match its dependency graph.");
  }
  return plan;
}

function materializeStepInputs(
  step: RouterRecipeStepDefinition,
  includedStepIds: Set<string>,
  availableInputRoles: Set<string>
) {
  const inputs = { ...step.inputs };
  for (const [role, binding] of Object.entries(step.optionalInputs ?? {})) {
    if (binding.startsWith("user.")) {
      if (availableInputRoles.has(binding.slice("user.".length))) inputs[role] = binding;
      continue;
    }
    const sourceId = binding.endsWith(".output") ? binding.slice(0, -".output".length) : "";
    if (sourceId && includedStepIds.has(sourceId)) inputs[role] = binding;
  }
  return inputs;
}

function prependResearchEvidenceStep(steps: RouterPlanSeedStep[], outcome: string): RouterPlanSeedStep[] {
  let researchId = "route-research-evidence";
  let suffix = 2;
  while (steps.some((step) => step.id === researchId)) researchId = `route-research-evidence-${suffix++}`;
  const researchStep: RouterPlanSeedStep = {
    id: researchId,
    kind: "research",
    objective: `Produce a current, independently reusable evidence record for: ${outcome}`,
    dependsOn: [],
    inputs: { outcome: "user.outcome" },
    output: "verified research evidence",
    candidateSkillIds: []
  };
  return [
    researchStep,
    ...steps.map((step) => step.dependsOn.length ? step : {
      ...step,
      dependsOn: [researchId],
      inputs: { ...step.inputs, "research-evidence": `${researchId}.output` }
    })
  ];
}

function buildRecipeSelectionSeed(args: {
  request: ResolvedRouterPlanRequest;
  signature: RouterTaskSignature;
  assumptions: string[];
  blockingAmbiguities: string[];
  availableSkills: RuntimeSkill[];
  taskClass?: RouterTaskClassDefinition;
  task?: RouterTaskRouteDefinition;
  routingMap: RouterRoutingMap;
  candidateSkillIds: string[];
}): RouterPlanSeed {
  const { request, signature, assumptions, blockingAmbiguities, availableSkills, taskClass, task, routingMap, candidateSkillIds } = args;
  const candidateRecipeIds = request.useRuntimeWorkflowFallback
    ? []
    : unique(task ? (task.recipeId ? [task.recipeId] : []) : (taskClass?.recipeIds ?? []))
      .filter((recipeId) => {
        const recipe = routingMap.recipes.find((candidate) => candidate.id === recipeId);
        const requiresResearch = recipe?.steps.some((step) => step.kind === "research" && !step.optional) ?? false;
        return !requiresResearch || signature.currentFactResearch === "separate-step";
      });
  const routeShape = request.routeShape;
  if (blockingAmbiguities.length) {
    return {
      schemaVersion: "1.0.0",
      taskClassId: request.taskClassId,
      ...(task ? { taskId: task.id } : {}),
      signature,
      activeLayers: activeLayers(routingMap, request, "clarify"),
      ...(request.professionalPackId ? { professionalPackId: request.professionalPackId } : {}),
      mode: "clarify",
      selectionSource: candidateRecipeIds.length ? "indexed" : "runtime-fallback",
      candidateSkillIds,
      candidateRecipeIds,
      requiredInputs: [],
      missingInputs: [],
      assumptions,
      steps: [],
      executionWaves: [],
      finalAcceptance: finalAcceptance(request.intent),
      question: blockingAmbiguities[0],
      nextAction: "ask-one-question",
      availableSkillCount: availableSkills.length,
      planning: planningEvidence(
        request.taskClassId,
        Math.max(2, routeShape?.operationCount ?? 2),
        Math.max(1, routeShape?.independentDeliverableCount ?? request.intent.deliverables.length),
        routeShape?.hasArtifactDependency ?? false
      )
    };
  }
  return {
    schemaVersion: "1.0.0",
    taskClassId: request.taskClassId,
    ...(task ? { taskId: task.id } : {}),
    signature,
    activeLayers: activeLayers(routingMap, request, "orchestrate"),
    ...(request.professionalPackId ? { professionalPackId: request.professionalPackId } : {}),
    mode: "orchestrate",
    selectionSource: candidateRecipeIds.length ? "indexed" : "runtime-fallback",
    candidateSkillIds,
    candidateRecipeIds,
    requiredInputs: [],
    missingInputs: [],
    assumptions,
    steps: [],
    executionWaves: [],
    finalAcceptance: finalAcceptance(request.intent),
    nextAction: candidateRecipeIds.length ? "select-workflow-recipe" : "expand-with-orchestrator",
    availableSkillCount: availableSkills.length,
    planning: planningEvidence(
      request.taskClassId,
      Math.max(2, routeShape?.operationCount ?? 2),
      Math.max(1, routeShape?.independentDeliverableCount ?? request.intent.deliverables.length),
      routeShape?.hasArtifactDependency ?? false
    )
  };
}

function buildDirectSeed(args: {
  request: ResolvedRouterPlanRequest;
  signature: RouterTaskSignature;
  assumptions: string[];
  blockingAmbiguities: string[];
  availableSkills: RuntimeSkill[];
  registry: Set<string>;
  taskClass?: RouterTaskClassDefinition;
  task?: RouterTaskRouteDefinition;
  routingMap: RouterRoutingMap;
  candidateSkillIds: string[];
}): RouterPlanSeed {
  const { request, signature, assumptions, blockingAmbiguities, availableSkills, registry, taskClass, task, routingMap } = args;
  let candidateSkillIds = args.candidateSkillIds;
  const hasIndexedShortlist = Boolean(task && candidateSkillIds.length);
  const availableInputRoles = new Set(inputRolesFor(request));
  const requiredInputs = unique(task?.requiredInputRoles ?? []);
  const missingInputs = requiredInputs.filter((role) => !availableInputRoles.has(role));
  if (blockingAmbiguities.length || missingInputs.length) {
    return {
      schemaVersion: "1.0.0",
      taskClassId: request.taskClassId,
      ...(task ? { taskId: task.id } : {}),
      signature,
      activeLayers: activeLayers(routingMap, request, "clarify"),
      ...(request.professionalPackId ? { professionalPackId: request.professionalPackId } : {}),
      mode: "clarify",
      selectionSource: task || (!request.taskId && taskClass) ? "indexed" : "runtime-fallback",
      candidateSkillIds,
      candidateRecipeIds: [],
      requiredInputs,
      missingInputs,
      assumptions,
      steps: [],
      executionWaves: [],
      finalAcceptance: finalAcceptance(request.intent),
      question: blockingAmbiguities[0] ?? `Please provide the required input${missingInputs.length === 1 ? "" : "s"}: ${missingInputs.join(", ")}.`,
      nextAction: "ask-one-question",
      availableSkillCount: availableSkills.length,
      planning: planningEvidence(request.taskClassId, 1, 1, false)
    };
  }

  let selectedSkillId: string | undefined;
  if (request.directDecision) {
    const scoredIds = new Set(request.directDecision.candidates.map((candidate) => candidate.skillId));
    if (task && !request.directDecision.usedRuntimeFallback) {
      const omittedIndexedCandidates = candidateSkillIds.filter((candidateId) => !scoredIds.has(candidateId));
      const unindexedCandidates = request.directDecision.candidates
        .map((candidate) => candidate.skillId)
        .filter((candidateId) => !candidateSkillIds.includes(candidateId));
      if (omittedIndexedCandidates.length || unindexedCandidates.length) {
        throw new RouterPlanError("An indexed direct decision must score exactly the seed shortlist unless it declares runtime fallback.");
      }
    }
    validateRouterDecision({
      intent: request.intent,
      decision: request.directDecision,
      planning: planningEvidence(request.taskClassId, 1, 1, false)
    }, availableSkills);
    selectedSkillId = request.directDecision.selectedSkillId;
    candidateSkillIds = request.directDecision.candidates.map((candidate) => candidate.skillId);
  }
  const usedRuntimeFallback = request.directDecision?.usedRuntimeFallback === true;
  const selectionSource = !usedRuntimeFallback && hasIndexedShortlist ? "indexed" : "runtime-fallback";
  const recommendedSkillId = !usedRuntimeFallback && task && registry.has(task.preferredSkillId) ? task.preferredSkillId : undefined;
  const step: RouterPlanSeedStep = {
    id: "deliverable",
    kind: "skill",
    objective: request.intent.outcome,
    dependsOn: [],
    inputs: Object.fromEntries(inputRolesFor(request).map((role) => [role, `user.${role}`])),
    output: request.intent.deliverables.join(", ") || request.intent.outcome,
    candidateSkillIds,
    ...(selectedSkillId ? { selectedSkillId } : {}),
    ...(!candidateSkillIds.length ? { runtimeDiscoveryRequired: true } : {})
  };

  for (const candidate of candidateSkillIds) {
    if (!registry.has(candidate)) throw new RouterPlanError(`Direct plan references an unavailable Skill: ${candidate}.`);
  }
  return {
    schemaVersion: "1.0.0",
    taskClassId: request.taskClassId,
    ...(task ? { taskId: task.id } : {}),
    signature,
    activeLayers: activeLayers(routingMap, request, "direct"),
    ...(request.professionalPackId ? { professionalPackId: request.professionalPackId } : {}),
    mode: "direct",
    selectionSource,
    ...(recommendedSkillId ? { recommendedSkillId } : {}),
    ...(selectedSkillId ? { selectedSkillId } : {}),
    candidateSkillIds,
    candidateRecipeIds: [],
    requiredInputs,
    missingInputs: [],
    assumptions,
    steps: [step],
    executionWaves: [[step.id]],
    finalAcceptance: finalAcceptance(request.intent),
    nextAction: selectedSkillId ? "invoke-selected-atom" : "score-direct-candidates",
    availableSkillCount: availableSkills.length,
    planning: planningEvidence(request.taskClassId, 1, 1, false)
  };
}

function resolveRecipe(
  request: ResolvedRouterPlanRequest,
  taskClass: RouterTaskClassDefinition | undefined,
  task: RouterTaskRouteDefinition | undefined,
  routingMap: RouterRoutingMap
) {
  const requestedId = request.recipeId;
  if (!requestedId) return undefined;
  const recipe = routingMap.recipes.find((candidate) => candidate.id === requestedId);
  if (!recipe) throw new RouterPlanError(`Unknown workflow recipe: ${requestedId}.`);
  if (!recipe.taskClassIds.includes("*") && !recipe.taskClassIds.includes(request.taskClassId)) {
    throw new RouterPlanError(`Recipe ${recipe.id} does not belong to task class ${request.taskClassId}.`);
  }
  if (task && !recipe.steps.some((step) => step.preferredSkillIds?.includes(task.preferredSkillId))) {
    throw new RouterPlanError(`Recipe ${recipe.id} drops the indexed outcome owner ${task.preferredSkillId} for task ${task.id}.`);
  }
  return recipe;
}

function buildSignature(request: ResolvedRouterPlanRequest, separateResearch: boolean): RouterTaskSignature {
  const research = request.intent.researchMode
    ?? (separateResearch ? "separate-step" : request.intent.requiresResearch ? "atom-owned" : "none");
  return {
    outcome: request.intent.outcome,
    action: request.signature.action,
    media: unique(request.signature.media),
    domain: request.signature.domain,
    scale: request.signature.scale,
    inputRoles: inputRolesFor(request),
    preservation: unique(request.intent.constraints),
    deliverables: unique(request.intent.deliverables),
    currentFactResearch: research,
    confidence: request.intent.confidence,
    ambiguities: unique(request.intent.ambiguities),
    priority: request.signature.priority
  };
}

function validateRequest(request: ResolvedRouterPlanRequest) {
  if (!request.intent.outcome.trim()) throw new RouterPlanError("A plan request needs a concrete outcome.");
  if (!Number.isFinite(request.intent.confidence) || request.intent.confidence < 0 || request.intent.confidence > 1) {
    throw new RouterPlanError("Intent confidence must be between 0 and 1.");
  }
  if (!isOpenId(request.taskClassId)) throw new RouterPlanError("A plan request task class ID must use lowercase kebab-case.");
  for (const role of inputRolesFor(request)) {
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(role)) {
      throw new RouterPlanError(`Input role must contain only letters, numbers, hyphens, or underscores: ${role}.`);
    }
  }
  for (const [name, value] of Object.entries({
    action: request.signature.action,
    domain: request.signature.domain,
    scale: request.signature.scale,
    priority: request.signature.priority
  })) {
    if (!value.trim()) throw new RouterPlanError(`Task signature ${name} must be non-empty.`);
  }
  if (!request.signature.media.length || request.signature.media.some((value) => !value.trim())) {
    throw new RouterPlanError("Task signature media needs at least one non-empty value.");
  }
  if (request.routeShape) {
    if (!Number.isInteger(request.routeShape.operationCount) || request.routeShape.operationCount < 1) {
      throw new RouterPlanError("routeShape.operationCount must be a positive integer.");
    }
    if (!Number.isInteger(request.routeShape.independentDeliverableCount) || request.routeShape.independentDeliverableCount < 1) {
      throw new RouterPlanError("routeShape.independentDeliverableCount must be a positive integer.");
    }
    if (typeof request.routeShape.hasArtifactDependency !== "boolean") {
      throw new RouterPlanError("routeShape.hasArtifactDependency must be a boolean.");
    }
  }
  if (request.professionalPackId) {
    if (!isOpenId(request.professionalPackId)) throw new RouterPlanError("professionalPackId must use lowercase kebab-case.");
    if (!(request.availableProfessionalPackIds ?? []).includes(request.professionalPackId)) {
      throw new RouterPlanError(`Professional pack is not available at runtime: ${request.professionalPackId}.`);
    }
    if (["prompt-planning-diagnostics", "meta-system"].includes(request.taskClassId)) {
      throw new RouterPlanError(`Professional creative packs cannot overlay task class ${request.taskClassId}.`);
    }
  }
  for (const packId of request.availableProfessionalPackIds ?? []) {
    if (!isOpenId(packId)) throw new RouterPlanError(`Available professional pack ID must use lowercase kebab-case: ${packId}.`);
  }
  if (request.recipeId && request.useRuntimeWorkflowFallback) {
    throw new RouterPlanError("Choose either an indexed recipe or runtime workflow fallback, not both.");
  }
  if (request.directDecision && request.useRuntimeWorkflowFallback) {
    throw new RouterPlanError("A direct Atom decision cannot also request runtime workflow fallback.");
  }
  for (const blocker of unique(request.blockingAmbiguities ?? [])) {
    if (!request.intent.ambiguities.includes(blocker)) {
      throw new RouterPlanError(`Blocking ambiguity must also appear in intent.ambiguities: ${blocker}.`);
    }
  }
}

function requiresWorkflow(routeShape: RouterRouteShape | undefined) {
  return Boolean(routeShape && (
    routeShape.operationCount > 1
    || routeShape.independentDeliverableCount > 1
    || routeShape.hasArtifactDependency
  ));
}

function activeLayers(
  routingMap: RouterRoutingMap,
  request: ResolvedRouterPlanRequest,
  phase: "clarify" | "direct" | "orchestrate"
) {
  const wanted = new Set(["host-contract", "router-decision", "execution-base"]);
  if (request.memoryAvailable) wanted.add("memory-context");
  if (request.professionalPackId) wanted.add("professional-pack");
  if (request.taskClassId === "prompt-planning-diagnostics") {
    wanted.add("prompt-specialist");
  } else if (request.taskClassId === "meta-system") {
    wanted.add("meta-system");
  } else if (phase !== "clarify") {
    wanted.add("creative-atom");
    if (phase === "orchestrate") wanted.add("orchestration");
  }
  return routingMap.layers.map((layer) => layer.id).filter((id) => wanted.has(id));
}

function finalAcceptance(intent: RouterIntent, recipeAcceptance: string[] = []) {
  const acceptance = unique([
    ...recipeAcceptance,
    ...(intent.deliverables.length ? [`All requested deliverables are present: ${intent.deliverables.join(", ")}.`] : []),
    ...(intent.constraints.length ? [`Declared constraints are preserved: ${intent.constraints.join(", ")}.`] : [])
  ]);
  return acceptance.length ? acceptance : [`The requested outcome is delivered: ${intent.outcome}.`];
}

function planningEvidence(
  taskClassId: string,
  operationCount: number,
  independentDeliverableCount: number,
  hasArtifactDependency: boolean,
  recipeId?: string
): RouterPlanningEvidence {
  return {
    taskClassId,
    operationCount,
    independentDeliverableCount,
    hasArtifactDependency,
    ...(recipeId ? { recipeId } : {})
  };
}

function unique(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function inputRolesFor(request: Pick<RouterPlanRequest, "availableInputRoles" | "intent">) {
  return unique(request.availableInputRoles ?? request.intent.assets);
}

function validateOriginalIntentMatchesSeed(originalIntent: RouterIntent, signature: RouterTaskSignature) {
  const originalResearchMode = originalIntent.researchMode
    ?? (originalIntent.requiresResearch ? "separate-step" : "none");
  const mismatches = [
    originalIntent.outcome.trim() === signature.outcome.trim() ? undefined : "outcome",
    sameStringSet(originalIntent.constraints, signature.preservation) ? undefined : "constraints",
    sameStringSet(originalIntent.deliverables, signature.deliverables) ? undefined : "deliverables",
    originalResearchMode === signature.currentFactResearch ? undefined : "research mode",
    originalIntent.confidence === signature.confidence ? undefined : "confidence",
    sameStringSet(originalIntent.ambiguities, signature.ambiguities) ? undefined : "ambiguities"
  ].filter((value): value is string => Boolean(value));
  if (mismatches.length) {
    throw new RouterPlanError(`The original intent no longer matches the Router plan seed: ${mismatches.join(", ")}. Recompile the seed.`);
  }
}

function sameStringSet(left: string[], right: string[]) {
  const normalizedLeft = [...unique(left)].sort();
  const normalizedRight = [...unique(right)].sort();
  return JSON.stringify(normalizedLeft) === JSON.stringify(normalizedRight);
}

function isOpenId(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}
