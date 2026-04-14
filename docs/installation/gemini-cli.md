# Gemini CLI

The [Gemini CLI](https://github.com/google-gemini/gemini-cli) supports remote MCP servers defined in `~/.gemini/settings.json` (user scope) or `.gemini/settings.json` (project scope).

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

> The Gemini CLI distinguishes `httpUrl` (Streamable HTTP) from `url` (SSE). Use the right field for your transport.

## Verify

Launch `gemini` in a terminal and run:

```
/mcp
```

`salesmind` should be listed under **Connected**. Then prompt:

> Using SalesMind AI, summarise the status of my sales pipeline.

If nothing happens, inspect the CLI log with `gemini --debug` or see [troubleshooting](../troubleshooting.md).
