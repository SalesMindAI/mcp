# Contributing

Thank you for helping improve the SalesMind AI MCP documentation.

## Scope

This repository contains **user-facing documentation only**. If you want to report an issue with the MCP server itself, please use the main `app-mcp` repository or email contact@sales-mind.ai.

## How to contribute

1. Fork the repository.
2. Create a branch: `git checkout -b docs/short-description`.
3. Edit Markdown files under `docs/` or add examples under `examples/`.
4. Run a spell-check and a Markdown linter if you have them locally.
5. Open a pull request with a clear title and a short description of the change.

## Style guide

- Write in **plain, professional English**. Prefer short sentences over complex ones.
- Use **second person** ("you") when addressing the reader.
- Code blocks must be fenced with the appropriate language hint (```` ```json ````, ```` ```bash ````, ```` ```ts ````).
- Never commit real API keys. Use the placeholder `YOUR_API_KEY` or reference an environment variable.
- Keep lines wrapped at a natural width; do not hard-wrap at 80 columns unless the surrounding file already does.

## Adding a new installation guide

1. Create `docs/installation/<client>.md` using an existing guide as a template.
2. Add a matching example file under `examples/` if the client uses a static config file.
3. Add a row to the installation table in the root [README](README.md).
4. Verify the steps from a clean install of the client on at least one operating system.

## Reporting documentation bugs

Open an issue describing:

- The page and section affected
- What is wrong or unclear
- The client and version you were using when you hit the problem
