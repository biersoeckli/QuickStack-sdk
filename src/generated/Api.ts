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
  CreateAgentSandboxData,
  CreateAgentSandboxError,
  CreateAgentSandboxParams,
  CreateAgentSandboxPayload,
  DeleteAgentData,
  DeleteAgentError,
  DeleteAgentParams,
  DeleteAgentSandboxData,
  DeleteAgentSandboxError,
  DeleteAgentSandboxParams,
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
  ReadAgentSandboxFileData,
  ReadAgentSandboxFileError,
  ReadAgentSandboxFileParams,
  ReadAgentSandboxTextFileData,
  ReadAgentSandboxTextFileError,
  ReadAgentSandboxTextFileParams,
  RunAgentSandboxCommandData,
  RunAgentSandboxCommandError,
  RunAgentSandboxCommandParams,
  RunAgentSandboxCommandPayload,
  SaveAgentData,
  SaveAgentError,
  SaveAgentPayload,
  SaveAppData,
  SaveAppError,
  SaveAppPayload,
  SaveProjectData,
  SaveProjectError,
  SaveProjectPayload,
  WriteAgentSandboxFileData,
  WriteAgentSandboxFileError,
  WriteAgentSandboxFileParams,
  WriteAgentSandboxFilePayload,
  WriteAgentSandboxTextFileData,
  WriteAgentSandboxTextFileError,
  WriteAgentSandboxTextFileParams,
  WriteAgentSandboxTextFilePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class QuickStackApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Projects
   * @name ListProjects
   * @summary List projects
   * @request GET:/api/v1/projects
   * @secure
   */
  listProjects = (params: RequestParams = {}) =>
    this.request<ListProjectsData, ListProjectsError>({
      path: `/api/v1/projects`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
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
   * No description
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
   * No description
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
   * @description When an ID is set, the app will be updated. Otherwise a new one will be created.
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
   * No description
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
   * No description
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
   * No description
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
   * @description When an ID is set, the agent will be updated. Otherwise a new one will be created.
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
   * No description
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
   * @description Deploys the agent with the given ID. This does not start any agent, it just applies the configuration to the SandboxTemplate.
   *
   * @tags Agents
   * @name DeployAgent
   * @summary Deploy agent
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
   * No description
   *
   * @tags Agent Sandboxes
   * @name ListAgentSandboxes
   * @summary List agent sandboxes
   * @request GET:/api/v1/agents/{agentId}/sandboxes
   * @secure
   */
  listAgentSandboxes = (
    { agentId }: ListAgentSandboxesParams,
    params: RequestParams = {},
  ) =>
    this.request<ListAgentSandboxesData, ListAgentSandboxesError>({
      path: `/api/v1/agents/${agentId}/sandboxes`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Agent Sandboxes
   * @name CreateAgentSandbox
   * @summary Create agent sandbox
   * @request POST:/api/v1/agents/{agentId}/sandboxes
   * @secure
   */
  createAgentSandbox = (
    { agentId, ...query }: CreateAgentSandboxParams,
    data: CreateAgentSandboxPayload,
    params: RequestParams = {},
  ) =>
    this.request<CreateAgentSandboxData, CreateAgentSandboxError>({
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
   * No description
   *
   * @tags Agent Sandboxes
   * @name GetAgentSandbox
   * @summary Get agent sandbox
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}
   * @secure
   */
  getAgentSandbox = (
    { agentId, claimName }: GetAgentSandboxParams,
    params: RequestParams = {},
  ) =>
    this.request<GetAgentSandboxData, GetAgentSandboxError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${claimName}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Agent Sandboxes
   * @name DeleteAgentSandbox
   * @summary Delete agent sandbox
   * @request DELETE:/api/v1/agents/{agentId}/sandboxes/{claimName}
   * @secure
   */
  deleteAgentSandbox = (
    { agentId, claimName }: DeleteAgentSandboxParams,
    params: RequestParams = {},
  ) =>
    this.request<DeleteAgentSandboxData, DeleteAgentSandboxError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${claimName}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description Get a temporary access URL to access the agent sandbox via the browser. This is only possible if a domain is configured for the agent and the agent serves an API or Web interface.
   *
   * @tags Agent Sandboxes
   * @name GetAgentSandboxAccessUrl
   * @summary Get agent sandbox access URL
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}/accessUrl/{domainId}
   * @secure
   */
  getAgentSandboxAccessUrl = (
    { agentId, claimName, domainId }: GetAgentSandboxAccessUrlParams,
    params: RequestParams = {},
  ) =>
    this.request<GetAgentSandboxAccessUrlData, GetAgentSandboxAccessUrlError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/accessUrl/${domainId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Agent Sandboxes
   * @name RunAgentSandboxCommand
   * @summary Run command in agent sandbox
   * @request POST:/api/v1/agents/{agentId}/sandboxes/{claimName}/commands
   * @secure
   */
  runAgentSandboxCommand = (
    { agentId, claimName }: RunAgentSandboxCommandParams,
    data: RunAgentSandboxCommandPayload,
    params: RequestParams = {},
  ) =>
    this.request<RunAgentSandboxCommandData, RunAgentSandboxCommandError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/commands`,
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
   * @tags Agent Sandboxes
   * @name ReadAgentSandboxTextFile
   * @summary Read text file from agent sandbox
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/read-text
   * @secure
   */
  readAgentSandboxTextFile = (
    { agentId, claimName, ...query }: ReadAgentSandboxTextFileParams,
    params: RequestParams = {},
  ) =>
    this.request<ReadAgentSandboxTextFileData, ReadAgentSandboxTextFileError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/read-text`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Agent Sandboxes
   * @name ReadAgentSandboxFile
   * @summary Read file from agent sandbox
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/read
   * @secure
   */
  readAgentSandboxFile = (
    { agentId, claimName, ...query }: ReadAgentSandboxFileParams,
    params: RequestParams = {},
  ) =>
    this.request<ReadAgentSandboxFileData, ReadAgentSandboxFileError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/read`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Agent Sandboxes
   * @name WriteAgentSandboxTextFile
   * @summary Write text file to agent sandbox
   * @request PUT:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/write-text
   * @secure
   */
  writeAgentSandboxTextFile = (
    { agentId, claimName }: WriteAgentSandboxTextFileParams,
    data: WriteAgentSandboxTextFilePayload,
    params: RequestParams = {},
  ) =>
    this.request<WriteAgentSandboxTextFileData, WriteAgentSandboxTextFileError>(
      {
        path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/write-text`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      },
    );
  /**
   * No description
   *
   * @tags Agent Sandboxes
   * @name WriteAgentSandboxFile
   * @summary Write file to agent sandbox
   * @request PUT:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/write
   * @secure
   */
  writeAgentSandboxFile = (
    { agentId, claimName }: WriteAgentSandboxFileParams,
    data: WriteAgentSandboxFilePayload,
    params: RequestParams = {},
  ) =>
    this.request<WriteAgentSandboxFileData, WriteAgentSandboxFileError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/write`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Agent Sandboxes
   * @name ListAgentSandboxFiles
   * @summary List files in agent sandbox
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/list
   * @secure
   */
  listAgentSandboxFiles = (
    { agentId, claimName, ...query }: ListAgentSandboxFilesParams,
    params: RequestParams = {},
  ) =>
    this.request<ListAgentSandboxFilesData, ListAgentSandboxFilesError>({
      path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Agent Sandboxes
   * @name CheckAgentSandboxFileExists
   * @summary Check file exists in agent sandbox
   * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/exists
   * @secure
   */
  checkAgentSandboxFileExists = (
    { agentId, claimName, ...query }: CheckAgentSandboxFileExistsParams,
    params: RequestParams = {},
  ) =>
    this.request<
      CheckAgentSandboxFileExistsData,
      CheckAgentSandboxFileExistsError
    >({
      path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/exists`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Apps
   * @name ListAppDeployments
   * @summary List app deployments
   * @request GET:/api/v1/apps/{appId}/deploy
   * @secure
   */
  listAppDeployments = (
    { appId }: ListAppDeploymentsParams,
    params: RequestParams = {},
  ) =>
    this.request<ListAppDeploymentsData, ListAppDeploymentsError>({
      path: `/api/v1/apps/${appId}/deploy`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
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
   * No description
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
