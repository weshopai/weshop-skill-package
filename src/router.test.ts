import assert from "node:assert/strict";
import test from "node:test";
import { RouterDecisionError, validateRouterDecision, type RouterProposal, type RuntimeSkill } from "./index.js";

const skills: RuntimeSkill[] = [
  { id: "ai-product", description: "Place one supplied product into a commercial scene." },
  { id: "poster-design", description: "Create a finished poster from supplied visual assets." },
  { id: "make-infographic", description: "Research, write, and visualize a sourced infographic." },
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

test("caps direct semantic scoring at four focused candidates", () => {
  const runtime = [...skills, { id: "extra-one", description: "Adjacent result." }, { id: "extra-two", description: "Adjacent result." }];
  const candidates = ["ai-product", "poster-design", "make-infographic", "extra-one", "extra-two"].map((skillId, index) => ({
    skillId,
    intentMatchScore: index === 0 ? 1 : 0.5 - index / 100,
    reason: "Focused test candidate."
  }));
  assert.throws(() => validateRouterDecision(proposal({
    decision: { kind: "direct-atom", selectedSkillId: "ai-product", candidates }
  }), runtime), /at most four focused candidates/);
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

test("rejects a compound plan that tries to bypass orchestration", () => {
  const compound = proposal({
    planning: {
      taskClassId: "campaign-bundle",
      operationCount: 3,
      independentDeliverableCount: 2,
      hasArtifactDependency: true,
      recipeId: "multi-format-campaign"
    }
  });
  assert.throws(() => validateRouterDecision(compound, skills), /direct Atom plan must contain one Router-owned operation/);
});

test("keeps an end-to-end Atom direct even when it owns internal stages", () => {
  const direct = proposal({
    intent: {
      ...proposal().intent,
      raw: "Research the facts and make one sourced infographic.",
      outcome: "One sourced infographic",
      requiresResearch: true,
      researchMode: "atom-owned"
    },
    planning: {
      taskClassId: "layout-social-series",
      operationCount: 1,
      independentDeliverableCount: 1,
      hasArtifactDependency: false
    },
    decision: {
      kind: "direct-atom",
      selectedSkillId: "make-infographic",
      candidates: [{ skillId: "make-infographic", intentMatchScore: 0.97, reason: "It owns research through final infographic delivery." }]
    }
  });
  assert.equal(validateRouterDecision(direct, skills).decision.kind, "direct-atom");
});

test("distinguishes Atom-owned research from a separate evidence handoff", () => {
  const separate = proposal({
    intent: { ...proposal().intent, requiresResearch: true, researchMode: "separate-step" }
  });
  assert.throws(() => validateRouterDecision(separate, skills), /separate research step/);

  const escalated = proposal({
    intent: { ...proposal().intent, requiresResearch: true, researchMode: "separate-step" },
    decision: { kind: "orchestrate", reason: "research" }
  });
  assert.equal(validateRouterDecision(escalated, skills).decision.kind, "orchestrate");
});

test("validates structured planning evidence", () => {
  const invalid = proposal({
    planning: {
      taskClassId: "",
      operationCount: 0,
      independentDeliverableCount: 1,
      hasArtifactDependency: false
    }
  });
  assert.throws(() => validateRouterDecision(invalid, skills), /task class ID/);
});

test("distinguishes independent deliverables from a dependency chain", () => {
  const independent = proposal({
    decision: { kind: "orchestrate", reason: "multi_deliverable" },
    planning: {
      taskClassId: "campaign-bundle",
      operationCount: 2,
      independentDeliverableCount: 2,
      hasArtifactDependency: false
    }
  });
  assert.equal(validateRouterDecision(independent, skills).decision.kind, "orchestrate");

  assert.throws(() => validateRouterDecision(proposal({
    decision: { kind: "orchestrate", reason: "multi_deliverable" },
    planning: { ...independent.planning!, hasArtifactDependency: true }
  }), skills), /must not claim a cross-Skill artifact dependency/);

  const mislabeled = proposal({
    decision: { kind: "orchestrate", reason: "dependency_chain" },
    planning: independent.planning
  });
  assert.throws(() => validateRouterDecision(mislabeled, skills), /cross-Skill artifact dependency/);
});
