# ai-pages MCP

Servidor [MCP](https://modelcontextprotocol.io) em **TypeScript** que expõe ferramentas com contexto vindo só do **ambiente do processo** (`process.env`). Não há rede para montar o contexto (além do que o próprio cliente MCP fizer ao chamar as tools).

O contexto é lido **uma vez** ao iniciar o processo Node a partir de **`MCP_CONTEXT`**. Se mudares `env` no `mcp.json` ou o código, **reinicia o servidor MCP** no Cursor.

## Requisitos

- Node.js 18+ (recomendado 20+)
- `npm install` na raiz (o script `prepare` corre `npm run build` e gera `dist/`)

## Scripts

| Comando         | Descrição                         |
|-----------------|-----------------------------------|
| `npm run build` | Compila TypeScript para `dist/`   |
| `npm start`     | `node dist/server.js` (stdio MCP) |

## Contexto: `MCP_CONTEXT`

Define **uma única** variável de ambiente, **`MCP_CONTEXT`**, com um **objeto JSON em string** (não uses array na raiz).

- **Ausente ou vazio** — o contexto exposto é `{}`.
- **JSON inválido ou não-objeto** — `get_server_context` devolve erro até corrigires o valor.

Tudo o que quiseres expor ao modelo (metadados, flags, etc.) vai **dentro desse JSON**. No `mcp.json` o valor costuma ser uma string com aspas escapadas, por exemplo `"{\"key\":\"value\"}"`.

## Tools

### `get_server_context`

- **Entrada opcional:** `path` — caminho com pontos (`key`, `app.id`, …).
- **Saída:** JSON em texto; `structuredContent` com `path`, `context` e `value`.

### `hello_world`

- Sem argumentos; devolve `Hello World` (útil para testar a ligação MCP).

## Correr localmente

```bash
cd /caminho/para/ai-pages
npm install
export MCP_CONTEXT='{"key":"value","feature_enabled":true}'
npm start
```

Após alterar `.ts`: `npm run build` (ou `npm install` / `prepare`).

## Exemplo `mcp.json` (Cursor)

Substitui o caminho pelo teu clone. O nome do servidor (`"pages"`, …) é só um rótulo no cliente.

```json
{
  "mcpServers": {
    "pages": {
      "command": "node",
      "args": ["/caminho/para/ai-pages/dist/server.js"],
      "env": {
        "MCP_CONTEXT": "{\"key\":\"value\",\"source\":\"client\",\"flag\":true}"
      }
    }
  }
}
```

## Estrutura do código

- `server.ts` — stdio, registo das tools.
- `core/envContext.ts` — parse único de `MCP_CONTEXT`.
- `tools/` — `helloWorld.ts`, `getServerContext.ts`.

## Instruções para agentes (Cursor / Claude / outros)

Um único ficheiro na raiz: **`AGENTS.md`**. O Cursor trata-o como instruções de agente (equivalente simples a `.cursor/rules`); o Claude Code e ferramentas semelhantes também costumam ler `AGENTS.md` no repositório.
# mcp-proof-of-concept
