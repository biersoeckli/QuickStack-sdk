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

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title QuickStack REST API
 * @version 1.0.0
 *
 * This is the REST API for QuickStack. Furhter details about QuickStack can be found in the [documentation](https://quickstack.dev).
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Projects
     * @name ListProjects
     * @summary List projects
     * @request GET:/api/v1/projects
     * @secure
     */
    listProjects: (params: RequestParams = {}) =>
      this.request<
        {
          id: string;
          name: string;
          projectType: string;
          /** @format date-time */
          createdAt: string;
          /** @format date-time */
          updatedAt: string;
        }[],
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/projects`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name SaveProject
     * @summary Create or update project
     * @request POST:/api/v1/projects
     * @secure
     */
    saveProject: (
      data: {
        id?: string;
        name: string;
        projectType: "APP" | "AGENT";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          id: string;
          name: string;
          projectType: string;
          /** @format date-time */
          createdAt: string;
          /** @format date-time */
          updatedAt: string;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/projects`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name GetProject
     * @summary Get project
     * @request GET:/api/v1/projects/{id}
     * @secure
     */
    getProject: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          id: string;
          name: string;
          projectType: string;
          /** @format date-time */
          createdAt: string;
          /** @format date-time */
          updatedAt: string;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/projects/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Projects
     * @name DeleteProject
     * @summary Delete project
     * @request DELETE:/api/v1/projects/{id}
     * @secure
     */
    deleteProject: (id: string, params: RequestParams = {}) =>
      this.request<
        any,
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/projects/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apps
     * @name ListApps
     * @summary List apps
     * @request GET:/api/v1/apps
     * @secure
     */
    listApps: (
      query?: {
        projectId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
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
        }[],
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/apps`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description When an ID is set, the app will be updated. Otherwise a new one will be created.
     *
     * @tags Apps
     * @name SaveApp
     * @summary Create or update app.
     * @request POST:/api/v1/apps
     * @secure
     */
    saveApp: (
      data: {
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
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
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
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/apps`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apps
     * @name GetApp
     * @summary Get app
     * @request GET:/api/v1/apps/{appId}
     * @secure
     */
    getApp: (appId: string, params: RequestParams = {}) =>
      this.request<
        {
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
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/apps/${appId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apps
     * @name GetAppLogs
     * @summary Get current app logs
     * @request GET:/api/v1/apps/{appId}/logs
     * @secure
     */
    getAppLogs: (
      appId: string,
      query: {
        /**
         * @exclusiveMin 0
         * @max 5000
         * @default 200
         */
        lines: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
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
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/apps/${appId}/logs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apps
     * @name DeleteApp
     * @summary Delete app
     * @request DELETE:/api/v1/apps/{id}
     * @secure
     */
    deleteApp: (id: string, params: RequestParams = {}) =>
      this.request<
        any,
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/apps/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agents
     * @name ListAgents
     * @summary List agents
     * @request GET:/api/v1/agents
     * @secure
     */
    listAgents: (
      query?: {
        projectId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
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
        }[],
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description When an ID is set, the agent will be updated. Otherwise a new one will be created.
     *
     * @tags Agents
     * @name SaveAgent
     * @summary Create or update agent.
     * @request POST:/api/v1/agents
     * @secure
     */
    saveAgent: (
      data: {
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
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
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
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agents
     * @name GetAgent
     * @summary Get agent
     * @request GET:/api/v1/agents/{agentId}
     * @secure
     */
    getAgent: (agentId: string, params: RequestParams = {}) =>
      this.request<
        {
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
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agents
     * @name DeleteAgent
     * @summary Delete agent
     * @request DELETE:/api/v1/agents/{agentId}
     * @secure
     */
    deleteAgent: (agentId: string, params: RequestParams = {}) =>
      this.request<
        any,
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Deploys the agent with the given ID. This does not start any agent, it just applies the configuration to the SandboxTemplate.
     *
     * @tags Agents
     * @name DeployAgent
     * @summary Deploy agent
     * @request POST:/api/v1/agents/{agentId}/deploy
     * @secure
     */
    deployAgent: (
      agentId: string,
      query: {
        /** @default false */
        forceRebuild: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          deploymentId: string;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/deploy`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name ListAgentSandboxes
     * @summary List agent sandboxes
     * @request GET:/api/v1/agents/{agentId}/sandboxes
     * @secure
     */
    listAgentSandboxes: (agentId: string, params: RequestParams = {}) =>
      this.request<
        {
          agentId: string;
          claimName: string;
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
          createdAt: string | null;
        }[],
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name CreateAgentSandbox
     * @summary Create agent sandbox
     * @request POST:/api/v1/agents/{agentId}/sandboxes
     * @secure
     */
    createAgentSandbox: (
      agentId: string,
      query: {
        /**
         * @exclusiveMin 0
         * @max 900000
         * @default 300000
         */
        timeoutMs: number;
      },
      data: {
        env?: Partial<Record<string, string>>;
        /**
         * @exclusiveMin 0
         * @max 1440
         */
        idleTimeoutMinutes?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          agentId: string;
          claimName: string;
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
          createdAt: string | null;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name GetAgentSandbox
     * @summary Get agent sandbox
     * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}
     * @secure
     */
    getAgentSandbox: (
      agentId: string,
      claimName: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          agentId: string;
          claimName: string;
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
          createdAt: string | null;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes/${claimName}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name DeleteAgentSandbox
     * @summary Delete agent sandbox
     * @request DELETE:/api/v1/agents/{agentId}/sandboxes/{claimName}
     * @secure
     */
    deleteAgentSandbox: (
      agentId: string,
      claimName: string,
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes/${claimName}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name RunAgentSandboxCommand
     * @summary Run command in agent sandbox
     * @request POST:/api/v1/agents/{agentId}/sandboxes/{claimName}/commands
     * @secure
     */
    runAgentSandboxCommand: (
      agentId: string,
      claimName: string,
      data: {
        /** @minLength 1 */
        command: string;
        /** @minLength 1 */
        cwd?: string;
        /**
         * @exclusiveMin 0
         * @max 3600
         */
        timeoutSec?: number;
        env?: Partial<Record<string, string>>;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          stdout: string;
          stderr: string;
          /**
           * @min -9007199254740991
           * @max 9007199254740991
           */
          exitCode: number;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/commands`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name ReadAgentSandboxTextFile
     * @summary Read text file from agent sandbox
     * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/read-text
     * @secure
     */
    readAgentSandboxTextFile: (
      agentId: string,
      claimName: string,
      query: {
        /** @minLength 1 */
        path: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          text: string;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/read-text`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name ReadAgentSandboxFile
     * @summary Read file from agent sandbox
     * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/read
     * @secure
     */
    readAgentSandboxFile: (
      agentId: string,
      claimName: string,
      query: {
        /** @minLength 1 */
        path: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          dataBase64: string;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/read`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name WriteAgentSandboxTextFile
     * @summary Write text file to agent sandbox
     * @request PUT:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/write-text
     * @secure
     */
    writeAgentSandboxTextFile: (
      agentId: string,
      claimName: string,
      data: {
        /** @minLength 1 */
        path: string;
        text: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/write-text`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name WriteAgentSandboxFile
     * @summary Write file to agent sandbox
     * @request PUT:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/write
     * @secure
     */
    writeAgentSandboxFile: (
      agentId: string,
      claimName: string,
      data: {
        /** @minLength 1 */
        path: string;
        dataBase64: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        any,
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/write`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name ListAgentSandboxFiles
     * @summary List files in agent sandbox
     * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/list
     * @secure
     */
    listAgentSandboxFiles: (
      agentId: string,
      claimName: string,
      query: {
        /** @minLength 1 */
        path: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
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
        }[],
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/list`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Agent Sandboxes
     * @name CheckAgentSandboxFileExists
     * @summary Check file exists in agent sandbox
     * @request GET:/api/v1/agents/{agentId}/sandboxes/{claimName}/files/exists
     * @secure
     */
    checkAgentSandboxFileExists: (
      agentId: string,
      claimName: string,
      query: {
        /** @minLength 1 */
        path: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          exists: boolean;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/agents/${agentId}/sandboxes/${claimName}/files/exists`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apps
     * @name ListAppDeployments
     * @summary List app deployments
     * @request GET:/api/v1/apps/{appId}/deploy
     * @secure
     */
    listAppDeployments: (appId: string, params: RequestParams = {}) =>
      this.request<
        {
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
        }[],
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/apps/${appId}/deploy`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apps
     * @name DeployApp
     * @summary Deploy app
     * @request POST:/api/v1/apps/{appId}/deploy
     * @secure
     */
    deployApp: (
      appId: string,
      forceRebuild: boolean,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          deploymentId: string;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/apps/${appId}/deploy`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apps
     * @name GetAppDeployment
     * @summary Get app deployment
     * @request GET:/api/v1/apps/{appId}/deploy/{deployemtId}
     * @secure
     */
    getAppDeployment: (
      appId: string,
      deployemtId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
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
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/apps/${appId}/deploy/${deployemtId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Apps
     * @name GetAppDeploymentLogs
     * @summary Get app deployment logs
     * @request GET:/api/v1/apps/{appId}/deploy/{deployemtId}/logs
     * @secure
     */
    getAppDeploymentLogs: (
      appId: string,
      deployemtId: string,
      query?: {
        /**
         * @exclusiveMin 0
         * @max 5000
         */
        tailLines?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          appId: string;
          deplyomentId: string;
          tailLines: number | null;
          logs: string;
        },
        {
          type: string;
          title: string;
          status: number;
          detail?: string;
        }
      >({
        path: `/api/v1/apps/${appId}/deploy/${deployemtId}/logs`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
