// Conditional hook: only fires when the user's prompt mentions "PR".
// Useful for verifying the `match` predicate runs and that throw isolation
// works (try changing match() to throw — other hooks should still run).
module.exports = {
  id: "pr-keyword",
  event: "UserPromptSubmit",
  match: (payload) => /\bpr\b/i.test(String(payload.prompt ?? "")),
  handle: (_payload, ctx) =>
    `[pr-keyword] reminder: PR workflow for ${ctx.projectName} — open one against main, no force pushes.`,
};
