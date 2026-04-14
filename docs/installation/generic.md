# Generic MCP client

Any client that implements the [Model Context Protocol](https://modelcontextprotocol.io) can talk to the SalesMind AI MCP. Point it at one of these endpoints and add the `X-API-KEY` header.

## Streamable HTTP (preferred)

- **URL:** `https://mcp.sales-mind.ai/mcp`
- **Method:** `POST`
- **Required headers:**
  - `Content-Type: application/json`
  - `Accept: application/json, text/event-stream`
  - `X-API-KEY: YOUR_API_KEY`
- **Body:** a JSON-RPC 2.0 message (`initialize`, `tools/list`, `tools/call`, …)

## SSE (legacy)

- **SSE URL:** `GET https://mcp.sales-mind.ai/sse`
- **Message URL:** `POST https://mcp.sales-mind.ai/messages` (the server returns the exact path in the initial `endpoint` event)
- **Required headers on both:** `X-API-KEY: YOUR_API_KEY`

## Quick curl sanity check

```bash
curl -s https://mcp.sales-mind.ai/mcp \
  -H "X-API-KEY: $SALESMIND_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | jq .
```

A successful response contains a `result.tools` array with the generated SalesMind AI tools.

## Python example with the official MCP SDK

```python
import asyncio
import os
from mcp.client.streamable_http import streamablehttp_client
from mcp import ClientSession

async def main() -> None:
    headers = {"X-API-KEY": os.environ["SALESMIND_API_KEY"]}
    async with streamablehttp_client(
        "https://mcp.sales-mind.ai/mcp", headers=headers
    ) as (read, write, _):
        async with ClientSession(read, write) as session:
            await session.initialize()
            tools = await session.list_tools()
            for t in tools.tools:
                print(t.name, "-", t.description)

asyncio.run(main())
```

## TypeScript example with the official MCP SDK

```ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const transport = new StreamableHTTPClientTransport(
  new URL("https://mcp.sales-mind.ai/mcp"),
  {
    requestInit: {
      headers: { "X-API-KEY": process.env.SALESMIND_API_KEY! },
    },
  },
);

const client = new Client({ name: "my-agent", version: "1.0.0" });
await client.connect(transport);

const { tools } = await client.listTools();
console.log(tools.map((t) => t.name));
```

See [troubleshooting](../troubleshooting.md) if a request fails.
