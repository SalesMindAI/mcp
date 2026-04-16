# Windsurf

Windsurf (by Codeium) reads MCP config from `~/.codeium/windsurf/mcp_config.json`.

> **OAuth support:** If Windsurf adds MCP OAuth support, you can omit the `headers` block -- the server will handle authentication via OAuth automatically. See [authentication](../authentication.md) for details.

## Configuration

SSE (default for Windsurf):

```json
{
  "mcpServers": {
    "salesmind": {
      "serverUrl": "https://mcp.sales-mind.ai/sse",
      "headers": {
        "X-API-KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Newer Windsurf builds also support Streamable HTTP:

```json
{
  "mcpServers": {
    "salesmind": {
      "serverUrl": "https://mcp.sales-mind.ai/mcp",
      "transport": "http",
      "headers": {
        "X-API-KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Save the file and click **refresh** on the Cascade MCP panel, or restart Windsurf.

## Verify

Open the Cascade panel, expand **MCP servers**, and confirm `salesmind` shows as **connected**. Ask:

> Use SalesMind AI to list my latest leads.

If disconnected, check **View > Output > Windsurf** or see [troubleshooting](../troubleshooting.md).
