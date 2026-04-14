# OpenAI (Responses API, ChatGPT, Codex CLI)

OpenAI products consume remote MCP servers through the **Responses API**'s `tools: [{ type: "mcp" }]` parameter. The same configuration block works for ChatGPT custom GPTs and for the OpenAI Codex CLI.

## Responses API (TypeScript / JavaScript)

```ts
import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-5",
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
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5",
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

## ChatGPT custom connector

In ChatGPT Team/Enterprise:

1. **Settings → Connectors → Create**.
2. Enter `https://mcp.sales-mind.ai/mcp` as the MCP URL.
3. Add a custom header `X-API-KEY` with your key.
4. Save and authorise the connector for your conversation.

> ChatGPT currently only accepts Streamable HTTP MCP servers.

## OpenAI Codex CLI

Codex reads `~/.codex/config.toml`. Add:

```toml
[mcp_servers.salesmind]
url = "https://mcp.sales-mind.ai/mcp"
transport = "http"

[mcp_servers.salesmind.headers]
X-API-KEY = "YOUR_API_KEY"
```

Then run `codex` and ask it to use SalesMind AI.

## Verify

Run the example above and confirm the response cites data from your SalesMind AI workspace. Enable `require_approval: "always"` if you want an explicit confirmation step before tools run.

## Notes on approvals and safety

The Responses API exposes `require_approval` with values `"always"`, `"never"`, or a granular object. For production agents that perform writes (create / update / delete), keep approvals on or narrow the set of allowed tools using the `allowed_tools` field.
