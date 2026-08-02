# @quickstackdev/sdk

Official SDK for the QuickStack API: https://quickstack.dev

## What is QuickStack?

QuickStack is a platform for running and managing apps.
With this SDK, JavaScript and TypeScript applications can communicate with the API of a QuickStack instance, for example to manage apps and related resources programmatically.

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

const apps = await client.listApps({ projectId: "project-id" });
console.log(apps);
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
