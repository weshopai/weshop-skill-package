import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function skillMarkdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await skillMarkdownFiles(target));
    else if (entry.name === 'SKILL.md') files.push(target);
  }
  return files;
}

test('managed native tools own durable operation state', async () => {
  const orchestrator = await readFile(
    path.join(root, 'skills/orchestrate-multi-step-workflow/SKILL.md'),
    'utf8',
  );
  assert.match(orchestrator, /Runtime owns the ledger/);
  assert.match(orchestrator, /do not create or read a Router-owned ledger file/);
  assert.match(orchestrator, /do not synthesize an `operationKey`/);
  assert.match(orchestrator, /Conversation memory is never a ledger/);
});

test('Skill workflows never require their own operation ledger', async () => {
  const files = await skillMarkdownFiles(path.join(root, 'skills'));
  for (const file of files) {
    const markdown = await readFile(file, 'utf8');
    assert.doesNotMatch(
      markdown,
      /(?:create and atomically persist|persist (?:a|one|all|each|the) [^\n]*`?operationKey|durable Router\/harness ledger)/i,
      path.relative(root, file),
    );
  }
});
