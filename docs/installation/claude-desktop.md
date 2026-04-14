# Claude Desktop

> **Status:** Tested and working.

Claude Desktop does not support custom HTTP headers in its config. The workaround is [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) -- a lightweight local proxy that Claude Desktop launches as a subprocess. It forwards requests to the remote MCP server with the correct header.

**Prerequisite:** Node.js 18+ (includes `npx`).

## Configuration

Close Claude Desktop, then edit the config file at:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%AppData%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

Add this inside `mcpServers`:

```json
{
  "mcpServers": {
    "salesmind": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.sales-mind.ai/mcp",
        "--header",
        "X-API-KEY:${SALESMIND_API_KEY}"
      ],
      "env": {
        "SALESMIND_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Replace `YOUR_API_KEY` with your actual key.

### Keep the key out of the config file (optional)

Set `SALESMIND_API_KEY` as a permanent environment variable in your shell profile (`~/.zshrc`, `~/.bash_profile`) or system settings. Then remove the `env` block:

```json
{
  "mcpServers": {
    "salesmind": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.sales-mind.ai/mcp",
        "--header",
        "X-API-KEY:${SALESMIND_API_KEY}"
      ]
    }
  }
}
```

### SSE fallback

If Streamable HTTP gives you connection issues, use SSE:

```json
{
  "mcpServers": {
    "salesmind": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.sales-mind.ai/sse",
        "--transport",
        "sse-only",
        "--header",
        "X-API-KEY:${SALESMIND_API_KEY}"
      ],
      "env": {
        "SALESMIND_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

## Verify

Save the config and relaunch Claude Desktop. In a new conversation, ask:

> List every tool exposed by the SalesMind AI MCP.

Claude should respond with the available operations. If nothing appears, open **Help > Open Logs Folder** and check for MCP errors. The most common issue is Node.js not being on `PATH` -- see [troubleshooting](../troubleshooting.md).
