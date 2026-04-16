# Getting started

This page explains what the SalesMind AI MCP is, how it works, and how to connect an AI assistant to it.

## What is MCP?

The [Model Context Protocol](https://modelcontextprotocol.io) is an open standard that lets AI assistants call external tools through a uniform interface. An MCP server advertises tools; an MCP client (Claude, ChatGPT, Cursor, Gemini CLI, etc.) connects, discovers those tools, and can invoke them on your behalf.

The **SalesMind AI MCP** is a hosted MCP server. You do not need to run anything locally -- the server is already running at `mcp.sales-mind.ai`.

## Endpoints

| Purpose | URL | Transport |
| --- | --- | --- |
| Recommended | `https://mcp.sales-mind.ai/mcp` | Streamable HTTP |
| Legacy fallback | `https://mcp.sales-mind.ai/sse` | Server-Sent Events |

Both endpoints expose the same tools and accept the same authentication. Use Streamable HTTP whenever your client supports it -- it is simpler, stateless, and has fewer connection issues behind proxies.

## Authentication

The server supports three authentication methods:

1. **OAuth 2.1** (recommended): The most secure option. Your client handles the flow automatically -- you enter your API key once on a secure login page, and the server issues tokens. Your key never leaves the server. Works with ChatGPT, Claude Desktop, Claude Code, and any MCP-spec-compliant client.
2. **HTTP header**: `X-API-KEY: YOUR_API_KEY` -- for IDE clients (Cursor, Windsurf, OpenCode, Codex) that support custom headers.
3. **Query parameter**: `https://mcp.sales-mind.ai/mcp?api_key=YOUR_API_KEY` -- for clients that cannot set headers or use OAuth.

See [authentication.md](authentication.md) for full details on OAuth setup, key management, and security.

## How the server works

The SalesMind AI MCP exposes exactly **two tools**: `search` and `execute`. This design keeps context usage low and works efficiently with any LLM.

### `search`

Discovers available API endpoints by keyword. Example: searching for "campaigns" returns the relevant endpoints, their HTTP methods, and available filters.

### `execute`

Runs a short JavaScript snippet against the SalesMind AI API. The snippet uses an `api.request()` function to make HTTP calls. The server runs the code in a sandbox and returns the result.

### Typical workflow

When you ask your assistant something like *"Show me my active campaigns"*, it will:

1. Call `search("campaigns")` to discover the relevant endpoints and filters.
2. Call `execute(code)` with a script that fetches the data using the discovered endpoints.
3. Return the results to you in natural language.

You do not need to know the tool names or write code yourself -- the assistant handles all of this automatically.

### Why two tools instead of many?

Instead of exposing every SalesMind AI API endpoint as its own tool (which would create dozens of tools and bloat the context window), the server uses a compact two-tool pattern. This:

- Keeps the context window small, reducing cost and latency.
- Allows multi-step workflows in a single call (e.g., list campaigns then fetch details for each).
- Automatically stays up to date as new API endpoints are added.

See [How it works](code-mode.md) for a deeper explanation.

## SalesMind AI entities

The available tools reflect the SalesMind AI platform's data model:

- **Agents** -- your AI sales agents
- **Campaigns** -- outreach campaigns (DRAFT / ACTIVE / PAUSE)
- **Lead Lists** -- collections of leads
- **Leads** -- individual prospects
- **Personas** -- buyer personas
- **Senders** -- LinkedIn accounts
- **Growth automations** -- automation steps within campaigns

## Next steps

- [Install the MCP in your client](../README.md#installation-guides)
- [Learn how search + execute works](code-mode.md)
- [Troubleshooting](troubleshooting.md) if something does not work
