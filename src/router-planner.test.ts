import assert from "node:assert/strict";
import test from "node:test";
import {
  compileRouterOrchestrationPlan,
  loadRouterRoutingMap,
  materializeOrchestrationProposal,
  prepareRouterPlan,
  type RouterIntent,
  type RouterPlanRequest,
  type RouterRoutingMap,
  type RuntimeSkill
} from "./index.js";

const availableSkills: RuntimeSkill[] = [
  { id: "ai-product", description: "Place one supplied product into a commercial scene." },
  { id: "product-detail-page", description: "Build a modular ecommerce detail image set." },
  { id: "create-social-carousel", description: "Create an ordered mobile-first social carousel." },
  { id: "make-infographic", description: "Research, write, and visualize one sourced infographic." }
];

const routingMap: RouterRoutingMap = {
  schemaVersion: "1.0.0",
  layers: [
    { id: "host-contract" },
    { id: "memory-context" },
    { id: "execution-base" },
    { id: "creative-atom" },
    { id: "orchestration" },
    { id: "prompt-specialist" },
    { id: "meta-system" },
    { id: "professional-pack" }
  ],
  taskClasses: [
    {
      id: "commerce-fashion",
      label: "Commerce and fashion",
      defaultMode: "direct",
      useWhen: "The final outcome is a product or apparel asset.",
      directWhen: "One Atom owns the final result.",
      orchestrateWhen: "A scene must feed a separately owned detail set.",
      commonSkillIds: ["ai-product", "product-detail-page"],
      recipeIds: ["product-detail-production"]
    },
    {
      id: "campaign-bundle",
      label: "Campaign bundle",
      defaultMode: "orchestrate",
      useWhen: "Several channel deliverables share one accepted visual.",
      directWhen: "One Atom owns the only requested deliverable.",
      orchestrateWhen: "Independent deliverables branch from one upstream artifact.",
      commonSkillIds: [],
      recipeIds: ["multi-format-campaign", "research-to-deliverable"]
    }
  ],
  tasks: [
    {
      id: "product-scene",
      label: "Product scene",
      taskClassId: "commerce-fashion",
      useWhen: "Place one supplied product into a new scene while preserving it.",
      requiredInputRoles: ["product-image"],
      preferredSkillId: "ai-product",
      neighborSkillIds: ["product-detail-page"],
      directWhen: "One scene is the final deliverable.",
      escalateWhen: "The scene becomes input to a separately owned layout."
    }
  ],
  recipes: [
    {
      id: "product-detail-production",
      label: "Product detail production",
      taskClassIds: ["commerce-fashion"],
      useWhen: "A new product scene must feed a detail-page set.",
      directInsteadWhen: "product-detail-page owns the complete requested output without a separately accepted scene.",
      requiredInputRoles: ["product-image"],
      steps: [
        { id: "source", kind: "deterministic", objective: "Register the product anchor", dependsOn: [], inputs: { product: "user.product-image" }, output: "accepted product anchor" },
        { id: "scene", kind: "skill", objective: "Create a product-faithful scene", dependsOn: ["source"], inputs: { product: "source.output" }, output: "accepted scene", preferredSkillIds: ["ai-product", "product-detail-page"] },
        { id: "detail", kind: "skill", objective: "Build the detail set", dependsOn: ["scene"], inputs: { scene: "scene.output" }, output: "detail image set", preferredSkillIds: ["product-detail-page"] }
      ],
      finalAcceptance: ["The product stays recognizable across the complete detail set."]
    },
    {
      id: "multi-format-campaign",
      label: "Multi-format campaign",
      taskClassIds: ["campaign-bundle"],
      useWhen: "Several requested assets share one accepted campaign anchor.",
      directInsteadWhen: "Only one finished asset is requested.",
      requiredInputRoles: ["campaign-brief"],
      steps: [
        { id: "anchor", kind: "skill", objective: "Create the accepted campaign anchor", dependsOn: [], inputs: { brief: "user.campaign-brief" }, output: "accepted anchor", preferredSkillIds: ["ai-product"] },
        { id: "detail", kind: "skill", objective: "Create the detail branch", dependsOn: ["anchor"], inputs: { anchor: "anchor.output" }, output: "detail set", preferredSkillIds: ["product-detail-page"], parallelGroup: "derivatives" },
        { id: "carousel", kind: "skill", objective: "Create the carousel branch", dependsOn: ["anchor"], inputs: { anchor: "anchor.output" }, output: "carousel", preferredSkillIds: ["create-social-carousel"], optional: true, condition: "The user requested a carousel.", parallelGroup: "derivatives" }
      ],
      finalAcceptance: ["All requested channel assets share the accepted campaign anchor."]
    },
    {
      id: "research-to-deliverable",
      label: "Research to deliverable",
      taskClassIds: ["*"],
      useWhen: "A separate evidence artifact must be handed to a creative Skill.",
      directInsteadWhen: "The selected Atom owns research through final delivery.",
      requiredInputRoles: [],
      steps: [
        { id: "research", kind: "research", objective: "Produce current evidence", dependsOn: [], inputs: {}, output: "verified evidence" },
        { id: "deliverable", kind: "skill", objective: "Create the requested result from evidence", dependsOn: ["research"], inputs: { evidence: "research.output" }, output: "final deliverable", preferredSkillIds: ["make-infographic"] }
      ],
      finalAcceptance: ["The final result is traceable to the verified evidence."]
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
  taskClassId: "commerce-fashion",
  taskId: "product-scene",
  signature: { action: "create", media: ["image"], domain: "commerce", scale: "single-output", priority: "fidelity" },
  ...overrides
});

const productDetailSelections = () => [
  {
    stepId: "scene",
    selectedSkillId: "ai-product",
    candidates: [
      { skillId: "ai-product", intentMatchScore: 0.98, reason: "Owns product-faithful scene placement." },
      { skillId: "product-detail-page", intentMatchScore: 0.43, reason: "Owns the downstream detail set instead." }
    ],
    selectionReason: "ai-product is the strongest complete node-contract match."
  },
  {
    stepId: "detail",
    selectedSkillId: "product-detail-page",
    candidates: [
      { skillId: "product-detail-page", intentMatchScore: 0.99, reason: "Owns the complete detail image set." }
    ],
    selectionReason: "product-detail-page is the strongest complete node-contract match."
  }
];

test("returns an indexed direct shortlist without scanning raw text", () => {
  const plan = prepareRouterPlan(request(), availableSkills, routingMap);
  assert.equal(plan.mode, "direct");
  assert.equal(plan.nextAction, "score-direct-candidates");
  assert.deepEqual(plan.candidateSkillIds, ["ai-product", "product-detail-page"]);
  assert.equal(plan.recommendedSkillId, "ai-product");
  assert.equal(plan.selectionSource, "indexed");
});

test("infers the maintained task class from an exact task ID", () => {
  const plan = prepareRouterPlan(request({ taskClassId: undefined }), availableSkills, routingMap);
  assert.equal(plan.taskClassId, "commerce-fashion");
  assert.equal(plan.selectionSource, "indexed");
});

test("turns a scored direct decision into an invocation-ready plan", () => {
  const plan = prepareRouterPlan(request({
    directDecision: {
      kind: "direct-atom",
      selectedSkillId: "ai-product",
      candidates: [
        { skillId: "ai-product", intentMatchScore: 0.98, reason: "It owns product-faithful scene placement." },
        { skillId: "product-detail-page", intentMatchScore: 0.41, reason: "It owns a multi-module set, not one scene." }
      ]
    }
  }), availableSkills, routingMap);
  assert.equal(plan.selectedSkillId, "ai-product");
  assert.equal(plan.nextAction, "invoke-selected-atom");
  assert.deepEqual(plan.executionWaves, [["deliverable"]]);
});

test("does not let a second-pass direct decision omit the indexed shortlist", () => {
  assert.throws(() => prepareRouterPlan(request({
    directDecision: {
      kind: "direct-atom",
      selectedSkillId: "ai-product",
      candidates: [{ skillId: "ai-product", intentMatchScore: 1, reason: "Omitted the indexed neighbor." }]
    }
  }), availableSkills, routingMap), /must score exactly the seed shortlist/);
});

test("labels an explicit direct shortlist replacement as runtime fallback", () => {
  const plan = prepareRouterPlan(request({
    directDecision: {
      kind: "direct-atom",
      selectedSkillId: "make-infographic",
      candidates: [{ skillId: "make-infographic", intentMatchScore: 1, reason: "The indexed candidates fail the complete outcome contract." }],
      usedRuntimeFallback: true
    }
  }), availableSkills, routingMap);
  assert.equal(plan.selectionSource, "runtime-fallback");
  assert.equal(plan.recommendedSkillId, undefined);
  assert.equal(plan.selectedSkillId, "make-infographic");
});

test("expands a recipe-first task into dependency-safe parallel waves", () => {
  const plan = prepareRouterPlan(request({
    taskClassId: "campaign-bundle",
    taskId: undefined,
    intent: intent({ assets: ["campaign-brief"], deliverables: ["detail set", "carousel"] }),
    signature: { action: "create", media: ["image"], domain: "marketing", scale: "campaign-bundle", priority: "fidelity" },
    recipeId: "multi-format-campaign",
    includeOptionalSteps: ["carousel"],
    memoryAvailable: true,
    professionalPackId: "selected-campaign-pack",
    availableProfessionalPackIds: ["selected-campaign-pack"]
  }), availableSkills, routingMap);
  assert.equal(plan.mode, "orchestrate");
  assert.equal(plan.recipeId, "multi-format-campaign");
  assert.deepEqual(plan.executionWaves, [["anchor"], ["detail", "carousel"]]);
  assert.ok(plan.activeLayers.includes("orchestration"));
  assert.ok(plan.activeLayers.includes("memory-context"));
  assert.ok(plan.activeLayers.includes("professional-pack"));
});

test("rejects invented professional packs and keeps them off prompt-only routes", () => {
  assert.throws(() => prepareRouterPlan(request({
    professionalPackId: "missing-pack"
  }), availableSkills, routingMap), /not available at runtime/);
  assert.throws(() => prepareRouterPlan(request({
    taskClassId: "prompt-planning-diagnostics",
    taskId: undefined,
    professionalPackId: "prompt-overlay",
    availableProfessionalPackIds: ["prompt-overlay"]
  }), availableSkills, routingMap), /cannot overlay task class/);
});

test("keeps an explicitly selected professional overlay visible while clarifying inputs", () => {
  const plan = prepareRouterPlan(request({
    availableInputRoles: [],
    professionalPackId: "selected-campaign-pack",
    availableProfessionalPackIds: ["selected-campaign-pack"]
  }), availableSkills, routingMap);
  assert.equal(plan.mode, "clarify");
  assert.ok(plan.activeLayers.includes("execution-base"));
  assert.ok(plan.activeLayers.includes("professional-pack"));
});

test("returns a focused recipe shortlist when a workflow class has several valid shapes", () => {
  const plan = prepareRouterPlan(request({
    taskClassId: "campaign-bundle",
    taskId: undefined,
    intent: intent({ assets: ["campaign-brief"], deliverables: ["campaign bundle"] }),
    signature: { action: "create", media: ["image", "video"], domain: "marketing", scale: "campaign-bundle", priority: "fidelity" }
  }), availableSkills, routingMap);
  assert.equal(plan.mode, "orchestrate");
  assert.equal(plan.nextAction, "select-workflow-recipe");
  assert.deepEqual(plan.candidateRecipeIds, ["multi-format-campaign"]);
  assert.equal(plan.steps.length, 0);
});

test("shortlists mandatory-research recipes only for a separate evidence handoff", () => {
  const plan = prepareRouterPlan(request({
    taskClassId: "campaign-bundle",
    taskId: undefined,
    intent: intent({
      assets: ["campaign-brief"],
      deliverables: ["campaign bundle"],
      requiresResearch: true,
      researchMode: "separate-step"
    }),
    signature: { action: "create", media: ["image", "video"], domain: "marketing", scale: "campaign-bundle", priority: "fidelity" }
  }), availableSkills, routingMap);
  assert.deepEqual(plan.candidateRecipeIds, ["multi-format-campaign", "research-to-deliverable"]);
});

test("asks one material question when a recipe input is missing", () => {
  const plan = prepareRouterPlan(request({ recipeId: "product-detail-production", availableInputRoles: [] }), availableSkills, routingMap);
  assert.equal(plan.mode, "clarify");
  assert.deepEqual(plan.missingInputs, ["product-image"]);
  assert.equal(plan.steps.length, 0);
  assert.match(plan.question ?? "", /product-image/);
});

test("uses indexed task input requirements before scoring a direct route", () => {
  const plan = prepareRouterPlan(request({
    intent: intent({ assets: [] }),
    availableInputRoles: []
  }), availableSkills, routingMap);
  assert.equal(plan.mode, "clarify");
  assert.deepEqual(plan.missingInputs, ["product-image"]);
  assert.equal(plan.nextAction, "ask-one-question");
});

test("uses authoritative available input roles in the signature and direct binding", () => {
  const plan = prepareRouterPlan(request({
    intent: intent({ assets: [] }),
    availableInputRoles: ["product-image"]
  }), availableSkills, routingMap);
  assert.equal(plan.mode, "direct");
  assert.deepEqual(plan.signature.inputRoles, ["product-image"]);
  assert.deepEqual(plan.steps[0].inputs, { "product-image": "user.product-image" });
});

test("uses a separate research recipe but keeps Atom-owned research direct", () => {
  const separate = prepareRouterPlan(request({
    taskClassId: "future-evidence-deliverable",
    taskId: undefined,
    intent: intent({
      outcome: "One sourced infographic from an independently reusable evidence record",
      deliverables: ["evidence record", "infographic"],
      requiresResearch: true,
      researchMode: "separate-step"
    }),
    recipeId: "research-to-deliverable"
  }), availableSkills, routingMap);
  assert.equal(separate.mode, "orchestrate");
  assert.equal(separate.recipeId, "research-to-deliverable");
  assert.deepEqual(separate.executionWaves, [["research"], ["deliverable"]]);

  const owned = prepareRouterPlan(request({
    intent: intent({ requiresResearch: true, researchMode: "atom-owned" })
  }), availableSkills, routingMap);
  assert.equal(owned.mode, "direct");

  assert.throws(() => prepareRouterPlan(request({
    taskClassId: "future-evidence-deliverable",
    taskId: undefined,
    recipeId: "research-to-deliverable"
  }), availableSkills, routingMap), /requires currentFactResearch separate-step/);
});

test("falls back to runtime discovery for an unknown or custom task class", () => {
  const plan = prepareRouterPlan(request({ taskClassId: "future-custom-outcome", taskId: undefined }), availableSkills, routingMap);
  assert.equal(plan.mode, "direct");
  assert.equal(plan.selectionSource, "runtime-fallback");
  assert.equal(plan.steps[0].runtimeDiscoveryRequired, true);
});

test("keeps a broad-class scored route labeled as runtime fallback", () => {
  const plan = prepareRouterPlan(request({
    taskId: undefined,
    directDecision: {
      kind: "direct-atom",
      selectedSkillId: "ai-product",
      candidates: [{ skillId: "ai-product", intentMatchScore: 1, reason: "Selected from current runtime descriptions." }]
    }
  }), availableSkills, routingMap);
  assert.equal(plan.selectionSource, "runtime-fallback");
  assert.equal(plan.selectedSkillId, "ai-product");
});

test("uses an open runtime class when neither indexed ID is known", () => {
  const plan = prepareRouterPlan(request({ taskClassId: undefined, taskId: undefined }), availableSkills, routingMap);
  assert.equal(plan.taskClassId, "runtime-other");
  assert.equal(plan.selectionSource, "runtime-fallback");
});

test("never compiles an unknown compound task as a direct route", () => {
  const plan = prepareRouterPlan(request({
    taskClassId: "future-custom-outcome",
    taskId: undefined,
    routeShape: { operationCount: 2, independentDeliverableCount: 1, hasArtifactDependency: true }
  }), availableSkills, routingMap);
  assert.equal(plan.mode, "orchestrate");
  assert.equal(plan.nextAction, "expand-with-orchestrator");
  assert.equal(plan.selectionSource, "runtime-fallback");
  assert.equal(plan.planning.operationCount, 2);
  assert.equal(plan.planning.hasArtifactDependency, true);
});

test("rejects a direct decision that contradicts a compound route shape", () => {
  assert.throws(() => prepareRouterPlan(request({
    taskClassId: "future-custom-outcome",
    taskId: undefined,
    routeShape: { operationCount: 2, independentDeliverableCount: 1, hasArtifactDependency: true },
    directDecision: {
      kind: "direct-atom",
      selectedSkillId: "ai-product",
      candidates: [{ skillId: "ai-product", intentMatchScore: 1, reason: "Candidate supplied by caller." }]
    }
  }), availableSkills, routingMap), /cannot use a direct Atom decision/);
});

test("loads the shipped task map and keeps an exact common task on the direct fast path", () => {
  const shippedMap = loadRouterRoutingMap();
  assert.ok(shippedMap.tasks.length >= 30);
  assert.ok(shippedMap.recipes.length >= 7);
  const productTask = shippedMap.tasks.find((task) => task.id === "product-scene");
  assert.ok(productTask);
  const runtimeSkills = [productTask.preferredSkillId, ...productTask.neighborSkillIds]
    .map((id) => ({ id, description: `Runtime profile for ${id}.` }));
  const plan = prepareRouterPlan(request({
    taskClassId: productTask.taskClassId,
    taskId: productTask.id,
    availableInputRoles: productTask.requiredInputRoles,
    intent: intent({ assets: productTask.requiredInputRoles })
  }), runtimeSkills, shippedMap);
  assert.equal(plan.mode, "direct");
  assert.equal(plan.recommendedSkillId, productTask.preferredSkillId);
  assert.ok(plan.candidateSkillIds.length <= 4);
});

test("surfaces a compatible task recipe only when structured route shape requires it", () => {
  const shippedMap = loadRouterRoutingMap();
  const productTask = shippedMap.tasks.find((task) => task.id === "product-scene");
  const recipe = shippedMap.recipes.find((candidate) => candidate.id === productTask?.recipeId);
  assert.ok(productTask);
  assert.ok(recipe);
  const runtimeSkills = [...new Set(recipe.steps.flatMap((step) => step.preferredSkillIds ?? []))]
    .map((id) => ({ id, description: `Runtime profile for ${id}.` }));
  const shapedRequest = request({
    taskClassId: undefined,
    taskId: productTask.id,
    intent: intent({ assets: recipe.requiredInputRoles, deliverables: ["accepted product source", "detail-page set"] }),
    availableInputRoles: recipe.requiredInputRoles,
    routeShape: { operationCount: 3, independentDeliverableCount: 2, hasArtifactDependency: true }
  });
  const selection = prepareRouterPlan(shapedRequest, runtimeSkills, shippedMap);
  assert.equal(selection.nextAction, "select-workflow-recipe");
  assert.deepEqual(selection.candidateRecipeIds, ["product-detail-production"]);
  const plan = prepareRouterPlan({ ...shapedRequest, recipeId: selection.candidateRecipeIds[0] }, runtimeSkills, shippedMap);
  assert.equal(plan.mode, "orchestrate");
  assert.equal(plan.recipeId, "product-detail-production");
  assert.ok(plan.steps.some((step) => step.selectedSkillId === undefined && step.candidateSkillIds.includes("ai-product")));
  assert.ok(!plan.steps.some((step) => step.kind === "research"));
});

test("includes an optional recipe research node only for a separate evidence handoff", () => {
  const shippedMap = loadRouterRoutingMap();
  const recipe = shippedMap.recipes.find((candidate) => candidate.id === "product-detail-production");
  assert.ok(recipe);
  const runtimeSkills = [...new Set(recipe.steps.flatMap((step) => step.preferredSkillIds ?? []))]
    .map((id) => ({ id, description: `Runtime profile for ${id}.` }));
  const plan = prepareRouterPlan(request({
    taskClassId: "commerce-fashion",
    taskId: undefined,
    recipeId: recipe.id,
    intent: intent({
      assets: recipe.requiredInputRoles,
      requiresResearch: true,
      researchMode: "separate-step"
    }),
    availableInputRoles: recipe.requiredInputRoles
  }), runtimeSkills, shippedMap);
  assert.ok(plan.steps.some((step) => step.id === "verify-channel-requirements" && step.kind === "research"));
});

test("rejects an explicit recipe that drops an exact task's outcome owner", () => {
  const shippedMap = loadRouterRoutingMap();
  const campaign = shippedMap.recipes.find((recipe) => recipe.id === "multi-format-campaign");
  assert.ok(campaign);
  assert.throws(() => prepareRouterPlan(request({
    taskClassId: "commerce-fashion",
    taskId: "product-scene",
    recipeId: campaign.id,
    intent: intent({ assets: campaign.requiredInputRoles }),
    availableInputRoles: campaign.requiredInputRoles,
    includeOptionalSteps: ["produce-banner-branch", "produce-social-branch"]
  }), availableSkills, shippedMap), /drops the indexed outcome owner ai-product/);
});

test("injects separate research evidence into an explicitly selected non-research recipe", () => {
  const plan = prepareRouterPlan(request({
    taskClassId: "campaign-bundle",
    taskId: undefined,
    recipeId: "multi-format-campaign",
    intent: intent({
      assets: ["campaign-brief"],
      deliverables: ["detail set", "carousel"],
      requiresResearch: true,
      researchMode: "separate-step"
    }),
    signature: { action: "create", media: ["image"], domain: "marketing", scale: "campaign-bundle", priority: "fidelity" },
    includeOptionalSteps: ["carousel"]
  }), availableSkills, routingMap);
  assert.equal(plan.recipeId, "multi-format-campaign");
  assert.equal(plan.steps[0].kind, "research");
  const anchor = plan.steps.find((step) => step.id === "anchor");
  assert.ok(anchor?.dependsOn.includes(plan.steps[0].id));
  assert.equal(anchor?.inputs["research-evidence"], `${plan.steps[0].id}.output`);
});

test("materializes conditional character creation when canonical identities are missing", () => {
  const shippedMap = loadRouterRoutingMap();
  const recipe = shippedMap.recipes.find((candidate) => candidate.id === "comic-production");
  assert.ok(recipe);
  const runtimeSkills = [...new Set(recipe.steps.flatMap((step) => step.preferredSkillIds ?? []))]
    .map((id) => ({ id, description: `Runtime profile for ${id}.` }));
  const base = request({
    taskClassId: "narrative-sequence",
    taskId: undefined,
    recipeId: recipe.id,
    intent: intent({
      outcome: "A consistent multi-page comic",
      assets: recipe.requiredInputRoles,
      deliverables: ["comic page set"]
    }),
    availableInputRoles: recipe.requiredInputRoles,
    signature: { action: "create", media: ["image", "text"], domain: "narrative", scale: "multi-page", priority: "continuity" }
  });
  const generated = prepareRouterPlan(base, runtimeSkills, shippedMap);
  assert.ok(generated.steps.some((step) => step.id === "create-missing-identities"));
  const generatedResolver = generated.steps.find((step) => step.id === "resolve-canonical-identities");
  assert.equal(generatedResolver?.inputs["created-character-assets"], "create-missing-identities.output");
  assert.equal(generatedResolver?.inputs["existing-character-assets"], undefined);

  const existing = prepareRouterPlan({
    ...base,
    availableInputRoles: [...recipe.requiredInputRoles, "existing-character-assets"]
  }, runtimeSkills, shippedMap);
  assert.ok(!existing.steps.some((step) => step.id === "create-missing-identities"));
  const existingResolver = existing.steps.find((step) => step.id === "resolve-canonical-identities");
  assert.equal(existingResolver?.inputs["existing-character-assets"], "user.existing-character-assets");
  assert.ok(!existingResolver?.dependsOn.includes("create-missing-identities"));
});

test("binds only the campaign branches instantiated for this request", () => {
  const shippedMap = loadRouterRoutingMap();
  const recipe = shippedMap.recipes.find((candidate) => candidate.id === "multi-format-campaign");
  assert.ok(recipe);
  const runtimeSkills = [...new Set(recipe.steps.flatMap((step) => step.preferredSkillIds ?? []))]
    .map((id) => ({ id, description: `Runtime profile for ${id}.` }));
  const plan = prepareRouterPlan(request({
    taskClassId: "campaign-bundle",
    taskId: undefined,
    recipeId: recipe.id,
    intent: intent({
      outcome: "A banner and social carousel from one campaign brief",
      assets: recipe.requiredInputRoles,
      deliverables: ["banner", "social carousel"]
    }),
    availableInputRoles: recipe.requiredInputRoles,
    includeOptionalSteps: ["produce-banner-branch", "produce-social-branch"],
    signature: { action: "create", media: ["image"], domain: "campaign", scale: "multi-format", priority: "consistency" }
  }), runtimeSkills, shippedMap);
  const manifest = plan.steps.find((step) => step.id === "build-delivery-manifest");
  assert.deepEqual(manifest?.dependsOn, ["compile-campaign-system", "produce-banner-branch", "produce-social-branch"]);
  assert.equal(manifest?.inputs["banner-artifact"], "produce-banner-branch.output");
  assert.equal(manifest?.inputs["social-artifact"], "produce-social-branch.output");
  assert.equal(manifest?.inputs["video-artifact"], undefined);
});

test("refuses a campaign recipe without the minimum requested output branches", () => {
  const shippedMap = loadRouterRoutingMap();
  const recipe = shippedMap.recipes.find((candidate) => candidate.id === "multi-format-campaign");
  assert.ok(recipe);
  assert.throws(() => prepareRouterPlan(request({
    taskClassId: "campaign-bundle",
    taskId: undefined,
    recipeId: recipe.id,
    intent: intent({ assets: recipe.requiredInputRoles, deliverables: ["campaign outputs"] }),
    availableInputRoles: recipe.requiredInputRoles,
    signature: { action: "create", media: ["image", "video"], domain: "campaign", scale: "multi-format", priority: "consistency" }
  }), availableSkills, shippedMap), /requires at least 2 selected optional output steps/);
});

test("materializes a populated Router seed without re-planning its DAG", () => {
  const planRequest = request({
    recipeId: "product-detail-production",
    availableInputRoles: ["product-image"],
    routeShape: { operationCount: 3, independentDeliverableCount: 2, hasArtifactDependency: true }
  });
  const seed = prepareRouterPlan(planRequest, availableSkills, routingMap);
  const plan = compileRouterOrchestrationPlan(seed, planRequest.intent, productDetailSelections(), availableSkills);

  assert.deepEqual(plan.steps.map((step) => step.id), seed.steps.map((step) => step.id));
  assert.deepEqual(plan.steps.map((step) => step.dependsOn), seed.steps.map((step) => step.dependsOn));
  assert.deepEqual(plan.steps.map((step) => step.inputs), seed.steps.map((step) => step.inputs));
  assert.deepEqual(plan.executionWaves, seed.executionWaves);
  assert.equal(plan.planning.reason, "dependency_chain");
});

test("rejects a stale Router seed instead of mixing two intent versions", () => {
  const planRequest = request({ recipeId: "product-detail-production", availableInputRoles: ["product-image"] });
  const seed = prepareRouterPlan(planRequest, availableSkills, routingMap);
  assert.throws(() => materializeOrchestrationProposal(seed, {
    ...planRequest.intent,
    constraints: [...planRequest.intent.constraints, "new preservation rule"]
  }, productDetailSelections()), /no longer matches the Router plan seed: constraints/);
});

test("rejects tampered execution waves instead of silently rebuilding them", () => {
  const planRequest = request({ recipeId: "product-detail-production", availableInputRoles: ["product-image"] });
  const seed = prepareRouterPlan(planRequest, availableSkills, routingMap);
  const tampered = { ...seed, executionWaves: [["source", "scene", "detail"]] };
  assert.throws(() => compileRouterOrchestrationPlan(tampered, planRequest.intent, productDetailSelections(), availableSkills), /execution waves do not match/);
});

test("derives expanded planning evidence from the actual recipe DAG", () => {
  const planRequest = request({
    recipeId: "product-detail-production",
    availableInputRoles: ["product-image"],
    routeShape: { operationCount: 1, independentDeliverableCount: 1, hasArtifactDependency: false }
  });
  const seed = prepareRouterPlan(planRequest, availableSkills, routingMap);
  assert.equal(seed.planning.operationCount, 3);
  assert.equal(seed.planning.hasArtifactDependency, true);
});

test("requires exactly one runtime selection for every Skill node in a populated seed", () => {
  const planRequest = request({
    recipeId: "product-detail-production",
    availableInputRoles: ["product-image"]
  });
  const seed = prepareRouterPlan(planRequest, availableSkills, routingMap);
  assert.throws(() => compileRouterOrchestrationPlan(seed, planRequest.intent, [], availableSkills), /Missing Skill selection/);
});

test("requires semantic scoring to cover every indexed node candidate", () => {
  const planRequest = request({
    recipeId: "product-detail-production",
    availableInputRoles: ["product-image"]
  });
  const seed = prepareRouterPlan(planRequest, availableSkills, routingMap);
  assert.throws(() => compileRouterOrchestrationPlan(seed, planRequest.intent, [
    {
      stepId: "scene",
      selectedSkillId: "ai-product",
      candidates: [{ skillId: "ai-product", intentMatchScore: 1, reason: "Chosen without scoring the full shortlist." }],
      selectionReason: "Incomplete scoring."
    },
    {
      stepId: "detail",
      selectedSkillId: "product-detail-page",
      candidates: [{ skillId: "product-detail-page", intentMatchScore: 1, reason: "Owns the detail set." }],
      selectionReason: "The only indexed candidate owns the node."
    }
  ], availableSkills), /omitted indexed candidate/);
});

test("rejects a non-wildcard recipe outside an open runtime class", () => {
  assert.throws(() => prepareRouterPlan(request({
    taskClassId: "future-custom-outcome",
    taskId: undefined,
    recipeId: "product-detail-production",
    availableInputRoles: ["product-image"]
  }), availableSkills, routingMap), /does not belong to task class future-custom-outcome/);
});

test("lets a caller explicitly decline recipe hints for the custom-DAG fallback", () => {
  const plan = prepareRouterPlan(request({
    taskClassId: "campaign-bundle",
    taskId: undefined,
    routeShape: { operationCount: 3, independentDeliverableCount: 2, hasArtifactDependency: true },
    useRuntimeWorkflowFallback: true
  }), availableSkills, routingMap);
  assert.equal(plan.mode, "orchestrate");
  assert.equal(plan.selectionSource, "runtime-fallback");
  assert.equal(plan.recipeId, undefined);
  assert.deepEqual(plan.candidateRecipeIds, []);
  assert.deepEqual(plan.steps, []);
  assert.equal(plan.nextAction, "expand-with-orchestrator");
});

test("rejects unknown indexed task IDs instead of silently relabeling them", () => {
  assert.throws(() => prepareRouterPlan(request({ taskId: "invented-task" }), availableSkills, routingMap), /Unknown indexed task ID/);
});

test("mirrors public ID and input-role schema constraints at runtime", () => {
  assert.throws(() => prepareRouterPlan(request({
    taskClassId: "Bad ID",
    taskId: undefined
  }), availableSkills, routingMap), /lowercase kebab-case/);
  assert.throws(() => prepareRouterPlan(request({
    intent: intent({ assets: ["product image"] }),
    availableInputRoles: undefined
  }), availableSkills, routingMap), /Input role must contain only/);
});

test("keeps blocking ambiguities as a material subset of the full ambiguity record", () => {
  assert.throws(() => prepareRouterPlan(request({
    blockingAmbiguities: ["Which marketplace format is required?"]
  }), availableSkills, routingMap), /must also appear in intent\.ambiguities/);
});
