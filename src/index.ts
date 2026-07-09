import { QuickStackClient } from "./api-wrapper";


const client = QuickStackClient.create();

const sandbox = await client.createAgentSandbox('hello world', {
    timeoutMs: 6000
}, {});
