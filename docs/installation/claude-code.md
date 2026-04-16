# Claude Code (CLI)

Claude Code uses the `claude mcp` command to manage MCP servers.

## OAuth 2.1 (recommended)

Claude Code supports OAuth for remote MCP servers. When no API key is provided, the server triggers an OAuth flow and Claude Code opens a browser for you to authorize.

```bash
claude mcp add --transport http salesmind \
  https://mcp.sales-mind.ai/mcp
```

On first use, your browser opens the SalesMind AI authorization page. Enter your API key once, and Claude Code stores the OAuth tokens. Subsequent sessions reuse the tokens automatically.

> **This is the recommended method.** Your API key is entered once on a secure page and never stored in a config file or shell history.

## API key via header (alternative)

If you prefer to pass your key directly:

```bash
claude mcp add --transport http salesmind \
  https://mcp.sales-mind.ai/mcp \
  --header "X-API-KEY: YOUR_API_KEY"
```

### Using an environment variable

```bash
export SALESMIND_API_KEY=YOUR_API_KEY

claude mcp add --transport http salesmind \
  https://mcp.sales-mind.ai/mcp \
  --header "X-API-KEY: $SALESMIND_API_KEY"
```

## SSE fallback

```bash
claude mcp add --transport sse salesmind \
  https://mcp.sales-mind.ai/sse
```

### Scope

By default the server is added at the `local` scope (current project). Use `--scope user` to make it available everywhere:

```bash
claude mcp add --transport http --scope user salesmind \
  https://mcp.sales-mind.ai/mcp
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
      "url": "https://mcp.sales-mind.ai/mcp"
    }
  }
}
```

Claude Code will trigger OAuth automatically when no headers are present. To use the API key header instead:

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

## Skills (optional)

Install the SalesMind AI skill to help Claude use the MCP more effectively:

```bash
cp -r skills/salesmind ~/.claude/skills/salesmind
```

The skill teaches Claude the search + execute workflow, entity keywords, and common patterns. See [skills/](../../skills/) for details.
