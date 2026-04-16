# OpenAI (ChatGPT, Responses API, Codex CLI)

This guide covers connecting to the SalesMind AI MCP from OpenAI products: ChatGPT (web and desktop), the Responses API, and Codex CLI.

## ChatGPT Web and ChatGPT Desktop

ChatGPT connects to the SalesMind AI MCP via **OAuth 2.1**. You authenticate by entering your SalesMind API key on a secure login page -- ChatGPT never sees your raw key.

### Setup

1. In ChatGPT, go to **Settings > Connectors > Create** (Team/Enterprise plans).
2. Enter the MCP URL:

   ```
   https://mcp.sales-mind.ai/mcp
   ```

3. ChatGPT will discover the OAuth endpoints automatically and redirect you to the SalesMind AI login page.
4. Enter your API key. The server validates it and issues OAuth tokens.
5. Authorize the connector for your conversation.

That's it. ChatGPT will discover the `search` and `execute` tools automatically.

> **How does auth work?** ChatGPT uses Dynamic Client Registration (DCR) to register itself, then redirects you to a branded SalesMind AI login page where you enter your API key. The server validates the key, issues an access token and a refresh token, and returns them to ChatGPT. Your API key never leaves the server. See [authentication](../authentication.md) for details.

### Verify

Start a new conversation and ask:

> List my SalesMind AI campaigns.

ChatGPT should call the MCP tools and return your data.

---

## Responses API (TypeScript)

The Responses API supports custom headers, so you can use the `X-API-KEY` header directly:

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
