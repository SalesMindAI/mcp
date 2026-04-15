# SalesMind AI MCP -- Skills

Ready-to-install [Claude Code skills](https://code.claude.com/docs/en/skills) that help Claude use the SalesMind AI MCP effectively.

## What's included

| Skill | Description |
| --- | --- |
| `salesmind` | Core skill. Teaches Claude the search + execute workflow, entity keywords, script format, IRI filter rules, and pagination. Auto-invoked when you mention SalesMind AI data. |

## Installation

### Prerequisites

- Claude Code installed
- SalesMind AI MCP server added to Claude Code (see [installation guide](../docs/installation/claude-code.md))

### Install the skill

Copy the `salesmind/` directory to your personal skills folder (works across all projects):

```bash
cp -r salesmind ~/.claude/skills/salesmind
```

Or to a specific project only:

```bash
cp -r salesmind /path/to/your/project/.claude/skills/salesmind
```

### Verify

Start Claude Code and ask:

```
What skills are available?
```

`salesmind` should appear in the list. Then try:

```
List my SalesMind AI campaigns.
```

Claude will use the skill to call `search` + `execute` correctly.

## How it works

- **`salesmind/SKILL.md`** -- Main instructions. Claude loads the description automatically and invokes the full skill when your request involves SalesMind AI data.
- **`salesmind/reference.md`** -- Detailed workflow examples. Claude reads this only when it needs deeper context (multi-step workflows, IRI filters, pagination loops).

## Other clients

These skills are for **Claude Code** specifically. If you use other clients:

- **Claude Desktop** -- The MCP server sends built-in instructions automatically. No extra setup needed.
- **ChatGPT / Responses API** -- Same: built-in instructions guide the model. See [OpenAI guide](../docs/installation/openai.md).
- **Other MCP clients** -- The server's built-in instructions apply to all connected clients.
