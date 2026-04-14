# Troubleshooting

A checklist of the most common issues when connecting a client to the SalesMind AI MCP.

## 1. The client shows no SalesMind AI tools

- Confirm the URL is exactly `https://mcp.sales-mind.ai/mcp` (Streamable HTTP) or `https://mcp.sales-mind.ai/sse` (SSE). A trailing slash, a typo, or an extra path segment will return 404.
- Confirm the transport type in your config matches the endpoint. Mixing `"type": "sse"` with `/mcp` (or `"type": "http"` with `/sse`) will fail silently.
- Restart the client after editing its configuration. Most clients only read MCP config at startup.
- Check the client's log / developer console for an MCP connection error.

## 2. `401 Unauthorized` or `403 Forbidden`

- The `X-API-KEY` header is missing, empty, or wrong.
- The key has been revoked. Generate a new one in **Settings → API keys**.
- You are using a sandbox-workspace key against a production-only resource, or vice versa.
- The key contains a hidden newline pasted from a terminal. Re-copy it.

## 3. `429 Too Many Requests`

- You have exceeded the plan rate limit. Wait, retry with exponential backoff, or upgrade your plan.
- Code-mode snippets that fan out many calls in parallel are a common cause. Batch them or add a small concurrency limit.

## 4. `502` / `504` / connection resets

- Transient upstream issue. Check the [status page](https://status.sales-mind.ai).
- If you are on a corporate network, confirm that outbound HTTPS to `mcp.sales-mind.ai` is not blocked by a proxy or firewall.
- Some corporate proxies break Streamable HTTP. Switch to the SSE endpoint (`/sse`) as a fallback.

## 5. The model refuses to use a tool it can see

- The tool description may not match the user's wording. Ask explicitly: *"Use the SalesMind AI MCP to …"*.
- The model may not have enough context to map the request to a tool. Mention the entity by name (leads, opportunities, campaigns, …).
- Some clients require you to *enable* a server after adding it. Check the MCP panel for a toggle.

## 6. Responses look truncated

The SalesMind AI MCP truncates oversized responses to protect the model's context window. You will see markers like:

```json
{
  "_truncated": true,
  "message": "Collection truncated — 842 more items omitted",
  "hint": "Refine your filter or paginate."
}
```

Refine filters (date range, status, owner) or paginate using `page` / `limit` parameters.

## 7. Streaming stops after a few minutes on SSE

Some HTTP intermediaries drop idle SSE connections. Either:

- Use Streamable HTTP (`/mcp`) — it is not affected.
- Reconnect — compliant clients do this automatically.

## 8. Claude Desktop — `npx: command not found` or `spawn ENOENT`

Claude Desktop is a GUI application and inherits a stripped-down `PATH` that often excludes the directory where Node.js is installed. Fix it by providing the **absolute path** to `npx` in the config:

```json
{
  "mcpServers": {
    "salesmind": {
      "command": "/usr/local/bin/npx",
      "args": ["mcp-remote", "https://mcp.sales-mind.ai/mcp", "--header", "X-API-KEY:${SALESMIND_API_KEY}"],
      "env": { "SALESMIND_API_KEY": "YOUR_API_KEY" }
    }
  }
}
```

Find the correct path with `which npx` (macOS/Linux) or `where npx` (Windows). Common locations:

| Platform | Typical path |
| --- | --- |
| macOS (Homebrew) | `/opt/homebrew/bin/npx` |
| macOS (nvm) | `~/.nvm/versions/node/<version>/bin/npx` |
| Linux | `/usr/local/bin/npx` or `/usr/bin/npx` |
| Windows | `C:\Program Files\nodejs\npx.cmd` |

## 9. "Tool schema is too large" warnings

Use **[code mode](code-mode.md)** if your client supports it. Code mode ships a single `run_code` tool plus on-demand TypeScript types and keeps the schema payload small.

## 9. Still stuck

Collect:

- Client name and version
- Transport (`http` or `sse`)
- The exact error message (from the client log, not just the UI)
- A curl reproduction if possible:

  ```bash
  curl -i https://mcp.sales-mind.ai/mcp \
    -H "X-API-KEY: $SALESMIND_API_KEY" \
    -H "Accept: application/json, text/event-stream" \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
  ```

Then contact **contact@sales-mind.ai** or open an issue on this repository.
