# Claude Code (CLI)

Claude Code uses the `claude mcp` command to manage MCP servers.

## Add the server

Streamable HTTP (recommended):

```bash
claude mcp add --transport http salesmind \
  https://mcp.sales-mind.ai/mcp \
  --header "X-API-KEY: YOUR_API_KEY"
```

SSE fallback:

```bash
claude mcp add --transport sse salesmind \
  https://mcp.sales-mind.ai/sse \
  --header "X-API-KEY: YOUR_API_KEY"
```

### Using an environment variable

```bash
export SALESMIND_API_KEY=YOUR_API_KEY

claude mcp add --transport http salesmind \
  https://mcp.sales-mind.ai/mcp \
  --header "X-API-KEY: $SALESMIND_API_KEY"
```

### Scope

By default the server is added at the `local` scope (current project). Use `--scope user` to make it available everywhere:

```bash
claude mcp add --transport http --scope user salesmind \
  https://mcp.sales-mind.ai/mcp \
  --header "X-API-KEY: $SALESMIND_API_KEY"
```

## Manage

```bash
claude mcp list              # List configured servers
claude mcp get salesmind     # Show details
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

## Manual config file

Add to `.mcp.json` at the project root or `~/.claude.json` for user scope:

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
