# Changelog

All notable changes to this documentation are tracked here. The project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] — 2026-04-16

### Added

- **OAuth 2.1 authentication** documented as the recommended method across all pages. The server now supports OAuth with Dynamic Client Registration (RFC 7591), PKCE S256, token rotation, and a branded login page.
- New OAuth section in [authentication.md](docs/authentication.md) with comparison table, security details, and full flow explanation.
- OAuth setup instructions in all installation guides: ChatGPT (automatic via connector), Claude Desktop (via `mcp-remote`), Claude Code (native), and generic clients.
- OAuth support notes added to Cursor, Gemini CLI, OpenCode, and Windsurf installation guides.
- New FAQ entry: "How does OAuth work with SalesMind AI?"
- OAuth-specific troubleshooting for 401 errors.
- OAuth token storage details in SECURITY.md.

### Changed

- Authentication is now presented as three methods (OAuth, header, query param) with OAuth recommended, across getting-started.md, README.md, and all installation guides.
- ChatGPT/OpenAI guide rewritten: OAuth is the primary setup method, replacing the query parameter approach.
- Claude Desktop and Claude Code guides restructured: OAuth config shown first (simpler, no API key in config file), header method shown as alternative.
- FAQ "can't set custom headers" answer updated to recommend OAuth first.
- Troubleshooting Claude Desktop example updated to use OAuth config.

## [1.1.0] — 2026-04-14

### Changed

- Rewrote documentation to accurately describe the two-tool architecture (`search` + `execute`) instead of individual per-endpoint tools.
- Renamed and rewrote "Code mode" page to "How it works (search + execute)".
- Simplified all pages for beginner readability.
- Added tested/untested status column to the installation guides table (Claude Desktop and OpenCode verified).

### Added

- **Query parameter authentication** (`?api_key=YOUR_KEY`) documented in authentication.md and the OpenAI installation guide. Useful for clients that cannot set custom HTTP headers (ChatGPT Web, ChatGPT Desktop, etc.).
- ChatGPT Web and ChatGPT Desktop setup instructions in the OpenAI guide.
- FAQ entry for "my client can't set custom headers".
- **Claude Code skill** (`skills/salesmind/`) -- ready-to-install skill with SKILL.md and reference.md. Auto-invoked when users mention SalesMind AI data. Covers search+execute workflow, entity keywords, IRI filters, pagination, and common patterns.

### Removed

- Removed inaccurate references to client-side code mode and individual tool names (`listCampaigns`, etc.).
- Removed status page link (consolidated under email support).
- Trimmed FAQ from 12 to 11 entries, removed redundant questions.

## [1.0.0] — 2026-04-14

### Added

- Initial public release of the SalesMind AI MCP user documentation.
- Getting started guide, authentication reference, code-mode explainer, troubleshooting and FAQ.
- Installation guides for Claude Desktop, Claude Code, Cursor, Gemini CLI, OpenAI Responses API / ChatGPT / Codex, OpenCode, Windsurf, and generic MCP clients.
- Copy-pasteable configuration snippets under `examples/`.
- `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` (MIT), `.gitignore`.
