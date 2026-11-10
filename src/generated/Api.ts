/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  CheckAgentSandboxFileExistsData,
  CheckAgentSandboxFileExistsError,
  CheckAgentSandboxFileExistsParams,
  CreateAgentSandboxApiTokenData,
  CreateAgentSandboxApiTokenError,
  CreateAgentSandboxApiTokenParams,
  DeleteAgentData,
  DeleteAgentError,
  DeleteAgentParams,
  DeleteAgentSandboxData,
  DeleteAgentSandboxError,
  DeleteAgentSandboxParams,
  DeleteAgentTagData,
  DeleteAgentTagError,
  DeleteAgentTagParams,
  DeleteAppData,
  DeleteAppError,
  DeleteAppParams,
  DeleteProjectData,
  DeleteProjectError,
  DeleteProjectParams,
  DeployAgentData,
  DeployAgentError,
  DeployAgentParams,
  DeployAppData,
  DeployAppError,
  DeployAppParams,
  GetAgentData,
  GetAgentError,
  GetAgentParams,
  GetAgentSandboxAccessUrlData,
  GetAgentSandboxAccessUrlError,
  GetAgentSandboxAccessUrlParams,
  GetAgentSandboxData,
  GetAgentSandboxError,
  GetAgentSandboxParams,
  GetAppData,
  GetAppDeploymentData,
  GetAppDeploymentError,
  GetAppDeploymentLogsData,
  GetAppDeploymentLogsError,
  GetAppDeploymentLogsParams,
  GetAppDeploymentParams,
  GetAppError,
  GetAppLogsData,
  GetAppLogsError,
  GetAppLogsParams,
  GetAppParams,
  GetProjectData,
  GetProjectError,
  GetProjectParams,
  ListAgentSandboxesData,
  ListAgentSandboxesError,
  ListAgentSandboxesParams,
  ListAgentSandboxFilesData,
  ListAgentSandboxFilesError,
  ListAgentSandboxFilesParams,
  ListAgentsData,
  ListAgentsError,
  ListAgentsParams,
  ListAppDeploymentsData,
  ListAppDeploymentsError,
  ListAppDeploymentsParams,
  ListAppsData,
  ListAppsError,
  ListAppsParams,
  ListProjectsData,
  ListProjectsError,
  ListProjectsParams,
  ReadAgentSandboxFileParams,
  ResumeAgentSandboxByTagData,
  ResumeAgentSandboxByTagError,
  ResumeAgentSandboxByTagParams,
  ResumeAgentSandboxByTagPayload,
  ResumeAgentSandboxData,
  ResumeAgentSandboxError,
  ResumeAgentSandboxParams,
  RunAgentSandboxCommandData,
  RunAgentSandboxCommandError,
  RunAgentSandboxCommandParams,
  RunAgentSandboxCommandPayload,
  RunAppCommandData,
  RunAppCommandError,
  RunAppCommandParams,
  RunAppCommandPayload,
  SaveAgentData,
  SaveAgentError,
  SaveAgentPayload,
  SaveAppData,
  SaveAppError,
  SaveAppPayload,
  SaveProjectData,
  SaveProjectError,
  SaveProjectPayload,
  StartAgentSandboxData,
  StartAgentSandboxError,
  StartAgentSandboxParams,
  StartAgentSandboxPayload,
  SuspendAgentSandboxData,
  SuspendAgentSandboxError,
  SuspendAgentSandboxParams,
  WriteAgentSandboxFileData,
  WriteAgentSandboxFileError,
  WriteAgentSandboxFileParams,
  WriteAgentSandboxFilePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class QuickStackApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Returns a paginated list of projects. The default limit is 50.
   *
   * @tags Projects
   * @name ListProjects
   * @summary List projects
   * @request GET:/api/v1/projects
   * @secure
   */
  listProjects = (query: ListProjectsParams = {}, params: RequestParams = {}) =>
    this.request<ListProjectsData, ListProjectsError>({
      path: `/api/v1/projects`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Creates a project when id is omitted, otherwise updates the existing project. Requires admin.
   *
   * @tags Projects
   * @name SaveProject
   * @summary Create or update project
   * @request POST:/api/v1/projects
   * @secure
   */
  saveProject = (data: SaveProjectPayload, params: RequestParams = {}) =>
    this.request<SaveProjectData, SaveProjectError>({
      path: `/api/v1/projects`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Projects
   * @name GetProject
   * @summary Get project
   * @request GET:/api/v1/projects/{id}
   * @secure
   */
  getProject = ({ id }: GetProjectParams, params: RequestParams = {}) =>
    this.request<GetProjectData, GetProjectError>({
      path: `/api/v1/projects/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Permanently deletes the project, all its Apps and Agents, and the Kubernetes namespace with their workloads and volumes. Requires admin.
   *
   * @tags Projects
   * @name DeleteProject
   * @summary Delete project
   * @request DELETE:/api/v1/projects/{id}
   * @secure
   */
  deleteProject = ({ id }: DeleteProjectParams, params: RequestParams = {}) =>
    this.request<DeleteProjectData, DeleteProjectError>({
      path: `/api/v1/projects/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns a paginated list of apps. The default limit is 50.
   *
   * @tags Apps
   * @name ListApps
   * @summary List apps
   * @request GET:/api/v1/apps
   * @secure
   */
  listApps = (query: ListAppsParams = {}, params: RequestParams = {}) =>
    this.request<ListAppsData, ListAppsError>({
      path: `/api/v1/apps`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Creates an app when id is omitted, otherwise replaces the existing app. projectId cannot be changed. Call deployApp afterwards to roll out the desired state.
   *
   * @tags Apps
   * @name SaveApp
   * @summary Create or update app.
   * @request POST:/api/v1/apps
   * @secure
   */
  saveApp = (data: SaveAppPayload, params: RequestParams = {}) =>
    this.request<SaveAppData, SaveAppError>({
      path: `/api/v1/apps`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Apps
   * @name GetApp
   * @summary Get app
   * @request GET:/api/v1/apps/{appId}
   * @secure
   */
  getApp = ({ appId }: GetAppParams, params: RequestParams = {}) =>
    this.request<GetAppData, GetAppError>({
      path: `/api/v1/apps/${appId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns the current log tail of the app. `lines` defaults to 200 and is limited to 5000.
   *
   * @tags Apps
   * @name GetAppLogs
   * @summary Get current app logs
   * @request GET:/api/v1/apps/{appId}/logs
   * @secure
   */
  getAppLogs = (
    { appId, ...query }: GetAppLogsParams,
    params: RequestParams = {},
  ) =>
    this.request<GetAppLogsData, GetAppLogsError>({
      path: `/api/v1/apps/${appId}/logs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Runs a shell command in the first running Pod of the app. Returns stdout, stderr and exitCode.
   *
   * @tags Apps
   * @name RunAppCommand
   * @summary Run command in app
   * @request POST:/api/v1/apps/{appId}/commands
   * @secure
   */
  runAppCommand = (
    { appId }: RunAppCommandParams,
    data: RunAppCommandPayload,
    params: RequestParams = {},
  ) =>
    this.request<RunAppCommandData, RunAppCommandError>({
      path: `/api/v1/apps/${appId}/commands`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Permanently deletes the app and its sub-resources (domains, volumes, file mounts, basic auth).
   *
   * @tags Apps
   * @name DeleteApp
   * @summary Delete app
   * @request DELETE:/api/v1/apps/{id}
   * @secure
   */
  deleteApp = ({ id }: DeleteAppParams, params: RequestParams = {}) =>
    this.request<DeleteAppData, DeleteAppError>({
      path: `/api/v1/apps/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns a paginated list of agents. The default limit is 50.
   *
   * @tags Agents
   * @name ListAgents
   * @summary List agents
   * @request GET:/api/v1/agents
   * @secure
   */
  listAgents = (query: ListAgentsParams = {}, params: RequestParams = {}) =>
    this.request<ListAgentsData, ListAgentsError>({
      path: `/api/v1/agents`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Creates an agent template when id is omitted, otherwise replaces the existing template. projectId cannot be changed. Call deployAgent afterwards to apply it.
   *
   * @tags Agents
   * @name SaveAgent
   * @summary Create or update agent.
   * @request POST:/api/v1/agents
   * @secure
   */
  saveAgent = (data: SaveAgentPayload, params: RequestParams = {}) =>
    this.request<SaveAgentData, SaveAgentError>({
      path: `/api/v1/agents`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Agents
   * @name GetAgent
   * @summary Get agent
   * @request GET:/api/v1/agents/{agentId}
   * @secure
   */
  getAgent = ({ agentId }: GetAgentParams, params: RequestParams = {}) =>
    this.request<GetAgentData, GetAgentError>({
      path: `/api/v1/agents/${agentId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Permanently deletes the agent template and its sub-resources (domains, volumes, file mounts, network policy).
   *
   * @tags Agents
   * @name DeleteAgent
   * @summary Delete agent
   * @request DELETE:/api/v1/agents/{agentId}
   * @secure
   */
  deleteAgent = ({ agentId }: DeleteAgentParams, params: RequestParams = {}) =>
    this.request<DeleteAgentData, DeleteAgentError>({
      path: `/api/v1/agents/${agentId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Deploys the agent configuration to Kubernetes as a SandboxTemplate. Does not start a sandbox. Can only be done when no sandbox is running.
   *
   * @tags Agents
   * @name DeployAgent
   * @summary Deploy agent configuration
   * @request POST:/api/v1/agents/{agentId}/deploy
   * @secure
   */
  deployAgent = (
    { agentId, ...query }: DeployAgentParams,
    params: RequestParams = {},
  ) =>
    this.request<DeployAgentData, DeployAgentError>({
      path: `/api/v1/agents/${agentId}/deploy`,
      method: "POST",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns a paginated list of running agent sandboxes. The default limit is 50.
   *
   * @tags Agent Sandboxes
   * @name ListAgentSandboxes
   * @summary List agent sandboxes
   * @request GET:/api/v1/agents/{agentId}/sandboxes
   * @secure
   */
  listAgentSandboxes = (
    { agentId, ...query }: ListAgentSandboxesParams,
    params: RequestParams = {},
  ) =>
    this.request<ListAgentSandboxesData, ListAgentSandboxesError>({
      path: `/api/v1/agents/${agentId}/sandboxes`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Creates and starts one agent sandbox for this agent. The body is optional and defaults to {}. Changes live Kubernetes resources.
   *
   * @tags Agent Sandboxes
   * @name StartAgentSandbox
   * @summary Start agent sandbox
   * @request POST:/api/v1/agents/{agentId}/sandboxes
   * @secure
   */
  startAgentSandbox = (
    { agentId, ...query }: StartAgentSandboxParams,
    data: StartAgentSandboxPayload,
    params: RequestParams = {},
  ) =>
    this.request<StartAgentSandboxData, StartAgentSandboxError>({
      path: `/api/v1/agents/${agentId}/sandboxes`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Resumes the suspended Agent Sandbox of this Agent that carries the given Custom Tag.
   *
   * @tags Agent Sandboxes
   * @name ResumeAgentSandboxByTag
   * @summary Resume agent sandbox by Custom Tag
   * @request POST:/api/v1/agents/{agentId}/sandboxes/resume
   * @secure
   */
  resumeAgentSandboxByTag = (
    { agentId }: ResumeAgentSandboxByTagParams,
    data: ResumeAgentSandboxByTagPayload,
    params: RequestParams = {},
  ) =>
    this.request<ResumeAgentSandboxByTagData, ResumeAgentSandboxByTagError>({
      path: `/api/v1/agents/${agentId}/sandboxes/resume`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Releases the compute of a running Agent Sandbox while keeping its volumes and identity. The sandbox Pod is deleted and can be resumed later.
   *
   * @tags Agent Sandboxes
   * @name SuspendAgentSandbox
   * @summary Suspend agent sandbox
   * @request POST:/api/v1/agents/{agentId}/sandboxes/{sandboxName}/suspend
   * @secure
   */
  suspendAgentSandbox = (
    { agentId, sandboxName }: SuspendAgentSandboxParams,
    params: RequestParams = {},
  ) =>
    this.request<SuspendAgentSandboxData, SuspendAgentSandboxError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}/suspend`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Recreates the Pod of a suspended Agent Sandbox with its existing volumes mounted.
   *
   * @tags Agent Sandboxes
   * @name ResumeAgentSandbox
   * @summary Resume agent sandbox
   * @request POST:/api/v1/agents/{agentId}/sandboxes/{sandboxName}/resume
   * @secure
   */
  resumeAgentSandbox = (
    { agentId, sandboxName }: ResumeAgentSandboxParams,
    params: RequestParams = {},
  ) =>
    this.request<ResumeAgentSandboxData, ResumeAgentSandboxError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}/resume`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Agent Sandboxes
   * @name GetAgentSandbox
   * @summary Get agent sandbox
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{sandboxName}
   * @secure
   */
  getAgentSandbox = (
    { agentId, sandboxName }: GetAgentSandboxParams,
    params: RequestParams = {},
  ) =>
    this.request<GetAgentSandboxData, GetAgentSandboxError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Permanently deletes the agent sandbox and stops its Pod.
   *
   * @tags Agent Sandboxes
   * @name DeleteAgentSandbox
   * @summary Delete agent sandbox
   * @request DELETE:/api/v1/agents/{agentId}/sandboxes/{sandboxName}
   * @secure
   */
  deleteAgentSandbox = (
    { agentId, sandboxName }: DeleteAgentSandboxParams,
    params: RequestParams = {},
  ) =>
    this.request<DeleteAgentSandboxData, DeleteAgentSandboxError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get a temporary access URL to access the agent sandbox via the browser. This is only possible if a domain is configured for the agent and the agent serves an API or Web interface. No request body; the returned URL expires. Example: GET /api/v1/agents/<agentId>/sandboxes/<sandboxName>/accessUrl/<domainId>.
   *
   * @tags Agent Sandboxes
   * @name GetAgentSandboxAccessUrl
   * @summary Get agent sandbox access URL
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{sandboxName}/accessUrl/{domainId}
   * @secure
   */
  getAgentSandboxAccessUrl = (
    { agentId, sandboxName, domainId }: GetAgentSandboxAccessUrlParams,
    params: RequestParams = {},
  ) =>
    this.request<GetAgentSandboxAccessUrlData, GetAgentSandboxAccessUrlError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}/accessUrl/${domainId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Create a bearer token for direct API access to this Agent Sandbox through a configured domain. No request body. The token expires after 15 minutes. Example: POST /api/v1/agents/<agentId>/sandboxes/<sandboxName>/apiToken/<domainId>.
   *
   * @tags Agent Sandboxes
   * @name CreateAgentSandboxApiToken
   * @summary Create agent sandbox API token
   * @request POST:/api/v1/agents/{agentId}/sandboxes/{sandboxName}/apiToken/{domainId}
   * @secure
   */
  createAgentSandboxApiToken = (
    { agentId, sandboxName, domainId }: CreateAgentSandboxApiTokenParams,
    params: RequestParams = {},
  ) =>
    this.request<
      CreateAgentSandboxApiTokenData,
      CreateAgentSandboxApiTokenError
    >({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}/apiToken/${domainId}`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Deletes all stored data of one Custom Tag across the Agent's PER_CUSTOM_TAG volumes. Rejected while a sandbox with that tag exists.
   *
   * @tags Agent Sandboxes
   * @name DeleteAgentTag
   * @summary Delete Custom Tag data
   * @request DELETE:/api/v1/agents/{agentId}/tags/{customTag}
   * @secure
   */
  deleteAgentTag = (
    { agentId, customTag }: DeleteAgentTagParams,
    params: RequestParams = {},
  ) =>
    this.request<DeleteAgentTagData, DeleteAgentTagError>({
      path: `/api/v1/agents/${agentId}/tags/${customTag}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Runs a shell command in a running Agent Sandbox. timeoutSec is 1-3600 (default 120). Returns stdout, stderr and exitCode.
   *
   * @tags Agent Sandboxes
   * @name RunAgentSandboxCommand
   * @summary Run command in agent sandbox
   * @request POST:/api/v1/agents/{agentId}/sandboxes/{sandboxName}/commands
   * @secure
   */
  runAgentSandboxCommand = (
    { agentId, sandboxName }: RunAgentSandboxCommandParams,
    data: RunAgentSandboxCommandPayload,
    params: RequestParams = {},
  ) =>
    this.request<RunAgentSandboxCommandData, RunAgentSandboxCommandError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}/commands`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Stream a file from an agent sandbox. Requires write access to the agent.
   *
   * @tags Agent Sandboxes
   * @name ReadAgentSandboxFile
   * @summary Stream file from agent sandbox
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{sandboxName}/files/read
   * @secure
   */
  readAgentSandboxFile = (
    { agentId, sandboxName, ...query }: ReadAgentSandboxFileParams,
    params: RequestParams = {},
  ) =>
    this.request<any, any>({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}/files/read`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description Writes one file into the running sandbox. Existing content at `path` is replaced. Use `multipart/form-data` and provide the upload in the required `file` field. This is the supported contract for generated OpenAPI clients. `swagger-typescript-api` example: ```ts await client.writeAgentSandboxFile( { agentId, sandboxName, path: '/workspace/document.pdf' }, { file }, // Browser File or Blob ); ``` Do not JSON-serialize the file and do not wrap it in a `body` field. JSON serialization of an `ArrayBuffer` produces `{}` and writes that text to the sandbox file. Two request formats are supported: - `multipart/form-data`: required `file` field; preferred for generated OpenAPI clients. - `application/octet-stream`: request body contains raw file bytes; preferred for direct or streaming HTTP clients.
   *
   * @tags Agent Sandboxes
   * @name WriteAgentSandboxFile
   * @summary Stream file to agent sandbox
   * @request PUT:/api/v1/agents/{agentId}/sandboxes/{sandboxName}/files/write
   * @secure
   */
  writeAgentSandboxFile = (
    { agentId, sandboxName, ...query }: WriteAgentSandboxFileParams,
    data: WriteAgentSandboxFilePayload,
    params: RequestParams = {},
  ) =>
    this.request<WriteAgentSandboxFileData, WriteAgentSandboxFileError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}/files/write`,
      method: "PUT",
      query: query,
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * @description Returns a paginated list of files in an agent sandbox. The default limit is 50. Requires write access to the agent.
   *
   * @tags Agent Sandboxes
   * @name ListAgentSandboxFiles
   * @summary List files in agent sandbox
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{sandboxName}/files/list
   * @secure
   */
  listAgentSandboxFiles = (
    { agentId, sandboxName, ...query }: ListAgentSandboxFilesParams,
    params: RequestParams = {},
  ) =>
    this.request<ListAgentSandboxFilesData, ListAgentSandboxFilesError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}/files/list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Check a file in an agent sandbox. Requires write access to the agent.
   *
   * @tags Agent Sandboxes
   * @name CheckAgentSandboxFileExists
   * @summary Check file exists in agent sandbox
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{sandboxName}/files/exists
   * @secure
   */
  checkAgentSandboxFileExists = (
    { agentId, sandboxName, ...query }: CheckAgentSandboxFileExistsParams,
    params: RequestParams = {},
  ) =>
    this.request<
      CheckAgentSandboxFileExistsData,
      CheckAgentSandboxFileExistsError
    >({
      path: `/api/v1/agents/${agentId}/sandboxes/${sandboxName}/files/exists`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns a paginated deployment history. The default limit is 50.
   *
   * @tags Apps
   * @name ListAppDeployments
   * @summary List app deployments
   * @request GET:/api/v1/apps/{appId}/deploy
   * @secure
   */
  listAppDeployments = (
    { appId, ...query }: ListAppDeploymentsParams,
    params: RequestParams = {},
  ) =>
    this.request<ListAppDeploymentsData, ListAppDeploymentsError>({
      path: `/api/v1/apps/${appId}/deploy`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Starts a build and rollout and returns the deploymentId immediately. Pass forceRebuild=true to rebuild even when the commit/image did not change. This changes live Kubernetes workloads.
   *
   * @tags Apps
   * @name DeployApp
   * @summary Deploy app
   * @request POST:/api/v1/apps/{appId}/deploy
   * @secure
   */
  deployApp = (
    { appId, forceRebuild }: DeployAppParams,
    params: RequestParams = {},
  ) =>
    this.request<DeployAppData, DeployAppError>({
      path: `/api/v1/apps/${appId}/deploy`,
      method: "POST",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Apps
   * @name GetAppDeployment
   * @summary Get app deployment
   * @request GET:/api/v1/apps/{appId}/deploy/{deployemtId}
   * @secure
   */
  getAppDeployment = (
    { appId, deployemtId }: GetAppDeploymentParams,
    params: RequestParams = {},
  ) =>
    this.request<GetAppDeploymentData, GetAppDeploymentError>({
      path: `/api/v1/apps/${appId}/deploy/${deployemtId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Returns build/deploy logs for one deployment. tailLines is limited to 5000.
   *
   * @tags Apps
   * @name GetAppDeploymentLogs
   * @summary Get app deployment logs
   * @request GET:/api/v1/apps/{appId}/deploy/{deployemtId}/logs
   * @secure
   */
  getAppDeploymentLogs = (
    { appId, deployemtId, ...query }: GetAppDeploymentLogsParams,
    params: RequestParams = {},
  ) =>
    this.request<GetAppDeploymentLogsData, GetAppDeploymentLogsError>({
      path: `/api/v1/apps/${appId}/deploy/${deployemtId}/logs`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
}
