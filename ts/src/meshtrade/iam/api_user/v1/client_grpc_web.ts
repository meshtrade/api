import { LoggingInterceptor } from "../../../common/grpc_web";
import { ApiUserServicePromiseClient } from "./service_grpc_web_pb";
import {
  GetApiUserRequest,
  CreateApiUserRequest,
  ListApiUsersRequest,
  ListApiUsersResponse,
  SearchApiUsersRequest,
  SearchApiUsersResponse,
  ActivateApiUserRequest,
  DeactivateApiUserRequest,
} from "./service_pb";
import { APIUser } from "./api_user_pb";
import { UnaryInterceptor } from "grpc-web";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";
import {GroupHeaderInterceptor} from "../../../common/groupHeaderInterceptor";

/**
 * Client for interacting with the iam api_user v1 API resource service.
 */
export class ApiUserGrpcWebClientV1 {
  private _service: ApiUserServicePromiseClient;
  private readonly _config: ReturnType<typeof getConfigFromOpts>;
  private readonly _interceptors: UnaryInterceptor<any, any>[];

  /**
   * Constructs an instance of ApiUserGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   * @param {UnaryInterceptor<any, any>[]} [interceptors] - For internal use by `withGroup`.
   */
  constructor(config?: ConfigOpts, interceptors?: UnaryInterceptor<any, any>[]) {
    this._config = getConfigFromOpts(config);
    this._interceptors = interceptors || [new LoggingInterceptor()];

    // Construct the underlying gRPC-web service client
    this._service = new ApiUserServicePromiseClient(
      this._config.apiServerURL,
      null,
      {
        withCredentials: true,
        unaryInterceptors: this._interceptors,
      }
    );
  }

  /**
   * Returns a new client instance configured to send the specified groupID
   * in the request headers for subsequent API calls.
   * @param {string} groupID - The operating group context ID to inject into the request.
   * @returns {ApiUserGrpcWebClientV1} A new, configured instance of the client.
   */
  withGroup(groupID: string): ApiUserGrpcWebClientV1 {
    // Check if a GroupHeaderInterceptor already exists.
    const hasGroupInterceptor = this._interceptors.some(
      (interceptor) => interceptor instanceof GroupHeaderInterceptor
    );

    if (hasGroupInterceptor) {
      throw new Error(
        "Attempted to set group context twice. A group has already been set for this client instance."
      );
    }

    // Create a new interceptor for the group context
    const groupInterceptor = new GroupHeaderInterceptor(groupID);

    // Return a new client instance with the existing interceptors plus the new one
    return new ApiUserGrpcWebClientV1(
      this._config,
      [
      ...this._interceptors,
      groupInterceptor,
    ],
  );
  }  

  /**
   * Retrieves an API user.
   * @param {GetApiUserRequest} request - The request object for getting an API user.
   * @returns {Promise<APIUser>} A promise that resolves with the API user.
   */
  getApiUser(request: GetApiUserRequest): Promise<APIUser> {
    return this._service.getApiUser(request);
  }

  /**
   * Creates a new API user.
   * @param {CreateApiUserRequest} request - The request object containing the API user resource to create.
   * @returns {Promise<APIUser>} A promise that resolves with the created API user.
   */
  createApiUser(request: CreateApiUserRequest): Promise<APIUser> {
    return this._service.createApiUser(request);
  }

  /**
   * Retrieves a list of API users.
   * @param {ListApiUsersRequest} request - The request object for listing API users.
   * @returns {Promise<ListApiUsersResponse>} A promise that resolves with the list of API users.
   */
  listApiUsers(request: ListApiUsersRequest): Promise<ListApiUsersResponse> {
    return this._service.listApiUsers(request);
  }

  /**
   * Searches for API users.
   * @param {SearchApiUsersRequest} request - The request object for searching API users.
   * @returns {Promise<SearchApiUsersResponse>} A promise that resolves with the search results.
   */
  searchApiUsers(request: SearchApiUsersRequest): Promise<SearchApiUsersResponse> {
    return this._service.searchApiUsers(request);
  }

  /**
   * Activates an API user.
   * @param {ActivateApiUserRequest} request - The request object for activating an API user.
   * @returns {Promise<APIUser>} A promise that resolves with the activated API user.
   */
  activateApiUser(request: ActivateApiUserRequest): Promise<APIUser> {
    return this._service.activateApiUser(request);
  }

  /**
   * Deactivates an API user.
   * @param {DeactivateApiUserRequest} request - The request object for deactivating an API user.
   * @returns {Promise<APIUser>} A promise that resolves with the deactivated API user.
   */
  deactivateApiUser(request: DeactivateApiUserRequest): Promise<APIUser> {
    return this._service.deactivateApiUser(request);
  }
}