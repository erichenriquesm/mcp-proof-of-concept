/** Snapshot of `MCP_CONTEXT` parsed once at process startup. */
export type EnvContextSnapshot = Record<string, unknown>;

const MCP_CONTEXT = "MCP_CONTEXT";

export function loadEnvContextSnapshot(): EnvContextSnapshot {
  const raw = process.env[MCP_CONTEXT];
  if (raw === undefined || raw === "") {
    return {};
  }
  if (typeof raw !== "string") {
    throw new Error("MCP_CONTEXT must be a string");
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("MCP_CONTEXT must be a JSON object");
    }
    return parsed as EnvContextSnapshot;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("MCP_CONTEXT is not valid JSON");
  }
}
