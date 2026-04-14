# Claude Desktop

Claude Desktop does not support setting custom HTTP headers through its GUI or through a plain `"type": "http"` config entry. The workaround is to use [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) — a lightweight local proxy that Claude Desktop launches as a subprocess, which in turn forwards requests to the remote MCP server with the correct header attached.

**Prerequisites:** Node.js 18+ and `npx` (bundled with Node.js).

## Configuration

Close Claude Desktop, then edit the JSON config at:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%AppData%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

Add the following entry inside `mcpServers`:

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

Replace `YOUR_API_KEY` with your actual SalesMind AI API key.

### Recommended: keep the key out of the config file

If you prefer not to store the key directly in the config, set `SALESMIND_API_KEY` as a permanent environment variable in your shell profile (`~/.zshrc`, `~/.bash_profile`, `~/.config/fish/config.fish`, or via System Preferences on macOS / System Properties on Windows). Then leave the `env` block empty or remove it:

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

`mcp-remote` expands `${SALESMIND_API_KEY}` from the environment at runtime.

### SSE transport (fallback)

If you run into connection issues with the Streamable HTTP endpoint, use SSE:

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

## How it works

Claude Desktop treats the entry as a local MCP server. It runs `npx mcp-remote <url> --header ...` as a subprocess, which starts a local stdio-based MCP server that proxies all JSON-RPC messages to the remote SalesMind AI MCP server over HTTPS, attaching the `X-API-KEY` header on every request.

## Verify

Save the config and relaunch Claude Desktop. In a new conversation, ask:

> List every tool exposed by the SalesMind AI MCP.

Claude should respond with a list of operations covering the SalesMind AI entities: agents, campaigns, lead lists, leads, personas, senders, and growth automations.

If nothing appears, open **Help → Open Logs Folder** in Claude Desktop and look for MCP-related errors. Most failures are caused by Node.js not being on `PATH` for GUI apps — see [troubleshooting](../troubleshooting.md) for the fix.
