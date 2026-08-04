import { afterEach, describe, expect, test } from "bun:test";
import { QuickStackClient } from "../src/quickstack-client";

const envKeys = [
    "QUICKSTACK_BASE_URL",
    "QUICKSTACK_API_TOKEN"
] as const;

const originalEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]])) as Record<
    (typeof envKeys)[number],
    string | undefined
>;

const restoreEnv = () => {
    for (const key of envKeys) {
        const originalValue = originalEnv[key];
        if (originalValue === undefined) {
            delete process.env[key];
        } else {
            process.env[key] = originalValue;
        }
    }
};

afterEach(() => {
    restoreEnv();
});

describe("QuickStackClient.create", () => {
    test("throws when credentials are missing", () => {
        for (const key of envKeys) {
            delete process.env[key];
        }

        expect(() => QuickStackClient.create()).toThrow(
            "Missing API credentials. Provide baseUrl/token or set QUICKSTACK_BASE_URL and QUICKSTACK_API_TOKEN.",
        );
    });

    test("uses explicit baseUrl and token", () => {
        const client = QuickStackClient.create("https://api.quickstack.dev", "token-1");
        expect(client.openApiClient.baseUrl).toBe("https://api.quickstack.dev");
        expect((client.openApiClient as any).securityData).toEqual({ token: "token-1" });
    });

    test("falls back to QUICKSTACK_* environment variables", () => {
        process.env.QUICKSTACK_BASE_URL = "https://quickstack.example";
        process.env.QUICKSTACK_API_TOKEN = "env-token";

        const client = QuickStackClient.create();
        expect(client.openApiClient.baseUrl).toBe("https://quickstack.example");
        expect((client.openApiClient as any).securityData).toEqual({ token: "env-token" });
    });

    test("updates auth token via setAuthToken", () => {
        const client = QuickStackClient.create("https://api.quickstack.dev", "token-old");

        client.setAuthToken("token-new");

        expect((client.openApiClient as any).securityData).toEqual({ token: "token-new" });
    });

    test("sends bearer token for secured endpoints", async () => {
        const originalFetch = globalThis.fetch;
        let capturedAuthorization: string | null = null;

        globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
            const headers = new Headers(init?.headers);
            capturedAuthorization = headers.get("authorization");

            return new Response(JSON.stringify([]), {
                status: 200,
                headers: {
                    "content-type": "application/json",
                },
            });
        }) as typeof fetch;

        try {
            const client = QuickStackClient.create("https://api.quickstack.dev", "token-auth");
            const projects = await client.listProjects();

            expect(projects).toEqual([]);
            expect(capturedAuthorization).toBe("Bearer token-auth");
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    test("sends sandbox uploads as multipart data with a file field", async () => {
        const originalFetch = globalThis.fetch;
        let receivedBody: Uint8Array | undefined;
        let receivedFileName: string | undefined;

        globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
            expect(init?.body).toBeInstanceOf(FormData);
            const file = (init?.body as FormData).get("file");
            expect(file).toBeInstanceOf(Blob);
            receivedBody = new Uint8Array(await (file as Blob).arrayBuffer());
            receivedFileName = (file as File).name;
            return new Response("{}", {
                status: 200,
                headers: { "content-type": "application/json" },
            });
        }) as typeof fetch;

        try {
            const client = QuickStackClient.create("https://api.quickstack.dev", "token-upload");
            const content = new TextEncoder().encode("PDF bytes, not JSON");

            await client.writeAgentSandboxFile(
                { agentId: "agent-123", sandboxName: "sandbox-main", path: "/tmp/test-docs.pdf" },
                { file: new File([content], "test-docs.pdf", { type: "application/pdf" }) },
            );

            expect(receivedBody).toEqual(content);
            expect(receivedFileName).toBe("test-docs.pdf");
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    test("sandboxInstances.create uses internal OpenAPI endpoint without recursion", async () => {
        const client = QuickStackClient.create("https://api.quickstack.dev", "token-sandbox");

        const sandboxData = {
            agentId: "agent-123",
            claimName: "claim-abc",
            sandboxName: "sandbox-main",
            podName: "pod-1",
            namespace: "ns-1",
            status: "DEPLOYED",
            customTag: null,
            createdAt: "2026-07-19T00:00:00.000Z",
        };

        let receivedParams: unknown;
        let receivedPayload: unknown;

        (client.openApiClient as any).startAgentSandbox = async (params: unknown, payload: unknown) => {
            receivedParams = params;
            receivedPayload = payload;
            return { data: sandboxData };
        };

        const sandbox = await client.sandboxInstances.create("agent-123", {
            idleTimeoutMinutes: 15,
            env: { NODE_ENV: "test" },
        });

        expect(receivedParams).toEqual({
            agentId: "agent-123",
            timeoutMs: 60000,
        });
        expect(receivedPayload).toEqual({
            idleTimeoutMinutes: 15,
            env: { NODE_ENV: "test" },
        });
        expect(sandbox.currentSandbox).toEqual(sandboxData);
    });

    test("startAgentSandbox endpoint remains directly callable", async () => {
        const originalFetch = globalThis.fetch;

        const sandboxData = {
            agentId: "agent-endpoint",
            claimName: "claim-endpoint",
            sandboxName: "sandbox-endpoint",
            podName: "pod-endpoint",
            namespace: "ns-endpoint",
            status: "DEPLOYED",
            customTag: null,
            createdAt: "2026-07-19T00:00:00.000Z",
        };

        globalThis.fetch = (async (_input: RequestInfo | URL, _init?: RequestInit) => {
            return new Response(JSON.stringify(sandboxData), {
                status: 200,
                headers: {
                    "content-type": "application/json",
                },
            });
        }) as typeof fetch;

        try {
            const client = QuickStackClient.create("https://api.quickstack.dev", "token-endpoint");
            const created = await client.startAgentSandbox(
                { agentId: "agent-endpoint", timeoutMs: 60000 },
                { idleTimeoutMinutes: 15, env: { NODE_ENV: "test" } },
            );

            expect(created).toEqual(sandboxData);
        } finally {
            globalThis.fetch = originalFetch;
        }
    });

    test("sandboxInstances.attach loads an existing sandbox", async () => {
        const client = QuickStackClient.create("https://api.quickstack.dev", "token-attach");

        const sandboxData = {
            agentId: "agent-attach",
            claimName: "claim-attach",
            sandboxName: "sandbox-attach",
            podName: "pod-attach",
            namespace: "ns-attach",
            status: "DEPLOYED",
            customTag: null,
            createdAt: "2026-07-19T00:00:00.000Z",
        };

        let receivedParams: unknown;

        (client.openApiClient as any).getAgentSandbox = async (params: unknown) => {
            receivedParams = params;
            return { data: sandboxData };
        };

        const sandbox = await client.sandboxInstances.attach("agent-attach", "sandbox-attach");

        expect(receivedParams).toEqual({ agentId: "agent-attach", sandboxName: "sandbox-attach" });
        expect(sandbox.currentSandbox).toEqual(sandboxData);
    });
});
