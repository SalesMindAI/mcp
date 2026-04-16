# Troubleshooting

Common issues when connecting to the SalesMind AI MCP and how to fix them.

## No tools appear in your client

- Check the URL: `https://mcp.sales-mind.ai/mcp` (Streamable HTTP) or `https://mcp.sales-mind.ai/sse` (SSE). No trailing slash.
- Make sure the transport type in your config matches the endpoint. `"type": "sse"` with `/mcp` will not work.
- Restart your client after editing the config -- most clients only read MCP config at startup.
- Check your client's log or developer console for connection errors.

## `401 Unauthorized` or `403 Forbidden`

**If using OAuth:**
- Your access token may have expired. Your client should refresh it automatically. If it doesn't, try disconnecting and reconnecting the server to re-authorize.
- If you rotated or revoked your API key in the SalesMind AI dashboard, all OAuth tokens mapped to that key are invalidated. Re-authorize by reconnecting the server.
- If the 401 response includes a `WWW-Authenticate` header, your client needs to support OAuth to proceed. See [authentication](authentication.md#oauth-21-recommended).

**If using an API key (header or query parameter):**
- The API key is missing, empty, or incorrect.
- The key may have been revoked -- generate a new one in **Settings > API keys**.
- Check for hidden newlines or spaces in the key (re-copy it cleanly).
- If using query parameter auth, make sure the URL is `https://mcp.sales-mind.ai/mcp?api_key=YOUR_KEY` (not `api-key` or `apikey`).

## `429 Too Many Requests`

- You have hit the rate limit for your plan. Wait and retry, or upgrade your plan.
- If using `execute` with parallel API calls, add a small delay between requests.

## `502` / `504` / connection resets

- Usually a transient issue. Try again in a moment.
- If on a corporate network, confirm outbound HTTPS to `mcp.sales-mind.ai` is not blocked.
- Some corporate proxies break Streamable HTTP. Try the SSE endpoint (`/sse`) as a fallback.

## The assistant sees the tools but refuses to use them

- Be specific in your prompt: *"Use SalesMind AI to list my campaigns."*
- Mention the entity by name (leads, campaigns, agents, etc.).
- Some clients require you to explicitly enable a server after adding it. Check the MCP panel.

## Responses look truncated

The server truncates large responses to protect the context window. You will see a message like:

```
"Collection truncated -- 842 more items omitted"
```

Refine your filters (date range, status, etc.) or paginate with `page` / `limit` parameters.

## Claude Desktop -- `npx: command not found` or `spawn ENOENT`

Claude Desktop runs as a GUI app with a limited `PATH` that may not include Node.js. Fix it by providing the **absolute path** to `npx`:

```json
{
  "mcpServers": {
    "salesmind": {
      "command": "/usr/local/bin/npx",
      "args": ["mcp-remote", "https://mcp.sales-mind.ai/mcp"]
    }
  }
}
```

> **Note:** This example uses OAuth (recommended). If you use the API key header method instead, add `"--header", "X-API-KEY:${SALESMIND_API_KEY}"` to the `args` array and set the key in an `env` block. See [Claude Desktop installation](installation/claude-desktop.md).

Find the correct path:
- macOS/Linux: `which npx`
- Windows: `where npx`

Common locations: `/opt/homebrew/bin/npx` (macOS Homebrew), `~/.nvm/versions/node/<version>/bin/npx` (nvm), `C:\Program Files\nodejs\npx.cmd` (Windows).

## SSE connection drops after a few minutes

Some proxies drop idle SSE connections. Use Streamable HTTP (`/mcp`) instead, or let your client auto-reconnect.

## Still stuck?

Collect:
- Client name and version
- Transport (`http` or `sse`)
- The exact error message from the client log

Test with curl:

```bash
curl -s https://mcp.sales-mind.ai/mcp \
  -H "X-API-KEY: $SALESMIND_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Then contact **contact@sales-mind.ai** or open an issue on this repository.
