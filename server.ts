import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { loadEnvContextSnapshot } from "./core/envContext.js";
import { registerGetServerContextTool } from "./tools/getServerContext.js";
import { registerHelloWorldTool } from "./tools/helloWorld.js";

const server = new McpServer({
  name: "mcp-poc",
  version: "1.0.0",
  description: "MCP server exposing tools backed by environment-driven context"
});

const envSnapshot = loadEnvContextSnapshot();

registerHelloWorldTool(server);
registerGetServerContextTool(server, { snapshot: envSnapshot });

const transport = new StdioServerTransport();
await server.connect(transport);
