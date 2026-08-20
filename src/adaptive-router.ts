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
    } else if (step.skillId) {
      throw new AdaptiveRouteError(`Only Skill steps may declare skillId: ${step.id}.`);
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
