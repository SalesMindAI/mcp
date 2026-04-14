# Authentication

The SalesMind AI MCP authenticates every request using your API key. Two methods are supported.

## HTTP header (preferred)

Send the key in the `X-API-KEY` header:

```
X-API-KEY: YOUR_API_KEY
```

This is the standard method. Most MCP clients let you configure custom headers -- see the [installation guides](../README.md#installation-guides) for your client.

## Query parameter

For clients that **cannot set custom HTTP headers** (e.g., ChatGPT Web, ChatGPT Desktop, or other OAuth-only clients), append the key as a query parameter:

```
https://mcp.sales-mind.ai/mcp?api_key=YOUR_API_KEY
```

The server checks for the key in this order:

1. `X-API-KEY` header
2. `api_key` query parameter

If both are present, the header takes priority.

> **Note:** The query parameter method is equally functional. Use it whenever your client does not support custom headers.

## Where to get a key

1. Sign in to the SalesMind AI dashboard.
2. Open **Settings > API keys**.
3. Click **Create key**, give it a name (e.g., `claude-desktop`), and copy the value.

The full key is shown **only once** at creation. Store it securely.

## Key format

SalesMind AI API keys are 64-character hexadecimal strings:

```
06b7e28945fc3c8742c2e5cde98452c5624a2e9f8e4c0ml903a5985b05a808c5
```

There is no `sk_live_` / `sk_test_` prefix.

## Using environment variables

Where your client supports it, reference an environment variable instead of pasting the key directly into a config file:

```json
{
  "headers": {
    "X-API-KEY": "${SALESMIND_API_KEY}"
  }
}
```

Set `SALESMIND_API_KEY` in your shell profile (`~/.zshrc`, `~/.bashrc`) or your OS secret store.

## Rotating a key

1. Create a **new** key in the dashboard before deleting the old one.
2. Update the key in every client that uses it.
3. Restart the affected clients.
4. Revoke the old key.

This order prevents downtime.

## Revoking a compromised key

1. Go to **Settings > API keys**.
2. Click **Revoke** on the affected key -- it stops working within seconds.
3. Create a new key and update your clients.

## Security tips

- Do not commit keys to git. Add `.env` and config files containing secrets to `.gitignore`.
- Use one key per device or application so you can revoke narrowly.
- All traffic to `mcp.sales-mind.ai` is served over TLS -- never connect over plain HTTP.
