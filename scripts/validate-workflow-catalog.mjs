import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const catalog = JSON.parse(await readFile(path.join(root, "workflows", "catalog.json"), "utf8"));
if (catalog.schemaVersion !== "1.0.0" || !Array.isArray(catalog.workflows) || !catalog.workflows.length) {
  throw new Error("Workflow catalog must use schemaVersion 1.0.0 and contain workflows.");
}

const availableSkills = new Set((await readdir(path.join(root, "skills"), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name));
const workflowIds = new Set();

for (const workflow of catalog.workflows) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(workflow.id) || workflowIds.has(workflow.id)) {
    throw new Error(`Workflow id is invalid or duplicated: ${workflow.id}`);
  }
  workflowIds.add(workflow.id);
  if (!workflow.description?.trim() || !Array.isArray(workflow.requiredInputs) || !workflow.requiredInputs.length) {
    throw new Error(`Workflow metadata is incomplete: ${workflow.id}`);
  }
  if (!Array.isArray(workflow.steps) || !workflow.steps.length || !Array.isArray(workflow.finalAcceptance) || !workflow.finalAcceptance.length) {
    throw new Error(`Workflow execution contract is incomplete: ${workflow.id}`);
  }
  const steps = new Map();
  for (const step of workflow.steps) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(step.id) || steps.has(step.id)) {
      throw new Error(`Workflow step id is invalid or duplicated: ${workflow.id}/${step.id}`);
    }
    if (!Array.isArray(step.dependsOn) || !Array.isArray(step.inputs) || !step.output?.trim()) {
      throw new Error(`Workflow step contract is incomplete: ${workflow.id}/${step.id}`);
    }
    if (step.kind === "skill") {
      if (Boolean(step.skillId) === Boolean(step.skillSelector)) {
        throw new Error(`Skill step must declare exactly one owner or selector: ${workflow.id}/${step.id}`);
      }
      if (step.skillId && !availableSkills.has(step.skillId)) {
        throw new Error(`Workflow references an unavailable Skill: ${workflow.id}/${step.skillId}`);
      }
    } else if (step.kind !== "research") {
      throw new Error(`Workflow step kind is unsupported: ${workflow.id}/${step.id}`);
    }
    steps.set(step.id, step);
  }
  const visited = new Set();
  const active = new Set();
  const visit = (stepId) => {
    if (active.has(stepId)) throw new Error(`Workflow contains a dependency cycle: ${workflow.id}/${stepId}`);
    if (visited.has(stepId)) return;
    const step = steps.get(stepId);
    if (!step) throw new Error(`Workflow dependency does not exist: ${workflow.id}/${stepId}`);
    active.add(stepId);
    for (const dependency of step.dependsOn) visit(dependency);
    active.delete(stepId);
    visited.add(stepId);
  };
  for (const stepId of steps.keys()) visit(stepId);
}

const guide = await readFile(path.join(root, "routing", "guide.md"), "utf8");
for (const id of workflowIds) {
  if (!guide.includes(`\`${id}\``)) throw new Error(`Routing guide does not reference workflow: ${id}`);
}
console.log(`Valid workflow catalog: ${workflowIds.size} maintained workflows.`);
