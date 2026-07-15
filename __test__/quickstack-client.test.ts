import { afterEach, describe, expect, test } from "bun:test";
import { QuickStackClient } from "../src/quickstack-api";

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
});