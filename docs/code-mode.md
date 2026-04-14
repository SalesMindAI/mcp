# Code mode

Code mode is a way of using an MCP server that replaces *many individual tool calls* with a *single code-execution tool*. Instead of exposing every SalesMind AI operation as its own tool entry (`listCampaigns`, `listCampaignGrowths`, `listAgentSenders`, …), the client presents the model with one tool — `run_code` — together with TypeScript type definitions for every available operation. The model writes a short program that calls those operations, the program runs inside a sandbox, and the result is returned as a single tool response.

This pattern is documented by Anthropic in *["Code execution with MCP: Building more efficient agents"](https://www.anthropic.com/engineering/code-execution-with-mcp)* and by Cloudflare under the name *["Code mode"](https://blog.cloudflare.com/code-mode/)*. Both implementations are compatible with the SalesMind AI MCP because code mode is a client-side technique — the server does not need to know about it.

## Why code mode matters

Large MCP servers can register dozens or hundreds of tools. Listing all of them in the system prompt inflates context, slows the model, and increases cost. Code mode addresses three concrete problems:

1. **Context bloat.** Only the single `run_code` tool and the types the model actually references need to sit in context.
2. **Multi-step workflows.** Chaining ten tool calls costs ten round-trips with full JSON responses in between. A single script chains them locally and only returns the final, shaped result.
3. **Data shaping.** The model can `filter`, `map`, `sort`, and `slice` inside the sandbox so that only the data that matters reaches the conversation.

In practice, workflows that touch many SalesMind AI endpoints (bulk enrichment, pipeline analytics, cohort scoring) can drop their token usage by an order of magnitude.

## How it works with the SalesMind AI MCP

The SalesMind AI MCP generates its tools from the published OpenAPI specification. A code-mode-aware client does the following at startup:

1. Connects to `https://mcp.sales-mind.ai/mcp` and calls `tools/list` to discover every tool and its JSON Schema.
2. Transpiles the schemas to TypeScript declarations — one typed function per tool — and ships them to the model as part of the system prompt (or loads them on demand).
3. Exposes a single `run_code` tool whose input is a TypeScript/JavaScript snippet.
4. When the model calls `run_code`, the snippet runs inside an isolated sandbox (V8 isolate, Deno Deploy, Node worker, Cloudflare Worker, etc.). The sandbox implements each typed function by issuing the corresponding MCP tool call back to the SalesMind AI MCP, carrying the user's `X-API-KEY` header.
5. The final value returned by the snippet is sent back as the tool result.

From the server's point of view nothing changes: it still sees normal MCP tool calls over Streamable HTTP or SSE.

## Example

The SalesMind AI data model includes **Agents**, **Campaigns** (status: DRAFT / ACTIVE / PAUSE), **Lead Lists**, **Leads**, **Personas**, **Senders** (LinkedIn accounts), and **Growth automations**. Tool names are generated from the SalesMind AI OpenAPI spec — call `tools/list` on the MCP endpoint to see the exact names for your version.

Below is a realistic workflow: *"For every active campaign, show me its name and how many growth automation steps it has configured."*

**Classic tool-calling mode** — the model makes N+1 round trips, and every intermediate response sits in context:

1. `listCampaigns({ status: "ACTIVE" })` → full collection of campaign objects returned to context
2. `listCampaignGrowths({ campaignId: "…" })` × N — one call per campaign, each response in context
3. Model filters and formats in its head

**Code mode** — the model emits one snippet, runs it in the sandbox, and receives only the shaped result:

```ts
// run_code input
const campaigns = await sm.listCampaigns({ status: "ACTIVE" });

const withGrowth = await Promise.all(
  campaigns.items.map(async (c) => ({
    name: c.name,
    growth: await sm.listCampaignGrowths({ campaignId: c.id }),
  }))
);

return withGrowth
  .sort((a, b) => b.growth.total - a.growth.total)
  .map((e) => ({
    campaign: e.name,
    growthSteps: e.growth.total,
  }));
```

The model receives a compact ranked array — not the full campaign collection plus N growth-step collections.

## Enabling code mode

Code mode is provided by the **client**, not by the SalesMind AI MCP. The matrix below reflects widely-deployed clients; check each project's release notes for the latest status.

| Client | Code-mode support | Notes |
| --- | --- | --- |
| Cloudflare Agents SDK | Native | Coined the name "code mode". Uses Workers + V8 isolates. |
| Anthropic API (via SDK examples) | Pattern | Anthropic publishes reference implementations you can adapt. |
| Claude Code | Available as a setting / plugin | Enable code-mode sandboxing in the configuration when supported. |
| Cursor, Windsurf, OpenCode, Gemini CLI | Community plugins | Behaviour varies — consult each project. |
| OpenAI Responses API | Can be emulated with `code_interpreter` + MCP | Pattern, not a built-in switch. |

If your client does not yet support code mode, the SalesMind AI MCP still works perfectly in classic tool-calling mode. You only pay the context cost of the tools the model actually selects.

## Operational notes

- **Latency.** Snippets run in a sandbox close to the client. Each SalesMind AI call inside the snippet still goes to `mcp.sales-mind.ai`, so round-trip time is the same as classic mode — but there are typically fewer round trips.
- **Security.** Code mode sandboxes must deny filesystem and network access to anything other than the MCP server. Any reputable implementation does this by default.
- **Debugging.** Errors thrown inside a snippet are returned as the tool result. Wrap calls in `try/catch` when instructing the model, or rely on the client's default error surfacing.
- **Rate limits.** A code-mode snippet can fan out many calls at once — be mindful of the SalesMind AI API rate limit on your plan and batch where appropriate.
