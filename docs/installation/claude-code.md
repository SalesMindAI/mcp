# Claude Code (CLI)

Claude Code, Anthropic's terminal assistant, uses the `claude mcp` command to manage MCP servers.

## Add the server

Streamable HTTP (recommended):

```bash
claude mcp add --transport http salesmind \
  https://mcp.sales-mind.ai/mcp \
  --header "X-API-KEY: YOUR_API_KEY"
```

SSE (fallback):

```bash
claude mcp add --transport sse salesmind \
  https://mcp.sales-mind.ai/sse \
  --header "X-API-KEY: YOUR_API_KEY"
```

### Prefer an environment variable

```bash
export SALESMIND_API_KEY=YOUR_API_KEY

claude mcp add --transport http salesmind \
  https://mcp.sales-mind.ai/mcp \
  --header "X-API-KEY: $SALESMIND_API_KEY"
```

### Scope the configuration

By default the server is added at the `local` scope (current project). Use `--scope user` to make it available in every project, or `--scope project` to commit it to the repository (it will be stored in `.mcp.json` alongside your code):

```bash
claude mcp add --transport http --scope user salesmind \
  https://mcp.sales-mind.ai/mcp \
  --header "X-API-KEY: $SALESMIND_API_KEY"
```

## Manage

```bash
claude mcp list              # List all configured servers
claude mcp get salesmind     # Show details for a specific server
claude mcp remove salesmind  # Remove the server
```

## Verify

Start Claude Code and run:

```
/mcp
```

`salesmind` should appear as **connected**. Then ask:

> List every tool exposed by the SalesMind AI MCP.

If the connection fails, see [troubleshooting](../troubleshooting.md).

## Manual `.mcp.json`

If you prefer to edit the file by hand, add:

```json
{
  "mcpServers": {
    "salesmind": {
      "type": "http",
      "url": "https://mcp.sales-mind.ai/mcp",
      "headers": {
        "X-API-KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Claude Code reads `.mcp.json` at the project root and `~/.claude.json` at the user scope.
