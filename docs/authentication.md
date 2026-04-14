# Authentication

The SalesMind AI MCP authenticates every request with a single HTTP header:

```
X-API-KEY: YOUR_API_KEY
```

No OAuth flow, no bearer exchange, no per-tool credentials — the MCP server forwards your key to the SalesMind AI API as-is.

## Where to get a key

1. Sign in to the SalesMind AI dashboard.
2. Open **Settings → API keys**.
3. Click **Create key**, give it a descriptive name (e.g. `claude-desktop-macbook`), and copy the value shown once.

Treat the key like a password: it grants the same privileges as your SalesMind AI account. Anyone who can read the key can call the API on your behalf.

## Key format

SalesMind AI API keys are opaque 64-character hexadecimal strings, for example:

```
06b7e28945fc3c8742c2e5cde98452c5624a2e9f8e4c0ml903a5985b05a808c5
```

There is no `sk_live_` / `sk_test_` prefix — the environment a key belongs to is determined by the workspace you created it in, not by its value. Keys are single-use to view: the full value is shown only once at creation, then only a truncated prefix is displayed in the dashboard.

If your SalesMind AI plan offers a sandbox workspace, generate a dedicated key in that workspace for experimentation and automated tests.

## How to provide the key

Every MCP client lets you set custom HTTP headers. The concrete syntax varies — see the [per-client installation guides](../../README.md#installation-guides) — but the header name and value are always the same:

```json
{
  "headers": {
    "X-API-KEY": "YOUR_API_KEY"
  }
}
```

### Use environment variables, not hard-coded strings

Where your client supports it, reference an environment variable instead of pasting the key into a config file that might be committed to git or synced across devices:

```json
{
  "headers": {
    "X-API-KEY": "${SALESMIND_API_KEY}"
  }
}
```

Set `SALESMIND_API_KEY` in your shell profile (`~/.zshrc`, `~/.bashrc`, `~/.config/fish/config.fish`) or in your operating system's secret store.

## Rotating a key

1. Create a new key in the dashboard **before** deleting the old one.
2. Update the header value in every client that uses SalesMind AI.
3. Restart the affected clients.
4. Revoke the old key from the dashboard.

Following this order prevents downtime.

## Revoking a compromised key

If you suspect a key has leaked:

1. Go to **Settings → API keys**.
2. Click **Revoke** on the affected key — it will stop working within seconds.
3. Create a new key and redeploy as described above.
4. Review the SalesMind AI audit log for any unexpected activity.

## Security checklist

- Do not commit keys to git. Add `.env`, `*.local.json`, and `mcp.json` to your `.gitignore` if they contain secrets.
- Prefer a secret manager (1Password, Doppler, AWS Secrets Manager, Vault) over plain environment variables on shared machines.
- Use one key per device or per application so you can revoke narrowly.
- All traffic to `mcp.sales-mind.ai` is served over TLS — never connect over `http://`.
