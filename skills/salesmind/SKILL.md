---
name: salesmind
description: >
  SalesMind AI MCP integration. Use when the user asks about SalesMind AI
  data: campaigns, leads, agents, personas, senders, lead lists, or growth
  automations. Guides the search + execute tool workflow.
when_to_use: >
  User mentions SalesMind AI, campaigns, leads, prospects, outreach,
  pipeline, agents, personas, senders, lead lists, or growth automations
  in context of their sales data.
---

# SalesMind AI MCP

You are connected to the SalesMind AI MCP at `https://mcp.sales-mind.ai/mcp`.
It exposes two tools: `search` and `execute`. Always follow this workflow.

For detailed examples, see [reference.md](reference.md).

## Workflow

1. **search(query)** -- find the right API endpoints and filters
2. Read the returned `actions` (endpoints) and `filters` (query params)
3. **execute(code)** -- run a script using those endpoints and filters

Never guess endpoints. Always search first.

## Search keywords

Use these with the `search` tool:

| Keyword | Entity |
|---------|--------|
| `agent` | AI sales agents (also used for teams) |
| `campaign` | Outreach campaigns |
| `campaign-growth` | Growth automation steps in campaigns |
| `lead` | Individual prospects |
| `lead-list` | Collections of leads |
| `persona` | Buyer personas |
| `sender` | LinkedIn accounts |

Combine with intent words: `create campaign`, `list leads`, `update agent`, `delete persona`.
Intent words: get, list, find, show, create, add, update, edit, delete, remove.

## Script format for execute

`api` is a global. Do NOT import or destructure it. Write an async arrow returning the result.

```js
async () => await api.request(method, path, { path?, query?, body? })
```

Returns an object with `.items` array.

### Examples

List with filters:
```js
async () => await api.request('GET', '/v1/campaign', { query: { status: 'ACTIVE', page: 1 } })
```

Get by ID:
```js
async () => await api.request('GET', '/v1/campaign/{id}', { path: { id: '123' } })
```

Create:
```js
async () => await api.request('POST', '/v1/lead', { body: { firstName: 'Jane', lastName: 'Doe' } })
```

Multi-step:
```js
async () => {
  const campaigns = await api.request('GET', '/v1/campaign', { query: { status: 'ACTIVE' } });
  const results = [];
  for (const c of campaigns.items) {
    const growths = await api.request('GET', '/v1/campaign-growth', {
      query: { campaign: c['@id'] }
    });
    results.push({ name: c.name, steps: growths.items.length });
  }
  return results;
}
```

## Rules

### ID-based filters (IRI)

Some filters require a resource ID path, NOT a text value. In search results these show as:
`"teams": "id -- GET /v1/agent to list, use IRI /teams/{id}"`

Steps:
1. Call the listed endpoint (`GET /v1/agent`) to get the resources
2. Find the matching resource by name, get its numeric ID
3. Use the IRI pattern as the filter value: `/teams/42`

NEVER pass a text name to a filter marked as "id". Always resolve the ID first.

### Pagination

- Max 12 items per page (API cap). Use `page` param to get more.
- Response shape: `{ pagination: { total, page, itemsPerPage }, data: [...] }`
- `total` = items across ALL pages, not just current page.
- To get everything: loop while items received < `total`, incrementing `page`.

### selected_fields

When search returns `selected_fields` (e.g. `["name", "status"]`):
- Pass `properties: selected_fields` in query: `{ query: { properties: ["name", "status"] } }`
- Pass `selected_fields` as second argument to `execute`
- Map response to only those keys

When empty or absent: flatten to top-level primitives only.

## Error codes

| Code | Meaning | Action |
|------|---------|--------|
| 401 | Bad or missing API key | Check key in client config |
| 404 | Wrong endpoint path | Search first to find the right path |
| 429 | Rate limit exceeded | Wait and retry |
| 500 | Server error | Retry once |
