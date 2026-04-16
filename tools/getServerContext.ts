import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import type { EnvContextSnapshot } from "../core/envContext.js";

export function registerGetServerContextTool(
  server: McpServer,
  deps: { snapshot: EnvContextSnapshot }
): void {
  const { snapshot } = deps;

  server.registerTool(
    "get_server_context",
    {
      description: "Returns context from the MCP_CONTEXT JSON environment variable",
      inputSchema: {
        path: z
          .string()
          .optional()
          .describe("Optional nested key path with dots, e.g. app.tenant")
      }
    },
    async ({ path }) => {
      let value: unknown = snapshot;
      if (path) {
        for (const segment of path.split(".")) {
          if (value === null || value === undefined || typeof value !== "object") {
            value = undefined;
            break;
          }
          value = (value as Record<string, unknown>)[segment];
        }
      }

      const text =
        path === undefined || path === ""
          ? JSON.stringify(snapshot, null, 2)
          : JSON.stringify(value ?? null, null, 2);

      return {
        content: [{ type: "text", text }],
        structuredContent: {
          path: path ?? null,
          context: snapshot,
          value: path ? value : snapshot
        }
      };
    }
  );
}
