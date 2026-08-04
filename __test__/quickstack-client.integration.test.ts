import { describe, expect, test } from "bun:test";
import { fileURLToPath } from "node:url";
import { QuickStackClient } from "../src/quickstack-client";

const baseUrl = process.env.QUICKSTACK_INTEGRATION_BASE_URL;
const apiToken = process.env.QUICKSTACK_INTEGRATION_API_TOKEN;
const agentId = process.env.QUICKSTACK_INTEGRATION_AGENT_ID!;
const testDocumentPath = fileURLToPath(new URL("./test-docs.pdf", import.meta.url));

const describeIfCredentials = baseUrl && apiToken ? describe : describe.skip;
const describeIfSandboxCredentials = baseUrl && apiToken && agentId ? describe : describe.skip;

describeIfCredentials("QuickStackClient integration", () => {
    test("can list projects", async () => {
        const client = QuickStackClient.create(baseUrl!, apiToken!);

        const projects = await client.listProjects();

        expect(Array.isArray(projects)).toBe(true);

        for (const project of projects) {
            expect(typeof project.id).toBe("string");
            expect(typeof project.name).toBe("string");
            expect(typeof project.projectType).toBe("string");
        }
    });
});

describeIfSandboxCredentials("QuickStackClient sandbox integration", () => {
    test("starts a predefined sandbox and uploads the test document to /tmp", async () => {
        const client = QuickStackClient.create(baseUrl!, apiToken!);
        const sandboxList = await client.listAgentSandboxes({ agentId })
        const sandboxPath = "/tmp/test-docs.pdf";

        const upload = {
            file: new File([Bun.file(testDocumentPath)], "test-docs.pdf", { type: "application/pdf" }),
        };
        await client.writeAgentSandboxFile({
            agentId: agentId!,
            sandboxName: sandboxList[0]!.sandboxName,
            path: sandboxPath,
        }, upload);

        expect(sandboxList.length).toBeGreaterThan(0);
    }, 600000);
});
