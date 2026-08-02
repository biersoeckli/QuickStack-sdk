import { describe, expect, test } from "bun:test";
import { AgentSandboxInstance } from "../src/agent-sandbox-instance";

type SandboxData = {
    agentId: string;
    claimName: string;
    sandboxName: string;
    podName: string;
    namespace: string;
    status: "UNKNOWN" | "BUILDING" | "ERROR" | "DEPLOYED" | "DEPLOYING" | "SHUTDOWN" | "SHUTTING_DOWN" | "PENDING";
    customTag: string | null;
    createdAt: string | null;
};

const sandboxData: SandboxData = {
    agentId: "agent-123",
    claimName: "claim-abc",
    sandboxName: "sandbox-main",
    podName: "pod-1",
    namespace: "ns-1",
    status: "DEPLOYED",
    customTag: null,
    createdAt: "2026-07-19T00:00:00.000Z",
};

const deferred = <T,>() => {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason?: unknown) => void;

    const promise = new Promise<T>((promiseResolve, promiseReject) => {
        resolve = promiseResolve;
        reject = promiseReject;
    });

    return { promise, resolve, reject };
};

const createInstance = (openApiClient: any) => new (AgentSandboxInstance as any)(openApiClient) as AgentSandboxInstance;

describe("AgentSandboxInstance", () => {
    test("attachSandbox loads an existing sandbox into local state", async () => {
        let receivedParams: unknown;

        const openApiClient = {
            async getAgentSandbox(params: unknown) {
                receivedParams = params;
                return { data: sandboxData };
            },
        };

        const sandbox = await AgentSandboxInstance.attachSandbox("agent-123", "sandbox-main", openApiClient as any);

        expect(receivedParams).toEqual({ agentId: "agent-123", sandboxName: "sandbox-main" });
        expect(sandbox.currentSandbox).toEqual(sandboxData);
    });

    test("writeFileFromBuffer waits for the API write to complete", async () => {
        const writeCall = deferred<void>();
        let receivedPayload: unknown;

        const openApiClient = {
            async writeAgentSandboxFile(params: unknown, payload: unknown) {
                receivedPayload = { params, payload };
                await writeCall.promise;
                return { data: undefined };
            },
        };

        const sandbox = createInstance(openApiClient);
        (sandbox as any).agentSandboxInstance = sandboxData;

        const writePromise = sandbox.writeFileFromBuffer("/tmp/example.bin", Buffer.from("hello"));

        await Promise.resolve();
        expect(receivedPayload).toEqual({
            params: { agentId: "agent-123", sandboxName: "sandbox-main" },
            payload: {
                path: "/tmp/example.bin",
                dataBase64: Buffer.from("hello").toString("base64"),
            },
        });

        let resolved = false;
        writePromise.then(() => {
            resolved = true;
        });

        await Promise.resolve();
        expect(resolved).toBe(false);

        writeCall.resolve();
        await writePromise;
        expect(resolved).toBe(true);
    });

    test("writeFileFromLocalFilePath reads a file and waits for the write to finish", async () => {
        const writeCall = deferred<void>();
        const writeStarted = deferred<void>();
        let receivedPayload: unknown;
        const fs = await import("fs/promises");
        const localPath = "/tmp/quickstack-agent-sandbox-instance.txt";

        await fs.writeFile(localPath, "file-content");

        const openApiClient = {
            async writeAgentSandboxFile(params: unknown, payload: unknown) {
                receivedPayload = { params, payload };
                writeStarted.resolve();
                await writeCall.promise;
                return { data: undefined };
            },
        };

        const sandbox = createInstance(openApiClient);
        (sandbox as any).agentSandboxInstance = sandboxData;

        const writePromise = sandbox.writeFileFromLocalFilePath("/tmp/example.txt", localPath);

        await writeStarted.promise;
        expect(receivedPayload).toEqual({
            params: { agentId: "agent-123", sandboxName: "sandbox-main" },
            payload: {
                path: "/tmp/example.txt",
                dataBase64: Buffer.from("file-content").toString("base64"),
            },
        });

        let resolved = false;
        writePromise.then(() => {
            resolved = true;
        });

        await Promise.resolve();
        expect(resolved).toBe(false);

        writeCall.resolve();
        await writePromise;
        expect(resolved).toBe(true);

        await fs.rm(localPath, { force: true });
    });
});