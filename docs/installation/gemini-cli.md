# Gemini CLI

The [Gemini CLI](https://github.com/google-gemini/gemini-cli) supports remote MCP servers in `~/.gemini/settings.json` (user scope) or `.gemini/settings.json` (project scope).

## Configuration

```json
{
  "mcpServers": {
    "salesmind": {
      "httpUrl": "https://mcp.sales-mind.ai/mcp",
      "headers": {
        "X-API-KEY": "YOUR_API_KEY"
      },
      "timeout": 30000
    }
  }
}
```

For SSE:

```json
{
  "mcpServers": {
    "salesmind": {
      "url": "https://mcp.sales-mind.ai/sse",
      "headers": {
        "X-API-KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

> Gemini CLI uses `httpUrl` for Streamable HTTP and `url` for SSE -- different field names.

## Verify

Launch `gemini` and run:

```
/mcp
```

`salesmind` should appear under **Connected**. Then:

> Using SalesMind AI, show me my active campaigns.

If nothing happens, try `gemini --debug` or see [troubleshooting](../troubleshooting.md).
