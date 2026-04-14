# Windsurf

Windsurf (by Codeium) reads MCP servers from `~/.codeium/windsurf/mcp_config.json`.

## Configuration

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

Recent Windsurf builds also support Streamable HTTP:

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

Save the file and click the **refresh** button on the Cascade MCP panel, or restart Windsurf.

## Verify

Open the Cascade panel, expand **MCP servers**, and confirm `salesmind` shows as **connected** with a tool count. Ask Cascade:

> Use SalesMind AI to list my latest leads.

If the server shows as disconnected, check the Windsurf output panel (**View → Output → Windsurf**) or see [troubleshooting](../troubleshooting.md).
