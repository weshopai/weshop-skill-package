import assert from "node:assert/strict";
import test from "node:test";
import { OrchestrationPlanError, validateOrchestrationPlan, type OrchestrationProposal, type RuntimeSkill } from "./index.js";

const skills: RuntimeSkill[] = [
  { id: "ai-product", description: "Place one supplied product into a commercial scene." },
  { id: "poster-design", description: "Create a finished poster from supplied or generated visual assets." },
  { id: "expand-image", description: "Extend an accepted image to a requested ratio." }
];
const matches = (selected: string, alternatives: Array<[string, number]> = []) => [
  { skillId: selected, intentMatchScore: 0.95, reason: "Its description best matches this operation's outcome, inputs, constraints, and deliverable." },
  ...alternatives.map(([skillId, intentMatchScore]) => ({ skillId, intentMatchScore, reason: "Related candidate with a weaker boundary match for this operation." }))
];

const proposal = (overrides: Partial<OrchestrationProposal> = {}): OrchestrationProposal => ({
  intent: {
    raw: "Research Amazon requirements, place this product in a scene, then make a poster.",
    outcome: "Amazon-ready product poster",
    assets: ["product image"],
    constraints: ["preserve product"],
    deliverables: ["poster"],
    requiresResearch: true,
    confidence: 0.9,
    ambiguities: []
  },
  planning: { reason: "research", clarificationRequired: false },
  decision: "execute",
  steps: [
    { id: "research", kind: "research", objective: "Verify destination requirements", dependsOn: [], inputs: {}, output: "verified requirements", selectionReason: "The destination is current and platform-specific." },
    { id: "scene", kind: "skill", skillId: "ai-product", objective: "Create product scene", dependsOn: ["research"], inputs: { product: "user.product", requirements: "research.output" }, output: "accepted scene", selectionReason: "Its use case owns product-faithful scene placement.", candidates: matches("ai-product", [["poster-design", 0.42]]) },
    { id: "poster", kind: "skill", skillId: "poster-design", objective: "Build final poster", dependsOn: ["scene"], inputs: { visual: "scene.output" }, output: "final poster", selectionReason: "Its use case owns final poster composition.", candidates: matches("poster-design", [["ai-product", 0.38]]) }
  ],
  finalAcceptance: ["Product identity is preserved.", "Poster follows verified requirements."],
  ...overrides
});

test("accepts a model-proposed multi-Skill DAG against the runtime registry", () => {
  const plan = validateOrchestrationPlan(proposal(), skills);
  assert.equal(plan.steps.length, 3);
  assert.equal(plan.availableSkillCount, 3);
  assert.deepEqual(plan.executionWaves, [["research"], ["scene"], ["poster"]]);
});

test("accepts a newly installed Skill in a multi-step plan without changing an operation enum", () => {
  const runtime = [...skills, { id: "future-localizer", description: "Localize accepted commercial artwork." }];
  const next = proposal({
    intent: { ...proposal().intent, requiresResearch: false },
    planning: { reason: "dependency_chain", clarificationRequired: false },
    steps: [
      { id: "source", kind: "deterministic", objective: "Prepare accepted artwork", dependsOn: [], inputs: { artwork: "user.artwork" }, output: "prepared artwork", selectionReason: "Preparation is required before localization." },
      { id: "localize", kind: "skill", skillId: "future-localizer", objective: "Localize artwork", dependsOn: ["source"], inputs: { artwork: "source.output" }, output: "localized artwork", selectionReason: "The runtime description exactly matches the requested transformation.", candidates: matches("future-localizer", [["poster-design", 0.31]]) }
    ]
  });
  assert.equal(validateOrchestrationPlan(next, runtime).steps[1].skillId, "future-localizer");
});

test("rejects unavailable Skills and invalid dependency graphs", () => {
  assert.throws(() => validateOrchestrationPlan(proposal({ steps: [{ ...proposal().steps[0], kind: "skill", skillId: "invented-skill" }] }), skills), OrchestrationPlanError);
  const cyclic = proposal({
    intent: { ...proposal().intent, requiresResearch: false },
    planning: { reason: "dependency_chain", clarificationRequired: false },
    steps: [
      { ...proposal().steps[1], dependsOn: ["poster"], inputs: { product: "user.product", poster: "poster.output" } },
      { ...proposal().steps[2], dependsOn: ["scene"], inputs: { visual: "scene.output" } }
    ]
  });
  assert.throws(() => validateOrchestrationPlan(cyclic, skills), /dependency cycle/);
});

test("rejects a selected Skill below the highest request-specific intent match", () => {
  const lowerSelected = proposal({
    intent: { ...proposal().intent, requiresResearch: false },
    planning: { reason: "dependency_chain", clarificationRequired: false },
    steps: [{ id: "prepare", kind: "deterministic", objective: "Prepare the input", dependsOn: [], inputs: {}, output: "prepared input", selectionReason: "Preparation is required before the selected Skill." }, {
      id: "scene",
      kind: "skill",
      skillId: "poster-design",
      objective: "Create product scene",
      dependsOn: ["prepare"],
      inputs: { product: "prepare.output" },
      output: "accepted scene",
      selectionReason: "Incorrect lower-scoring selection.",
      candidates: [
        { skillId: "ai-product", intentMatchScore: 0.96, reason: "Owns product-faithful scene placement." },
        { skillId: "poster-design", intentMatchScore: 0.61, reason: "Related final-layout Skill, but not the requested operation." }
      ]
    }]
  });
  assert.throws(() => validateOrchestrationPlan(lowerSelected, skills), /below the highest intent match/);
});

test("turns research and material ambiguity into explicit planning decisions", () => {
  const withoutResearch = proposal().steps.slice(1).map((step, index) => ({
    ...step,
    dependsOn: index === 0 ? [] : step.dependsOn,
    inputs: index === 0 ? { product: "user.product" } : step.inputs
  }));
  assert.throws(() => validateOrchestrationPlan(proposal({ steps: withoutResearch }), skills), /no research step/);
  const clarify = proposal({ planning: { reason: "ambiguity", clarificationRequired: true }, decision: "clarify", clarification: "Which marketplace and locale should the final asset target?", steps: [] });
  assert.equal(validateOrchestrationPlan(clarify, skills).decision, "clarify");
});

test("rejects broken artifact bindings and an empty final acceptance contract", () => {
  const undeclaredBinding = proposal({
    steps: proposal().steps.map((step) => step.id === "poster"
      ? { ...step, inputs: { visual: "research.output" } }
      : step)
  });
  assert.throws(() => validateOrchestrationPlan(undeclaredBinding, skills), /without declaring it as a dependency/);
  const emptyUserRole = proposal({
    steps: proposal().steps.map((step) => step.id === "scene" ? { ...step, inputs: { product: "user." } } : step)
  });
  assert.throws(() => validateOrchestrationPlan(emptyUserRole, skills), /must bind as user\.role or dependency\.artifactPath/);
  const bareDependency = proposal({
    steps: proposal().steps.map((step) => step.id === "scene" ? { ...step, inputs: { product: "research" } } : step)
  });
  assert.throws(() => validateOrchestrationPlan(bareDependency, skills), /must bind as user\.role or dependency\.artifactPath/);
  assert.throws(() => validateOrchestrationPlan(proposal({ finalAcceptance: [] }), skills), /final acceptance contract/);
});

test("groups independent branches into the same execution wave", () => {
  const parallel = proposal({
    intent: { ...proposal().intent, requiresResearch: false },
    planning: { reason: "dependency_chain", clarificationRequired: false },
    steps: [
      { id: "source", kind: "deterministic", objective: "Prepare the source", dependsOn: [], inputs: { product: "user.product" }, output: "prepared product", selectionReason: "One accepted source feeds two independent layouts." },
      { id: "scene-a", kind: "skill", skillId: "ai-product", objective: "Create scene A", dependsOn: ["source"], inputs: { product: "source.output" }, output: "scene A", selectionReason: "This Skill owns product-faithful scene placement.", candidates: matches("ai-product") },
      { id: "scene-b", kind: "skill", skillId: "ai-product", objective: "Create scene B", dependsOn: ["source"], inputs: { product: "source.output" }, output: "scene B", selectionReason: "This Skill owns product-faithful scene placement.", candidates: matches("ai-product") }
    ]
  });
  assert.deepEqual(validateOrchestrationPlan(parallel, skills).executionWaves, [["source"], ["scene-a", "scene-b"]]);
});

test("rejects an attempted single-step plan", () => {
  const falseMulti = proposal({
    intent: { ...proposal().intent, requiresResearch: false },
    planning: { reason: "dependency_chain", clarificationRequired: false },
    steps: [{ id: "expand", kind: "skill", skillId: "expand-image", objective: "Extend the supplied image", dependsOn: [], inputs: { image: "user.image" }, output: "expanded image", selectionReason: "This Skill owns ratio extension while preserving accepted content.", candidates: matches("expand-image") }]
  });
  assert.throws(() => validateOrchestrationPlan(falseMulti, skills), /at least two steps/);
});

test("accepts parallel independent deliverables without mislabeling them as a dependency chain", () => {
  const independent = proposal({
    intent: { ...proposal().intent, requiresResearch: false, deliverables: ["scene A", "scene B"] },
    planning: { reason: "multi_deliverable", clarificationRequired: false },
    steps: [
      { id: "scene-a", kind: "skill", skillId: "ai-product", objective: "Create scene A", dependsOn: [], inputs: { product: "user.product" }, output: "scene A", selectionReason: "This Skill owns product-faithful scene placement.", candidates: matches("ai-product") },
      { id: "scene-b", kind: "skill", skillId: "ai-product", objective: "Create scene B", dependsOn: [], inputs: { product: "user.product" }, output: "scene B", selectionReason: "This Skill owns product-faithful scene placement.", candidates: matches("ai-product") }
    ]
  });
  assert.deepEqual(validateOrchestrationPlan(independent, skills).executionWaves, [["scene-a", "scene-b"]]);
  assert.throws(() => validateOrchestrationPlan({
    ...independent,
    steps: [independent.steps[0], { ...independent.steps[1], dependsOn: ["scene-a"], inputs: { source: "scene-a.output" } }]
  }, skills), /cannot contain artifact dependencies/);
});

test("rejects non-finite intent confidence", () => {
  assert.throws(() => validateOrchestrationPlan(proposal({
    intent: { ...proposal().intent, confidence: Number.NaN }
  }), skills), /confidence must be between 0 and 1/);
});

test("requires planning ambiguity to agree with the clarification decision", () => {
  const mismatch = proposal({
    planning: { reason: "ambiguity", clarificationRequired: true }
  });
  assert.throws(() => validateOrchestrationPlan(mismatch, skills), /clarificationRequired must agree/);
});

test("accepts a first-party comic workflow as planning, character, page, and copy-repair nodes", () => {
  const comicSkills: RuntimeSkill[] = [
    { id: "plan-comic-storyboard", description: "Create a validated comic storyboard manifest." },
    { id: "create-character", description: "Create one canonical character sheet with an optional confirmed seven-asset expansion." },
    { id: "render-comic-page", description: "Render one approved comic page." },
    { id: "add-speech-bubble", description: "Add exact dialogue to accepted artwork." }
  ];
  const comicPlan: OrchestrationProposal = {
    intent: {
      raw: "Turn my courier story into a two-page Chinese comic with a recurring hero.",
      outcome: "Two finished, sequential Chinese comic pages",
      assets: [],
      constraints: ["same hero and wardrobe", "exact dialogue", "3:4 pages"],
      deliverables: ["page 1", "page 2"],
      requiresResearch: false,
      confidence: 0.95,
      ambiguities: []
    },
    planning: { reason: "dependency_chain", clarificationRequired: false },
    decision: "execute",
    steps: [
      { id: "storyboard", kind: "skill", skillId: "plan-comic-storyboard", objective: "Plan the exact two-page narrative", dependsOn: [], inputs: { story: "user.story" }, output: "validated comic manifest", selectionReason: "This Skill owns comic page and panel planning.", candidates: matches("plan-comic-storyboard", [["render-comic-page", 0.45]]) },
      { id: "hero", kind: "skill", skillId: "create-character", objective: "Create and review the recurring hero anchor", dependsOn: ["storyboard"], inputs: { character: "storyboard.characters.hero" }, output: "accepted canonical hero sheet and optional confirmed expansion", selectionReason: "This Skill owns the reusable identity anchor and its post-QA expansion gate.", candidates: matches("create-character", [["render-comic-page", 0.34]]) },
      { id: "page-1", kind: "skill", skillId: "render-comic-page", objective: "Render page 1", dependsOn: ["storyboard", "hero"], inputs: { page: "storyboard.pages[0]", character: "hero.output" }, output: "accepted page 1", selectionReason: "This Skill owns one finished reference-aware comic page.", candidates: matches("render-comic-page", [["add-speech-bubble", 0.28]]) },
      { id: "page-2", kind: "skill", skillId: "render-comic-page", objective: "Render page 2 with carried state", dependsOn: ["storyboard", "hero", "page-1"], inputs: { page: "storyboard.pages[1]", character: "hero.output", continuity: "page-1.output" }, output: "accepted page 2 artwork", selectionReason: "This Skill owns one page and can bind previous-page continuity.", candidates: matches("render-comic-page", [["add-speech-bubble", 0.28]]) },
      { id: "page-2-copy", kind: "skill", skillId: "add-speech-bubble", objective: "Repair page 2 exact dialogue only if flagged", dependsOn: ["page-2", "storyboard"], inputs: { artwork: "page-2.output", copy: "storyboard.pages[1].dialogue" }, output: "page 2 with exact dialogue", selectionReason: "This Skill owns bubble placement and exact copy without redrawing accepted artwork.", candidates: matches("add-speech-bubble", [["render-comic-page", 0.57]]) }
    ],
    finalAcceptance: ["Both pages are present in order.", "Hero identity and wardrobe are continuous.", "Approved Chinese dialogue is exact and readable."]
  };

  const plan = validateOrchestrationPlan(comicPlan, comicSkills);
  assert.deepEqual(plan.steps.map((step) => step.skillId), [
    "plan-comic-storyboard",
    "create-character",
    "render-comic-page",
    "render-comic-page",
    "add-speech-bubble"
  ]);
  assert.deepEqual(plan.steps[3].dependsOn, ["storyboard", "hero", "page-1"]);
});
