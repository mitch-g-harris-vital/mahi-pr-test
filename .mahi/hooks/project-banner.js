// Fires on every UserPromptSubmit and injects a banner that proves the
// project hook resolved correctly. Edit this file mid-session to verify
// the mtime-cache hot reload — the banner text updates on the next prompt.
module.exports = {
  id: "project-banner",
  event: "UserPromptSubmit",
  match: () => true,
  handle: (_payload, ctx) =>
    `[mahi-pr-test/.mahi/hooks/project-banner.js] active for project=${ctx.projectName} (id=${ctx.projectId}, path=${ctx.projectPath})`,
};
