# SalesMind AI MCP -- Reference

Detailed workflow examples for the SalesMind AI MCP tools.

## Full workflow example

**User asks:** "Show my active campaigns with growth steps"

### Step 1: search

```
search("campaigns growth")
```

Returns something like:
```json
{
  "command": "campaigns growth",
  "filters": { "status": "enum: DRAFT, ACTIVE, PAUSE", "page": "int" },
  "actions": [
    "GET /v1/campaign (Retrieves the collection of Campaign...)",
    "GET /v1/campaign-growth (Retrieves the collection of Cam...)"
  ],
  "selected_fields": []
}
```

### Step 2: execute

```js
async () => {
  const campaigns = await api.request('GET', '/v1/campaign', {
    query: { status: 'ACTIVE' }
  });
  const results = [];
  for (const c of campaigns.items) {
    const growths = await api.request('GET', '/v1/campaign-growth', {
      query: { campaign: c['@id'] }
    });
    results.push({ name: c.name, growthSteps: growths.items.length });
  }
  return results;
}
```

Response (after normalization):
```json
{
  "pagination": { "total": 3, "page": 1, "itemsPerPage": 3 },
  "data": [
    { "name": "Q2 Outreach", "growthSteps": 5 },
    { "name": "Enterprise ABM", "growthSteps": 3 },
    { "name": "Startup Sequence", "growthSteps": 7 }
  ]
}
```

## IRI filter walkthrough

Search returns a filter like:
```
"teams": "id -- GET /v1/agent to list, use IRI /teams/{id}"
```

This means you CANNOT do `{ query: { teams: "Marketing" } }`. Instead:

```js
async () => {
  // 1. List agents to find the team ID
  const agents = await api.request('GET', '/v1/agent');
  const marketing = agents.items.find(a => a.name === 'Marketing');

  // 2. Use the IRI pattern with the numeric ID
  const leads = await api.request('GET', '/v1/lead', {
    query: { teams: `/teams/${marketing.id}` }
  });
  return leads;
}
```

## Pagination loop

To fetch all items when there are more than 12:

```js
async () => {
  let allItems = [];
  let page = 1;
  let total = Infinity;

  while (allItems.length < total) {
    const res = await api.request('GET', '/v1/lead', {
      query: { page }
    });
    allItems = allItems.concat(res.items);
    total = res.totalItems || res.items.length;
    if (res.items.length === 0) break;
    page++;
  }
  return allItems;
}
```

## Entity reference

| Entity | Description | Typical fields |
|--------|-------------|----------------|
| **Agent** | AI sales agent / team | name, status |
| **Campaign** | Outreach campaign | name, status (DRAFT/ACTIVE/PAUSE) |
| **Campaign Growth** | Automation steps in a campaign | type, position, campaign |
| **Lead** | Individual prospect | firstName, lastName, email, company |
| **Lead List** | Collection of leads | name, leadCount |
| **Persona** | Buyer persona | name, description |
| **Sender** | LinkedIn account | name, status, linkedInUrl |

### Relationships

- A **Campaign** belongs to an **Agent** and targets a **Lead List**
- A **Campaign** has multiple **Campaign Growth** steps
- A **Lead List** contains multiple **Leads**
- A **Sender** is linked to an **Agent**

## More multi-step patterns

### Lead count per lead list

```js
async () => {
  const lists = await api.request('GET', '/v1/lead-list');
  return lists.items.map(l => ({ name: l.name, leads: l.leadCount }));
}
```

### Campaign with sender info

```js
async () => {
  const campaigns = await api.request('GET', '/v1/campaign', {
    query: { status: 'ACTIVE' }
  });
  const results = [];
  for (const c of campaigns.items) {
    const senders = await api.request('GET', '/v1/sender', {
      query: { campaign: c['@id'] }
    });
    results.push({
      campaign: c.name,
      senders: senders.items.map(s => s.name)
    });
  }
  return results;
}
```

## Error handling in scripts

```js
async () => {
  const res = await api.request('GET', '/v1/campaign', {
    query: { status: 'ACTIVE' }
  });
  if (res.error) {
    return { error: res.error, status: res.status };
  }
  return res.items.map(c => ({ name: c.name, status: c.status }));
}
```

Common errors: `401` (bad key), `404` (wrong path -- search first), `429` (rate limit -- wait).
