import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

export const WESHOP_OPENAPI_ORIGIN = "https://openapi.weshop.ai";

export interface WeShopEnvelope<T = unknown> {
  success: boolean;
  data?: T;
  meta?: { executionId?: string; [key: string]: unknown };
  error?: { code?: string; message?: string; retryable?: boolean; [key: string]: unknown };
}

export class WeShopApiError extends Error {
  readonly status: number;
  readonly envelope?: WeShopEnvelope;

  constructor(message: string, status: number, envelope?: WeShopEnvelope) {
    super(message);
    this.name = "WeShopApiError";
    this.status = status;
    this.envelope = envelope;
  }
}

export interface WeShopClientOptions {
  apiKey?: string;
  fetchImpl?: typeof fetch;
}

export interface RunRequest {
  agent: { name: string; version: string };
  input?: Record<string, unknown>;
  params?: Record<string, unknown>;
  callbackUrl?: string;
}

function requireApiKey(apiKey?: string): string {
  const key = apiKey?.trim() || process.env.WESHOP_API_KEY?.trim();
  if (!key) throw new Error("WESHOP_API_KEY is not configured. Set it in the trusted execution environment before using the CLI.");
  return key;
}

async function parseEnvelope(response: Response): Promise<WeShopEnvelope> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new WeShopApiError(`WeShop returned a non-JSON response (${response.status}).`, response.status);
  }
  if (!body || typeof body !== "object" || typeof (body as WeShopEnvelope).success !== "boolean") {
    throw new WeShopApiError(`WeShop returned a malformed response (${response.status}).`, response.status);
  }
  const envelope = body as WeShopEnvelope;
  if (!response.ok || envelope.success === false) {
    throw new WeShopApiError(envelope.error?.message || `WeShop request failed (${response.status}).`, response.status, envelope);
  }
  return envelope;
}

export class WeShopOpenApiClient {
  private readonly apiKey: string;
  private readonly fetchImpl: typeof fetch;
  private readonly origin: string;

  constructor(options: WeShopClientOptions = {}) {
    this.apiKey = requireApiKey(options.apiKey);
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.origin = WESHOP_OPENAPI_ORIGIN;
  }

  private headers(extra: Record<string, string> = {}): HeadersInit {
    return { Authorization: this.apiKey, ...extra };
  }

  async uploadImage(filePath: string): Promise<{ imageUrl: string; response: WeShopEnvelope }> {
    const absolutePath = resolve(filePath);
    const bytes = await readFile(absolutePath);
    const form = new FormData();
    form.append("image", new Blob([bytes]), basename(absolutePath));
    const response = await this.fetchImpl(`${this.origin}/openapi/agent/assets/images`, {
      method: "POST",
      headers: this.headers(),
      body: form
    });
    const envelope = await parseEnvelope(response);
    const data = envelope.data as Record<string, unknown> | undefined;
    const imageUrl = typeof data?.image === "string" ? data.image : typeof data?.imageUrl === "string" ? data.imageUrl : undefined;
    if (!imageUrl) throw new WeShopApiError("WeShop upload succeeded without a reusable image URL.", response.status, envelope);
    return { imageUrl, response: envelope };
  }

  async createRun(request: RunRequest): Promise<WeShopEnvelope> {
    const response = await this.fetchImpl(`${this.origin}/openapi/agent/runs`, {
      method: "POST",
      headers: this.headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(request)
    });
    return parseEnvelope(response);
  }

  async getRun(executionId: string): Promise<WeShopEnvelope> {
    const response = await this.fetchImpl(`${this.origin}/openapi/agent/runs/${encodeURIComponent(executionId)}`, {
      headers: this.headers()
    });
    return parseEnvelope(response);
  }

  async getAgentInfo(agentName: string, agentVersion = "v1.0"): Promise<WeShopEnvelope> {
    const query = new URLSearchParams({ agentName, agentVersion });
    const response = await this.fetchImpl(`${this.origin}/openapi/v1/agent/info?${query}`, { headers: this.headers() });
    return parseEnvelope(response);
  }
}

export function executionIdFrom(envelope: WeShopEnvelope): string | undefined {
  const id = envelope.meta?.executionId;
  return typeof id === "string" && id.trim() ? id.trim() : undefined;
}

export function runStatusFrom(envelope: WeShopEnvelope): string | undefined {
  const data = envelope.data as Record<string, unknown> | undefined;
  const direct = data?.status;
  if (typeof direct === "string") return direct;
  const executions = data?.executions;
  if (Array.isArray(executions) && executions.length) {
    const status = (executions[0] as Record<string, unknown>)?.status;
    if (typeof status === "string") return status;
  }
  return undefined;
}

export function isTerminalRun(envelope: WeShopEnvelope): boolean {
  const status = runStatusFrom(envelope)?.toLowerCase();
  return status === "success" || status === "failed" || status === "cancelled" || status === "canceled";
}
