# mahi-pr-test

Sandbox project for verifying Mahi's `.mahi/` per-project config layer.

## What's here

```
.mahi/
  .gitignore           # node_modules/, package.json, lockfiles
  hooks/
    project-banner.js  # always-on UserPromptSubmit banner. Hot-reload check.
    pr-keyword.js      # only fires when the prompt mentions "PR".
  tools/
    project_echo.js        # MCP tool, scoped to this project only.
    linear_self_check.js   # exercises @linear/sdk via NODE_PATH resolution.
```

## How to test (after Mahi is rebuilt with the .mahi/ feature)

1. **Open this project in Mahi.** Add it via the Project Sidebar if not present (path: this directory).
2. **Spawn any session** in this project.
3. **Send a prompt.** Both project hooks should run on `UserPromptSubmit`:
   - `project-banner` injects context tagged with this project's name + id + path.
   - `pr-keyword` only injects when the prompt contains "PR".
   The agent's reply should reflect the injected context (e.g. it acknowledges the project name).
4. **List MCP tools.** Ask the agent: "list your MCP tools". `project_echo` and `linear_self_check` must appear; in any *other* project they must not.
5. **Hot reload.** Edit `project-banner.js` and change the message. Send another prompt — the new text appears without restarting Mahi.
6. **Negative control.** Spawn a session in a different project; confirm none of these hooks/tools surface there.

## Useful debug surfaces

- Sidecar log (dev): the terminal running `pnpm tauri dev`. Look for `[project-loader]` warnings on bad files.
- Sidecar log (prod): `~/.local/share/mahi/logs/sidecar.log`.
- `process.env.MAHI_PROJECT_ID` is set on the spawned shell; surfaced in hook payload `env`.
- `process.env.MAHI_SESSION_ID` is set on the spawned shell; identifies the active session.

## Troubleshooting

- Hooks not firing? Confirm `MAHI_PROJECT_ID` is set in the spawned shell — its absence usually means the project context didn't attach.
- MCP tools missing from `list your MCP tools`? Re-check the sidecar log for `[project-loader]` warnings; a malformed file in `.mahi/tools/` skips the whole batch.
- Hot-reload silent? Save the file again — some editors write to a temp path first and the watcher may miss the rename.
