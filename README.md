# SalesMind AI MCP

Official user documentation for the **SalesMind AI Model Context Protocol (MCP)** server.

The SalesMind AI MCP exposes the SalesMind AI platform as a set of tools that any MCP-compatible AI assistant — Claude, ChatGPT, Gemini, Cursor, OpenCode, and others — can call directly. Once connected, your assistant can query prospects, enrich leads, trigger workflows, and operate your SalesMind AI data from inside the conversation.

- **Streamable HTTP endpoint:** `https://mcp.sales-mind.ai/mcp`
- **SSE endpoint (legacy clients):** `https://mcp.sales-mind.ai/sse`
- **Authentication:** `X-API-KEY` HTTP header
- **Protocol:** [Model Context Protocol](https://modelcontextprotocol.io)

---

## Table of contents

1. [Getting started](docs/getting-started.md)
2. [Authentication](docs/authentication.md)
3. [Code mode](docs/code-mode.md)
4. [Installation guides](#installation-guides)
5. [Troubleshooting](docs/troubleshooting.md)
6. [FAQ](docs/faq.md)

---

## Installation guides

Pick the client you use and follow the matching guide. Every guide ends with a verification step.

| Client | Transport | Guide |
| --- | --- | --- |
| Claude Desktop | Streamable HTTP / SSE | [docs/installation/claude-desktop.md](docs/installation/claude-desktop.md) |
| Claude Code (CLI) | Streamable HTTP / SSE | [docs/installation/claude-code.md](docs/installation/claude-code.md) |
| Cursor | Streamable HTTP | [docs/installation/cursor.md](docs/installation/cursor.md) |
| Gemini CLI | Streamable HTTP / SSE | [docs/installation/gemini-cli.md](docs/installation/gemini-cli.md) |
| OpenAI (Responses API, ChatGPT, Codex) | Streamable HTTP | [docs/installation/openai.md](docs/installation/openai.md) |
| OpenCode | Streamable HTTP / SSE | [docs/installation/opencode.md](docs/installation/opencode.md) |
| Windsurf | SSE | [docs/installation/windsurf.md](docs/installation/windsurf.md) |
| Any other MCP client | Streamable HTTP / SSE | [docs/installation/generic.md](docs/installation/generic.md) |

---

## Quick start (30 seconds)

1. **Get your API key** from the SalesMind AI dashboard (Settings → API keys).
2. **Pick a transport.** Streamable HTTP (`/mcp`) is the modern default. SSE (`/sse`) is provided for clients that do not yet speak Streamable HTTP.
3. **Add the server to your client** using one of the guides above. Most clients accept a remote HTTP config:

   ```json
   {
     "salesmind": {
       "type": "http",
       "url": "https://mcp.sales-mind.ai/mcp",
       "headers": { "X-API-KEY": "YOUR_API_KEY" }
     }
   }
   ```

   > **Claude Desktop exception.** Claude Desktop does not support custom headers in its config. Use the [`mcp-remote` proxy method](docs/installation/claude-desktop.md) instead.

4. **Restart your client** and ask it something like *"List my 10 most recent SalesMind AI leads."* The assistant will discover the available tools automatically.

---

## What's inside

- [`docs/`](docs/) — Conceptual documentation (authentication, code mode, troubleshooting, FAQ).
- [`docs/installation/`](docs/installation/) — One file per supported MCP client.
- [`examples/`](examples/) — Minimal, copy-pasteable configuration snippets for every supported client.

---

## Support

- **Status page:** <https://status.sales-mind.ai>
- **Email:** contact@sales-mind.ai
- **Issues with this documentation:** open a pull request on this repository.

---

## License

This documentation is published under the [MIT License](LICENSE).
