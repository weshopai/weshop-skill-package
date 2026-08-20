export type MediaType = "image" | "video";
export type CapabilitySupport = "yes" | "no" | "unknown";
export type AssetRole = "garment" | "dressed-model" | "product" | "image" | "video" | "model-reference" | "scene-reference" | "pose-reference" | "text";
export type Operation = "try-on" | "outfit-design" | "replace-model-or-scene" | "change-pose" | "product-scene" | "remove-background" | "expand-image" | "character-sheet" | "make-mugshot-photo" | "create-animal" | "create-logo" | "create-flag" | "restyle-room" | "preview-landscape" | "make-flowchart" | "generate-image" | "edit-image" | "generate-video" | "animate-image";
export type Priority = "speed" | "quality" | "fidelity" | "cost";
export interface ModelDefinition {
  id: string;
  label: string;
  media: MediaType;
  status: "cataloged" | "verified" | "offline";
  capabilities: Record<string, CapabilitySupport>;
  limits: { maxReferenceImages?: number | null; resolutions?: string[]; durationsSeconds?: number[] };
  strengths: string[];
  avoidWhen: string[];
  defaultUse: string;
}
export interface IntentCard { raw: string; operation: Operation; media: MediaType; assets: AssetRole[]; preserve: string[]; outputCount: number; namedVariations: boolean; priority: Priority; requiresResearch: boolean; confidence: number; }
export interface RouteRequest extends Omit<IntentCard, "raw" | "confidence" | "requiresResearch"> { requestedModel?: string; }
export interface AgentDefinition { name: string; version: "v1.0"; title: string; operation: Operation; requiredAssets: AssetRole[]; defaultParams: Record<string, unknown>; }
export interface WorkflowRef { id: string; version: "v1.0"; steps: string[]; }
export interface QAPolicy {
  mode: "final-only" | "targeted" | "strict";
  coverage: "first-output-and-failures" | "all-outputs";
  checkpoints: 1;
  triggers: string[];
}
export type SubmissionObservationKind = "response" | "transport-error" | "timeout" | "empty-response" | "malformed-response" | "missing-execution-id" | "explicit-rejection" | "proven-not-created";
export type SubmissionState = "accepted" | "outcome-unknown" | "rejected" | "proven-not-created";
export type SubmissionNextAction = "poll" | "reconcile" | "stop" | "resubmit";
export type SubmissionObservation =
  | { kind: Exclude<SubmissionObservationKind, "proven-not-created">; executionId?: string | null }
  | { kind: "proven-not-created"; confirmedAbsent: true; operationKey: string; executionId?: never };
export interface SubmissionDecision {
  state: SubmissionState;
  executionId?: string;
  retryAllowed: boolean;
  nextAction: SubmissionNextAction;
  reason: string;
}
export interface ExecutionPolicy {
  operationKey: {
    required: true;
    persistence: "before-submit";
    storage: "durable-harness-ledger";
    scope: "one-key-per-planned-atomic-run";
  };
  acceptedSignal: "non-empty-execution-id";
  ambiguousSignals: readonly SubmissionObservationKind[];
  outcomeUnknown: {
    retryAllowed: false;
    nextAction: "reconcile";
  };
  absenceEvidenceRejected: readonly string[];
  resubmitOnlyWhen: readonly string[];
  terminalRetryKey: "new-key-linked-by-parent-operation-key";
  publicationFailureAction: "retry-publication-only";
}
export interface RoutePlan { agent?: Pick<AgentDefinition, "name" | "version" | "title">; model?: ModelDefinition; workflow?: WorkflowRef; intent: IntentCard; category: "commercial-workflow" | "model-command" | "workflow"; runs: number; batchCount: number; params: Record<string, unknown>; acceptance: string[]; qaPolicy: QAPolicy; executionPolicy: ExecutionPolicy; }
