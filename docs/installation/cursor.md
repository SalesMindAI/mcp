# Cursor

Cursor reads MCP server configuration from `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` inside a project.

## Configuration

Create or edit the file with:

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

For older Cursor builds that only support SSE:

```json
{
  "mcpServers": {
    "salesmind": {
      "type": "sse",
      "url": "https://mcp.sales-mind.ai/sse",
      "headers": {
        "X-API-KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Restart Cursor after saving.

## Alternative: the Settings UI

1. Open **Cursor → Settings → MCP**.
2. Click **+ Add new MCP server**.
3. Set **Type** to `http` (or `sse`), **URL** to the endpoint, and add a header `X-API-KEY` with your key.
4. Save — Cursor reloads its MCP connections automatically.

## Verify

Open the agent chat, click the tools icon, and check that `salesmind` is listed with a green indicator. Ask:

> Use SalesMind AI to list my 5 most recent leads.

If the server is greyed out, see [troubleshooting](../troubleshooting.md).
