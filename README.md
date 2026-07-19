# @quickstackdev/sdk

Official SDK for the QuickStack API: https://quickstack.dev

## What is QuickStack?

QuickStack is a platform for running and managing apps, services, and agents.
With this SDK, JavaScript and TypeScript applications can communicate with the API of a QuickStack instance, for example to manage apps, agents, sandbox instances, and related resources programmatically.

This SDK provides:

- Simple interaction with the QuickStack API endpoints for managing apps and agents
- Helper methods for Agent Sandbox lifecycle and filesystem/command operations

## Installation

```bash
npm install @quickstackdev/sdk
```

## License

This package is licensed under the GNU General Public License v3.0. See [LICENSE](./LICENSE) for details.

## Quick Start

```ts
import { QuickStackClient } from "@quickstackdev/sdk";

/**
 * Either provide the base URL and token directly, or set the environment variables:
 * - QUICKSTACK_BASE_URL
 * - QUICKSTACK_API_TOKEN
 * */
const client = QuickStackClient.create();

const agents = await client.listAgents();
console.log(agents);
```

## Authentication and Client Setup

You can pass credentials directly:

```ts
import { QuickStackClient } from "@quickstackdev/sdk";

const client = QuickStackClient.create("https://your-quickstack-host", "your-api-token");
```

Or use environment variables:

- `QUICKSTACK_BASE_URL`
- `QUICKSTACK_API_TOKEN`

```ts
const client = QuickStackClient.create();
```

## Apps CRUD

`saveApp` is an upsert endpoint:

- Create: call `saveApp` without `id`
- Update: call `saveApp` with `id`

### Create App

```ts
import { QuickStackClient } from "@quickstackdev/sdk";

const client = QuickStackClient.create();

const createdApp = await client.saveApp({
  name: "my-app",
  appType: "SERVICE",
  projectId: "project-id",
  sourceType: "GIT",
  buildMethod: "DOCKERFILE",
  gitUrl: "https://github.com/acme/my-app",
  gitBranch: "main",
  dockerfilePath: "Dockerfile",
  replicas: 1,
  envVars: "{}",
  ingressNetworkPolicy: "ALLOW_ALL",
  egressNetworkPolicy: "ALLOW_ALL",
  useNetworkPolicy: false,
  healthCheckPeriodSeconds: 10,
  healthCheckTimeoutSeconds: 5,
  healthCheckFailureThreshold: 3,
  appDomains: [],
  appPorts: [],
  appNodePorts: [],
  appFileMounts: [],
  appVolumes: [],
  appBasicAuths: [],
});

console.log("Created app id:", createdApp.id);
```

### Read App (by ID)

```ts
const app = await client.getApp({ appId: "app-id" });
console.log(app.name);
```

### Read Apps (list)

```ts
const apps = await client.listApps({ projectId: "project-id" });
console.log("Apps in project:", apps.length);
```

### Update App

```ts
const updated = await client.saveApp({
  id: "app-id",
  name: "my-app-renamed",
  appType: "SERVICE",
  projectId: "project-id",
  sourceType: "GIT",
  buildMethod: "DOCKERFILE",
  gitUrl: "https://github.com/acme/my-app",
  gitBranch: "main",
  dockerfilePath: "Dockerfile",
  replicas: 2,
  envVars: "{}",
  ingressNetworkPolicy: "ALLOW_ALL",
  egressNetworkPolicy: "ALLOW_ALL",
  useNetworkPolicy: false,
  healthCheckPeriodSeconds: 10,
  healthCheckTimeoutSeconds: 5,
  healthCheckFailureThreshold: 3,
  appDomains: [],
  appPorts: [],
  appNodePorts: [],
  appFileMounts: [],
  appVolumes: [],
  appBasicAuths: [],
});

console.log("Updated app:", updated.id);
```

### Delete App

```ts
await client.deleteApp({ id: "app-id" });
console.log("App deleted");
```

## Agents CRUD

`saveAgent` is also an upsert endpoint:

- Create: call `saveAgent` without `id`
- Update: call `saveAgent` with `id`

### Create Agent

```ts
import { QuickStackClient } from "@quickstackdev/sdk";

const client = QuickStackClient.create();

const createdAgent = await client.saveAgent({
  name: "support-agent",
  projectId: "project-id",
  llmGatewayId: "llm-gateway-id",
  modelAlias: ["gpt-4o-mini"],
  sourceType: "GIT",
  buildMethod: "DOCKERFILE",
  gitUrl: "https://github.com/acme/support-agent",
  gitBranch: "main",
  dockerfilePath: "Dockerfile",
  warmPoolReplicas: 1,
  agentDomains: [],
  agentVolumes: [],
  agentFileMounts: [],
  agentNetworkPolicy: {
    allowInternetAccess: true,
    rules: [],
  },
});

console.log("Created agent id:", createdAgent.id);
```

### Read Agent (by ID)

```ts
const agent = await client.getAgent({ agentId: "agent-id" });
console.log(agent.name);
```

### Read Agents (list)

```ts
const agents = await client.listAgents({ projectId: "project-id" });
console.log("Agents in project:", agents.length);
```

### Update Agent

```ts
const updatedAgent = await client.saveAgent({
  id: "agent-id",
  name: "support-agent-v2",
  projectId: "project-id",
  llmGatewayId: "llm-gateway-id",
  modelAlias: ["gpt-4o-mini", "gpt-4.1-mini"],
  sourceType: "GIT",
  buildMethod: "DOCKERFILE",
  gitUrl: "https://github.com/acme/support-agent",
  gitBranch: "main",
  dockerfilePath: "Dockerfile",
  warmPoolReplicas: 2,
  agentDomains: [],
  agentVolumes: [],
  agentFileMounts: [],
  agentNetworkPolicy: {
    allowInternetAccess: true,
    rules: [],
  },
});

console.log("Updated agent:", updatedAgent.id);
```

### Delete Agent

```ts
await client.deleteAgent({ agentId: "agent-id" });
console.log("Agent deleted");
```

## Agent Sandbox Lifecycle

This section shows the full sandbox lifecycle: create, run actions, and delete.

For convenience operations that return an `AgentSandboxInstance`, use `client.sandboxInstances`.
If you want the raw API endpoint response object directly, call `client.createAgentSandbox(...)`.

### 1) Create Sandbox

```ts
import { QuickStackClient } from "@quickstackdev/sdk";

const client = QuickStackClient.create();

const sandbox = await client.sandboxInstances.create("agent-id", {
  timeoutMs: 60_000,
  idleTimeoutMinutes: 15,
  env: {
    NODE_ENV: "development",
    FEATURE_FLAG: "1",
  },
});

console.log("Sandbox claim:", sandbox.currentSandbox.claimName);
```

### Optional: Call Endpoint Directly

```ts
const created = await client.createAgentSandbox(
  { agentId: "agent-id", timeoutMs: 60_000 },
  {
    idleTimeoutMinutes: 15,
    env: {
      NODE_ENV: "development",
    },
  },
);

console.log("Created claim:", created.claimName);
```

### Optional: Attach Existing Sandbox

```ts
const attached = await client.sandboxInstances.attach("agent-id", "claim-name");
console.log("Attached sandbox status:", attached.currentSandbox.status);
```

### 2) Execute Actions in Sandbox

```ts
await sandbox.writeTextFile("/tmp/hello.txt", "Hello from QuickStack sandbox");

const exists = await sandbox.fileExists("/tmp/hello.txt");
console.log("File exists:", exists);

const textFile = await sandbox.readTextFile("/tmp/hello.txt");
console.log("Read text:", textFile.text);

const stdout = await sandbox.exec("cat /tmp/hello.txt");
console.log("Command output:", stdout);

const files = await sandbox.listFiles("/tmp");
console.log("Files in /tmp:", files);

const latestState = await sandbox.refreshState();
console.log("Sandbox status:", latestState.status);
```

### 3) Delete Sandbox

```ts
await sandbox.destroy();
console.log("Sandbox deleted");
```

## Error Handling Pattern

```ts
try {
  const apps = await client.listApps({ projectId: "project-id" });
  console.log(apps);
} catch (error) {
  console.error("QuickStack API call failed", error);
}
```

## Development

```bash
bun run build
bun test
```

Publish dry run:

```bash
npm pack --dry-run
```

## Notes

- The package is ESM-only.
- Public entrypoint is the package root import (`@quickstackdev/sdk`).
