# OpenAI (ChatGPT, Responses API, Codex CLI)

This guide covers connecting to the SalesMind AI MCP from OpenAI products: ChatGPT (web and desktop), the Responses API, and Codex CLI.

## ChatGPT Web and ChatGPT Desktop

ChatGPT Web and Desktop do not support custom HTTP headers for MCP connections. Use the **query parameter** method instead -- append your API key directly in the URL.

### Setup

1. In ChatGPT, go to **Settings > Connectors > Create** (Team/Enterprise plans).
2. Enter the MCP URL **with your API key as a query parameter**:

   ```
   https://mcp.sales-mind.ai/mcp?api_key=YOUR_API_KEY
   ```

3. Save and authorize the connector for your conversation.

That's it. ChatGPT will discover the `search` and `execute` tools automatically.

> **Why query parameter?** ChatGPT Web and Desktop only support OAuth or no auth for MCP connections -- they cannot send custom headers like `X-API-KEY`. The query parameter fallback (`?api_key=`) solves this. The connection is still over HTTPS, so the key is encrypted in transit.

### Verify

Start a new conversation and ask:

> List my SalesMind AI campaigns.

ChatGPT should call the MCP tools and return your data.

---

## Responses API (TypeScript)

```ts
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-4.1",
  input: "List my 10 most recent SalesMind AI leads.",
  tools: [
    {
      type: "mcp",
      server_label: "salesmind",
      server_url: "https://mcp.sales-mind.ai/mcp",
      headers: {
        "X-API-KEY": process.env.SALESMIND_API_KEY!,
      },
      require_approval: "never",
    },
  ],
});

console.log(response.output_text);
```

## Responses API (Python)

```python
import os
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-4.1",
    input="List my 10 most recent SalesMind AI leads.",
    tools=[
        {
            "type": "mcp",
            "server_label": "salesmind",
            "server_url": "https://mcp.sales-mind.ai/mcp",
            "headers": {
                "X-API-KEY": os.environ["SALESMIND_API_KEY"],
            },
            "require_approval": "never",
        }
    ],
)

print(response.output_text)
```

> **Tip:** Set `require_approval: "always"` if you want a confirmation step before any tool runs.

---

## OpenAI Codex CLI

Edit `~/.codex/config.toml`:

```toml
[mcp_servers.salesmind]
url = "https://mcp.sales-mind.ai/mcp"
transport = "http"

[mcp_servers.salesmind.headers]
X-API-KEY = "YOUR_API_KEY"
```

Then run `codex` and ask it to use SalesMind AI.

---

## Verify

For the Responses API, run the example and confirm the response contains data from your SalesMind AI workspace.

If the connection fails, see [troubleshooting](../troubleshooting.md).
