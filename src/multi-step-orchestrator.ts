export interface RuntimeSkill {
  id: string;
  description: string;
}

export interface OrchestrationIntent {
  raw: string;
  outcome: string;
  assets: string[];
  constraints: string[];
  deliverables: string[];
  requiresResearch: boolean;
  confidence: number;
  ambiguities: string[];
}

export interface OrchestrationStep {
  id: string;
  kind: "skill" | "research" | "deterministic";
  skillId?: string;
  objective: string;
  dependsOn: string[];
  inputs: Record<string, string>;
  output: string;
  selectionReason: string;
  candidates?: SkillIntentMatch[];
  optional?: boolean;
  condition?: string;
  repeatFor?: string;
  parallelGroup?: string;
}

export interface SkillIntentMatch {
  skillId: string;
  intentMatchScore: number;
  reason: string;
}

export interface OrchestrationDecision {
  reason: "dependency_chain" | "multi_deliverable" | "ambiguity" | "research" | "risk";
  clarificationRequired: boolean;
}

export interface OrchestrationProposal {
  intent: OrchestrationIntent;
  planning: OrchestrationDecision;
  steps: OrchestrationStep[];
  finalAcceptance: string[];
  decision: "execute" | "clarify";
  clarification?: string;
}

export interface OrchestrationPlan extends OrchestrationProposal {
  availableSkillCount: number;
  executionWaves: string[][];
}

export class OrchestrationPlanError extends Error {}

/**
 * Validates a multi-step plan proposed by the orchestration Skill against the
 * Skills visible at runtime. Skill selection remains model-driven; this function intentionally
 * contains no operation enum, keyword classifier, or fixed Skill registry.
 */
export function validateOrchestrationPlan(
  proposal: OrchestrationProposal,
  availableSkills: RuntimeSkill[]
): OrchestrationPlan {
  const registry = new Map(availableSkills.map((skill) => [skill.id, skill]));
  const ids = new Set<string>();

  if (!proposal.intent.outcome.trim()) throw new OrchestrationPlanError("The plan needs a concrete final outcome.");
  if (!Number.isFinite(proposal.intent.confidence) || proposal.intent.confidence < 0 || proposal.intent.confidence > 1) {
    throw new OrchestrationPlanError("Intent confidence must be between 0 and 1.");
  }
  validateOrchestrationDecision(proposal);
  if (proposal.decision === "clarify" && !proposal.clarification?.trim()) throw new OrchestrationPlanError("A clarification decision requires one material question.");
  if (proposal.decision === "execute" && proposal.steps.length === 0) throw new OrchestrationPlanError("An executable plan needs at least one step.");
  if (proposal.decision === "execute" && (!proposal.finalAcceptance.length || proposal.finalAcceptance.some((item) => !item.trim()))) {
    throw new OrchestrationPlanError("An executable plan needs a non-empty final acceptance contract.");
  }

  for (const step of proposal.steps) {
    if (!step.id.trim() || ids.has(step.id)) throw new OrchestrationPlanError(`Plan step IDs must be unique and non-empty: ${step.id}.`);
    ids.add(step.id);
    if (!step.objective.trim() || !step.output.trim() || !step.selectionReason.trim()) {
      throw new OrchestrationPlanError(`Plan step ${step.id} needs an objective, output, and selection reason.`);
    }
    if (step.condition !== undefined && !step.condition.trim()) throw new OrchestrationPlanError(`Plan step ${step.id} has an empty condition.`);
    if (step.repeatFor !== undefined && !step.repeatFor.trim()) throw new OrchestrationPlanError(`Plan step ${step.id} has an empty repeatFor instruction.`);
    if (step.parallelGroup !== undefined && !step.parallelGroup.trim()) throw new OrchestrationPlanError(`Plan step ${step.id} has an empty parallelGroup.`);
    if (step.kind === "skill") {
      if (!step.skillId || !registry.has(step.skillId)) throw new OrchestrationPlanError(`Plan step ${step.id} selected unavailable Skill: ${step.skillId ?? "<missing>"}.`);
      validateHighestIntentMatch(step, registry);
    } else if (step.skillId) {
      throw new OrchestrationPlanError(`Only Skill steps may declare skillId: ${step.id}.`);
    } else if (step.candidates?.length) {
      throw new OrchestrationPlanError(`Only Skill steps may declare candidates: ${step.id}.`);
    }
  }

  for (const step of proposal.steps) {
    for (const dependency of step.dependsOn) {
      if (!ids.has(dependency)) throw new OrchestrationPlanError(`Plan step ${step.id} depends on missing step ${dependency}.`);
      if (dependency === step.id) throw new OrchestrationPlanError(`Plan step ${step.id} cannot depend on itself.`);
    }
    validateInputBindings(step, ids);
  }
  const executionWaves = buildExecutionWaves(proposal.steps);

  if (proposal.intent.requiresResearch && proposal.decision === "execute" && !proposal.steps.some((step) => step.kind === "research")) {
    throw new OrchestrationPlanError("This intent requires research, but the proposed plan has no research step.");
  }

  return { ...proposal, availableSkillCount: availableSkills.length, executionWaves };
}

function validateOrchestrationDecision(proposal: OrchestrationProposal) {
  const { planning } = proposal;
  if (planning.clarificationRequired !== (proposal.decision === "clarify")) {
    throw new OrchestrationPlanError("Planning clarificationRequired must agree with the plan decision.");
  }
  if (planning.clarificationRequired) {
    if (planning.reason !== "ambiguity") throw new OrchestrationPlanError("A clarification-required plan must record ambiguity as its planning reason.");
    if (proposal.steps.length) throw new OrchestrationPlanError("A clarification-required plan must not pre-commit execution steps.");
    return;
  }
  if (proposal.decision === "execute" && proposal.steps.length < 2) throw new OrchestrationPlanError("A multi-step plan must execute at least two steps.");
  if (planning.reason === "dependency_chain" && proposal.decision === "execute" && !proposal.steps.some((step) => step.dependsOn.length)) {
    throw new OrchestrationPlanError("A dependency-chain plan needs at least one dependent step.");
  }
  if (planning.reason === "multi_deliverable" && proposal.decision === "execute") {
    if (proposal.steps.length < 2) throw new OrchestrationPlanError("A multi-deliverable plan needs at least two independently owned steps.");
    if (proposal.steps.some((step) => step.dependsOn.length)) {
      throw new OrchestrationPlanError("A multi-deliverable plan cannot contain artifact dependencies; use dependency_chain instead.");
    }
  }
  if (planning.reason === "research" && !proposal.intent.requiresResearch) {
    throw new OrchestrationPlanError("A research-driven plan must mark the intent as requiring research.");
  }
}

function validateHighestIntentMatch(step: OrchestrationStep, registry: Map<string, RuntimeSkill>) {
  if (!step.candidates?.length) throw new OrchestrationPlanError(`Plan step ${step.id} must score every plausible Skill candidate.`);
  const seen = new Set<string>();
  for (const candidate of step.candidates) {
    if (!registry.has(candidate.skillId)) throw new OrchestrationPlanError(`Plan step ${step.id} scored unavailable Skill: ${candidate.skillId}.`);
    if (seen.has(candidate.skillId)) throw new OrchestrationPlanError(`Plan step ${step.id} scored Skill more than once: ${candidate.skillId}.`);
    seen.add(candidate.skillId);
    if (candidate.intentMatchScore < 0 || candidate.intentMatchScore > 1 || !Number.isFinite(candidate.intentMatchScore)) {
      throw new OrchestrationPlanError(`Plan step ${step.id} has an invalid intent-match score for ${candidate.skillId}.`);
    }
    if (!candidate.reason.trim()) throw new OrchestrationPlanError(`Plan step ${step.id} needs a scoring reason for ${candidate.skillId}.`);
  }
  const selected = step.candidates.find((candidate) => candidate.skillId === step.skillId);
  if (!selected) throw new OrchestrationPlanError(`Plan step ${step.id} did not score its selected Skill: ${step.skillId}.`);
  const highest = Math.max(...step.candidates.map((candidate) => candidate.intentMatchScore));
  if (selected.intentMatchScore !== highest) {
    const winners = step.candidates.filter((candidate) => candidate.intentMatchScore === highest).map((candidate) => candidate.skillId).join(", ");
    throw new OrchestrationPlanError(`Plan step ${step.id} selected ${step.skillId} at ${selected.intentMatchScore}, below the highest intent match ${highest}: ${winners}.`);
  }
}

function validateInputBindings(step: OrchestrationStep, ids: Set<string>) {
  for (const [role, binding] of Object.entries(step.inputs)) {
    if (!role.trim() || !binding.trim()) throw new OrchestrationPlanError(`Plan step ${step.id} has an empty input role or binding.`);
    if (/^user\.[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+|\[[0-9]+\])*$/.test(binding)) continue;
    const match = /^([a-z0-9]+(?:-[a-z0-9]+)*)(?:\.[A-Za-z0-9_-]+|\[[0-9]+\])+$/.exec(binding);
    if (!match) {
      throw new OrchestrationPlanError(`Plan step ${step.id} input ${role} must bind as user.role or dependency.artifactPath.`);
    }
    const sourceId = match[1];
    if (!ids.has(sourceId)) throw new OrchestrationPlanError(`Plan step ${step.id} input ${role} has an unknown binding source: ${binding}.`);
    if (!step.dependsOn.includes(sourceId)) {
      throw new OrchestrationPlanError(`Plan step ${step.id} input ${role} references ${sourceId} without declaring it as a dependency.`);
    }
  }
}

/** Returns the dependency-safe parallel waves for a validated or proposed DAG. */
export function buildExecutionWaves(steps: Array<Pick<OrchestrationStep, "id" | "dependsOn">>): string[][] {
  const pending = new Map(steps.map((step) => [step.id, new Set(step.dependsOn)]));
  const completed = new Set<string>();
  const waves: string[][] = [];

  while (pending.size) {
    const wave = steps
      .map((step) => step.id)
      .filter((id) => pending.has(id) && [...(pending.get(id) ?? [])].every((dependency) => completed.has(dependency)));
    if (!wave.length) {
      const cycleAt = steps.find((step) => pending.has(step.id))?.id ?? "<unknown>";
      throw new OrchestrationPlanError(`Plan contains a dependency cycle at ${cycleAt}.`);
    }
    waves.push(wave);
    for (const id of wave) {
      pending.delete(id);
      completed.add(id);
    }
  }
  return waves;
}
