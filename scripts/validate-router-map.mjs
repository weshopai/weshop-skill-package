import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ORCHESTRATOR_SKILL_ID = 'orchestrate-multi-step-workflow';
export const ROUTER_MAP_URL = new URL('../skills/weshop-router/references/routing-map.json', import.meta.url);
export const SKILL_CATALOG_URL = new URL('../catalog/skills.json', import.meta.url);

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const REQUIRED_LAYER_IDS = [
  'host-contract',
  'memory-context',
  'router-decision',
  'execution-base',
  'creative-atom',
  'orchestration',
  'prompt-specialist',
  'meta-system',
  'professional-pack',
];
const REQUIRED_RECIPE_IDS = [
  'product-detail-production',
  'multi-format-campaign',
  'comic-production',
  'multi-shot-video',
  'visual-localization-set',
  'cutout-to-layout',
  'research-to-deliverable',
];
const REQUIRED_TASK_CLASS_IDS = [
  'single-creative-output',
  'precision-edit',
  'commerce-fashion',
  'portrait-character',
  'layout-social-series',
  'narrative-sequence',
  'campaign-bundle',
  'post-production',
  'spatial-technical',
  'prompt-planning-diagnostics',
  'meta-system',
];

export class RouterMapValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RouterMapValidationError';
  }
}

const fail = message => {
  throw new RouterMapValidationError(message);
};

const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);

function expectObject(value, location) {
  if (!isObject(value)) fail(`${location} must be an object.`);
  return value;
}

function expectArray(value, location, { min = 0 } = {}) {
  if (!Array.isArray(value)) fail(`${location} must be an array.`);
  if (value.length < min) fail(`${location} must contain at least ${min} item${min === 1 ? '' : 's'}.`);
  return value;
}

function expectString(value, location) {
  if (typeof value !== 'string' || !value.trim()) fail(`${location} must be a non-empty string.`);
  return value;
}

function expectId(value, location) {
  expectString(value, location);
  if (!ID_PATTERN.test(value)) fail(`${location} must be a lowercase kebab-case ID.`);
  return value;
}

function expectStringArray(value, location, options = {}) {
  const values = expectArray(value, location, options);
  values.forEach((entry, index) => expectString(entry, `${location}[${index}]`));
  return values;
}

function ensureUnique(values, location, key = value => value) {
  const seen = new Set();
  for (const value of values) {
    const id = key(value);
    if (seen.has(id)) fail(`Duplicate ${location} ID: ${id}.`);
    seen.add(id);
  }
  return seen;
}

function ensureUniqueStrings(values, location) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) fail(`${location} contains a duplicate value: ${value}.`);
    seen.add(value);
  }
  return seen;
}

function requireFields(record, fields, location) {
  for (const field of fields) {
    if (!(field in record)) fail(`${location} is missing required field ${field}.`);
  }
}

function validateCatalog(catalog) {
  expectObject(catalog, 'catalog');
  const skills = expectArray(catalog.skills, 'catalog.skills', { min: 1 });
  const ids = new Set();
  skills.forEach((skill, index) => {
    expectObject(skill, `catalog.skills[${index}]`);
    const id = expectId(skill.id, `catalog.skills[${index}].id`);
    if (ids.has(id)) fail(`Duplicate catalog Skill ID: ${id}.`);
    ids.add(id);
  });
  return ids;
}

function validateClassificationContract(map) {
  const contract = expectObject(map.classificationContract, 'classificationContract');
  if (contract.method !== 'semantic-intent-card') {
    fail('classificationContract.method must be semantic-intent-card.');
  }
  const compareOn = expectStringArray(contract.compareOn, 'classificationContract.compareOn', { min: 5 });
  ensureUniqueStrings(compareOn, 'classificationContract.compareOn');
  const forbidden = expectStringArray(contract.forbiddenMechanisms, 'classificationContract.forbiddenMechanisms', { min: 3 });
  for (const mechanism of ['raw-text-keyword-classification', 'closed-operation-enum', 'static-category-as-final-dispatch']) {
    if (!forbidden.includes(mechanism)) fail(`classificationContract must forbid ${mechanism}.`);
  }
  if (contract.relationshipMetadataRole !== 'candidate-discovery-only') {
    fail('Static relationship metadata must be candidate-discovery-only.');
  }
  if (contract.runtimeIntentScoreSource !== 'request-specific-semantic-comparison') {
    fail('Runtime intent scores must come from request-specific semantic comparison.');
  }
  if (contract.staticRelationshipScoresAreRuntimeIntentScores !== false) {
    fail('Static relationship scores cannot be runtime intent scores.');
  }
  const modePolicy = expectObject(contract.modePolicy, 'classificationContract.modePolicy');
  for (const mode of ['direct', 'orchestrate', 'clarify']) {
    expectString(modePolicy[mode], `classificationContract.modePolicy.${mode}`);
  }
}

function validateRuntimeFallback(map) {
  const fallback = expectObject(map.runtimeSemanticFallback, 'runtimeSemanticFallback');
  const required = {
    enabled: true,
    selectionSource: 'runtime-fallback',
    registrySource: 'runtime-visible-skill-descriptions',
    strategy: 'semantic-intent-scoring',
    includeUnknownAndCustomSkills: true,
    closedOperationEnum: false,
    keywordClassifier: false,
  };
  for (const [field, expected] of Object.entries(required)) {
    if (fallback[field] !== expected) {
      fail(`runtimeSemanticFallback.${field} must be ${JSON.stringify(expected)}.`);
    }
  }
  expectString(fallback.candidateContract, 'runtimeSemanticFallback.candidateContract');
  expectString(fallback.fallbackContract, 'runtimeSemanticFallback.fallbackContract');
}

function validateLoadPolicy(map) {
  const loadPolicy = expectObject(map.loadPolicy, 'loadPolicy');
  const always = expectStringArray(loadPolicy.always, 'loadPolicy.always', { min: 3 });
  ensureUniqueStrings(always, 'loadPolicy.always');
  for (const id of ['host-contract', 'router-decision', 'execution-base']) {
    if (!always.includes(id)) fail(`loadPolicy.always must include ${id}.`);
  }
  if (loadPolicy.taskClasses !== 'matched-only') fail('loadPolicy.taskClasses must be matched-only.');
  if (loadPolicy.tasks !== 'matched-only') fail('loadPolicy.tasks must be matched-only.');
  if (loadPolicy.recipes !== 'selected-only') fail('loadPolicy.recipes must be selected-only.');
  if (loadPolicy.nodeOwnerDetails !== 'on-demand') fail('loadPolicy.nodeOwnerDetails must be on-demand.');
  expectStringArray(loadPolicy.nodeOwnerDetailExamples, 'loadPolicy.nodeOwnerDetailExamples', { min: 3 });
  expectString(loadPolicy.exclusion, 'loadPolicy.exclusion');
}

function validateLayers(map) {
  const layers = expectArray(map.layers, 'layers', { min: REQUIRED_LAYER_IDS.length });
  const layerIds = ensureUnique(layers, 'layer', layer => expectId(layer.id, 'layers[].id'));
  const byId = new Map();
  layers.forEach((layer, index) => {
    const location = `layers[${index}]`;
    expectObject(layer, location);
    requireFields(layer, ['id', 'label', 'identity', 'precedence', 'activation', 'loadPolicy', 'ruleAuthority', 'scope', 'owns', 'cannotOverride'], location);
    expectString(layer.label, `${location}.label`);
    expectString(layer.identity, `${location}.identity`);
    if (!Number.isFinite(layer.precedence)) fail(`${location}.precedence must be a finite number.`);
    expectString(layer.activation, `${location}.activation`);
    if (!['always', 'on-demand', 'selected-only'].includes(layer.loadPolicy)) {
      fail(`${location}.loadPolicy must be always, on-demand, or selected-only.`);
    }
    expectString(layer.ruleAuthority, `${location}.ruleAuthority`);
    expectString(layer.scope, `${location}.scope`);
    expectStringArray(layer.owns, `${location}.owns`, { min: 1 });
    expectStringArray(layer.cannotOverride, `${location}.cannotOverride`);
    byId.set(layer.id, layer);
  });
  for (const id of REQUIRED_LAYER_IDS) {
    if (!layerIds.has(id)) fail(`Missing required layer: ${id}.`);
  }

  const host = byId.get('host-contract');
  if (host.activation !== 'always' || host.loadPolicy !== 'always' || host.ruleAuthority !== 'highest') {
    fail('host-contract must always load with highest rule authority.');
  }
  if (layers.some(layer => layer.id !== host.id && layer.precedence >= host.precedence)) {
    fail('host-contract must have strictly highest precedence.');
  }

  const memory = byId.get('memory-context');
  if (memory.dataOnly !== true || memory.ruleAuthority !== 'none') {
    fail('memory-context must be data-only and have no rule authority.');
  }

  const decision = byId.get('router-decision');
  if (decision.activation !== 'always' || decision.loadPolicy !== 'always') {
    fail('router-decision must always load.');
  }

  const execution = byId.get('execution-base');
  if (execution.activation !== 'every-execution' || execution.loadPolicy !== 'always') {
    fail('execution-base must load for every execution.');
  }

  const atom = byId.get('creative-atom');
  if (atom.ownership !== 'one complete operation or deliverable' || atom.loadPolicy !== 'selected-only') {
    fail('creative-atom must be the selected owner of one complete operation or deliverable.');
  }

  const orchestration = byId.get('orchestration');
  if (orchestration.activation !== 'multi-output-or-dependency-only' || orchestration.loadPolicy !== 'selected-only') {
    fail('orchestration must be selected only for multi-output or dependency work.');
  }
  if (orchestration.uniqueOrchestratorSkillId !== ORCHESTRATOR_SKILL_ID) {
    fail(`orchestration.uniqueOrchestratorSkillId must be ${ORCHESTRATOR_SKILL_ID}.`);
  }

  const prompt = byId.get('prompt-specialist');
  if (prompt.activation !== 'prompt-only' || prompt.executionAllowed !== false) {
    fail('prompt-specialist must be prompt-only and cannot imply media execution.');
  }

  const meta = byId.get('meta-system');
  if (meta.activation !== 'management-only' || meta.executionAllowed !== false) {
    fail('meta-system must be management-only and cannot imply creative execution.');
  }

  const professional = byId.get('professional-pack');
  if (professional.activation !== 'explicit-selection-or-clear-semantic-match' || professional.overlayOnly !== true || professional.loadPolicy !== 'selected-only') {
    fail('professional-pack must be a selected-only explicit or clearly matched overlay.');
  }
  for (const boundary of ['host-contract', 'runtime-skill-registry', 'execution-base']) {
    if (!professional.cannotOverride.includes(boundary)) {
      fail(`professional-pack cannotOverride must include ${boundary}.`);
    }
  }

  return byId;
}

function makeSkillRefValidator(catalogIds) {
  return (skillId, location) => {
    expectId(skillId, location);
    if (skillId === ORCHESTRATOR_SKILL_ID) {
      fail(`${location} cannot directly reference the orchestrator ${ORCHESTRATOR_SKILL_ID}.`);
    }
    if (!catalogIds.has(skillId)) fail(`${location} references unknown catalog Skill: ${skillId}.`);
  };
}

function validateTaskClasses(map, validateSkillRef) {
  const taskClasses = expectArray(map.taskClasses, 'taskClasses', { min: REQUIRED_TASK_CLASS_IDS.length });
  const ids = ensureUnique(taskClasses, 'task class', taskClass => expectId(taskClass.id, 'taskClasses[].id'));
  for (const requiredId of REQUIRED_TASK_CLASS_IDS) {
    if (!ids.has(requiredId)) fail(`Missing required task class: ${requiredId}.`);
  }
  taskClasses.forEach((taskClass, index) => {
    const location = `taskClasses[${index}]`;
    expectObject(taskClass, location);
    requireFields(taskClass, ['id', 'label', 'loadPolicy', 'defaultMode', 'useWhen', 'directWhen', 'orchestrateWhen', 'commonSkillIds', 'recipeIds'], location);
    expectString(taskClass.label, `${location}.label`);
    if (taskClass.loadPolicy !== 'matched-only') fail(`${location}.loadPolicy must be matched-only.`);
    if (!['direct', 'orchestrate'].includes(taskClass.defaultMode)) {
      fail(`${location}.defaultMode must be direct or orchestrate; clarify requires a request-specific blocker.`);
    }
    expectString(taskClass.useWhen, `${location}.useWhen`);
    expectString(taskClass.directWhen, `${location}.directWhen`);
    expectString(taskClass.orchestrateWhen, `${location}.orchestrateWhen`);
    const commonSkillIds = expectStringArray(taskClass.commonSkillIds, `${location}.commonSkillIds`, { min: 1 });
    ensureUniqueStrings(commonSkillIds, `${location}.commonSkillIds`);
    commonSkillIds.forEach((skillId, skillIndex) => validateSkillRef(skillId, `${location}.commonSkillIds[${skillIndex}]`));
    const recipeIds = expectStringArray(taskClass.recipeIds, `${location}.recipeIds`);
    recipeIds.forEach((recipeId, recipeIndex) => expectId(recipeId, `${location}.recipeIds[${recipeIndex}]`));
    ensureUniqueStrings(recipeIds, `${location}.recipeIds`);
  });
  return { taskClasses, ids, byId: new Map(taskClasses.map(taskClass => [taskClass.id, taskClass])) };
}

function validateFastPathTasks(map, taskClassIds, recipeIds, validateSkillRef) {
  const tasks = expectArray(map.tasks, 'tasks', { min: 25 });
  ensureUnique(tasks, 'task', task => expectId(task.id, 'tasks[].id'));
  tasks.forEach((task, index) => {
    const location = `tasks[${index}]`;
    expectObject(task, location);
    requireFields(task, [
      'id',
      'label',
      'loadPolicy',
      'taskClassId',
      'useWhen',
      'requiredInputRoles',
      'preferredSkillId',
      'neighborSkillIds',
      'directWhen',
      'escalateWhen',
    ], location);
    expectString(task.label, `${location}.label`);
    if (task.loadPolicy !== 'matched-only') fail(`${location}.loadPolicy must be matched-only.`);
    expectId(task.taskClassId, `${location}.taskClassId`);
    if (!taskClassIds.has(task.taskClassId)) fail(`${location}.taskClassId references unknown task class: ${task.taskClassId}.`);
    expectString(task.useWhen, `${location}.useWhen`);
    const inputRoles = expectStringArray(task.requiredInputRoles, `${location}.requiredInputRoles`, { min: 1 });
    ensureUniqueStrings(inputRoles, `${location}.requiredInputRoles`);
    validateSkillRef(task.preferredSkillId, `${location}.preferredSkillId`);
    const neighbors = expectStringArray(task.neighborSkillIds, `${location}.neighborSkillIds`, { min: 2 });
    if (neighbors.length > 3) fail(`${location}.neighborSkillIds must contain no more than 3 focused neighbors so preferred plus neighbors stays within 4 candidates.`);
    ensureUniqueStrings(neighbors, `${location}.neighborSkillIds`);
    neighbors.forEach((skillId, skillIndex) => validateSkillRef(skillId, `${location}.neighborSkillIds[${skillIndex}]`));
    if (neighbors.includes(task.preferredSkillId)) fail(`${location}.neighborSkillIds cannot repeat preferredSkillId.`);
    expectString(task.directWhen, `${location}.directWhen`);
    expectString(task.escalateWhen, `${location}.escalateWhen`);
    if ('recipeId' in task) {
      expectId(task.recipeId, `${location}.recipeId`);
      if (!recipeIds.has(task.recipeId)) fail(`${location}.recipeId references unknown recipe: ${task.recipeId}.`);
    }
    if ('intentMatchScore' in task || 'relationshipScore' in task) {
      fail(`${location} cannot persist a runtime intent score or use a static relationship score as one.`);
    }
  });
  return tasks;
}

function validateStepKindFields(step, location, validateSkillRef) {
  const hasPreferredSkills = Object.hasOwn(step, 'preferredSkillIds');
  const hasResearchScope = Object.hasOwn(step, 'researchScope');
  const hasOperation = Object.hasOwn(step, 'operation');
  if (step.kind === 'skill') {
    if (!hasPreferredSkills) fail(`${location} is a Skill step and requires preferredSkillIds.`);
    if (hasResearchScope || hasOperation) fail(`${location} is a Skill step and cannot define researchScope or operation.`);
    const preferred = expectStringArray(step.preferredSkillIds, `${location}.preferredSkillIds`, { min: 1 });
    ensureUniqueStrings(preferred, `${location}.preferredSkillIds`);
    preferred.forEach((skillId, index) => validateSkillRef(skillId, `${location}.preferredSkillIds[${index}]`));
    return;
  }
  if (step.kind === 'research') {
    if (!hasResearchScope) fail(`${location} is a research step and requires researchScope.`);
    if (hasPreferredSkills || hasOperation) fail(`${location} is a research step and cannot define preferredSkillIds or operation.`);
    expectString(step.researchScope, `${location}.researchScope`);
    return;
  }
  if (step.kind === 'deterministic') {
    if (!hasOperation) fail(`${location} is a deterministic step and requires operation.`);
    if (hasPreferredSkills || hasResearchScope) fail(`${location} is a deterministic step and cannot define preferredSkillIds or researchScope.`);
    expectString(step.operation, `${location}.operation`);
    return;
  }
  fail(`${location}.kind must be skill, research, or deterministic.`);
}

function validateRecipeSteps(recipe, recipeLocation, validateSkillRef) {
  const steps = expectArray(recipe.steps, `${recipeLocation}.steps`, { min: 2 });
  const stepIds = ensureUnique(steps, `step in recipe ${recipe.id}`, step => expectId(step.id, `${recipeLocation}.steps[].id`));
  const byId = new Map();
  steps.forEach((step, index) => {
    const location = `${recipeLocation}.steps[${index}]`;
    expectObject(step, location);
    requireFields(step, ['id', 'kind', 'objective', 'dependsOn', 'inputs', 'output'], location);
    expectString(step.objective, `${location}.objective`);
    const dependencies = expectStringArray(step.dependsOn, `${location}.dependsOn`);
    ensureUniqueStrings(dependencies, `${location}.dependsOn`);
    expectObject(step.inputs, `${location}.inputs`);
    for (const [role, binding] of Object.entries(step.inputs)) {
      expectString(role, `${location}.inputs role`);
      expectString(binding, `${location}.inputs.${role}`);
    }
    if ('optionalInputs' in step) {
      expectObject(step.optionalInputs, `${location}.optionalInputs`);
      for (const [role, binding] of Object.entries(step.optionalInputs)) {
        expectString(role, `${location}.optionalInputs role`);
        expectString(binding, `${location}.optionalInputs.${role}`);
        if (Object.hasOwn(step.inputs, role)) fail(`${location} repeats input role ${role} in inputs and optionalInputs.`);
      }
    }
    expectString(step.output, `${location}.output`);
    if ('condition' in step) {
      expectString(step.condition, `${location}.condition`);
      if (step.optional !== true) fail(`${location} has a condition and must be optional.`);
    }
    if ('repeatFor' in step) expectString(step.repeatFor, `${location}.repeatFor`);
    if ('parallelGroup' in step) expectString(step.parallelGroup, `${location}.parallelGroup`);
    if ('optional' in step && typeof step.optional !== 'boolean') fail(`${location}.optional must be a boolean.`);
    if ('includeWhenInputMissing' in step) {
      expectString(step.includeWhenInputMissing, `${location}.includeWhenInputMissing`);
      if (step.optional !== true) fail(`${location}.includeWhenInputMissing is valid only on an optional step.`);
      if (!Object.values(step.optionalInputs ?? {}).includes(`user.${step.includeWhenInputMissing}`)) {
        fail(`${location}.includeWhenInputMissing must name one of the step's optional user input bindings.`);
      }
    }
    validateStepKindFields(step, location, validateSkillRef);
    byId.set(step.id, step);
  });

  for (const step of steps) {
    for (const dependency of step.dependsOn) {
      if (!stepIds.has(dependency)) fail(`Recipe ${recipe.id} step ${step.id} depends on unknown step: ${dependency}.`);
      if (dependency === step.id) fail(`Recipe ${recipe.id} step ${step.id} cannot depend on itself.`);
    }
    for (const [field, bindings] of [['inputs', step.inputs], ['optionalInputs', step.optionalInputs ?? {}]]) {
      for (const [role, binding] of Object.entries(bindings)) {
        if (binding.startsWith('user.')) {
          if (!binding.slice('user.'.length)) fail(`Recipe ${recipe.id} step ${step.id} input ${role} has an empty user binding.`);
          continue;
        }
        const match = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.output$/.exec(binding);
        if (!match) {
          fail(`Recipe ${recipe.id} step ${step.id} input ${role} must bind as user.role or step-id.output.`);
        }
        const sourceId = match[1];
        if (!step.dependsOn.includes(sourceId)) {
          fail(`Recipe ${recipe.id} step ${step.id} input ${role} binds ${sourceId}.output but ${sourceId} is not in dependsOn.`);
        }
        const source = byId.get(sourceId);
        if (!source) fail(`Recipe ${recipe.id} step ${step.id} input ${role} binds unknown step: ${sourceId}.`);
        if (field === 'inputs' && source.optional === true && step.optional !== true) {
          fail(`Recipe ${recipe.id} required step ${step.id} cannot hard-bind optional step ${sourceId}.`);
        }
      }
    }
  }

  const visiting = new Set();
  const visited = new Set();
  const visit = stepId => {
    if (visiting.has(stepId)) fail(`Recipe ${recipe.id} has a dependency cycle involving step ${stepId}.`);
    if (visited.has(stepId)) return;
    visiting.add(stepId);
    for (const dependency of byId.get(stepId).dependsOn) visit(dependency);
    visiting.delete(stepId);
    visited.add(stepId);
  };
  for (const stepId of stepIds) visit(stepId);
}

function validateRecipes(map, taskClasses, taskClassIds, validateSkillRef) {
  const recipes = expectArray(map.recipes, 'recipes', { min: REQUIRED_RECIPE_IDS.length });
  const recipeIds = ensureUnique(recipes, 'recipe', recipe => expectId(recipe.id, 'recipes[].id'));
  for (const requiredId of REQUIRED_RECIPE_IDS) {
    if (!recipeIds.has(requiredId)) fail(`Missing required recipe: ${requiredId}.`);
  }
  const recipesById = new Map(recipes.map(recipe => [recipe.id, recipe]));
  recipes.forEach((recipe, index) => {
    const location = `recipes[${index}]`;
    expectObject(recipe, location);
    requireFields(recipe, [
      'id',
      'label',
      'loadPolicy',
      'taskClassIds',
      'useWhen',
      'directInsteadWhen',
      'requiredInputRoles',
      'steps',
      'finalAcceptance',
    ], location);
    expectString(recipe.label, `${location}.label`);
    if (recipe.loadPolicy !== 'selected-only') fail(`${location}.loadPolicy must be selected-only.`);
    const ownerClassIds = expectStringArray(recipe.taskClassIds, `${location}.taskClassIds`, { min: 1 });
    ensureUniqueStrings(ownerClassIds, `${location}.taskClassIds`);
    ownerClassIds.forEach((taskClassId, taskClassIndex) => {
      if (taskClassId === '*') return;
      expectId(taskClassId, `${location}.taskClassIds[${taskClassIndex}]`);
      if (!taskClassIds.has(taskClassId)) fail(`${location}.taskClassIds references unknown task class: ${taskClassId}.`);
    });
    if (ownerClassIds.includes('*')) {
      if (ownerClassIds.length !== 1) fail(`${location}.taskClassIds wildcard must be the only entry.`);
      if (recipe.generalizesAcrossTaskClasses !== true) fail(`${location} uses taskClassIds wildcard and must declare generalizesAcrossTaskClasses true.`);
    } else if (recipe.generalizesAcrossTaskClasses === true) {
      fail(`${location}.generalizesAcrossTaskClasses requires taskClassIds ["*"].`);
    }
    expectString(recipe.useWhen, `${location}.useWhen`);
    expectString(recipe.directInsteadWhen, `${location}.directInsteadWhen`);
    const inputRoles = expectStringArray(recipe.requiredInputRoles, `${location}.requiredInputRoles`, { min: 1 });
    ensureUniqueStrings(inputRoles, `${location}.requiredInputRoles`);
    validateRecipeSteps(recipe, location, validateSkillRef);
    if ('minimumOptionalSteps' in recipe) {
      if (!Number.isInteger(recipe.minimumOptionalSteps) || recipe.minimumOptionalSteps < 1) {
        fail(`${location}.minimumOptionalSteps must be a positive integer.`);
      }
      const optionalStepCount = recipe.steps.filter(step => step.optional === true).length;
      if (recipe.minimumOptionalSteps > optionalStepCount) {
        fail(`${location}.minimumOptionalSteps exceeds its ${optionalStepCount} optional steps.`);
      }
    }
    const finalAcceptance = expectStringArray(recipe.finalAcceptance, `${location}.finalAcceptance`, { min: 1 });
    ensureUniqueStrings(finalAcceptance, `${location}.finalAcceptance`);
  });

  for (const taskClass of taskClasses) {
    for (const recipeId of taskClass.recipeIds) {
      const recipe = recipesById.get(recipeId);
      if (!recipe) fail(`Task class ${taskClass.id} references unknown recipe: ${recipeId}.`);
      if (!recipe.taskClassIds.includes('*') && !recipe.taskClassIds.includes(taskClass.id)) {
        fail(`Task class ${taskClass.id} and recipe ${recipeId} must reference each other.`);
      }
    }
  }
  for (const recipe of recipes) {
    for (const taskClassId of recipe.taskClassIds) {
      if (taskClassId === '*') continue;
      const taskClass = taskClasses.find(candidate => candidate.id === taskClassId);
      if (!taskClass.recipeIds.includes(recipe.id)) {
        fail(`Recipe ${recipe.id} and task class ${taskClassId} must reference each other.`);
      }
    }
  }

  return { recipes, recipeIds };
}

function validateTaskRecipeCompatibility(tasks, recipes) {
  const recipesById = new Map(recipes.map(recipe => [recipe.id, recipe]));
  for (const task of tasks) {
    if (!task.recipeId) continue;
    const recipe = recipesById.get(task.recipeId);
    if (!recipe) continue;
    if (!recipe.taskClassIds.includes('*') && !recipe.taskClassIds.includes(task.taskClassId)) {
      fail(`Task ${task.id} cannot use recipe ${recipe.id}: task class ${task.taskClassId} is outside the recipe boundary.`);
    }
    const recipeSkillIds = new Set(recipe.steps.flatMap(step => step.preferredSkillIds ?? []));
    if (!recipeSkillIds.has(task.preferredSkillId)) {
      fail(`Task ${task.id} cannot use recipe ${recipe.id}: the recipe drops outcome owner ${task.preferredSkillId}.`);
    }
  }
}

export function validateRouterMap(map, catalog) {
  expectObject(map, 'router map');
  expectString(map.schemaVersion, 'schemaVersion');
  expectString(map.purpose, 'purpose');
  const catalogIds = validateCatalog(catalog);
  const validateSkillRef = makeSkillRefValidator(catalogIds);

  validateClassificationContract(map);
  validateRuntimeFallback(map);
  validateLoadPolicy(map);
  validateLayers(map);
  const taskClassResult = validateTaskClasses(map, validateSkillRef);

  // Recipe IDs are established before task fast paths so an optional task.recipeId
  // can be checked without making the task taxonomy a closed operation enum.
  const recipeShells = expectArray(map.recipes, 'recipes', { min: REQUIRED_RECIPE_IDS.length });
  const recipeIds = ensureUnique(recipeShells, 'recipe', recipe => expectId(recipe.id, 'recipes[].id'));
  const tasks = validateFastPathTasks(map, taskClassResult.ids, recipeIds, validateSkillRef);
  const recipeResult = validateRecipes(map, taskClassResult.taskClasses, taskClassResult.ids, validateSkillRef);
  validateTaskRecipeCompatibility(tasks, recipeResult.recipes);

  return {
    schemaVersion: map.schemaVersion,
    layers: map.layers.length,
    taskClasses: taskClassResult.taskClasses.length,
    tasks: tasks.length,
    recipes: recipeResult.recipes.length,
    catalogSkills: catalogIds.size,
  };
}

async function readJson(location, label) {
  try {
    return JSON.parse(await readFile(location, 'utf8'));
  } catch (error) {
    throw new RouterMapValidationError(`Unable to read ${label}: ${error.message}`);
  }
}

function toLocation(value, fallbackUrl) {
  if (!value) return fallbackUrl;
  if (value instanceof URL) return value;
  return pathToFileURL(path.resolve(value));
}

export async function loadAndValidateRouterMap({ mapPath, catalogPath } = {}) {
  const [map, catalog] = await Promise.all([
    readJson(toLocation(mapPath, ROUTER_MAP_URL), 'router map'),
    readJson(toLocation(catalogPath, SKILL_CATALOG_URL), 'Skill catalog'),
  ]);
  return validateRouterMap(map, catalog);
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  try {
    const result = await loadAndValidateRouterMap({
      mapPath: process.argv[2],
      catalogPath: process.argv[3],
    });
    console.log(
      `Valid Router map ${result.schemaVersion}: ${result.layers} layers, ${result.taskClasses} classes, ${result.tasks} task fast paths, ${result.recipes} recipes, ${result.catalogSkills} catalog Skills.`,
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
