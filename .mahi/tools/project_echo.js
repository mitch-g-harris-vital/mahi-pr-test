// Project-scoped MCP tool. Should appear in tools/list ONLY for sessions
// spawned in this project (mahi-pr-test). Confirms `?projectId=<id>`
// scoping works end-to-end.
const { z } = require("zod");

exports.register = (server, ctx) => {
  server.tool(
    "project_echo",
    "Echo back a message tagged with this project's name. Project-scoped tool from mahi-pr-test/.mahi/tools/.",
    { message: z.string().describe("Message to echo back") },
    async ({ message }) => ({
      content: [
        {
          type: "text",
          text: `[${ctx.projectName}] ${message}`,
        },
      ],
    }),
  );
};
