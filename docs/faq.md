# FAQ

### Do I need to install anything locally?

No. The SalesMind AI MCP is hosted at `mcp.sales-mind.ai`. You just point your AI client at the URL and provide your API key.

### Which transport should I use?

Use **Streamable HTTP** (`/mcp`) whenever your client supports it. Fall back to **SSE** (`/sse`) only for clients that require it.

### My client can't set custom headers. What do I do?

Use **OAuth** -- it's the recommended method and works with clients that don't support custom headers, including ChatGPT and Claude Desktop. Just point your client at `https://mcp.sales-mind.ai/mcp` without any headers. The server will trigger an OAuth flow and you'll enter your API key on a secure login page. See [authentication](authentication.md#oauth-21-recommended).

If your client doesn't support OAuth either, use the query parameter method: `https://mcp.sales-mind.ai/mcp?api_key=YOUR_API_KEY`. See [authentication](authentication.md#query-parameter).

### How does OAuth work with SalesMind AI?

When you connect with a client that supports OAuth (ChatGPT, Claude Desktop, Claude Code), the client discovers the server's OAuth endpoints automatically. You're redirected to a branded SalesMind AI login page where you enter your API key. The server validates the key and issues short-lived OAuth tokens. Your API key stays on the server and is never shared with the client. Access tokens expire after 1 hour and are refreshed automatically. See [authentication](authentication.md#oauth-21-recommended) for the full flow.

### Is the API key the same as my SalesMind AI password?

No. API keys are separate credentials managed under **Settings > API keys** in the dashboard. They can be revoked without affecting your login.

### Can multiple people share one API key?

Technically yes, but we recommend one key per user or per device. This makes audit logs meaningful and lets you revoke a single key without disrupting others.

### Does SalesMind AI see my prompts?

No. The MCP server only sees the tool calls your assistant makes (operation name and parameters) plus the API responses. Your prompts and the assistant's reasoning stay with your AI provider.

### Will my assistant accidentally delete data?

Destructive operations only run if the model explicitly calls them. Most clients show a confirmation dialog before tool calls -- keep that enabled. For automation, use read-only API keys when possible.

### Are there rate limits?

Yes, tied to your SalesMind AI plan. If you exceed them, you will receive `429 Too Many Requests`. See [troubleshooting](troubleshooting.md).

### What are the `search` and `execute` tools?

These are the two tools the MCP server exposes. `search` discovers API endpoints by keyword; `execute` runs code against those endpoints. The assistant uses them automatically -- you do not need to call them yourself. See [How it works](code-mode.md).

### Can I self-host the MCP?

Yes. The [app-mcp](../../README.md) project is the reference implementation. Clone it, deploy it, and swap the URL in your client config.

### Can I use the MCP from a browser?

MCP is not designed for direct browser use. For web apps, call the SalesMind AI REST API directly.
