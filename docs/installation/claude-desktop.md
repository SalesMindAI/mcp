# Claude Desktop

> **Status:** Tested and working.

Claude Desktop connects via [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) -- a lightweight local proxy that Claude Desktop launches as a subprocess.

**Prerequisite:** Node.js 18+ (includes `npx`).

## OAuth 2.1 (recommended)

`mcp-remote` supports OAuth discovery. When no API key header is provided, the SalesMind AI server returns a `401` with a `WWW-Authenticate` header pointing to the OAuth metadata. `mcp-remote` will automatically open a browser window where you enter your API key on the SalesMind AI login page.

```json
{
  "mcpServers": {
    "salesmind": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://mcp.sales-mind.ai/mcp"
      ]
    }
  }
}
```

On first launch, your browser opens the SalesMind AI authorization page. Enter your API key, and `mcp-remote` stores the OAuth tokens locally. Subsequent launches reuse the tokens automatically.

> **This is the recommended method.** Your API key is entered once on a secure page and never stored in a config file. Token refresh is handled automatically.

## API key via header (alternative)

If you prefer to skip OAuth and pass your API key directly:

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

## Configuration file location

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%AppData%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/Claude/claude_desktop_config.json`

## SSE fallback

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
        "sse-only"
      ]
    }
  }
}
```

This also supports OAuth -- `mcp-remote` will handle the authorization flow the same way.

## Verify

Save the config and relaunch Claude Desktop. In a new conversation, ask:

> List every tool exposed by the SalesMind AI MCP.

Claude should respond with the available operations. If nothing appears, open **Help > Open Logs Folder** and check for MCP errors. The most common issue is Node.js not being on `PATH` -- see [troubleshooting](../troubleshooting.md).
