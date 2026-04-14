# Security

## Reporting a vulnerability

If you discover a security issue in the SalesMind AI MCP server or in one of the clients listed in this documentation:

1. **Do not open a public GitHub issue.**
2. Email **contact@sales-mind.ai** with:
   - A description of the issue and its potential impact
   - Steps to reproduce
   - Any proof-of-concept material you have
3. We aim to acknowledge reports within two business days and to provide a remediation plan within ten business days for confirmed issues.

## Responsible disclosure

Please give us a reasonable window to investigate and deploy a fix before any public disclosure. We will credit reporters who follow responsible disclosure in the release notes, unless anonymity is requested.

## Scope

This security policy covers:

- The hosted MCP server at `mcp.sales-mind.ai`
- The `app-mcp` reference implementation in the parent repository
- Example code in this documentation folder

The SalesMind AI REST API itself and the clients listed in the installation guides are covered by their own security policies.

## Data handling

- All traffic to `mcp.sales-mind.ai` is served over TLS (HTTPS only).
- API keys are never logged server-side.
- Requests are rate-limited per key.
- See the main SalesMind AI privacy policy at <https://sales-mind.ai/privacy> for retention and compliance details.
