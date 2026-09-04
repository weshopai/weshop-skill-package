import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  ORCHESTRATOR_SKILL_ID,
  ROUTER_MAP_URL,
  SKILL_CATALOG_URL,
  RouterMapValidationError,
  loadAndValidateRouterMap,
  validateRouterMap,
} from './validate-router-map.mjs';

const [routingMap, catalog, requestSchema, planSchema] = await Promise.all([
  readFile(ROUTER_MAP_URL, 'utf8').then(JSON.parse),
  readFile(SKILL_CATALOG_URL, 'utf8').then(JSON.parse),
  readFile(new URL('../schemas/router-plan-request.schema.json', import.meta.url), 'utf8').then(JSON.parse),
  readFile(new URL('../schemas/router-plan.schema.json', import.meta.url), 'utf8').then(JSON.parse),
]);

const brokenMap = mutate => {
  const fixture = structuredClone(routingMap);
  mutate(fixture);
  return fixture;
};

const expectInvalid = (fixture, pattern) => {
  assert.throws(
    () => validateRouterMap(fixture, catalog),
    error => error instanceof RouterMapValidationError && pattern.test(error.message),
  );
};

test('canonical Router map validates against the current Skill catalog', async () => {
  const result = await loadAndValidateRouterMap();
  assert.deepEqual(result, {
    schemaVersion: '1.0.0',
    taskClasses: 11,
    tasks: 38,
    recipes: 7,
    catalogSkills: catalog.skills.length,
  });
});

test('routing schemas exclude Agent Runtime responsibilities', () => {
  const required = new Set(planSchema.required);
  for (const field of [
    'schemaVersion',
    'kind',
    'taskClassId',
    'selectionSource',
    'candidateSkillIds',
    'candidateWorkflowIds',
    'requiredInputs',
    'missingInputs',
    'reason',
    'nextAction',
    'availableSkillCount',
  ]) {
    assert.ok(required.has(field), `missing required Router decision field ${field}`);
  }
  for (const removed of ['activeLayers', 'steps', 'executionWaves', 'finalAcceptance', 'planning', 'professionalPackId']) {
    assert.equal(planSchema.properties[removed], undefined, `${removed} belongs outside Router output`);
  }
  assert.equal(planSchema.properties.schemaVersion.const, '2.0.0');
  assert.deepEqual(requestSchema.required, ['intent']);
  assert.equal(requestSchema.additionalProperties, false);
  for (const removed of ['signature', 'routeShape', 'memoryAvailable', 'professionalPackId', 'availableProfessionalPackIds']) {
    assert.equal(requestSchema.properties[removed], undefined, `${removed} belongs outside Router input`);
  }
  assert.equal(requestSchema.$defs.directDecision.properties.candidates.maxItems, 4);
  assert.equal(requestSchema.$defs.intent.properties.assets.$ref, '#/$defs/roleSet');
});

test('rejects duplicate task IDs', () => {
  const fixture = brokenMap(map => {
    map.tasks[1].id = map.tasks[0].id;
  });
  expectInvalid(fixture, /Duplicate task ID/);
});

test('rejects unknown and orchestrator Skill references', async t => {
  await t.test('unknown preferred Skill', () => {
    const fixture = brokenMap(map => {
      map.tasks[0].preferredSkillId = 'future-unregistered-skill';
    });
    expectInvalid(fixture, /references unknown catalog Skill/);
  });

  await t.test('orchestrator as a direct candidate', () => {
    const fixture = brokenMap(map => {
      map.taskClasses[0].commonSkillIds[0] = ORCHESTRATOR_SKILL_ID;
    });
    expectInvalid(fixture, /cannot directly reference the orchestrator/);
  });
});

test('keeps an indexed task shortlist within four total candidates', () => {
  const fixture = brokenMap(map => {
    map.tasks[0].neighborSkillIds.push('product-packaging');
  });
  expectInvalid(fixture, /preferred plus neighbors stays within 4 candidates/);
});

test('rejects dangling and asymmetric task-class recipe references', async t => {
  await t.test('dangling task recipe', () => {
    const fixture = brokenMap(map => {
      map.tasks[0].recipeId = 'missing-recipe';
    });
    expectInvalid(fixture, /references unknown recipe/);
  });

  await t.test('asymmetric task-class recipe', () => {
    const fixture = brokenMap(map => {
      map.taskClasses[0].recipeIds.push('multi-shot-video');
    });
    expectInvalid(fixture, /must reference each other/);
  });
});

test('rejects a task recipe that drops the task outcome owner', () => {
  const fixture = brokenMap(map => {
    const task = map.tasks.find(candidate => candidate.id === 'virtual-try-on');
    task.recipeId = 'multi-format-campaign';
  });
  expectInvalid(fixture, /drops outcome owner virtual-try-on/);
});

test('rejects a task recipe outside the task class boundary', () => {
  const fixture = brokenMap(map => {
    const task = map.tasks.find(candidate => candidate.id === 'logo-design');
    task.recipeId = 'multi-format-campaign';
  });
  expectInvalid(fixture, /task class single-creative-output is outside the recipe boundary/);
});

test('requires explicit all-class generalization for the research recipe wildcard', () => {
  const fixture = brokenMap(map => {
    const recipe = map.recipes.find(candidate => candidate.id === 'research-to-deliverable');
    recipe.generalizesAcrossTaskClasses = false;
  });
  expectInvalid(fixture, /must declare generalizesAcrossTaskClasses true/);
});

test('rejects missing, self, and cyclic step dependencies', async t => {
  await t.test('unknown dependency', () => {
    const fixture = brokenMap(map => {
      map.recipes[0].steps[1].dependsOn = ['missing-step'];
    });
    expectInvalid(fixture, /depends on unknown step/);
  });

  await t.test('dependency cycle', () => {
    const fixture = brokenMap(map => {
      map.recipes[0].steps[0].dependsOn = ['compose-detail-page'];
    });
    expectInvalid(fixture, /dependency cycle/);
  });
});

test('enforces Skill, research, and deterministic step field boundaries', async t => {
  await t.test('research cannot carry Skill candidates', () => {
    const fixture = brokenMap(map => {
      map.recipes[0].steps[0].preferredSkillIds = ['ai-product'];
    });
    expectInvalid(fixture, /research step and cannot define preferredSkillIds/);
  });

  await t.test('deterministic step needs an operation', () => {
    const fixture = brokenMap(map => {
      const recipe = map.recipes.find(candidate => candidate.id === 'multi-format-campaign');
      delete recipe.steps[0].operation;
    });
    expectInvalid(fixture, /deterministic step and requires operation/);
  });
});

test('validates artifact binding syntax and dependency ownership', async t => {
  await t.test('legacy colon syntax is rejected', () => {
    const fixture = brokenMap(map => {
      map.recipes[0].steps[1].inputs['product-source'] = 'step:verify-channel-requirements';
    });
    expectInvalid(fixture, /must bind as user\.role or step-id\.output/);
  });

  await t.test('upstream output must be an explicit dependency', () => {
    const fixture = brokenMap(map => {
      map.recipes[0].steps[1].dependsOn = [];
    });
    expectInvalid(fixture, /is not in dependsOn/);
  });

  await t.test('required step cannot hard-bind omitted optional output', () => {
    const fixture = brokenMap(map => {
      const recipe = map.recipes.find(candidate => candidate.id === 'multi-format-campaign');
      const finalStep = recipe.steps.find(step => step.id === 'build-delivery-manifest');
      finalStep.inputs.banner = 'produce-banner-branch.output';
    });
    expectInvalid(fixture, /cannot hard-bind optional step/);
  });

  await t.test('optional output bindings still require an explicit dependency', () => {
    const fixture = brokenMap(map => {
      const recipe = map.recipes.find(candidate => candidate.id === 'multi-format-campaign');
      const finalStep = recipe.steps.find(step => step.id === 'build-delivery-manifest');
      finalStep.dependsOn = finalStep.dependsOn.filter(id => id !== 'produce-banner-branch');
    });
    expectInvalid(fixture, /is not in dependsOn/);
  });
});

test('conditional recipe steps must be optional', () => {
  const fixture = brokenMap(map => {
    const recipe = map.recipes.find(candidate => candidate.id === 'multi-format-campaign');
    recipe.steps.find(step => step.id === 'produce-banner-branch').optional = false;
  });
  expectInvalid(fixture, /has a condition and must be optional/);
});

test('rejects an impossible minimum optional-output count', () => {
  const fixture = brokenMap(map => {
    const recipe = map.recipes.find(candidate => candidate.id === 'multi-format-campaign');
    recipe.minimumOptionalSteps = 99;
  });
  expectInvalid(fixture, /minimumOptionalSteps exceeds/);
});

test('requires final route acceptance for every recipe', () => {
  const fixture = brokenMap(map => {
    map.recipes[0].finalAcceptance = [];
  });
  expectInvalid(fixture, /finalAcceptance must contain at least 1 item/);
});

test('requires runtime semantic fallback and rejects static scores as intent scores', async t => {
  await t.test('runtime fallback stays enabled for custom Skills', () => {
    const fixture = brokenMap(map => {
      map.runtimeSemanticFallback.includeUnknownAndCustomSkills = false;
    });
    expectInvalid(fixture, /includeUnknownAndCustomSkills must be true/);
  });

  await t.test('relationship metadata cannot become runtime intent score', () => {
    const fixture = brokenMap(map => {
      map.classificationContract.staticRelationshipScoresAreRuntimeIntentScores = true;
    });
    expectInvalid(fixture, /Static relationship scores cannot be runtime intent scores/);
  });
});
