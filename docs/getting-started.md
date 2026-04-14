# Getting started

This page explains what the SalesMind AI MCP is, how it is structured, and the minimum you need to do to connect an AI assistant to it.

## What is MCP?

The [Model Context Protocol](https://modelcontextprotocol.io) is an open standard that lets AI assistants call external tools and read external resources through a single, uniform interface. An MCP server advertises a list of tools; an MCP client (Claude, ChatGPT, Cursor, Gemini CLI, etc.) connects to the server, discovers those tools, and can invoke them on behalf of the user.

The **SalesMind AI MCP** is a hosted MCP server that exposes the SalesMind AI platform. You do not need to run anything locally — the server is already running at `mcp.sales-mind.ai`.

## Endpoints

| Purpose | URL | Transport |
| --- | --- | --- |
| Modern, recommended | `https://mcp.sales-mind.ai/mcp` | Streamable HTTP (`POST /mcp`) |
| Legacy clients | `https://mcp.sales-mind.ai/sse` | Server-Sent Events (`GET /sse` + `POST /messages`) |

Both endpoints expose the exact same tools and accept the same authentication header. Use Streamable HTTP whenever your client supports it — it is simpler, stateless, and produces fewer connection issues behind proxies.

## Authentication

Every request must include your SalesMind AI API key in the `X-API-KEY` HTTP header:

```
X-API-KEY: YOUR_API_KEY
```

See [authentication.md](authentication.md) for how to generate, rotate, and secure API keys.

## How tools are generated

The SalesMind AI MCP is an **adapter** over the SalesMind AI REST API. Tools are generated dynamically from the SalesMind AI OpenAPI specification, which means:

- New API endpoints become available as MCP tools automatically after a short cache refresh.
- Tool names, parameters, and descriptions mirror the underlying REST operations.
- Responses are **optimised for LLM consumption**: JSON-LD wrappers are stripped, collections are flattened to `{ total, items[] }`, oversized responses are truncated with a marker, and HTTP errors are normalised to `{ error, status, title, detail }`.

This optimisation typically reduces token usage by 30–70% compared to raw API responses, which directly lowers cost and latency for your assistant.

## Your first call

Once the MCP is connected in your client, a prompt as simple as:

> *"Using SalesMind AI, show me my active campaigns and how many growth steps each one has."*

is enough. The model will:

1. Discover the relevant tools (`listCampaigns`, `listCampaignGrowths`, …).
2. Call them with appropriate parameters — filtering by `status: ACTIVE`, iterating per campaign, etc.
3. Read the trimmed JSON responses.
4. Answer you in natural language.

You do not need to know the tool names — the model discovers them on connect. The available tools reflect the actual SalesMind AI entities: **Agents**, **Campaigns**, **Lead Lists**, **Leads**, **Personas**, **Senders** (LinkedIn accounts), and **Growth automations**. To see the full list, ask: *"List every tool exposed by the SalesMind AI MCP."*

## Next steps

- [Install the MCP in your client](../README.md#installation-guides)
- [Learn how code mode reduces context usage](code-mode.md)
- [Read the troubleshooting guide](troubleshooting.md) if something does not work
