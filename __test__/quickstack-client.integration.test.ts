import { describe, expect, test } from "bun:test";
import { QuickStackClient } from "../src/quickstack-client";

const baseUrl = process.env.QUICKSTACK_INTEGRATION_BASE_URL;
const apiToken = process.env.QUICKSTACK_INTEGRATION_API_TOKEN;

const describeIfCredentials = baseUrl && apiToken ? describe : describe.skip;

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
