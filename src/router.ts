import type { RuntimeSkill, SkillIntentMatch } from "./multi-step-orchestrator.js";

export type RouterResearchMode = "none" | "atom-owned" | "separate-step";

export interface RouterIntent {
  raw: string;
  outcome: string;
  assets: string[];
  constraints: string[];
  deliverables: string[];
  requiresResearch: boolean;
  /**
   * Omit for the legacy meaning where requiresResearch implies a separate
   * orchestration node. Use atom-owned when one Atom owns the researched
   * outcome end to end and no evidence artifact is handed to another Skill.
   */
  researchMode?: RouterResearchMode;
  confidence: number;
  ambiguities: string[];
}

export interface RouterPlanningEvidence {
  /** Stable, open-ended class from the Router playbook or a runtime fallback. */
  taskClassId: string;
  /** Count only Router-owned operations; an end-to-end Atom counts as one. */
  operationCount: number;
  independentDeliverableCount: number;
  hasArtifactDependency: boolean;
  recipeId?: string;
}

export interface DirectAtomDecision {
  kind: "direct-atom";
  selectedSkillId: string;
  candidates: SkillIntentMatch[];
  /** True only when the indexed shortlist was unavailable or failed the full outcome contract. */
  usedRuntimeFallback?: boolean;
}

export interface OrchestrationEscalation {
  kind: "orchestrate";
  reason: "dependency_chain" | "multi_deliverable" | "ambiguity" | "research" | "risk";
}

export interface ClarificationDecision {
  kind: "clarify";
  question: string;
}

export interface RouterProposal {
  intent: RouterIntent;
  decision: DirectAtomDecision | OrchestrationEscalation | ClarificationDecision;
  planning?: RouterPlanningEvidence;
}

export interface RouterDecision extends RouterProposal {
  availableSkillCount: number;
}

export class RouterDecisionError extends Error {}

/**
 * Validates the package-level Router's dispatch decision. Semantic candidate
 * scoring remains model-driven; this guard prevents a lower-scoring Atom from
 * being selected and prevents a compound request from bypassing orchestration.
 */
export function validateRouterDecision(proposal: RouterProposal, availableSkills: RuntimeSkill[]): RouterDecision {
  if (!proposal.intent.outcome.trim()) throw new RouterDecisionError("The Router needs a concrete final outcome.");
  if (proposal.intent.confidence < 0 || proposal.intent.confidence > 1 || !Number.isFinite(proposal.intent.confidence)) {
    throw new RouterDecisionError("Intent confidence must be between 0 and 1.");
  }
  validatePlanningEvidence(proposal);
  const separateResearch = requiresSeparateResearch(proposal.intent);
  const registry = new Set(availableSkills.map((skill) => skill.id));
  const { decision } = proposal;

  if (decision.kind === "clarify") {
    if (!decision.question.trim()) throw new RouterDecisionError("A clarification decision requires one material question.");
    return { ...proposal, availableSkillCount: availableSkills.length };
  }

  if (decision.kind === "orchestrate") {
    if (decision.reason === "research" && !separateResearch) {
      throw new RouterDecisionError("A research escalation requires a separate research step whose evidence is handed downstream.");
    }
    return { ...proposal, availableSkillCount: availableSkills.length };
  }

  if (separateResearch) throw new RouterDecisionError("An intent requiring a separate research step must escalate to orchestration.");
  if (!registry.has(decision.selectedSkillId)) throw new RouterDecisionError(`Selected Atom is unavailable: ${decision.selectedSkillId}.`);
  if (decision.selectedSkillId === "orchestrate-multi-step-workflow") throw new RouterDecisionError("The multi-step orchestrator is an escalation target, not a direct Atom.");
  validateHighestCandidate(decision, registry);
  return { ...proposal, availableSkillCount: availableSkills.length };
}

export function requiresSeparateResearch(intent: RouterIntent): boolean {
  if (!intent.researchMode) return intent.requiresResearch;
  if (intent.researchMode === "none") {
    if (intent.requiresResearch) throw new RouterDecisionError("researchMode none conflicts with requiresResearch true.");
    return false;
  }
  if (!intent.requiresResearch) throw new RouterDecisionError(`researchMode ${intent.researchMode} requires requiresResearch true.`);
  return intent.researchMode === "separate-step";
}

function validatePlanningEvidence(proposal: RouterProposal) {
  const planning = proposal.planning;
  if (!planning) return;
  if (!planning.taskClassId.trim()) throw new RouterDecisionError("Planning evidence requires a task class ID.");
  if (!Number.isInteger(planning.operationCount) || planning.operationCount < 1) {
    throw new RouterDecisionError("Planning operationCount must be a positive integer.");
  }
  if (!Number.isInteger(planning.independentDeliverableCount) || planning.independentDeliverableCount < 1) {
    throw new RouterDecisionError("Planning independentDeliverableCount must be a positive integer.");
  }
  if (planning.recipeId !== undefined && !planning.recipeId.trim()) {
    throw new RouterDecisionError("Planning recipeId must be non-empty when present.");
  }

  if (proposal.decision.kind === "direct-atom") {
    const compound = planning.operationCount !== 1
      || planning.independentDeliverableCount !== 1
      || planning.hasArtifactDependency
      || planning.recipeId !== undefined;
    if (compound) {
      throw new RouterDecisionError("A direct Atom plan must contain one Router-owned operation, one independent deliverable, no cross-Skill artifact dependency, and no workflow recipe.");
    }
  }

  if (proposal.decision.kind === "orchestrate" && proposal.decision.reason === "dependency_chain") {
    if (planning.operationCount < 2) throw new RouterDecisionError("A dependency-chain escalation needs at least two Router-owned operations.");
    if (!planning.hasArtifactDependency) throw new RouterDecisionError("A dependency-chain escalation needs a cross-Skill artifact dependency.");
  }

  if (proposal.decision.kind === "orchestrate" && proposal.decision.reason === "multi_deliverable") {
    if (planning.operationCount < 2 || planning.independentDeliverableCount < 2) {
      throw new RouterDecisionError("A multi-deliverable escalation needs at least two Router-owned operations and two independent deliverables.");
    }
    if (planning.hasArtifactDependency) {
      throw new RouterDecisionError("A multi-deliverable escalation must not claim a cross-Skill artifact dependency; use dependency_chain instead.");
    }
  }
}

function validateHighestCandidate(decision: DirectAtomDecision, registry: Set<string>) {
  if (!decision.candidates.length) throw new RouterDecisionError("A direct Atom decision must score every plausible candidate.");
  if (decision.candidates.length > 4) throw new RouterDecisionError("A direct Atom decision may score at most four focused candidates.");
  const seen = new Set<string>();
  for (const candidate of decision.candidates) {
    if (!registry.has(candidate.skillId)) throw new RouterDecisionError(`Scored Skill is unavailable: ${candidate.skillId}.`);
    if (candidate.skillId === "orchestrate-multi-step-workflow") throw new RouterDecisionError("The multi-step orchestrator cannot be a direct-Atom candidate.");
    if (seen.has(candidate.skillId)) throw new RouterDecisionError(`Skill was scored more than once: ${candidate.skillId}.`);
    seen.add(candidate.skillId);
    if (candidate.intentMatchScore < 0 || candidate.intentMatchScore > 1 || !Number.isFinite(candidate.intentMatchScore)) {
      throw new RouterDecisionError(`Invalid intent-match score for ${candidate.skillId}.`);
    }
    if (!candidate.reason.trim()) throw new RouterDecisionError(`A scoring reason is required for ${candidate.skillId}.`);
  }
  const selected = decision.candidates.find((candidate) => candidate.skillId === decision.selectedSkillId);
  if (!selected) throw new RouterDecisionError("The selected Atom must appear in the scored candidates.");
  const highest = Math.max(...decision.candidates.map((candidate) => candidate.intentMatchScore));
  if (selected.intentMatchScore !== highest) throw new RouterDecisionError("The selected Atom must have the highest intent-match score.");
}
