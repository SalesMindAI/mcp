# OpenCode

[OpenCode](https://opencode.ai) is an open-source terminal coding agent that supports MCP through its `opencode.json` configuration file.

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

For SSE:

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

## Environment variable expansion

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

The `salesmind` entry should report `Connected` and list the available tools. Then:

> Use SalesMind AI to list my top 10 active opportunities.

If the server fails to connect, open the log pane (`Ctrl-L` / `F12`) or see [troubleshooting](../troubleshooting.md).
