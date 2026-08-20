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
