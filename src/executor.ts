import { ExecutionLedger, type LedgerRecord } from "./execution-ledger.js";
import { WeShopApiError, WeShopOpenApiClient, executionIdFrom, isTerminalRun, runStatusFrom, type RunRequest, type WeShopEnvelope } from "./openapi-client.js";

export interface ExecuteRunOptions {
  operationKey: string;
  parentOperationKey?: string;
  wait?: boolean;
  pollIntervalMs?: number;
  timeoutMs?: number;
}

export interface ExecuteRunResult {
  operationKey: string;
  submissionState: LedgerRecord["submissionState"];
  executionId?: string;
  response?: WeShopEnvelope;
  terminal: boolean;
}

export class ReceiptPersistenceError extends Error {
  constructor(readonly operationKey: string, readonly executionId: string, cause: unknown) {
    super(`Run accepted with executionId ${executionId}, but its receipt could not be persisted for operation ${operationKey}. Do not resubmit; query this executionId directly. Cause: ${(cause as Error).message}`);
    this.name = "ReceiptPersistenceError";
  }
}

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function pollRun(
  client: WeShopOpenApiClient,
  executionId: string,
  options: Pick<ExecuteRunOptions, "pollIntervalMs" | "timeoutMs"> = {}
): Promise<{ response: WeShopEnvelope; terminal: boolean }> {
  const interval = options.pollIntervalMs ?? 3_000;
  if (interval < 1_000) throw new Error("pollIntervalMs must be at least 1000ms.");
  const timeout = options.timeoutMs ?? 30 * 60_000;
  const deadline = Date.now() + timeout;
  let response = await client.getRun(executionId);
  while (!isTerminalRun(response) && Date.now() < deadline) {
    await delay(interval);
    response = await client.getRun(executionId);
  }
  return { response, terminal: isTerminalRun(response) };
}

export async function executeRun(
  client: WeShopOpenApiClient,
  ledger: ExecutionLedger,
  request: RunRequest,
  options: ExecuteRunOptions
): Promise<ExecuteRunResult> {
  const operationKey = options.operationKey.trim();
  if (!operationKey) throw new Error("A non-empty operationKey is required before submission.");
  if (options.parentOperationKey) {
    const parent = await ledger.get(options.parentOperationKey);
    if (!parent || parent.terminalStatus?.toLowerCase() !== "failed") {
      throw new Error(`Parent operation ${options.parentOperationKey} is not recorded as terminal Failed; refusing retry submission.`);
    }
  }
  await ledger.prepare({
    operationKey,
    parentOperationKey: options.parentOperationKey,
    agent: request.agent,
    request: request as unknown as Record<string, unknown>
  });

  let submitted: WeShopEnvelope;
  try {
    submitted = await client.createRun(request);
  } catch (error) {
    if (error instanceof WeShopApiError && error.envelope?.success === false) {
      await ledger.update(operationKey, { submissionState: "rejected", error: error.message });
      throw error;
    }
    await ledger.update(operationKey, { submissionState: "outcome-unknown", error: (error as Error).message });
    throw new Error(`Create-run outcome is unknown for operation ${operationKey}; do not resubmit. Reconcile the original run before retrying. Cause: ${(error as Error).message}`);
  }

  const executionId = executionIdFrom(submitted);
  if (!executionId) {
    await ledger.update(operationKey, { submissionState: "outcome-unknown", error: "missing executionId" });
    throw new Error(`Create-run outcome is unknown for operation ${operationKey}; WeShop returned no executionId. Do not resubmit.`);
  }
  try {
    await ledger.update(operationKey, { submissionState: "accepted", executionId });
  } catch (error) {
    throw new ReceiptPersistenceError(operationKey, executionId, error);
  }
  if (options.wait === false) return { operationKey, submissionState: "accepted", executionId, response: submitted, terminal: false };

  const polled = await pollRun(client, executionId, options);
  if (polled.terminal) {
    await ledger.update(operationKey, { terminalStatus: runStatusFrom(polled.response), terminalObservedAt: new Date().toISOString() });
  }
  return { operationKey, submissionState: "accepted", executionId, response: polled.response, terminal: polled.terminal };
}
