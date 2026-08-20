import { accessSync, constants } from "node:fs";
import { delimiter, join } from "node:path";
import { spawnSync } from "node:child_process";

export const BUILT_IN_CLI_VERSION = "0.2.0";

export type CliBackend = {
  preferred: "official" | "built-in";
  official: { available: boolean; path?: string; version?: string };
  builtIn: { command: "weshop-skill"; version: string };
};

export function findExecutable(name: string, pathValue = process.env.PATH ?? ""): string | undefined {
  const candidates = process.platform === "win32" ? [name, `${name}.cmd`, `${name}.exe`] : [name];
  for (const directory of pathValue.split(delimiter).filter(Boolean)) {
    for (const candidate of candidates) {
      const path = join(directory, candidate);
      try { accessSync(path, constants.X_OK); return path; } catch { /* keep searching */ }
    }
  }
  return undefined;
}

export function detectCliBackend(pathValue = process.env.PATH ?? ""): CliBackend {
  const path = findExecutable("weshop", pathValue);
  let version: string | undefined;
  if (path) {
    const result = spawnSync(path, ["--version"], { encoding: "utf8", timeout: 3000, shell: false });
    version = (result.stdout || result.stderr || "").trim() || undefined;
  }
  return {
    preferred: path ? "official" : "built-in",
    official: path ? { available: true, path, version } : { available: false },
    builtIn: { command: "weshop-skill", version: BUILT_IN_CLI_VERSION }
  };
}

export function normalizeAgentName(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (normalized === "gpt-image-2" || normalized === "gpt image 2") return "gpt-image";
  return value.trim();
}

export function normalizeRunPayload(agent: string, input: Record<string, unknown>, params: Record<string, unknown>): void {
  if (agent !== "gpt-image" || params.textDescription !== undefined || typeof input.text !== "string") return;
  params.textDescription = input.text;
  delete input.text;
}
