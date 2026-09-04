import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => readFile(path.join(root, relativePath), 'utf8');

test('managed native tools do not ask Desktop users for standalone API keys', async () => {
  const auth = await read('skills/orchestrate-multi-step-workflow/references/api-key-setup.md');
  assert.match(auth, /Managed native WeShop tool/);
  assert.match(auth, /Do not inspect `WESHOP_API_KEY`/);
  assert.match(auth, /Do not ask the user to create, paste, or configure an API Key/);
  assert.match(auth, /managed tool's explicit authentication error/);
});

test('standalone CLI keeps environment-only WESHOP_API_KEY setup', async () => {
  const auth = await read('skills/orchestrate-multi-step-workflow/references/api-key-setup.md');
  assert.match(auth, /Standalone CLI or unmanaged harness/);
  assert.match(auth, /non-empty `WESHOP_API_KEY`/);
  assert.match(auth, /authorization\/apikey/);
  assert.match(auth, /read -s WESHOP_API_KEY && export WESHOP_API_KEY/);
  assert.match(auth, /Do not ask the user to paste the key into chat/);
});

test('orchestrator and CLI reference select auth from the host contract', async () => {
  const [orchestrator, cli] = await Promise.all([
    read('skills/orchestrate-multi-step-workflow/SKILL.md'),
    read('skills/orchestrate-multi-step-workflow/references/official-cli.md'),
  ]);
  assert.match(orchestrator, /selects authentication by harness/);
  assert.match(orchestrator, /Never infer that managed authentication is missing/);
  assert.match(cli, /explicitly managed native WeShop tool wraps the CLI/);
  assert.match(cli, /empty Shell `WESHOP_API_KEY` is expected/);
});

test('Router delegates host and execution contracts to Runtime and downstream owners', async () => {
  const [router, orchestrator, officialCli, packageJson] = await Promise.all([
    read('skills/weshop-router/SKILL.md'),
    read('skills/orchestrate-multi-step-workflow/SKILL.md'),
    read('skills/orchestrate-multi-step-workflow/references/official-cli.md'),
    read('package.json'),
  ]);

  assert.match(router, /Agent Runtime already owns context, memory, permissions, tools, authentication, execution, receipts, recovery, and publication/);
  assert.match(router, /The selected Skill owns its working method, model and prompt choices, execution contract, and acceptance checks/);
  assert.match(router, /The selected workflow owns DAG materialization, artifact handoffs, execution order, and final acceptance/);
  assert.doesNotMatch(router, /WESHOP_API_KEY|authorization\/apikey|operationKey|submission receipt/);
  assert.match(orchestrator, /follow that Tool's current schema and errors/);
  assert.match(officialCli, /Wrapper fields are host contracts/);
  assert.doesNotMatch(`${router}\n${orchestrator}\n${officialCli}`, /tool-call-assembly\.md/);
  assert.ok(!JSON.parse(packageJson).files.includes('tool-call-assembly.md'));
});

test('Router is a one-read decision surface with complete fast paths', async () => {
  const router = await read('skills/weshop-router/SKILL.md');
  const commonRows = router.match(/^\| \d+ \|/gm) ?? [];
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
  for (const workflow of workflows) assert.ok(router.includes(`| \`${workflow}\` |`));
  assert.match(router, /Reading this file must end routing/);
  assert.match(router, /Planning budget: one Router read, one selected-owner read, zero confirmation passes/);
  assert.match(router, /More than one file does not by itself mean Workflow/);
  assert.match(router, /invoke `orchestrate-multi-step-workflow` with the selected workflow and available inputs/);
  assert.match(router, /Do not load \[task-routing\.md\].*during ordinary routing/s);
  assert.doesNotMatch(router, /read the matching entry in \[workflow-recipes\.md\]/);
});

test('package manifest declares every Desktop runtime resource', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  assert.deepEqual(packageJson.weshopDesktop, {
    schemaVersion: 1,
    runtimeResources: [
      'skills',
      'catalog/skills.json',
      'shared/model-selection.md',
      'LICENSE',
    ],
  });
});
