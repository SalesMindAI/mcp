# Cursor

Cursor reads MCP config from `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (project).

> **OAuth support:** If your version of Cursor supports MCP OAuth, you can omit the `headers` block entirely -- the server will trigger an OAuth flow and you'll enter your API key on a secure login page. See [authentication](../authentication.md) for details.

## Configuration

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

### Alternative: Settings UI

1. Open **Cursor > Settings > MCP**.
2. Click **+ Add new MCP server**.
3. Set **Type** to `http`, **URL** to `https://mcp.sales-mind.ai/mcp`, and add header `X-API-KEY` with your key.
4. Save.

## Verify

Open the agent chat, click the tools icon, and check that `salesmind` is listed with a green indicator. Ask:

> Use SalesMind AI to list my 5 most recent leads.

If the server is greyed out, see [troubleshooting](../troubleshooting.md).
