import { readFileSync } from "node:fs";
import type { RuntimeSkill, SkillIntentMatch } from "./multi-step-orchestrator.js";
import { requiresSeparateResearch, validateRouterDecision, type DirectAtomDecision, type RouterIntent } from "./router.js";

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

export interface RouterWorkflowDefinition {
  id: string;
  label: string;
  taskClassIds: string[];
  useWhen: string;
  directInsteadWhen: string;
  requiredInputRoles: string[];
  steps: Array<Record<string, unknown>>;
  finalAcceptance: string[];
}

export interface RouterRoutingMap {
  schemaVersion: string;
  taskClasses: RouterTaskClassDefinition[];
  tasks: RouterTaskRouteDefinition[];
  recipes: RouterWorkflowDefinition[];
}

export interface RouterPlanRequest {
  intent: RouterIntent;
  taskId?: string;
  taskClassId?: string;
  availableInputRoles?: string[];
  workflowId?: string;
  directDecision?: DirectAtomDecision;
  blockingAmbiguities?: string[];
}

export type RouterPlanNextAction =
  | "score-skill-candidates"
  | "invoke-selected-skill"
  | "select-workflow"
  | "invoke-selected-workflow"
  | "ask-one-question";

export interface RouterPlanSeed {
  schemaVersion: "2.0.0";
  kind: "direct" | "workflow" | "clarify";
  taskClassId: string;
  taskId?: string;
  selectionSource: "indexed" | "runtime-fallback";
  recommendedSkillId?: string;
  selectedSkillId?: string;
  candidateSkillIds: string[];
  workflowId?: string;
  candidateWorkflowIds: string[];
  requiredInputs: string[];
  missingInputs: string[];
  reason: string;
  question?: string;
  nextAction: RouterPlanNextAction;
  availableSkillCount: number;
}

export class RouterPlanError extends Error {}

let cachedRoutingMap: RouterRoutingMap | undefined;

export function loadRouterRoutingMap(): RouterRoutingMap {
  if (!cachedRoutingMap) {
    const path = new URL("../skills/weshop-router/references/routing-map.json", import.meta.url);
    cachedRoutingMap = JSON.parse(readFileSync(path, "utf8")) as RouterRoutingMap;
  }
  return cachedRoutingMap;
}

/** Resolve one request to a Skill, a maintained workflow, or one routing clarification. */
export function prepareRouterPlan(
  request: RouterPlanRequest,
  availableSkills: RuntimeSkill[],
  routingMap: RouterRoutingMap = loadRouterRoutingMap()
): RouterPlanSeed {
  validateRequest(request);
  const registry = new Set(availableSkills.map((skill) => skill.id));
  const task = request.taskId ? routingMap.tasks.find((candidate) => candidate.id === request.taskId) : undefined;
  if (request.taskId && !task) {
    throw new RouterPlanError(`Unknown indexed task ID: ${request.taskId}. Omit taskId for runtime semantic fallback.`);
  }
  if (task && request.taskClassId && request.taskClassId !== task.taskClassId) {
    throw new RouterPlanError(`Task ${task.id} belongs to ${task.taskClassId}, not ${request.taskClassId}.`);
  }

  const taskClassId = task?.taskClassId || request.taskClassId || "runtime-other";
  const taskClass = routingMap.taskClasses.find((candidate) => candidate.id === taskClassId);
  const candidateWorkflowIds = unique([
    ...(task?.recipeId ? [task.recipeId] : []),
    ...(taskClass?.recipeIds ?? []),
    ...(requiresSeparateResearch(request.intent) ? ["research-to-deliverable"] : [])
  ]).filter((id) => workflowAvailable(id, taskClassId, routingMap));
  const requiredInputs = request.workflowId
    ? workflowById(request.workflowId, routingMap).requiredInputRoles
    : task?.requiredInputRoles ?? [];
  const supplied = new Set(request.availableInputRoles ?? request.intent.assets);
  const missingInputs = requiredInputs.filter((role) => !supplied.has(role));
  const blockers = unique(request.blockingAmbiguities ?? []);

  if (missingInputs.length || blockers.length) {
    const blocker = missingInputs[0] || blockers[0];
    return {
      schemaVersion: "2.0.0",
      kind: "clarify",
      taskClassId,
      ...(task ? { taskId: task.id } : {}),
      selectionSource: task || taskClass ? "indexed" : "runtime-fallback",
      candidateSkillIds: [],
      candidateWorkflowIds,
      requiredInputs,
      missingInputs,
      reason: missingInputs.length ? `Routing needs the required input role ${blocker}.` : `Routing is blocked by: ${blocker}.`,
      question: missingInputs.length ? `Please provide or identify the ${blocker} input.` : blocker,
      nextAction: "ask-one-question",
      availableSkillCount: availableSkills.length
    };
  }

  if (request.workflowId) {
    const workflow = workflowById(request.workflowId, routingMap);
    if (!workflowSupportsClass(workflow, taskClassId)) {
      throw new RouterPlanError(`Workflow ${workflow.id} does not support task class ${taskClassId}.`);
    }
    if (task?.recipeId && task.recipeId !== workflow.id) {
      throw new RouterPlanError(`Task ${task.id} routes to workflow ${task.recipeId}, not ${workflow.id}.`);
    }
    return {
      schemaVersion: "2.0.0",
      kind: "workflow",
      taskClassId,
      ...(task ? { taskId: task.id } : {}),
      selectionSource: "indexed",
      candidateSkillIds: [],
      workflowId: workflow.id,
      candidateWorkflowIds,
      requiredInputs,
      missingInputs: [],
      reason: workflow.useWhen,
      nextAction: "invoke-selected-workflow",
      availableSkillCount: availableSkills.length
    };
  }

  if (requiresSeparateResearch(request.intent)) {
    return workflowChoices(taskClassId, task, candidateWorkflowIds, availableSkills.length,
      "A separate current-evidence artifact must be reused by the selected production workflow.");
  }
  if (!task && taskClass?.defaultMode === "orchestrate") {
    return workflowChoices(taskClassId, task, candidateWorkflowIds, availableSkills.length, taskClass.orchestrateWhen);
  }

  const indexedCandidates = task
    ? unique([task.preferredSkillId, ...task.neighborSkillIds]).filter((id) => registry.has(id)).slice(0, 4)
    : [];
  if (request.directDecision) {
    if (!request.directDecision.usedRuntimeFallback) {
      const actual = request.directDecision.candidates.map((candidate) => candidate.skillId).sort();
      if (JSON.stringify(actual) !== JSON.stringify([...indexedCandidates].sort())) {
        throw new RouterPlanError("An indexed direct decision must score exactly the returned Skill shortlist unless it declares runtime fallback.");
      }
    }
    validateRouterDecision({ intent: request.intent, decision: request.directDecision }, availableSkills);
    return {
      schemaVersion: "2.0.0",
      kind: "direct",
      taskClassId,
      ...(task ? { taskId: task.id } : {}),
      selectionSource: request.directDecision.usedRuntimeFallback ? "runtime-fallback" : "indexed",
      ...(!request.directDecision.usedRuntimeFallback && task ? { recommendedSkillId: task.preferredSkillId } : {}),
      selectedSkillId: request.directDecision.selectedSkillId,
      candidateSkillIds: request.directDecision.candidates.map((candidate) => candidate.skillId),
      candidateWorkflowIds,
      requiredInputs,
      missingInputs: [],
      reason: selectedReason(request.directDecision.candidates, request.directDecision.selectedSkillId),
      nextAction: "invoke-selected-skill",
      availableSkillCount: availableSkills.length
    };
  }
  if (task && indexedCandidates.length) {
    return {
      schemaVersion: "2.0.0",
      kind: "direct",
      taskClassId,
      taskId: task.id,
      selectionSource: "indexed",
      recommendedSkillId: registry.has(task.preferredSkillId) ? task.preferredSkillId : indexedCandidates[0],
      candidateSkillIds: indexedCandidates,
      candidateWorkflowIds,
      requiredInputs,
      missingInputs: [],
      reason: task.directWhen,
      nextAction: "score-skill-candidates",
      availableSkillCount: availableSkills.length
    };
  }
  if (candidateWorkflowIds.length && taskClass?.defaultMode === "orchestrate") {
    return workflowChoices(taskClassId, task, candidateWorkflowIds, availableSkills.length, taskClass.orchestrateWhen);
  }
  return {
    schemaVersion: "2.0.0",
    kind: "direct",
    taskClassId,
    selectionSource: "runtime-fallback",
    candidateSkillIds: [],
    candidateWorkflowIds,
    requiredInputs: [],
    missingInputs: [],
    reason: "No maintained common-task route matched; score runtime-visible Skills against the complete requested outcome.",
    nextAction: "score-skill-candidates",
    availableSkillCount: availableSkills.length
  };
}

function workflowChoices(taskClassId: string, task: RouterTaskRouteDefinition | undefined, candidateWorkflowIds: string[], availableSkillCount: number, reason: string): RouterPlanSeed {
  if (!candidateWorkflowIds.length) throw new RouterPlanError(`No maintained workflow supports task class ${taskClassId}; use runtime Skill discovery.`);
  return {
    schemaVersion: "2.0.0",
    kind: "workflow",
    taskClassId,
    ...(task ? { taskId: task.id } : {}),
    selectionSource: "indexed",
    candidateSkillIds: [],
    candidateWorkflowIds,
    requiredInputs: [],
    missingInputs: [],
    reason,
    nextAction: "select-workflow",
    availableSkillCount
  };
}

function workflowById(id: string, routingMap: RouterRoutingMap): RouterWorkflowDefinition {
  const workflow = routingMap.recipes.find((candidate) => candidate.id === id);
  if (!workflow) throw new RouterPlanError(`Unknown workflow ID: ${id}.`);
  return workflow;
}

function workflowAvailable(id: string, taskClassId: string, routingMap: RouterRoutingMap): boolean {
  const workflow = routingMap.recipes.find((candidate) => candidate.id === id);
  return Boolean(workflow && workflowSupportsClass(workflow, taskClassId));
}

function workflowSupportsClass(workflow: RouterWorkflowDefinition, taskClassId: string): boolean {
  return workflow.taskClassIds.includes("*") || workflow.taskClassIds.includes(taskClassId);
}

function selectedReason(candidates: SkillIntentMatch[], selectedSkillId: string): string {
  return candidates.find((candidate) => candidate.skillId === selectedSkillId)?.reason
    || `Selected ${selectedSkillId} as the strongest complete outcome match.`;
}

function validateRequest(request: RouterPlanRequest) {
  if (!request.intent.outcome.trim()) throw new RouterPlanError("Router intent needs a concrete outcome.");
  if (!Number.isFinite(request.intent.confidence) || request.intent.confidence < 0 || request.intent.confidence > 1) {
    throw new RouterPlanError("Intent confidence must be between 0 and 1.");
  }
  for (const [name, value] of [["taskId", request.taskId], ["taskClassId", request.taskClassId], ["workflowId", request.workflowId]] as const) {
    if (value !== undefined && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
      throw new RouterPlanError(`${name} must use lowercase kebab-case.`);
    }
  }
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}
