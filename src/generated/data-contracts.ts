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

export type ListProjectsData = {
  id: string;
  name: string;
  projectType: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}[];

export type ListProjectsError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface SaveProjectPayload {
  id?: string;
  name: string;
  projectType: "APP" | "AGENT";
}

export interface SaveProjectData {
  id: string;
  name: string;
  projectType: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export type SaveProjectError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface GetProjectParams {
  id: string;
}

export interface GetProjectData {
  id: string;
  name: string;
  projectType: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export type GetProjectError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface DeleteProjectParams {
  id: string;
}

export type DeleteProjectData = any;

export type DeleteProjectError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface ListAppsParams {
  projectId?: string;
}

export type ListAppsData = {
  id: string;
  name: string;
  appType: string;
  projectId: string;
  sourceType: string;
  buildMethod: string;
  containerImageSource?: string | null;
  containerRegistryUsername?: string | null;
  containerRegistryPassword?: string | null;
  containerCommand?: string | null;
  containerArgs?: string | null;
  securityContextRunAsUser?: number | null;
  securityContextRunAsGroup?: number | null;
  securityContextFsGroup?: number | null;
  securityContextPrivileged?: boolean | null;
  gitUrl?: string | null;
  gitBranch?: string | null;
  gitUsername?: string | null;
  gitToken?: string | null;
  dockerfilePath: string;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  replicas: number;
  envVars: string;
  memoryReservation?: number | null;
  memoryLimit?: number | null;
  cpuReservation?: number | null;
  cpuLimit?: number | null;
  webhookId?: string | null;
  ingressNetworkPolicy: string;
  egressNetworkPolicy: string;
  useNetworkPolicy: boolean;
  healthChechHttpGetPath?: string | null;
  healthCheckHttpScheme?: string | null;
  healthCheckHttpHeadersJson?: string | null;
  healthCheckHttpPort?: number | null;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckPeriodSeconds: number;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckTimeoutSeconds: number;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckFailureThreshold: number;
  healthCheckTcpPort?: number | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  project: {
    id: string;
    name: string;
    projectType: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  };
  appDomains: {
    id: string;
    hostname: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    useSsl: boolean;
    redirectHttps: boolean;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appPorts: {
    id: string;
    appId: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appNodePorts: {
    id: string;
    appId: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    nodePort: number;
    protocol: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appFileMounts: {
    id: string;
    containerMountPath: string;
    content: string;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appVolumes: {
    id: string;
    containerMountPath: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    size: number;
    accessMode: string;
    storageClassName: string;
    shareWithOtherApps: boolean;
    sharedVolumeId?: string | null;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appBasicAuths: {
    id: string;
    username: string;
    password: string;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
}[];

export type ListAppsError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface SaveAppPayload {
  id?: string;
  name: string;
  appType: string;
  projectId: string;
  sourceType: string;
  buildMethod: string;
  containerImageSource?: string | null;
  containerRegistryUsername?: string | null;
  containerRegistryPassword?: string | null;
  containerCommand?: string | null;
  containerArgs?: string | null;
  securityContextRunAsUser?: number | null;
  securityContextRunAsGroup?: number | null;
  securityContextFsGroup?: number | null;
  securityContextPrivileged?: boolean | null;
  gitUrl?: string | null;
  gitBranch?: string | null;
  gitUsername?: string | null;
  gitToken?: string | null;
  dockerfilePath: string;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  replicas: number;
  envVars: string;
  memoryReservation?: number | null;
  memoryLimit?: number | null;
  cpuReservation?: number | null;
  cpuLimit?: number | null;
  webhookId?: string | null;
  ingressNetworkPolicy: string;
  egressNetworkPolicy: string;
  useNetworkPolicy: boolean;
  healthChechHttpGetPath?: string | null;
  healthCheckHttpScheme?: string | null;
  healthCheckHttpHeadersJson?: string | null;
  healthCheckHttpPort?: number | null;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckPeriodSeconds: number;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckTimeoutSeconds: number;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckFailureThreshold: number;
  healthCheckTcpPort?: number | null;
  appDomains: {
    id?: string;
    hostname: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    useSsl: boolean;
    redirectHttps: boolean;
  }[];
  appPorts: {
    id?: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
  }[];
  appNodePorts: {
    id?: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    nodePort: number;
    protocol: string;
  }[];
  appFileMounts: {
    id?: string;
    containerMountPath: string;
    content: string;
  }[];
  appVolumes: {
    id?: string;
    containerMountPath: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    size: number;
    accessMode: string;
    storageClassName: string;
    shareWithOtherApps: boolean;
    sharedVolumeId?: string | null;
  }[];
  appBasicAuths: {
    id?: string;
    username: string;
    password: string;
  }[];
}

export interface SaveAppData {
  id: string;
  name: string;
  appType: string;
  projectId: string;
  sourceType: string;
  buildMethod: string;
  containerImageSource?: string | null;
  containerRegistryUsername?: string | null;
  containerRegistryPassword?: string | null;
  containerCommand?: string | null;
  containerArgs?: string | null;
  securityContextRunAsUser?: number | null;
  securityContextRunAsGroup?: number | null;
  securityContextFsGroup?: number | null;
  securityContextPrivileged?: boolean | null;
  gitUrl?: string | null;
  gitBranch?: string | null;
  gitUsername?: string | null;
  gitToken?: string | null;
  dockerfilePath: string;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  replicas: number;
  envVars: string;
  memoryReservation?: number | null;
  memoryLimit?: number | null;
  cpuReservation?: number | null;
  cpuLimit?: number | null;
  webhookId?: string | null;
  ingressNetworkPolicy: string;
  egressNetworkPolicy: string;
  useNetworkPolicy: boolean;
  healthChechHttpGetPath?: string | null;
  healthCheckHttpScheme?: string | null;
  healthCheckHttpHeadersJson?: string | null;
  healthCheckHttpPort?: number | null;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckPeriodSeconds: number;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckTimeoutSeconds: number;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckFailureThreshold: number;
  healthCheckTcpPort?: number | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  project: {
    id: string;
    name: string;
    projectType: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  };
  appDomains: {
    id: string;
    hostname: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    useSsl: boolean;
    redirectHttps: boolean;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appPorts: {
    id: string;
    appId: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appNodePorts: {
    id: string;
    appId: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    nodePort: number;
    protocol: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appFileMounts: {
    id: string;
    containerMountPath: string;
    content: string;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appVolumes: {
    id: string;
    containerMountPath: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    size: number;
    accessMode: string;
    storageClassName: string;
    shareWithOtherApps: boolean;
    sharedVolumeId?: string | null;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appBasicAuths: {
    id: string;
    username: string;
    password: string;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
}

export type SaveAppError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface GetAppParams {
  appId: string;
}

export interface GetAppData {
  id: string;
  name: string;
  appType: string;
  projectId: string;
  sourceType: string;
  buildMethod: string;
  containerImageSource?: string | null;
  containerRegistryUsername?: string | null;
  containerRegistryPassword?: string | null;
  containerCommand?: string | null;
  containerArgs?: string | null;
  securityContextRunAsUser?: number | null;
  securityContextRunAsGroup?: number | null;
  securityContextFsGroup?: number | null;
  securityContextPrivileged?: boolean | null;
  gitUrl?: string | null;
  gitBranch?: string | null;
  gitUsername?: string | null;
  gitToken?: string | null;
  dockerfilePath: string;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  replicas: number;
  envVars: string;
  memoryReservation?: number | null;
  memoryLimit?: number | null;
  cpuReservation?: number | null;
  cpuLimit?: number | null;
  webhookId?: string | null;
  ingressNetworkPolicy: string;
  egressNetworkPolicy: string;
  useNetworkPolicy: boolean;
  healthChechHttpGetPath?: string | null;
  healthCheckHttpScheme?: string | null;
  healthCheckHttpHeadersJson?: string | null;
  healthCheckHttpPort?: number | null;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckPeriodSeconds: number;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckTimeoutSeconds: number;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  healthCheckFailureThreshold: number;
  healthCheckTcpPort?: number | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  project: {
    id: string;
    name: string;
    projectType: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  };
  appDomains: {
    id: string;
    hostname: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    useSsl: boolean;
    redirectHttps: boolean;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appPorts: {
    id: string;
    appId: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appNodePorts: {
    id: string;
    appId: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    nodePort: number;
    protocol: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appFileMounts: {
    id: string;
    containerMountPath: string;
    content: string;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appVolumes: {
    id: string;
    containerMountPath: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    size: number;
    accessMode: string;
    storageClassName: string;
    shareWithOtherApps: boolean;
    sharedVolumeId?: string | null;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  appBasicAuths: {
    id: string;
    username: string;
    password: string;
    appId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
}

export type GetAppError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface GetAppLogsParams {
  /**
   * @exclusiveMin 0
   * @max 5000
   * @default 200
   */
  lines: number;
  appId: string;
}

export interface GetAppLogsData {
  appId: string;
  /**
   * @exclusiveMin 0
   * @max 9007199254740991
   */
  lines: number;
  logs: {
    podName: string;
    containerName: string;
    logs: string;
  }[];
}

export type GetAppLogsError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface DeleteAppParams {
  id: string;
}

export type DeleteAppData = any;

export type DeleteAppError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface ListAgentsParams {
  projectId?: string;
}

export type ListAgentsData = {
  id: string;
  name: string;
  projectId: string;
  llmGatewayId: string;
  modelAlias: string[];
  sourceType: string;
  buildMethod: string;
  containerImageSource?: string | null;
  containerRegistryUsername?: string | null;
  containerRegistryPassword?: string | null;
  gitUrl?: string | null;
  gitBranch?: string | null;
  gitUsername?: string | null;
  gitToken?: string | null;
  dockerfilePath: string;
  cpuRequest?: number | null;
  cpuLimit?: number | null;
  memoryRequest?: number | null;
  memoryLimit?: number | null;
  systemPrompt?: string | null;
  encryptedEnvVars?: string | null;
  containerCommand?: string | null;
  containerArgs?: string | null;
  workingDir?: string | null;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  warmPoolReplicas: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  project: {
    id: string;
    name: string;
    projectType: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  };
  llmGateway: {
    id: string;
    name: string;
    baseUrl: string;
    encryptedAdminKey: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  };
  agentDomains: {
    id: string;
    hostname: string;
    useSsl: boolean;
    redirectHttps: boolean;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    agentId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  agentVolumes: {
    id: string;
    containerMountPath: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    size: number;
    storageClassName: string;
    agentId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  agentFileMounts: {
    id: string;
    containerMountPath: string;
    content: string;
    agentId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  agentGitSshKey?: {
    id: string;
    agentId: string;
    publicKey: string;
    encryptedPrivateKey: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  } | null;
  agentNetworkPolicy?: {
    id: string;
    agentId: string;
    allowInternetAccess: boolean;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
    rules: {
      id: string;
      agentNetworkPolicyId: string;
      type: string;
      targetAppId: string;
      /**
       * @min -9007199254740991
       * @max 9007199254740991
       */
      port: number;
      protocol: string;
      /** @format date-time */
      createdAt: string;
      /** @format date-time */
      updatedAt: string;
      targetApp: {
        id: string;
        name: string;
        projectId: string;
      };
    }[];
  } | null;
}[];

export type ListAgentsError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface SaveAgentPayload {
  id?: string;
  name: string;
  projectId: string;
  llmGatewayId: string;
  modelAlias: string[];
  sourceType: string;
  buildMethod: string;
  containerImageSource?: string | null;
  containerRegistryUsername?: string | null;
  containerRegistryPassword?: string | null;
  gitUrl?: string | null;
  gitBranch?: string | null;
  gitUsername?: string | null;
  gitToken?: string | null;
  dockerfilePath: string;
  cpuRequest?: number | null;
  cpuLimit?: number | null;
  memoryRequest?: number | null;
  memoryLimit?: number | null;
  systemPrompt?: string | null;
  encryptedEnvVars?: string | null;
  containerCommand?: string | null;
  containerArgs?: string | null;
  workingDir?: string | null;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  warmPoolReplicas: number;
  agentDomains: {
    id?: string;
    hostname: string;
    useSsl: boolean;
    redirectHttps: boolean;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
  }[];
  agentVolumes: {
    id?: string;
    containerMountPath: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    size: number;
    storageClassName: string;
  }[];
  agentFileMounts: {
    id?: string;
    containerMountPath: string;
    content: string;
  }[];
  agentNetworkPolicy?: {
    id?: string;
    /** @default true */
    allowInternetAccess: boolean;
    rules: {
      id?: string;
      /** @default "EGRESS" */
      type: string;
      targetAppId: string;
      /**
       * @min -9007199254740991
       * @max 9007199254740991
       * @default 443
       */
      port: number;
      /** @default "TCP" */
      protocol: string;
    }[];
  } | null;
}

export interface SaveAgentData {
  id: string;
  name: string;
  projectId: string;
  llmGatewayId: string;
  modelAlias: string[];
  sourceType: string;
  buildMethod: string;
  containerImageSource?: string | null;
  containerRegistryUsername?: string | null;
  containerRegistryPassword?: string | null;
  gitUrl?: string | null;
  gitBranch?: string | null;
  gitUsername?: string | null;
  gitToken?: string | null;
  dockerfilePath: string;
  cpuRequest?: number | null;
  cpuLimit?: number | null;
  memoryRequest?: number | null;
  memoryLimit?: number | null;
  systemPrompt?: string | null;
  encryptedEnvVars?: string | null;
  containerCommand?: string | null;
  containerArgs?: string | null;
  workingDir?: string | null;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  warmPoolReplicas: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  project: {
    id: string;
    name: string;
    projectType: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  };
  llmGateway: {
    id: string;
    name: string;
    baseUrl: string;
    encryptedAdminKey: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  };
  agentDomains: {
    id: string;
    hostname: string;
    useSsl: boolean;
    redirectHttps: boolean;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    agentId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  agentVolumes: {
    id: string;
    containerMountPath: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    size: number;
    storageClassName: string;
    agentId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  agentFileMounts: {
    id: string;
    containerMountPath: string;
    content: string;
    agentId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  agentGitSshKey?: {
    id: string;
    agentId: string;
    publicKey: string;
    encryptedPrivateKey: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  } | null;
  agentNetworkPolicy?: {
    id: string;
    agentId: string;
    allowInternetAccess: boolean;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
    rules: {
      id: string;
      agentNetworkPolicyId: string;
      type: string;
      targetAppId: string;
      /**
       * @min -9007199254740991
       * @max 9007199254740991
       */
      port: number;
      protocol: string;
      /** @format date-time */
      createdAt: string;
      /** @format date-time */
      updatedAt: string;
      targetApp: {
        id: string;
        name: string;
        projectId: string;
      };
    }[];
  } | null;
}

export type SaveAgentError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface GetAgentParams {
  agentId: string;
}

export interface GetAgentData {
  id: string;
  name: string;
  projectId: string;
  llmGatewayId: string;
  modelAlias: string[];
  sourceType: string;
  buildMethod: string;
  containerImageSource?: string | null;
  containerRegistryUsername?: string | null;
  containerRegistryPassword?: string | null;
  gitUrl?: string | null;
  gitBranch?: string | null;
  gitUsername?: string | null;
  gitToken?: string | null;
  dockerfilePath: string;
  cpuRequest?: number | null;
  cpuLimit?: number | null;
  memoryRequest?: number | null;
  memoryLimit?: number | null;
  systemPrompt?: string | null;
  encryptedEnvVars?: string | null;
  containerCommand?: string | null;
  containerArgs?: string | null;
  workingDir?: string | null;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  warmPoolReplicas: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  project: {
    id: string;
    name: string;
    projectType: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  };
  llmGateway: {
    id: string;
    name: string;
    baseUrl: string;
    encryptedAdminKey: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  };
  agentDomains: {
    id: string;
    hostname: string;
    useSsl: boolean;
    redirectHttps: boolean;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    port: number;
    agentId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  agentVolumes: {
    id: string;
    containerMountPath: string;
    /**
     * @min -9007199254740991
     * @max 9007199254740991
     */
    size: number;
    storageClassName: string;
    agentId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  agentFileMounts: {
    id: string;
    containerMountPath: string;
    content: string;
    agentId: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  }[];
  agentGitSshKey?: {
    id: string;
    agentId: string;
    publicKey: string;
    encryptedPrivateKey: string;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
  } | null;
  agentNetworkPolicy?: {
    id: string;
    agentId: string;
    allowInternetAccess: boolean;
    /** @format date-time */
    createdAt: string;
    /** @format date-time */
    updatedAt: string;
    rules: {
      id: string;
      agentNetworkPolicyId: string;
      type: string;
      targetAppId: string;
      /**
       * @min -9007199254740991
       * @max 9007199254740991
       */
      port: number;
      protocol: string;
      /** @format date-time */
      createdAt: string;
      /** @format date-time */
      updatedAt: string;
      targetApp: {
        id: string;
        name: string;
        projectId: string;
      };
    }[];
  } | null;
}

export type GetAgentError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface DeleteAgentParams {
  agentId: string;
}

export type DeleteAgentData = any;

export type DeleteAgentError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface DeployAgentParams {
  /** @default false */
  forceRebuild: boolean;
  agentId: string;
}

export interface DeployAgentData {
  deploymentId: string;
}

export type DeployAgentError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface ListAgentSandboxesParams {
  agentId: string;
}

export type ListAgentSandboxesData = {
  agentId: string;
  sandboxName: string;
  podName: string;
  namespace: string;
  status:
    | "UNKNOWN"
    | "BUILDING"
    | "ERROR"
    | "DEPLOYED"
    | "DEPLOYING"
    | "SHUTDOWN"
    | "SHUTTING_DOWN"
    | "PENDING";
  customTag: string | null;
  createdAt: string | null;
}[];

export type ListAgentSandboxesError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

/** @default {} */
export interface StartAgentSandboxPayload {
  env?: Partial<Record<string, string>>;
  /**
   * @exclusiveMin 0
   * @max 1440
   */
  idleTimeoutMinutes?: number;
  /** @minLength 1 */
  customTag?: string;
}

export interface StartAgentSandboxParams {
  /**
   * @exclusiveMin 0
   * @max 900000
   * @default 300000
   */
  timeoutMs: number;
  agentId: string;
}

export interface StartAgentSandboxData {
  agentId: string;
  sandboxName: string;
  podName: string;
  namespace: string;
  status:
    | "UNKNOWN"
    | "BUILDING"
    | "ERROR"
    | "DEPLOYED"
    | "DEPLOYING"
    | "SHUTDOWN"
    | "SHUTTING_DOWN"
    | "PENDING";
  customTag: string | null;
  createdAt: string | null;
}

export type StartAgentSandboxError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface GetAgentSandboxParams {
  agentId: string;
  sandboxName: string;
}

export interface GetAgentSandboxData {
  agentId: string;
  sandboxName: string;
  podName: string;
  namespace: string;
  status:
    | "UNKNOWN"
    | "BUILDING"
    | "ERROR"
    | "DEPLOYED"
    | "DEPLOYING"
    | "SHUTDOWN"
    | "SHUTTING_DOWN"
    | "PENDING";
  customTag: string | null;
  createdAt: string | null;
}

export type GetAgentSandboxError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface DeleteAgentSandboxParams {
  agentId: string;
  sandboxName: string;
}

export type DeleteAgentSandboxData = any;

export type DeleteAgentSandboxError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface GetAgentSandboxAccessUrlParams {
  agentId: string;
  sandboxName: string;
  domainId: string;
}

export interface GetAgentSandboxAccessUrlData {
  url: string;
  /**
   * @exclusiveMin 0
   * @max 9007199254740991
   */
  expiresAt: number;
}

export type GetAgentSandboxAccessUrlError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface RunAgentSandboxCommandPayload {
  /** @minLength 1 */
  command: string;
  /** @minLength 1 */
  cwd?: string;
  /**
   * @exclusiveMin 0
   * @max 3600
   * @default 120
   */
  timeoutSec?: number;
  env?: Partial<Record<string, string>>;
}

export interface RunAgentSandboxCommandParams {
  agentId: string;
  sandboxName: string;
}

export interface RunAgentSandboxCommandData {
  stdout: string;
  stderr: string;
  /**
   * @min -9007199254740991
   * @max 9007199254740991
   */
  exitCode: number;
}

export type RunAgentSandboxCommandError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface ReadAgentSandboxFileParams {
  /** @minLength 1 */
  path: string;
  agentId: string;
  sandboxName: string;
}

export interface ReadAgentSandboxFileData {
  dataBase64: string;
}

export type ReadAgentSandboxFileError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface ReadAgentSandboxTextFileParams {
  /** @minLength 1 */
  path: string;
  agentId: string;
  sandboxName: string;
}

export interface ReadAgentSandboxTextFileData {
  text: string;
}

export type ReadAgentSandboxTextFileError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface WriteAgentSandboxFilePayload {
  /** @minLength 1 */
  path: string;
  dataBase64: string;
}

export interface WriteAgentSandboxFileParams {
  agentId: string;
  sandboxName: string;
}

export type WriteAgentSandboxFileData = any;

export type WriteAgentSandboxFileError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface WriteAgentSandboxTextFilePayload {
  /** @minLength 1 */
  path: string;
  text: string;
}

export interface WriteAgentSandboxTextFileParams {
  agentId: string;
  sandboxName: string;
}

export type WriteAgentSandboxTextFileData = any;

export type WriteAgentSandboxTextFileError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface ListAgentSandboxFilesParams {
  /** @minLength 1 */
  path: string;
  agentId: string;
  sandboxName: string;
}

export type ListAgentSandboxFilesData = {
  name: string;
  path: string;
  type: "file" | "directory" | "other";
  /**
   * @min 0
   * @max 9007199254740991
   */
  size?: number;
  /**
   * @format date-time
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  modifiedAt?: string;
}[];

export type ListAgentSandboxFilesError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface CheckAgentSandboxFileExistsParams {
  /** @minLength 1 */
  path: string;
  agentId: string;
  sandboxName: string;
}

export interface CheckAgentSandboxFileExistsData {
  exists: boolean;
}

export type CheckAgentSandboxFileExistsError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface ListAppDeploymentsParams {
  appId: string;
}

export type ListAppDeploymentsData = {
  /** @format date-time */
  createdAt: string;
  status:
    | "UNKNOWN"
    | "BUILDING"
    | "ERROR"
    | "DEPLOYED"
    | "DEPLOYING"
    | "SHUTDOWN"
    | "SHUTTING_DOWN"
    | "PENDING";
  gitCommit?: string;
  gitCommitMessage?: string;
  deploymentId: string;
  buildMethod?: "RAILPACK" | "DOCKERFILE";
  appId: string;
}[];

export type ListAppDeploymentsError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface DeployAppParams {
  appId: string;
  /** @default false */
  forceRebuild: boolean;
}

export interface DeployAppData {
  deploymentId: string;
}

export type DeployAppError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface GetAppDeploymentParams {
  appId: string;
  deployemtId: string;
}

export interface GetAppDeploymentData {
  /** @format date-time */
  createdAt: string;
  status:
    | "UNKNOWN"
    | "BUILDING"
    | "ERROR"
    | "DEPLOYED"
    | "DEPLOYING"
    | "SHUTDOWN"
    | "SHUTTING_DOWN"
    | "PENDING";
  gitCommit?: string;
  gitCommitMessage?: string;
  deploymentId: string;
  buildMethod?: "RAILPACK" | "DOCKERFILE";
  appId: string;
}

export type GetAppDeploymentError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};

export interface GetAppDeploymentLogsParams {
  /**
   * @exclusiveMin 0
   * @max 5000
   */
  tailLines?: number;
  appId: string;
  deployemtId: string;
}

export interface GetAppDeploymentLogsData {
  appId: string;
  deplyomentId: string;
  tailLines: number | null;
  logs: string;
}

export type GetAppDeploymentLogsError = {
  type: string;
  title: string;
  status: number;
  detail?: string;
};
