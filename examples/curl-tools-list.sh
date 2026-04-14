#!/usr/bin/env bash
# Minimal sanity check: list the tools exposed by the SalesMind AI MCP.
set -euo pipefail

: "${SALESMIND_API_KEY:?Set SALESMIND_API_KEY before running this script}"

curl -s https://mcp.sales-mind.ai/mcp \
  -H "X-API-KEY: ${SALESMIND_API_KEY}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | jq .
