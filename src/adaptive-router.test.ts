import assert from "node:assert/strict";
import test from "node:test";
import { AdaptiveRouteError, validateAdaptiveRoute, type AdaptiveRouteProposal, type RuntimeSkill } from "./index.js";

const skills: RuntimeSkill[] = [
  { id: "ai-product", description: "Place one supplied product into a commercial scene." },
  { id: "poster-design", description: "Create a finished poster from supplied or generated visual assets." },
  { id: "expand-image", description: "Extend an accepted image to a requested ratio." }
];

const proposal = (overrides: Partial<AdaptiveRouteProposal> = {}): AdaptiveRouteProposal => ({
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
  decision: "execute",
  steps: [
    { id: "research", kind: "research", objective: "Verify destination requirements", dependsOn: [], inputs: {}, output: "verified requirements", selectionReason: "The destination is current and platform-specific." },
    { id: "scene", kind: "skill", skillId: "ai-product", objective: "Create product scene", dependsOn: ["research"], inputs: { product: "user.product", requirements: "research.output" }, output: "accepted scene", selectionReason: "Its use case owns product-faithful scene placement." },
    { id: "poster", kind: "skill", skillId: "poster-design", objective: "Build final poster", dependsOn: ["scene"], inputs: { visual: "scene.output" }, output: "final poster", selectionReason: "Its use case owns final poster composition." }
  ],
  finalAcceptance: ["Product identity is preserved.", "Poster follows verified requirements."],
  ...overrides
});

test("accepts a model-proposed multi-Skill DAG against the runtime registry", () => {
  const plan = validateAdaptiveRoute(proposal(), skills);
  assert.equal(plan.steps.length, 3);
  assert.equal(plan.availableSkillCount, 3);
});

test("accepts a newly installed Skill without changing an operation enum", () => {
  const runtime = [...skills, { id: "future-localizer", description: "Localize accepted commercial artwork." }];
  const next = proposal({
    intent: { ...proposal().intent, requiresResearch: false },
    steps: [{ id: "localize", kind: "skill", skillId: "future-localizer", objective: "Localize artwork", dependsOn: [], inputs: { artwork: "user.artwork" }, output: "localized artwork", selectionReason: "The runtime description exactly matches the requested transformation." }]
  });
  assert.equal(validateAdaptiveRoute(next, runtime).steps[0].skillId, "future-localizer");
});

test("rejects unavailable Skills and invalid dependency graphs", () => {
  assert.throws(() => validateAdaptiveRoute(proposal({ steps: [{ ...proposal().steps[0], kind: "skill", skillId: "invented-skill" }] }), skills), AdaptiveRouteError);
  const cyclic = proposal({
    intent: { ...proposal().intent, requiresResearch: false },
    steps: [
      { ...proposal().steps[1], dependsOn: ["poster"] },
      { ...proposal().steps[2], dependsOn: ["scene"] }
    ]
  });
  assert.throws(() => validateAdaptiveRoute(cyclic, skills), /dependency cycle/);
});

test("turns research and material ambiguity into explicit planning decisions", () => {
  const withoutResearch = proposal().steps.slice(1).map((step, index) => ({ ...step, dependsOn: index === 0 ? [] : step.dependsOn }));
  assert.throws(() => validateAdaptiveRoute(proposal({ steps: withoutResearch }), skills), /no research step/);
  const clarify = proposal({ decision: "clarify", clarification: "Which marketplace and locale should the final asset target?", steps: [] });
  assert.equal(validateAdaptiveRoute(clarify, skills).decision, "clarify");
});

test("accepts a first-party comic workflow as planning, character, page, and copy-repair nodes", () => {
  const comicSkills: RuntimeSkill[] = [
    { id: "plan-comic-storyboard", description: "Create a validated comic storyboard manifest." },
    { id: "create-character", description: "Create one canonical character sheet with an optional confirmed seven-asset expansion." },
    { id: "render-comic-page", description: "Render one approved comic page." },
    { id: "add-speech-bubble", description: "Add exact dialogue to accepted artwork." }
  ];
  const comicPlan: AdaptiveRouteProposal = {
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
    decision: "execute",
    steps: [
      { id: "storyboard", kind: "skill", skillId: "plan-comic-storyboard", objective: "Plan the exact two-page narrative", dependsOn: [], inputs: { story: "user.story" }, output: "validated comic manifest", selectionReason: "This Skill owns comic page and panel planning." },
      { id: "hero", kind: "skill", skillId: "create-character", objective: "Create and review the recurring hero anchor", dependsOn: ["storyboard"], inputs: { character: "storyboard.characters.hero" }, output: "accepted canonical hero sheet and optional confirmed expansion", selectionReason: "This Skill owns the reusable identity anchor and its post-QA expansion gate." },
      { id: "page-1", kind: "skill", skillId: "render-comic-page", objective: "Render page 1", dependsOn: ["storyboard", "hero"], inputs: { page: "storyboard.pages[0]", character: "hero.output" }, output: "accepted page 1", selectionReason: "This Skill owns one finished reference-aware comic page." },
      { id: "page-2", kind: "skill", skillId: "render-comic-page", objective: "Render page 2 with carried state", dependsOn: ["storyboard", "hero", "page-1"], inputs: { page: "storyboard.pages[1]", character: "hero.output", continuity: "page-1.output" }, output: "accepted page 2 artwork", selectionReason: "This Skill owns one page and can bind previous-page continuity." },
      { id: "page-2-copy", kind: "skill", skillId: "add-speech-bubble", objective: "Repair page 2 exact dialogue only if flagged", dependsOn: ["page-2"], inputs: { artwork: "page-2.output", copy: "storyboard.pages[1].dialogue" }, output: "page 2 with exact dialogue", selectionReason: "This Skill owns bubble placement and exact copy without redrawing accepted artwork." }
    ],
    finalAcceptance: ["Both pages are present in order.", "Hero identity and wardrobe are continuous.", "Approved Chinese dialogue is exact and readable."]
  };

  const plan = validateAdaptiveRoute(comicPlan, comicSkills);
  assert.deepEqual(plan.steps.map((step) => step.skillId), [
    "plan-comic-storyboard",
    "create-character",
    "render-comic-page",
    "render-comic-page",
    "add-speech-bubble"
  ]);
  assert.deepEqual(plan.steps[3].dependsOn, ["storyboard", "hero", "page-1"]);
});

test("accepts one create-character node with a canonical QA and optional expansion gate", () => {
  const characterSkills: RuntimeSkill[] = [
    { id: "create-character", description: "Create one canonical character sheet with an optional confirmed seven-asset expansion." }
  ];
  const characterPlan: AdaptiveRouteProposal = {
    intent: {
      raw: "Create a recurring manga hero and one finished key artwork for later pages.",
      outcome: "One reviewed canonical hero identity with an optional production expansion",
      assets: [],
      constraints: ["canonical sheet must finish first", "ask before the seven derived tasks", "same face, hair, proportions, wardrobe, palette, and signature prop", "batch count one"],
      deliverables: ["canonical sheet", "optional seven-asset expansion after confirmation"],
      requiresResearch: false,
      confidence: 0.96,
      ambiguities: []
    },
    decision: "execute",
    steps: [
      { id: "character-pack", kind: "skill", skillId: "create-character", objective: "Create and review the canonical hero, then offer the expansion", dependsOn: [], inputs: { character: "user.brief" }, output: "one canonical sheet and optional confirmed reference-bound assets", selectionReason: "This Skill owns the canonical identity, QA gate, and optional expansion." }
    ],
    finalAcceptance: ["One canonical sheet is returned before expansion approval.", "No derived task runs without confirmation.", "Any confirmed derived assets preserve the canonical identity and wardrobe invariants."]
  };

  const plan = validateAdaptiveRoute(characterPlan, characterSkills);
  assert.deepEqual(plan.steps.map((step) => step.skillId), ["create-character"]);
  assert.deepEqual(plan.steps[0].dependsOn, []);
});
