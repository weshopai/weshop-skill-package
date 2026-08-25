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

test('direct and orchestrated wrapper paths load the shared assembly contract', async () => {
  const [router, orchestrator, officialCli, assembly, packageJson] = await Promise.all([
    read('skills/weshop-router/SKILL.md'),
    read('skills/orchestrate-multi-step-workflow/SKILL.md'),
    read('skills/orchestrate-multi-step-workflow/references/official-cli.md'),
    read('tool-call-assembly.md'),
    read('package.json'),
  ]);

  assert.match(router, /\[tool-call assembly reference\]\(\.\.\/\.\.\/tool-call-assembly\.md\)/);
  assert.match(orchestrator, /\[tool-call assembly reference\]\(\.\.\/\.\.\/tool-call-assembly\.md\)/);
  assert.match(router, /After any schema or argument-assembly validation error, read it again/);
  assert.match(orchestrator, /After any schema or argument-assembly validation error, read that reference again/);
  assert.match(officialCli, /\[tool-call assembly reference\]\(\.\.\/\.\.\/\.\.\/tool-call-assembly\.md\)/);
  assert.match(assembly, /Every `weshop_cli` call must explicitly include/);
  assert.match(assembly, /`mode` belongs to the wrapper envelope/);
  assert.match(assembly, /Do not include `weshop` itself/);
  assert.match(assembly, /Each `\{\{asset:N\}\}` placeholder must map to exactly one entry/);
  assert.match(assembly, /Once any response contains a non-empty `executionId`[\s\S]*never submit the create call again/);
  assert.ok(JSON.parse(packageJson).files.includes('tool-call-assembly.md'));
});
