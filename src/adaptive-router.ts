export interface RuntimeSkill {
  id: string;
  description: string;
}

export interface AdaptiveIntent {
  raw: string;
  outcome: string;
  assets: string[];
  constraints: string[];
  deliverables: string[];
  requiresResearch: boolean;
  confidence: number;
  ambiguities: string[];
}

export interface AdaptiveRouteStep {
  id: string;
  kind: "skill" | "research" | "deterministic";
  skillId?: string;
  objective: string;
  dependsOn: string[];
  inputs: Record<string, string>;
  output: string;
  selectionReason: string;
  candidates?: SkillIntentMatch[];
}

export interface SkillIntentMatch {
  skillId: string;
  intentMatchScore: number;
  reason: string;
}

export interface AdaptiveRouteProposal {
  intent: AdaptiveIntent;
  steps: AdaptiveRouteStep[];
  finalAcceptance: string[];
  decision: "execute" | "clarify";
  clarification?: string;
}

export interface AdaptiveRoutePlan extends AdaptiveRouteProposal {
  availableSkillCount: number;
}

export class AdaptiveRouteError extends Error {}

/**
 * Validates a plan proposed by the harness model against the Skills visible at
 * runtime. Skill selection remains model-driven; this function intentionally
 * contains no operation enum, keyword classifier, or fixed Skill registry.
 */
export function validateAdaptiveRoute(
  proposal: AdaptiveRouteProposal,
  availableSkills: RuntimeSkill[]
): AdaptiveRoutePlan {
  const registry = new Map(availableSkills.map((skill) => [skill.id, skill]));
  const ids = new Set<string>();

  if (!proposal.intent.outcome.trim()) throw new AdaptiveRouteError("The route needs a concrete final outcome.");
  if (proposal.intent.confidence < 0 || proposal.intent.confidence > 1) throw new AdaptiveRouteError("Intent confidence must be between 0 and 1.");
  if (proposal.decision === "clarify" && !proposal.clarification?.trim()) throw new AdaptiveRouteError("A clarification decision requires one material question.");
  if (proposal.decision === "execute" && proposal.steps.length === 0) throw new AdaptiveRouteError("An executable route needs at least one step.");

  for (const step of proposal.steps) {
    if (!step.id.trim() || ids.has(step.id)) throw new AdaptiveRouteError(`Route step IDs must be unique and non-empty: ${step.id}.`);
    ids.add(step.id);
    if (!step.objective.trim() || !step.output.trim() || !step.selectionReason.trim()) {
      throw new AdaptiveRouteError(`Route step ${step.id} needs an objective, output, and selection reason.`);
    }
    if (step.kind === "skill") {
      if (!step.skillId || !registry.has(step.skillId)) throw new AdaptiveRouteError(`Route step ${step.id} selected unavailable Skill: ${step.skillId ?? "<missing>"}.`);
      validateHighestIntentMatch(step, registry);
    } else if (step.skillId) {
      throw new AdaptiveRouteError(`Only Skill steps may declare skillId: ${step.id}.`);
    } else if (step.candidates?.length) {
      throw new AdaptiveRouteError(`Only Skill steps may declare candidates: ${step.id}.`);
    }
  }

  for (const step of proposal.steps) {
    for (const dependency of step.dependsOn) {
      if (!ids.has(dependency)) throw new AdaptiveRouteError(`Route step ${step.id} depends on missing step ${dependency}.`);
      if (dependency === step.id) throw new AdaptiveRouteError(`Route step ${step.id} cannot depend on itself.`);
    }
  }
  assertAcyclic(proposal.steps);

  if (proposal.intent.requiresResearch && proposal.decision === "execute" && !proposal.steps.some((step) => step.kind === "research")) {
    throw new AdaptiveRouteError("This intent requires research, but the proposed route has no research step.");
  }

  return { ...proposal, availableSkillCount: availableSkills.length };
}

function validateHighestIntentMatch(step: AdaptiveRouteStep, registry: Map<string, RuntimeSkill>) {
  if (!step.candidates?.length) throw new AdaptiveRouteError(`Route step ${step.id} must score every plausible Skill candidate.`);
  const seen = new Set<string>();
  for (const candidate of step.candidates) {
    if (!registry.has(candidate.skillId)) throw new AdaptiveRouteError(`Route step ${step.id} scored unavailable Skill: ${candidate.skillId}.`);
    if (seen.has(candidate.skillId)) throw new AdaptiveRouteError(`Route step ${step.id} scored Skill more than once: ${candidate.skillId}.`);
    seen.add(candidate.skillId);
    if (candidate.intentMatchScore < 0 || candidate.intentMatchScore > 1 || !Number.isFinite(candidate.intentMatchScore)) {
      throw new AdaptiveRouteError(`Route step ${step.id} has an invalid intent-match score for ${candidate.skillId}.`);
    }
    if (!candidate.reason.trim()) throw new AdaptiveRouteError(`Route step ${step.id} needs a scoring reason for ${candidate.skillId}.`);
  }
  const selected = step.candidates.find((candidate) => candidate.skillId === step.skillId);
  if (!selected) throw new AdaptiveRouteError(`Route step ${step.id} did not score its selected Skill: ${step.skillId}.`);
  const highest = Math.max(...step.candidates.map((candidate) => candidate.intentMatchScore));
  if (selected.intentMatchScore !== highest) {
    const winners = step.candidates.filter((candidate) => candidate.intentMatchScore === highest).map((candidate) => candidate.skillId).join(", ");
    throw new AdaptiveRouteError(`Route step ${step.id} selected ${step.skillId} at ${selected.intentMatchScore}, below the highest intent match ${highest}: ${winners}.`);
  }
}

function assertAcyclic(steps: AdaptiveRouteStep[]) {
  const dependencies = new Map(steps.map((step) => [step.id, step.dependsOn]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (id: string) => {
    if (visiting.has(id)) throw new AdaptiveRouteError(`Route contains a dependency cycle at ${id}.`);
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dependency of dependencies.get(id) ?? []) visit(dependency);
    visiting.delete(id);
    visited.add(id);
  };
  for (const step of steps) visit(step.id);
}
