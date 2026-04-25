// Project-scoped tool exercising a sidecar-bundled dep (@linear/sdk).
// Confirms NODE_PATH resolution works for project files.
const { LinearClient } = require("@linear/sdk");

exports.register = (server, ctx) => {
  server.tool(
    "linear_self_check",
    "Verify Linear SDK + LINEAR_API_KEY are reachable from a project tool. Returns viewer.email or an error.",
    {},
    async () => {
      const apiKey = process.env.LINEAR_API_KEY;
      if (!apiKey) {
        return {
          content: [
            {
              type: "text",
              text: `[${ctx.projectName}] LINEAR_API_KEY not set on sidecar process.`,
            },
          ],
        };
      }
      try {
        const client = new LinearClient({ apiKey });
        const viewer = await client.viewer;
        return {
          content: [
            {
              type: "text",
              text: `[${ctx.projectName}] Linear viewer: ${viewer.email}`,
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text",
              text: `[${ctx.projectName}] Linear call failed: ${String(err)}`,
            },
          ],
        };
      }
    },
  );
};
