import test from "node:test";
import assert from "node:assert/strict";
import { chmod, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { detectCliBackend, normalizeAgentName, normalizeRunPayload } from "./cli-backend.js";

test("prefers official CLI when weshop is executable", async () => {
  const directory = await mkdtemp(join(tmpdir(), "weshop-cli-test-"));
  const executable = join(directory, "weshop");
  await writeFile(executable, "#!/bin/sh\necho 9.9.9\n");
  await chmod(executable, 0o755);
  const result = detectCliBackend(directory);
  assert.equal(result.preferred, "official");
  assert.equal(result.official.version, "9.9.9");
});

test("falls back when official CLI is absent", () => {
  assert.equal(detectCliBackend("").preferred, "built-in");
});

test("normalizes the GPT Image 2 display name and legacy prompt field", () => {
  const input: Record<string, unknown> = { text: "A studio product photo" };
  const params: Record<string, unknown> = { quality: "medium" };
  const agent = normalizeAgentName("gpt-image-2");
  normalizeRunPayload(agent, input, params);
  assert.equal(agent, "gpt-image");
  assert.deepEqual(input, {});
  assert.equal(params.textDescription, "A studio product photo");
});
