import { mkdir, open, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

export type LedgerSubmissionState = "prepared" | "accepted" | "outcome-unknown" | "rejected";

export interface LedgerRecord {
  operationKey: string;
  parentOperationKey?: string;
  agent: { name: string; version: string };
  request: Record<string, unknown>;
  submissionState: LedgerSubmissionState;
  executionId?: string;
  terminalStatus?: string;
  terminalObservedAt?: string;
  createdAt: string;
  updatedAt: string;
  error?: string;
}

interface LedgerFile { version: 1; operations: Record<string, LedgerRecord> }

export function defaultLedgerPath(): string {
  return process.env.WESHOP_SKILL_LEDGER?.trim() || join(homedir(), ".weshop-skill-package", "operations.json");
}

async function readLedger(path: string): Promise<LedgerFile> {
  try {
    const parsed = JSON.parse(await readFile(path, "utf8")) as LedgerFile;
    if (parsed.version !== 1 || !parsed.operations || typeof parsed.operations !== "object") throw new Error("unsupported ledger shape");
    return parsed;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return { version: 1, operations: {} };
    throw new Error(`Cannot read execution ledger at ${path}: ${(error as Error).message}`);
  }
}

async function writeLedger(path: string, ledger: LedgerFile): Promise<void> {
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  const temporary = `${path}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(ledger, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, path);
}

async function withLedgerLock<T>(path: string, action: () => Promise<T>): Promise<T> {
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  const lockPath = `${path}.lock`;
  let handle;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      handle = await open(lockPath, "wx", 0o600);
      await handle.writeFile(JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() }));
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      try {
        const owner = JSON.parse(await readFile(lockPath, "utf8")) as { pid?: number };
        if (Number.isInteger(owner.pid) && owner.pid! > 0) {
          try { process.kill(owner.pid!, 0); }
          catch (ownerError) {
            if ((ownerError as NodeJS.ErrnoException).code === "ESRCH") { await unlink(lockPath); continue; }
          }
        }
      } catch (lockError) {
        if ((lockError as NodeJS.ErrnoException).code === "ENOENT") continue;
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
  if (!handle) throw new Error(`Execution ledger is busy at ${path}; no create-run request was sent.`);
  try {
    return await action();
  } finally {
    await handle.close();
    await unlink(lockPath).catch(() => undefined);
  }
}

export class ExecutionLedger {
  constructor(readonly path = defaultLedgerPath()) {}

  async get(operationKey: string): Promise<LedgerRecord | undefined> {
    return (await readLedger(this.path)).operations[operationKey];
  }

  async findByExecutionId(executionId: string): Promise<LedgerRecord | undefined> {
    return Object.values((await readLedger(this.path)).operations).find((record) => record.executionId === executionId);
  }

  async prepare(record: Omit<LedgerRecord, "submissionState" | "createdAt" | "updatedAt">): Promise<LedgerRecord> {
    return withLedgerLock(this.path, async () => {
      const ledger = await readLedger(this.path);
      const existing = ledger.operations[record.operationKey];
      if (existing) throw new Error(`Operation ${record.operationKey} is already ${existing.submissionState}; refusing a duplicate create-run call.`);
      const now = new Date().toISOString();
      const prepared: LedgerRecord = { ...record, submissionState: "prepared", createdAt: now, updatedAt: now };
      ledger.operations[record.operationKey] = prepared;
      await writeLedger(this.path, ledger);
      return prepared;
    });
  }

  async update(operationKey: string, patch: Partial<LedgerRecord>): Promise<LedgerRecord> {
    return withLedgerLock(this.path, async () => {
      const ledger = await readLedger(this.path);
      const existing = ledger.operations[operationKey];
      if (!existing) throw new Error(`Operation ${operationKey} is missing from the execution ledger.`);
      const updated = { ...existing, ...patch, operationKey, updatedAt: new Date().toISOString() };
      ledger.operations[operationKey] = updated;
      await writeLedger(this.path, ledger);
      return updated;
    });
  }
}
