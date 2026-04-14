# OpenCode

> **Status:** Tested and working.

[OpenCode](https://opencode.ai) is an open-source terminal coding agent that supports MCP through its `opencode.json` config file.

## Configuration

Edit `~/.config/opencode/opencode.json` (user scope) or `opencode.json` in the project root:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "salesmind": {
      "type": "remote",
      "url": "https://mcp.sales-mind.ai/mcp",
      "headers": {
        "X-API-KEY": "YOUR_API_KEY"
      },
      "enabled": true
    }
  }
}
```

### SSE fallback

```json
{
  "mcp": {
    "salesmind": {
      "type": "remote",
      "url": "https://mcp.sales-mind.ai/sse",
      "headers": {
        "X-API-KEY": "YOUR_API_KEY"
      },
      "enabled": true
    }
  }
}
```

### Using an environment variable

OpenCode expands `${ENV_VAR}` inside header values:

```json
{
  "mcp": {
    "salesmind": {
      "type": "remote",
      "url": "https://mcp.sales-mind.ai/mcp",
      "headers": {
        "X-API-KEY": "${SALESMIND_API_KEY}"
      },
      "enabled": true
    }
  }
}
```

## Verify

Launch `opencode` and run:

```
/mcp
```

The `salesmind` entry should show `Connected`. Then ask:

> Use SalesMind AI to list my active campaigns.

If the connection fails, check the log pane (`Ctrl-L` / `F12`) or see [troubleshooting](../troubleshooting.md).
