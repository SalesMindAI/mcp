# How it works: search + execute

The SalesMind AI MCP uses a **two-tool architecture** instead of exposing every API endpoint as a separate tool. This page explains what that means and why it matters.

## The two tools

### `search(query, selected_fields?)`

Finds relevant API endpoints by keyword.

**Input:**
- `query` -- a keyword like `"campaigns"`, `"leads"`, or `"create agent"`
- `selected_fields` (optional) -- an array of field names you want in the results (e.g., `["name", "status"]`)

**Output:** A structured response containing:
- The matching API endpoints (method + path + description)
- Available filters and parameters
- Hints for ID-based filters (the server detects when a filter requires a resource ID and tells the assistant where to look it up)

### `execute(code, selected_fields?)`

Runs a JavaScript snippet against the SalesMind AI API inside a secure sandbox.

**Input:**
- `code` -- an async JavaScript function that uses `api.request(method, path, options)` to call the API
- `selected_fields` (optional) -- fields to pick from each result item

**Output:** The API response, automatically cleaned up for LLM consumption:
- JSON-LD wrappers stripped
- Collections flattened to `{ pagination, data[] }`
- Empty values removed
- Long strings truncated

## Example workflow

When you ask *"Show me my active campaigns and how many growth steps each one has"*, the assistant:

**Step 1 -- Search:**
```
search("campaigns growth")
```
Returns the relevant endpoints: `GET /v1/campaign`, `GET /v1/campaign-growth`, etc.

**Step 2 -- Execute:**
```js
const campaigns = await api.request("GET", "/v1/campaign", {
  query: { status: "ACTIVE" }
});

const results = [];
for (const c of campaigns.items) {
  const growths = await api.request("GET", "/v1/campaign-growth", {
    query: { campaign: c["@id"] }
  });
  results.push({ name: c.name, growthSteps: growths.items.length });
}
return results;
```

The assistant receives a compact result and answers you in plain language. You never see the code or the raw API responses.

## Why not one tool per endpoint?

Large APIs can have dozens or hundreds of endpoints. Exposing each one as an MCP tool creates problems:

| Problem | Two-tool approach |
| --- | --- |
| **Context bloat** -- dozens of tool schemas in every prompt | Only 2 tool schemas, always |
| **Multi-step workflows** -- one round trip per tool call | One `execute` call chains multiple API requests |
| **Stale tools** -- adding an API endpoint requires updating tools | Tools auto-generate from the OpenAPI spec |
| **Data shaping** -- raw API responses bloat the conversation | Responses are cleaned and filtered automatically |

## Response normalization

The `execute` tool automatically optimizes API responses before returning them:

- Extracts the payload from API wrappers (`data`, `member`, `hydra:member`)
- Removes metadata fields (`@context`, `@type`, `hydra:view`, etc.)
- Flattens nested objects (e.g., `{ user: { name: "John" } }` becomes `{ user_name: "John" }`)
- Removes null/empty values
- Truncates very long strings
- Wraps everything in a consistent `{ pagination, data[] }` format

This typically reduces token usage by 30-70% compared to raw API responses.

## What you need to know as a user

Nothing, really. The assistant handles the search-then-execute workflow automatically. Just describe what you want in plain language, and the assistant will figure out which endpoints to call and how to combine the results.

If you are building your own integration, see [generic client](installation/generic.md) for direct API examples.
