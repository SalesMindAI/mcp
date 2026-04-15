# Changelog

All notable changes to this documentation are tracked here. The project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
