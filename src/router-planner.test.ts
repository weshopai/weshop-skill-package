import assert from "node:assert/strict";
import test from "node:test";
import {
  loadRouterRoutingMap,
  prepareRouterPlan,
  type RouterIntent,
  type RouterPlanRequest,
  type RouterRoutingMap,
  type RuntimeSkill
} from "./index.js";

const availableSkills: RuntimeSkill[] = [
  { id: "ai-product", description: "Place one supplied product into a commercial scene." },
  { id: "product-detail-page", description: "Build a modular ecommerce detail image set." },
  { id: "create-social-carousel", description: "Create an ordered social carousel." },
  { id: "make-infographic", description: "Create one sourced infographic." }
];

const routingMap: RouterRoutingMap = {
  schemaVersion: "1.0.0",
  taskClasses: [
    {
      id: "commerce-fashion",
      label: "Commerce and fashion",
      defaultMode: "direct",
      useWhen: "The final outcome is a product asset.",
      directWhen: "One Skill owns the final result.",
      orchestrateWhen: "A product source must feed another deliverable.",
      commonSkillIds: ["ai-product", "product-detail-page"],
      recipeIds: ["product-detail-production"]
    },
    {
      id: "campaign-bundle",
      label: "Campaign bundle",
      defaultMode: "orchestrate",
      useWhen: "Several channel deliverables share one brief.",
      directWhen: "Only one finished asset is requested.",
      orchestrateWhen: "Several independent deliverables are requested.",
      commonSkillIds: ["create-social-carousel"],
      recipeIds: ["multi-format-campaign", "research-to-deliverable"]
    }
  ],
  tasks: [
    {
      id: "product-scene",
      label: "Product scene",
      taskClassId: "commerce-fashion",
      useWhen: "Place one supplied product into a scene.",
      requiredInputRoles: ["product-image"],
      preferredSkillId: "ai-product",
      neighborSkillIds: ["product-detail-page"],
      directWhen: "One scene is the complete result.",
      escalateWhen: "The scene must feed another output.",
      recipeId: "product-detail-production"
    }
  ],
  recipes: [
    {
      id: "product-detail-production",
      label: "Product detail production",
      taskClassIds: ["commerce-fashion"],
      useWhen: "A product source must feed a detail page.",
      directInsteadWhen: "One scene is the complete result.",
      requiredInputRoles: ["product-image", "product-facts"],
      steps: [],
      finalAcceptance: ["The selected workflow owns execution acceptance."]
    },
    {
      id: "multi-format-campaign",
      label: "Multi-format campaign",
      taskClassIds: ["campaign-bundle"],
      useWhen: "Several channel outputs share one brief.",
      directInsteadWhen: "Only one output is requested.",
      requiredInputRoles: ["campaign-brief"],
      steps: [],
      finalAcceptance: ["The selected workflow owns execution acceptance."]
    },
    {
      id: "research-to-deliverable",
      label: "Research to deliverable",
      taskClassIds: ["*"],
      useWhen: "Current evidence must be handed to production.",
      directInsteadWhen: "The selected Skill owns research internally.",
      requiredInputRoles: ["research-question"],
      steps: [],
      finalAcceptance: ["The selected workflow owns execution acceptance."]
    }
  ]
};

const intent = (overrides: Partial<RouterIntent> = {}): RouterIntent => ({
  raw: "Place this product into a clean kitchen scene.",
  outcome: "One product-faithful kitchen scene",
  assets: ["product-image"],
  constraints: ["preserve the product and label"],
  deliverables: ["scene image"],
  requiresResearch: false,
  confidence: 0.94,
  ambiguities: [],
  ...overrides
});
const request = (overrides: Partial<RouterPlanRequest> = {}): RouterPlanRequest => ({
  intent: intent(),
  taskId: "product-scene",
  ...overrides
});

test("returns one focused Skill shortlist for an indexed direct task", () => {
  const route = prepareRouterPlan(request(), availableSkills, routingMap);
  assert.equal(route.schemaVersion, "2.0.0");
  assert.equal(route.kind, "direct");
  assert.equal(route.nextAction, "score-skill-candidates");
  assert.deepEqual(route.candidateSkillIds, ["ai-product", "product-detail-page"]);
  assert.equal(route.recommendedSkillId, "ai-product");
  assert.equal("activeLayers" in route, false);
  assert.equal("executionWaves" in route, false);
  assert.equal("finalAcceptance" in route, false);
});

test("infers the maintained class from an exact task", () => {
  assert.equal(prepareRouterPlan(request(), availableSkills, routingMap).taskClassId, "commerce-fashion");
});

test("returns one selected Skill without execution planning", () => {
  const route = prepareRouterPlan(request({
    directDecision: {
      kind: "direct-atom",
      selectedSkillId: "ai-product",
      candidates: [
        { skillId: "ai-product", intentMatchScore: 0.98, reason: "Owns the requested scene." },
        { skillId: "product-detail-page", intentMatchScore: 0.4, reason: "Owns a page set instead." }
      ]
    }
  }), availableSkills, routingMap);
  assert.equal(route.selectedSkillId, "ai-product");
  assert.equal(route.nextAction, "invoke-selected-skill");
  assert.equal(route.reason, "Owns the requested scene.");
});

test("requires the complete indexed shortlist on direct selection", () => {
  assert.throws(() => prepareRouterPlan(request({
    directDecision: {
      kind: "direct-atom",
      selectedSkillId: "ai-product",
      candidates: [{ skillId: "ai-product", intentMatchScore: 1, reason: "Incomplete shortlist." }]
    }
  }), availableSkills, routingMap), /score exactly the returned Skill shortlist/);
});

test("allows an explicit runtime Skill fallback", () => {
  const route = prepareRouterPlan(request({
    directDecision: {
      kind: "direct-atom",
      selectedSkillId: "make-infographic",
      candidates: [{ skillId: "make-infographic", intentMatchScore: 1, reason: "Indexed Skills do not own the result." }],
      usedRuntimeFallback: true
    }
  }), availableSkills, routingMap);
  assert.equal(route.selectionSource, "runtime-fallback");
  assert.equal(route.selectedSkillId, "make-infographic");
});

test("returns workflow choices for an orchestration-first class", () => {
  const route = prepareRouterPlan({
    intent: intent({ assets: ["campaign-brief"], deliverables: ["banner", "carousel"] }),
    taskClassId: "campaign-bundle"
  }, availableSkills, routingMap);
  assert.equal(route.kind, "workflow");
  assert.equal(route.nextAction, "select-workflow");
  assert.deepEqual(route.candidateWorkflowIds, ["multi-format-campaign", "research-to-deliverable"]);
});

test("selects one workflow and stops before DAG planning", () => {
  const route = prepareRouterPlan({
    intent: intent({ assets: ["campaign-brief"], deliverables: ["banner", "carousel"] }),
    taskClassId: "campaign-bundle",
    workflowId: "multi-format-campaign"
  }, availableSkills, routingMap);
  assert.equal(route.kind, "workflow");
  assert.equal(route.workflowId, "multi-format-campaign");
  assert.equal(route.nextAction, "invoke-selected-workflow");
  assert.equal("steps" in route, false);
  assert.equal("executionWaves" in route, false);
});

test("asks one routing question for a missing workflow input", () => {
  const route = prepareRouterPlan({
    intent: intent({ assets: [] }),
    taskClassId: "campaign-bundle",
    workflowId: "multi-format-campaign",
    availableInputRoles: []
  }, availableSkills, routingMap);
  assert.equal(route.kind, "clarify");
  assert.equal(route.nextAction, "ask-one-question");
  assert.deepEqual(route.missingInputs, ["campaign-brief"]);
});

test("routes separate current evidence to a workflow choice", () => {
  const route = prepareRouterPlan({
    intent: intent({ requiresResearch: true, researchMode: "separate-step" }),
    taskClassId: "commerce-fashion"
  }, availableSkills, routingMap);
  assert.equal(route.kind, "workflow");
  assert.ok(route.candidateWorkflowIds.includes("research-to-deliverable"));
});

test("leaves unknown work open to runtime Skill scoring", () => {
  const route = prepareRouterPlan({ intent: intent(), taskClassId: "future-custom-outcome" }, availableSkills, routingMap);
  assert.equal(route.selectionSource, "runtime-fallback");
  assert.equal(route.nextAction, "score-skill-candidates");
  assert.deepEqual(route.candidateSkillIds, []);
});

test("rejects unknown tasks and incompatible workflows", () => {
  assert.throws(() => prepareRouterPlan(request({ taskId: "invented-task" }), availableSkills, routingMap), /Unknown indexed task ID/);
  assert.throws(() => prepareRouterPlan({
    intent: intent({ assets: ["campaign-brief"] }),
    taskClassId: "commerce-fashion",
    workflowId: "multi-format-campaign"
  }, availableSkills, routingMap), /does not support task class/);
});

test("loads the shipped 38-task and 7-workflow index", () => {
  const shipped = loadRouterRoutingMap();
  assert.equal(shipped.tasks.length, 38);
  assert.equal(shipped.recipes.length, 7);
  assert.equal("layers" in shipped, false);
});
