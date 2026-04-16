# Authentication

The SalesMind AI MCP server supports three authentication methods. **OAuth 2.1 is recommended** -- it is the most secure option and works automatically with MCP-compliant clients like ChatGPT, Claude, and others.

| Method | Security | Best for |
| --- | --- | --- |
| **OAuth 2.1** (recommended) | Highest -- PKCE, token rotation, scoped access | ChatGPT, Claude Desktop, any MCP-spec client |
| X-API-KEY header | Good -- key sent over TLS | IDE clients (Cursor, Windsurf, OpenCode, Codex) |
| `?api_key=` query parameter | Acceptable -- key in URL over TLS | Clients that cannot set headers or use OAuth |

The server checks credentials in this order:

1. `Authorization: Bearer <token>` (OAuth)
2. `X-API-KEY` header
3. `api_key` query parameter

---

## OAuth 2.1 (recommended)

OAuth 2.1 is the recommended authentication method. Your API key never leaves the server -- you enter it once during authorization, and the server issues short-lived tokens mapped to that key.

### How it works

MCP-compliant clients handle the OAuth flow automatically. When you connect for the first time:

1. The client discovers the server's OAuth endpoints via `/.well-known/oauth-authorization-server` or `/.well-known/oauth-protected-resource`.
2. The client registers itself via Dynamic Client Registration (`POST /oauth/register`).
3. You are redirected to a branded SalesMind AI login page.
4. You enter your API key. The server validates it against the SalesMind API.
5. On success, the server issues an authorization code and redirects back to the client.
6. The client exchanges the code for an access token and a refresh token.
7. All subsequent requests use `Authorization: Bearer <token>`.
8. When the access token expires (1 hour), the client automatically refreshes it.

### Supported clients

OAuth works out of the box with:

- **ChatGPT** (Web and Desktop) -- connects via the ChatGPT connector/Apps system
- **Claude Desktop** -- via `mcp-remote`, which supports OAuth discovery
- **Claude Code** -- supports OAuth natively for remote MCP servers
- Any client that implements the [MCP authorization spec](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)

See the [installation guides](../README.md#installation-guides) for client-specific setup.

### Security details

- **PKCE S256** is used when the client supports it (Claude, spec-compliant clients). ChatGPT connects without PKCE but uses HTTPS-only redirect URIs.
- **Token rotation:** refresh tokens are single-use. Each refresh issues a new token pair and revokes the old one.
- **Token lifetimes:** access tokens expire after 1 hour, refresh tokens after 30 days.
- **Your API key is never exposed** to the MCP client. The client only sees OAuth tokens; the server maps tokens to your API key internally.

---

## HTTP header

Send your API key directly in the `X-API-KEY` header:

```
X-API-KEY: YOUR_API_KEY
```

This is the standard method for IDE-based clients that support custom headers but do not support OAuth. Most MCP clients let you configure headers -- see the [installation guides](../README.md#installation-guides) for your client.

---

## Query parameter

For clients that **cannot set custom HTTP headers or use OAuth**, append the key as a query parameter:

```
https://mcp.sales-mind.ai/mcp?api_key=YOUR_API_KEY
```

> **Note:** This method is functional but less preferred. The key appears in server logs and URL history. Use OAuth or the header method when possible.

---

## Where to get a key

1. Sign in to the [SalesMind AI dashboard](https://apps.sales-mind.ai/user/settings?tab=2).
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

> **Note:** If you authenticated via OAuth, rotating your API key invalidates all OAuth tokens mapped to the old key. You will need to re-authorize each client after the rotation.

## Revoking a compromised key

1. Go to **Settings > API keys**.
2. Click **Revoke** on the affected key -- it stops working within seconds.
3. Create a new key and update your clients.

## Security tips

- Do not commit keys to git. Add `.env` and config files containing secrets to `.gitignore`.
- Use one key per device or application so you can revoke narrowly.
- All traffic to `mcp.sales-mind.ai` is served over TLS -- never connect over plain HTTP.
- **Prefer OAuth** whenever your client supports it. Your API key stays on the server and is never transmitted to the client.
