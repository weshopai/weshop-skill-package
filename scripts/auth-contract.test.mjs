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

test('native Tool wrapper contracts remain owned by the host', async () => {
  const [router, orchestrator, officialCli, packageJson] = await Promise.all([
    read('skills/weshop-router/SKILL.md'),
    read('skills/orchestrate-multi-step-workflow/SKILL.md'),
    read('skills/orchestrate-multi-step-workflow/references/official-cli.md'),
    read('package.json'),
  ]);

  assert.match(router, /host Tool owns its wrapper contract/);
  assert.match(orchestrator, /follow that Tool's current schema and errors/);
  assert.match(officialCli, /Wrapper fields are host contracts/);
  assert.doesNotMatch(`${router}\n${orchestrator}\n${officialCli}`, /tool-call-assembly\.md/);
  assert.ok(!JSON.parse(packageJson).files.includes('tool-call-assembly.md'));
});

test('package manifest declares every Desktop runtime resource', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  assert.deepEqual(packageJson.weshopDesktop, {
    schemaVersion: 1,
    runtimeResources: [
      'skills',
      'catalog/skills.json',
      'schemas/router-plan-request.schema.json',
      'schemas/router-plan.schema.json',
      'shared/model-selection.md',
      'LICENSE',
    ],
  });
});
