import assert from "node:assert/strict";
import test from "node:test";
import { classifySubmissionOutcome, dispatchLegacyNaturalLanguage, executionPolicy } from "./index.js";

test("accepts only a non-empty execution ID and keeps polling that run", () => {
  assert.deepEqual(classifySubmissionOutcome({ kind: "response", executionId: " run-123 " }), {
    state: "accepted",
    executionId: "run-123",
    retryAllowed: false,
    nextAction: "poll",
    reason: "A non-empty execution ID proves the run was accepted; continue only with that run."
  });
});

for (const kind of ["transport-error", "timeout", "empty-response", "malformed-response", "missing-execution-id", "response"] as const) {
  test(`${kind} without an execution ID becomes outcome-unknown`, () => {
    const decision = classifySubmissionOutcome({ kind });
    assert.equal(decision.state, "outcome-unknown");
    assert.equal(decision.retryAllowed, false);
    assert.equal(decision.nextAction, "reconcile");
  });
}

test("an explicit API rejection stops for structured error inspection", () => {
  const decision = classifySubmissionOutcome({ kind: "explicit-rejection" });
  assert.equal(decision.state, "rejected");
  assert.equal(decision.retryAllowed, false);
  assert.equal(decision.nextAction, "stop");
});

test("only authoritative proof of non-creation permits resubmission", () => {
  const decision = classifySubmissionOutcome({ kind: "proven-not-created", confirmedAbsent: true, operationKey: "ws-run-001" });
  assert.equal(decision.state, "proven-not-created");
  assert.equal(decision.retryAllowed, true);
  assert.equal(decision.nextAction, "resubmit");
  assert.match(executionPolicy.resubmitOnlyWhen[0], /confirmedAbsent-true/);
});

for (const observation of [
  { kind: "proven-not-created" },
  { kind: "proven-not-created", confirmedAbsent: false, operationKey: "ws-run-001" },
  { kind: "proven-not-created", confirmedAbsent: true, operationKey: "   " }
]) {
  test(`malformed non-creation proof stays outcome-unknown: ${JSON.stringify(observation)}`, () => {
    const decision = classifySubmissionOutcome(observation as unknown as Parameters<typeof classifySubmissionOutcome>[0]);
    assert.equal(decision.state, "outcome-unknown");
    assert.equal(decision.retryAllowed, false);
    assert.equal(decision.nextAction, "reconcile");
  });
}

test("empty material or Canvas state is never accepted as absence evidence", () => {
  assert.ok(executionPolicy.absenceEvidenceRejected.includes("empty-material-search"));
  assert.ok(executionPolicy.absenceEvidenceRejected.includes("empty-canvas"));
  assert.equal(executionPolicy.outcomeUnknown.retryAllowed, false);
});

test("ordinary and direct workflow routes share the duplicate-prevention policy", () => {
  const ordinary = dispatchLegacyNaturalLanguage("生成一张商品海报");
  const pose = dispatchLegacyNaturalLanguage("给这个模特换一个姿势", { assets: ["dressed-model"] });
  assert.equal(ordinary.executionPolicy, executionPolicy);
  assert.equal(pose.executionPolicy, executionPolicy);
  assert.equal(ordinary.executionPolicy.publicationFailureAction, "retry-publication-only");
  assert.equal(ordinary.executionPolicy.terminalRetryKey, "new-key-linked-by-parent-operation-key");
});
