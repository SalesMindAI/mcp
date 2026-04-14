# FAQ

### Do I need to run anything locally?

No. The SalesMind AI MCP is hosted at `mcp.sales-mind.ai`. Point your client at the URL, add the `X-API-KEY` header, and you are done.

### Which transport should I use?

Use **Streamable HTTP** (`/mcp`) whenever your client supports it. Fall back to **SSE** (`/sse`) only for clients that have not yet added Streamable HTTP support (some older Cursor / Windsurf builds).

### Is the API key the same as my SalesMind AI password?

No. API keys are separate credentials managed under **Settings → API keys** in the SalesMind AI dashboard. They can be revoked independently without affecting your login.

### Can multiple people share one API key?

Technically yes, but we strongly recommend one key per user or per device. This makes audit logs meaningful and lets you revoke a single leaked key without disrupting others.

### Does SalesMind AI see my prompts?

The MCP server only sees the tool calls your assistant makes on your behalf (operation name and parameters), plus the API responses it returns. Your prompts, system messages, and the assistant's reasoning never leave the AI provider you chose.

### Will my assistant accidentally delete data?

Destructive operations are exposed as separate tools and will only run if the model decides to call them. Most clients show a confirmation dialog before any tool call; keep that setting enabled if you are new to MCP. For production automation, use read-only API keys when possible.

### Are there rate limits?

Yes. They are tied to your SalesMind AI plan and enforced by the upstream API. If you hit a limit you will receive `429 Too Many Requests` — see [troubleshooting](troubleshooting.md).

### Does the MCP support pagination?

Yes, through whichever parameters the underlying SalesMind AI endpoint offers (typically `page` and `limit`, or cursor parameters). Very large collections are additionally truncated server-side to protect the model's context window; a `_truncated` marker in the response tells you when this happens.

### Can I use the MCP from a browser?

MCP is not designed for direct browser use. If you need to integrate SalesMind AI into a web app, call the SalesMind AI REST API directly and reserve the MCP for AI assistants.

### Does the MCP support webhooks or push notifications?

Not directly. MCP is request/response. For event-driven integration use the SalesMind AI webhooks described in the main SalesMind AI documentation.

### What about audit and compliance?

Every call eventually reaches the SalesMind AI API, where it is subject to the same logging, access controls, and retention as any other API request. Your SalesMind AI admin can review the audit log in the dashboard.

### Can I self-host the MCP?

The [app-mcp](../../README.md) project in this repository is the reference implementation. You can clone and run it in your own infrastructure; the user-facing documentation in this folder also applies to a self-hosted deployment — simply swap the URL.

### What does "code mode" mean?

It is a client-side technique for using an MCP server via a sandboxed code runner instead of individual tool calls, resulting in dramatically lower context usage. See [code-mode.md](code-mode.md).
