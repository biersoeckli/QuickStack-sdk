import { Api } from "./generated/quickstack";

export type QuickStackApiInstance = QuickStackClient & Api<{ token: string }>;

export class QuickStackClient {

    openApiClient: Api<{ token: string }>;

    private constructor(baseUrl: string, token: string) {

        if (!baseUrl || !token) {
            throw new Error('API_BASE_URL and API_TOKEN must be set in the environment variables.');
        }

        this.openApiClient = new Api<{ token: string }>({
            baseUrl: 'http://localhost:3000',
            securityWorker: (securityData) => {
                if (!securityData?.token) return {};

                return {
                    headers: {
                        Authorization: `Bearer ${securityData.token}`,
                    },
                };
            },
        });

        this.openApiClient.setSecurityData({ token: token });
    }

    static create(baseUrl?: string, token?: string) {

        baseUrl = baseUrl || process.env.API_BASE_URL!;
        token = token || process.env.API_TOKEN!;

        const apiInstance = new QuickStackClient(baseUrl, token);
        const openapiClient = apiInstance.openApiClient.api;

        return Object.assign(openapiClient, {
            openApiClient: openapiClient,
            setAuthToken: apiInstance.setAuthToken.bind(apiInstance),
        });
    }

    setAuthToken(token: string) {
        this.openApiClient.setSecurityData({ token: token });
    }
}