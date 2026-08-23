import type { RuntimeSkill, SkillIntentMatch } from "./multi-step-orchestrator.js";

export interface RouterIntent {
  raw: string;
  outcome: string;
  assets: string[];
  constraints: string[];
  deliverables: string[];
  requiresResearch: boolean;
  confidence: number;
  ambiguities: string[];
}

export interface DirectAtomDecision {
  kind: "direct-atom";
  selectedSkillId: string;
  candidates: SkillIntentMatch[];
}

export interface OrchestrationEscalation {
  kind: "orchestrate";
  reason: "dependency_chain" | "ambiguity" | "research" | "risk";
}

export interface ClarificationDecision {
  kind: "clarify";
  question: string;
}

export interface RouterProposal {
  intent: RouterIntent;
  decision: DirectAtomDecision | OrchestrationEscalation | ClarificationDecision;
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
  const registry = new Set(availableSkills.map((skill) => skill.id));
  const { decision } = proposal;

  if (decision.kind === "clarify") {
    if (!decision.question.trim()) throw new RouterDecisionError("A clarification decision requires one material question.");
    return { ...proposal, availableSkillCount: availableSkills.length };
  }

  if (decision.kind === "orchestrate") {
    if (decision.reason === "research" && !proposal.intent.requiresResearch) {
      throw new RouterDecisionError("A research escalation must mark the intent as requiring research.");
    }
    return { ...proposal, availableSkillCount: availableSkills.length };
  }

  if (proposal.intent.requiresResearch) throw new RouterDecisionError("An intent requiring research must escalate to orchestration.");
  if (!registry.has(decision.selectedSkillId)) throw new RouterDecisionError(`Selected Atom is unavailable: ${decision.selectedSkillId}.`);
  if (decision.selectedSkillId === "orchestrate-multi-step-workflow") throw new RouterDecisionError("The multi-step orchestrator is an escalation target, not a direct Atom.");
  validateHighestCandidate(decision, registry);
  return { ...proposal, availableSkillCount: availableSkills.length };
}

function validateHighestCandidate(decision: DirectAtomDecision, registry: Set<string>) {
  if (!decision.candidates.length) throw new RouterDecisionError("A direct Atom decision must score every plausible candidate.");
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
