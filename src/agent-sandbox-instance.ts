import type { QuickStackApi } from "./generated/Api";
import type {
    CreateAgentSandboxData,
    CreateAgentSandboxPayload,
    CreateAgentSandboxParams,
    DeleteAgentSandboxData,
    GetAgentSandboxData,
    ListAgentSandboxFilesData,
    ListAgentSandboxesData,
    ReadAgentSandboxFileData,
    ReadAgentSandboxTextFileData,
    RunAgentSandboxCommandPayload,
    WriteAgentSandboxTextFileData,
} from "./generated/data-contracts";

/**
 * Manages the lifecycle and file/command operations for a single agent sandbox instance.
 */
export class AgentSandboxInstance {

    private agentSandboxInstance: CreateAgentSandboxData | null = null;

    /**
     * Creates an `AgentSandboxInstance` bound to the provided OpenAPI client.
     *
     * @param openApiClient Authenticated API client used for all sandbox requests.
     */
    private constructor(private readonly openApiClient: QuickStackApi<{ token: string }>) { }

    /**
     * Creates a sandbox via the API and stores the returned sandbox state locally.
     *
     * @param input Sandbox creation parameters and payload.
     */
    private async initializeAndWait(input: CreateAgentSandboxParams & CreateAgentSandboxPayload) {
        const { agentId, timeoutMs, ...data } = input;
        const params = {
            agentId,
            timeoutMs,
        };
        const res = await this.openApiClient.createAgentSandbox(params, data);
        this.agentSandboxInstance = res.data;
    }

    /**
     * Returns the identifying parameters required for sandbox-scoped API calls.
     *
     * @throws Error If the sandbox instance has not been initialized.
     * @returns Object containing `agentId` and `claimName`.
     */
    private getSandboxParams() {
        if (!this.agentSandboxInstance) {
            throw new Error('Agent sandbox instance is not initialized.');
        }

        return {
            agentId: this.agentSandboxInstance.agentId,
            claimName: this.agentSandboxInstance.claimName,
        };
    }

    /**
     * Returns the current in-memory sandbox representation.
     *
     * @throws Error If the sandbox instance has not been initialized.
     * @returns The current sandbox data.
     */
    get currentSandbox(): CreateAgentSandboxData {
        if (!this.agentSandboxInstance) {
            throw new Error('Agent sandbox instance is not initialized.');
        }

        return this.agentSandboxInstance;
    }

    /**
     * Factory method that creates and initializes a new sandbox instance.
     *
     * @param data Sandbox creation parameters and payload.
     * @param openApiClient Authenticated API client used for sandbox operations.
     * @returns A ready-to-use sandbox instance.
     */
    static async createSandbox(data: CreateAgentSandboxParams & CreateAgentSandboxPayload, openApiClient: QuickStackApi<{ token: string }>) {
        const sandboxInstance = new AgentSandboxInstance(openApiClient);
        await sandboxInstance.initializeAndWait(data);
        return sandboxInstance;
    }

    /**
     * Lists all sandboxes for the current agent.
     *
     * @returns Collection of sandboxes associated with the current `agentId`.
     */
    async listByAgent(): Promise<ListAgentSandboxesData> {
        const { agentId } = this.getSandboxParams();
        const res = await this.openApiClient.listAgentSandboxes({ agentId });
        return res.data;
    }

    /**
     * Fetches the latest sandbox state from the API and updates local state.
     *
     * @returns The refreshed sandbox data.
     */
    async refreshState(): Promise<GetAgentSandboxData> {
        const res = await this.openApiClient.getAgentSandbox(this.getSandboxParams());
        this.agentSandboxInstance = res.data;
        return res.data;
    }

    /**
     * Deletes the current sandbox and clears local state.
     *
     * @returns API response describing the deletion result.
     */
    async destroy(): Promise<DeleteAgentSandboxData> {
        const res = await this.openApiClient.deleteAgentSandbox(this.getSandboxParams());
        this.agentSandboxInstance = null;
        return res.data;
    }

    /**
     * Executes a shell command inside the sandbox and waits until completion, returning the result.
     *
     * @param command Command string to execute.
     * @param data Optional execution options.
     * @returns Command execution result.
     */
    async exec(command: string, data?: Omit<RunAgentSandboxCommandPayload, 'command'>): Promise<string> {
        const res = await this.openApiClient.runAgentSandboxCommand(
            this.getSandboxParams(),
            {
                command,
                ...data
            },
        );
        if (res.data.exitCode !== 0) {
            throw new Error(`Command failed with exit code ${res.data.exitCode}: ${res.data.stderr}`);
        }
        return res.data.stdout;
    }

    /**
     * Reads a text file from the sandbox filesystem.
     *
     * @param path Absolute or sandbox-relative file path.
     * @returns Text file contents and metadata.
     */
    async readTextFile(path: string): Promise<ReadAgentSandboxTextFileData> {
        const res = await this.openApiClient.readAgentSandboxTextFile({
            ...this.getSandboxParams(),
            path,
        });
        return res.data;
    }

    /**
     * Reads a binary file from the sandbox filesystem.
     *
     * @param path Absolute or sandbox-relative file path.
     * @returns File payload and metadata.
     */
    async readFile(path: string): Promise<ReadAgentSandboxFileData> {
        const res = await this.openApiClient.readAgentSandboxFile({
            ...this.getSandboxParams(),
            path,
        });
        return res.data;
    }

    async readFileAsBuffer(path: string): Promise<Buffer> {
        const fileData = await this.readFile(path);
        const buffer = Buffer.from(fileData.dataBase64, 'base64');
        return buffer;
    }

    /**
     * Reads a binary file from the sandbox and saves it to a local path.
     * @param sandboxPath Absolute or sandbox-relative file path in the sandbox.
     * @param localPath Local file path where the file will be saved.
     */
    async readFileAndSaveToPath(sandboxPath: string, localPath: string): Promise<void> {
        const fs = await import('fs/promises');
        const buffer = await this.readFileAsBuffer(sandboxPath);
        await fs.writeFile(localPath, buffer);
    }

    /**
     * Writes UTF-8 text content to a file in the sandbox.
     *
     * @param path Absolute or sandbox-relative file path.
     * @param text Text content to write.
     * @returns API response for the write operation.
     */
    async writeTextFile(path: string, text: string): Promise<WriteAgentSandboxTextFileData> {
        const res = await this.openApiClient.writeAgentSandboxTextFile(
            this.getSandboxParams(),
            {
                path,
                text
            },
        );
        return res.data;
    }

    /**
     * Writes a binary file to the sandbox using base64-encoded data.
     *
     * @param path Absolute or sandbox-relative file path.
     * @param dataBase64 Base64-encoded file content.
     * @returns API response for the write operation.
     */
    async writeFileBase64(path: string, dataBase64: string) {
        await this.openApiClient.writeAgentSandboxFile(
            this.getSandboxParams(),
            {
                path,
                dataBase64
            },
        );
    }

    /**
     * Writes a binary file to the sandbox from a Node.js Buffer.
     * @param path Absolute or sandbox-relative file path.
     * @param buffer Node.js Buffer containing the file content.
     * @returns API response for the write operation.
     */
    async writeFileFromBuffer(path: string, buffer: Buffer) {
        const dataBase64 = buffer.toString('base64');
        this.writeFileBase64(path, dataBase64);
    }

    /**
     * Writes a binary file to the sandbox from a local file path.
     * @param sandboxPath Absolute or sandbox-relative file path where the file will be written.
     * @param localPath Local file path to read the content from.
     * @returns API response for the write operation.
     */
    async writeFileFromLocalFilePath(sandboxPath: string, localPath: string) {
        const fs = await import('fs/promises');
        const buffer = await fs.readFile(localPath);
        this.writeFileFromBuffer(sandboxPath, buffer);
    }

    /**
     * Lists files and directories under a sandbox path.
     *
     * @param path Directory path to inspect.
     * @returns Directory listing data.
     */
    async listFiles(path: string): Promise<ListAgentSandboxFilesData> {
        const res = await this.openApiClient.listAgentSandboxFiles({
            ...this.getSandboxParams(),
            path,
        });
        return res.data;
    }

    /**
     * Checks whether a file or directory exists at the given sandbox path.
     *
     * @param path Path to verify.
     * @returns Existence check result.
     */
    async fileExists(path: string): Promise<boolean> {
        const res = await this.openApiClient.checkAgentSandboxFileExists({
            ...this.getSandboxParams(),
            path,
        });
        return res.data.exists;
    }
}