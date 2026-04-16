# Agent instructions — mcp-poc MCP

**Single source of truth** for any agent (Cursor, Claude Code, etc.): plain Markdown, no frontmatter. In Cursor, root `AGENTS.md` is supported the same way as project rules ([docs](https://cursor.com/docs/context/rules#agentsmd)).

Only apply this when the **mcp-poc** MCP server is available in the client (in Cursor it may appear as `user-mcp-poc`).

---

## `get_server_context`

**Use when:**

- The user asks to show, list, or confirm **context** from **`MCP_CONTEXT`** (parsed once at MCP server startup).
- They ask what is **configured for this MCP**, what the **server exposes**, or **dynamic values** (tenant, region, flags, IDs, etc.).
- You need the **full JSON object** or a **nested field** of that object.

**Arguments:** omit for the full object; set **`path`** to a dotted key (e.g. `tenant`, `app.id`) for one branch.

**Do not use** for a generic “is MCP alive?” check — use `hello_world`.

---

## `hello_world`

**Use when:**

- You need a **quick connectivity check** that the **mcp-poc** MCP process responds.
- After **MCP or `mcp.json` changes**, to confirm the server is reachable.

**Do not use** to read `MCP_CONTEXT` or configuration — use `get_server_context`.

---

## Quick reference

| Goal | Tool |
|------|------|
| Read or display `MCP_CONTEXT` | `get_server_context` |
| One nested field | `get_server_context` + `path` |
| MCP connectivity smoke test | `hello_world` |
