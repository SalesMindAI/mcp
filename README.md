# SalesMind AI MCP

User documentation for the **SalesMind AI Model Context Protocol (MCP)** server.

The SalesMind AI MCP lets any MCP-compatible AI assistant -- Claude, ChatGPT, Gemini, Cursor, OpenCode, and others -- interact with your SalesMind AI data directly from the conversation. Query leads, manage campaigns, trigger workflows, and more.

- **Streamable HTTP endpoint:** `https://mcp.sales-mind.ai/mcp`
- **SSE endpoint (legacy):** `https://mcp.sales-mind.ai/sse`
- **Authentication:** `X-API-KEY` header or `?api_key=` query parameter
- **Protocol:** [Model Context Protocol](https://modelcontextprotocol.io)

---

## Quick start

1. **Get your API key** from the SalesMind AI dashboard (**Settings > API keys**).
2. **Add the server** to your client using one of the [installation guides](#installation-guides) below.
3. **Restart your client** and ask something like *"List my 10 most recent SalesMind AI leads."*

Most clients accept a config like this:

```json
{
  "salesmind": {
    "type": "http",
    "url": "https://mcp.sales-mind.ai/mcp",
    "headers": { "X-API-KEY": "YOUR_API_KEY" }
  }
}
```

> **Can't set custom headers?** (ChatGPT Web, ChatGPT Desktop, etc.)
> Use the query parameter method instead: `https://mcp.sales-mind.ai/mcp?api_key=YOUR_API_KEY`
> See [authentication](docs/authentication.md#query-parameter) for details.

---

## Installation guides

Pick your client and follow the guide. Each one ends with a verification step.

| Client | Transport | Status | Guide |
| --- | --- |--------| --- |
| Claude Desktop | Streamable HTTP / SSE | Tested | [docs/installation/claude-desktop.md](docs/installation/claude-desktop.md) |
| Claude Code (CLI) | Streamable HTTP / SSE | Tested | [docs/installation/claude-code.md](docs/installation/claude-code.md) |
| Cursor | Streamable HTTP | Tested | [docs/installation/cursor.md](docs/installation/cursor.md) |
| Gemini CLI | Streamable HTTP / SSE | --     | [docs/installation/gemini-cli.md](docs/installation/gemini-cli.md) |
| OpenAI (ChatGPT, Responses API, Codex) | Streamable HTTP | Tested | [docs/installation/openai.md](docs/installation/openai.md) |
| OpenCode | Streamable HTTP / SSE | Tested | [docs/installation/opencode.md](docs/installation/opencode.md) |
| Windsurf | SSE / Streamable HTTP | --     | [docs/installation/windsurf.md](docs/installation/windsurf.md) |
| Any other MCP client | Streamable HTTP / SSE | --     | [docs/installation/generic.md](docs/installation/generic.md) |

**Status:** "Tested" = verified end-to-end. "--" = based on the client's docs but not yet verified by us. Contributions welcome.

---

## Documentation

| Page | What it covers |
| --- | --- |
| [Getting started](docs/getting-started.md) | What MCP is, how the server works, the two tools |
| [Authentication](docs/authentication.md) | API key management, header vs. query parameter auth |
| [How it works (search + execute)](docs/code-mode.md) | The two-tool architecture and why it matters |
| [Skills (Claude Code)](skills/) | Ready-to-install skill that helps Claude use the MCP |
| [Troubleshooting](docs/troubleshooting.md) | Common errors and how to fix them |
| [FAQ](docs/faq.md) | Frequently asked questions |

---

## Support

- **Email:** contact@sales-mind.ai
- **Issues with this documentation:** open a pull request on this repository.

---

## License

This documentation is published under the [MIT License](LICENSE).
