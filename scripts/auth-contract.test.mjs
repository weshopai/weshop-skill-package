import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => readFile(path.join(root, relativePath), 'utf8');

test('legacy authentication references remain source-only compatibility material', async () => {
  const auth = await read('compatibility/legacy-workflow-references/api-key-setup.md');
  assert.match(auth, /Managed native WeShop tool/);
  assert.match(auth, /Do not inspect `WESHOP_API_KEY`/);
  assert.match(auth, /Standalone CLI or unmanaged harness/);
  assert.match(auth, /read -s WESHOP_API_KEY && export WESHOP_API_KEY/);

  const packageJson = JSON.parse(await read('package.json'));
  assert.ok(!packageJson.files.some(entry => entry.startsWith('compatibility/')));
  assert.ok(!packageJson.weshopDesktop.runtimeResources.some(entry => entry.startsWith('compatibility/')));
});

test('protected routing and workflow resources delegate runtime responsibilities to the Host', async () => {
  const [routing, workflow, packageJson] = await Promise.all([
    read('routing/guide.md'),
    read('workflows/guide.md'),
    read('package.json'),
  ]);

  assert.match(routing, /Agent Runtime already owns context, memory, permissions, tools, authentication, execution, receipts, recovery, and publication/);
  assert.match(routing, /The selected Skill owns its working method, model and prompt choices, execution contract, and acceptance checks/);
  assert.match(routing, /The selected workflow owns artifact handoffs, execution order, and final acceptance/);
  assert.match(workflow, /Host Runtime owns capabilities, approvals, authentication, paid-operation confirmation, durable execution identity, receipts, retries, recovery, publication, and cancellation/);
  assert.doesNotMatch(`${routing}\n${workflow}`, /WESHOP_API_KEY|authorization\/apikey|operationKey|submission receipt|tool-call-assembly\.md/);
  assert.ok(!JSON.parse(packageJson).files.includes('tool-call-assembly.md'));
});

test('routing guide is a one-read decision surface with complete fast paths', async () => {
  const routing = await read('routing/guide.md');
  const commonRows = routing.match(/^\| \d+ \|/gm) ?? [];
  const workflows = [
    'product-detail-production',
    'multi-format-campaign',
    'comic-production',
    'multi-shot-video',
    'visual-localization-set',
    'cutout-to-layout',
    'research-to-deliverable',
  ];

  assert.equal(commonRows.length, 38);
  for (const workflow of workflows) assert.ok(routing.includes(`| \`${workflow}\` |`));
  assert.match(routing, /Reading this file must end routing/);
  assert.match(routing, /Planning budget: one routing-guide read, one selected-owner read, zero confirmation passes/);
  assert.match(routing, /More than one file does not by itself mean Workflow/);
  assert.match(routing, /read the selected workflow definition and execute it under the workflow guide/);
  assert.doesNotMatch(routing, /invoke `orchestrate-multi-step-workflow`/);
});

test('package manifest declares every Desktop runtime resource', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  assert.deepEqual(packageJson.weshopDesktop, {
    schemaVersion: 1,
    runtimeResources: [
      'skills',
      'catalog/skills.json',
      'routing/guide.md',
      'workflows/guide.md',
      'workflows/catalog.json',
      'shared/model-selection.md',
      'LICENSE',
    ],
  });
});
