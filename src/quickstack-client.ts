import { AgentSandboxInstance } from "./agent-sandbox-instance";
import { QuickStackApi } from "./generated/Api";
import { HttpClient } from "./generated/http-client";
import type { CreateAgentSandboxPayload } from "./generated/data-contracts";

type SecurityData = { token: string };

type Override<TBase, TOverride> = Omit<TBase, keyof TOverride> & TOverride;
type UnwrapApiData<T> = T extends Promise<{ data: infer D }> ? Promise<D> : T;
type InstanceMethods<T> = {
    [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K]
};

type ApiInstance = QuickStackApi<SecurityData>;
type ApiMethods = InstanceMethods<ApiInstance>;
type HttpClientMethods = InstanceMethods<HttpClient<SecurityData>>;
type ApiEndpointMethodNames = Exclude<keyof ApiMethods, keyof HttpClientMethods>;
type ApiDataMethods = {
    [K in ApiEndpointMethodNames]: (...args: Parameters<ApiMethods[K]>) => UnwrapApiData<ReturnType<ApiMethods[K]>>
};
type ApiWithDataResponses = Omit<ApiInstance, ApiEndpointMethodNames> & ApiDataMethods;

type ApiMethodOverrides = Pick<
    InstanceMethods<QuickStackClient>,
    Extract<keyof InstanceMethods<QuickStackClient>, keyof ApiWithDataResponses>
>;

export type QuickStackApiInstance = Override<ApiWithDataResponses, ApiMethodOverrides> & {
    openApiClient: ApiInstance;
    setAuthToken: (token: string) => void;
};

export class QuickStackClient {

    openApiClient: ApiInstance;

    private constructor(baseUrl: string, token: string) {

        if (!baseUrl || !token) {
            throw new Error('Missing API credentials. Provide baseUrl/token or set QUICKSTACK_BASE_URL and QUICKSTACK_API_TOKEN.');
        }

        this.openApiClient = new QuickStackApi<SecurityData>({
            baseUrl,
            securityWorker: (securityData) => {
                if (!securityData?.token) {
                    console.warn("No auth token provided. Requests may fail due to missing authentication.");
                    return {}
                };

                return {
                    headers: {
                        Authorization: `Bearer ${securityData.token}`,
                    },
                };
            },
        });

        this.openApiClient.setSecurityData({ token: token });
    }

    /**
     * Creates a new instance of `QuickStackClient` with the provided base URL and token.
     * If not provided, it will use the `QUICKSTACK_BASE_URL` and `QUICKSTACK_API_TOKEN` environment variables.
     * @param baseUrl Base URL for the QuickStack API. Defaults to `process.env.QUICKSTACK_API_TOKEN`.
     * @param token Authentication token for the QuickStack API. Defaults to `process.env.QUICKSTACK_API_TOKEN`.
     * @returns An instance of `QuickStackApiInstance` with all API methods and additional utility methods.
     * @throws Error if the base URL or token is not provided and not set in the environment variables.
     */
    static create(baseUrl?: string, token?: string): QuickStackApiInstance {

        baseUrl = baseUrl || process.env.QUICKSTACK_BASE_URL!;
        token = token || process.env.QUICKSTACK_API_TOKEN!;

        const apiInstance = new QuickStackClient(baseUrl, token);
        const openapiClient = apiInstance.openApiClient;
        const httpClientBase = new HttpClient<SecurityData>();

        const endpointMethodNames = Object.keys(openapiClient).filter((name) => {
            const method = (openapiClient as any)[name];
            const baseMethod = (httpClientBase as any)[name];
            return name !== "securityWorker" && typeof method === "function" && typeof baseMethod !== "function";
        }) as ApiEndpointMethodNames[];

        endpointMethodNames.forEach((name) => {
            const original = (openapiClient as any)[name];
            (openapiClient as any)[name] = async (...args: unknown[]) => {
                const response = await original(...args);
                return response.data;
            };
        });

        const methodNames = Object.getOwnPropertyNames(QuickStackClient.prototype)
            .filter((name) => name !== 'constructor') as Array<keyof InstanceMethods<QuickStackClient>>;

        const boundMethods = methodNames.reduce((methods, name) => {
            const method = (apiInstance as any)[name];
            if (typeof method === 'function') {
                methods[name] = method.bind(apiInstance);
            }
            return methods;
        }, {} as InstanceMethods<QuickStackClient>);

        return Object.assign(openapiClient, {
            openApiClient: openapiClient,
        }, boundMethods) as unknown as QuickStackApiInstance;
    }

    setAuthToken(token: string) {
        this.openApiClient.setSecurityData({ token: token });
    }

    /**
     * Creates a new agent sandbox for the specified agent.
     * @param agentId The ID of the agent for which to create the sandbox.
     * @param params Optional parameters for sandbox creation, including a timeout in milliseconds.
     */
    async createAgentSandbox(agentId: string, params?: CreateAgentSandboxPayload & { timeoutMs: number }) {
        return await AgentSandboxInstance.createSandbox({
            agentId,
            timeoutMs: params?.timeoutMs ?? 60000,
            ...params
        }, this.openApiClient);
    }

    /**
     * Attaches to an existing agent sandbox for the specified agent and claim name.
     * @param agentId The ID of the agent for which to attach the sandbox.
     * @param claimName The claim name of the existing sandbox to attach to.
     */
    async attachAgentSandbox(agentId: string, claimName: string) {
        return await AgentSandboxInstance.attachSandbox(agentId, claimName, this.openApiClient);
    }
}