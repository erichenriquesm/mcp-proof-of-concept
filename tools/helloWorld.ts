import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerHelloWorldTool(server: McpServer): void {
  server.registerTool(
    "hello_world",
    {
      description: "Returns a static greeting"
    },
    async () => ({
      content: [{ type: "text", text: "Hello World" }],
      isError: false
    })
  );
}
