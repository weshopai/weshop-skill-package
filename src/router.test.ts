import assert from "node:assert/strict";
import test from "node:test";
import { RouterDecisionError, validateRouterDecision, type RouterProposal, type RuntimeSkill } from "./index.js";

const skills: RuntimeSkill[] = [
  { id: "ai-product", description: "Place one supplied product into a commercial scene." },
  { id: "poster-design", description: "Create a finished poster from supplied visual assets." },
  { id: "orchestrate-multi-step-workflow", description: "Orchestrate multiple dependent operations." }
];

const proposal = (overrides: Partial<RouterProposal> = {}): RouterProposal => ({
  intent: { raw: "Place this product in a kitchen.", outcome: "One product-faithful kitchen scene", assets: ["product image"], constraints: ["preserve label"], deliverables: ["scene image"], requiresResearch: false, confidence: 0.92, ambiguities: [] },
  decision: { kind: "direct-atom", selectedSkillId: "ai-product", candidates: [
    { skillId: "ai-product", intentMatchScore: 0.95, reason: "It owns product-faithful scene placement." },
    { skillId: "poster-design", intentMatchScore: 0.31, reason: "It owns a different final-layout deliverable." }
  ] },
  ...overrides
});

test("selects the highest-scoring Atom for a single complete request", () => {
  assert.equal(validateRouterDecision(proposal(), skills).decision.kind, "direct-atom");
});

test("rejects a lower-scoring direct Atom", () => {
  const decision = { kind: "direct-atom" as const, selectedSkillId: "poster-design", candidates: [
    { skillId: "ai-product", intentMatchScore: 0.95, reason: "It owns product-faithful scene placement." },
    { skillId: "poster-design", intentMatchScore: 0.31, reason: "It owns a different final-layout deliverable." }
  ] };
  assert.throws(() => validateRouterDecision(proposal({ decision }), skills), RouterDecisionError);
});

test("escalates research, dependencies, and risk instead of using a direct Atom", () => {
  const research = proposal({ intent: { ...proposal().intent, requiresResearch: true }, decision: { kind: "orchestrate", reason: "research" } });
  assert.equal(validateRouterDecision(research, skills).decision.kind, "orchestrate");
  assert.throws(() => validateRouterDecision(proposal({ intent: { ...proposal().intent, requiresResearch: true } }), skills), /must escalate/);
  assert.equal(validateRouterDecision(proposal({ decision: { kind: "orchestrate", reason: "dependency_chain" } }), skills).decision.kind, "orchestrate");
});

test("allows one focused clarification before either dispatch path", () => {
  const clarification = proposal({ decision: { kind: "clarify", question: "Which marketplace format must the single image meet?" } });
  assert.equal(validateRouterDecision(clarification, skills).decision.kind, "clarify");
});
