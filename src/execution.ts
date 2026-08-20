import type { ExecutionPolicy, SubmissionDecision, SubmissionObservation } from "./types.js";

export const executionPolicy: ExecutionPolicy = {
  operationKey: {
    required: true,
    persistence: "before-submit",
    storage: "durable-harness-ledger",
    scope: "one-key-per-planned-atomic-run"
  },
  acceptedSignal: "non-empty-execution-id",
  ambiguousSignals: ["transport-error", "timeout", "empty-response", "malformed-response", "missing-execution-id"],
  outcomeUnknown: {
    retryAllowed: false,
    nextAction: "reconcile"
  },
  absenceEvidenceRejected: ["empty-material-search", "empty-canvas", "missing-local-file", "delayed-callback", "single-not-found"],
  resubmitOnlyWhen: ["authoritative-recovery-returns-confirmedAbsent-true-for-the-same-key", "user-explicitly-accepts-duplicate-and-cost-risk"],
  terminalRetryKey: "new-key-linked-by-parent-operation-key",
  publicationFailureAction: "retry-publication-only"
};

/** Classify the create-run receipt before any retry policy is considered. */
export function classifySubmissionOutcome(observation: SubmissionObservation): SubmissionDecision {
  const executionId = observation.executionId?.trim();
  if (executionId) {
    return {
      state: "accepted",
      executionId,
      retryAllowed: false,
      nextAction: "poll",
      reason: "A non-empty execution ID proves the run was accepted; continue only with that run."
    };
  }

  if (
    observation.kind === "proven-not-created" &&
    observation.confirmedAbsent === true &&
    typeof observation.operationKey === "string" &&
    observation.operationKey.trim().length > 0
  ) {
    return {
      state: "proven-not-created",
      retryAllowed: true,
      nextAction: "resubmit",
      reason: "An authoritative recovery check returned confirmedAbsent for the same non-empty operation key."
    };
  }

  if (observation.kind === "explicit-rejection") {
    return {
      state: "rejected",
      retryAllowed: false,
      nextAction: "stop",
      reason: "The API explicitly rejected the submission; inspect the structured error before planning a revised request."
    };
  }

  return {
    state: "outcome-unknown",
    retryAllowed: false,
    nextAction: "reconcile",
    reason: "The create-run call may have reached the backend, so another submission could duplicate work or cost."
  };
}
