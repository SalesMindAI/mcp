# FAQ

### Do I need to install anything locally?

No. The SalesMind AI MCP is hosted at `mcp.sales-mind.ai`. You just point your AI client at the URL and provide your API key.

### Which transport should I use?

Use **Streamable HTTP** (`/mcp`) whenever your client supports it. Fall back to **SSE** (`/sse`) only for clients that require it.

### My client can't set custom headers. What do I do?

Use the query parameter method: `https://mcp.sales-mind.ai/mcp?api_key=YOUR_API_KEY`. This works for ChatGPT Web, ChatGPT Desktop, and any client that only supports OAuth or no auth. See [authentication](authentication.md#query-parameter).

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
