import { LoggingInterceptor } from "../../../common/grpc_web";
import { ApiUserServicePromiseClient } from "./service_grpc_web_pb";
import {
  GetApiUserRequest,
  CreateApiUserRequest,
  ListApiUsersRequest,
  ListApiUsersResponse,
  SearchApiUsersRequest,
  SearchApiUsersResponse,
} from "./service_pb";
import { APIUser } from "./api_user_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the iam api_user v1 API resource service.
 */
export class ApiUserGrpcWebClientV1 {
  private _service: ApiUserServicePromiseClient;

  /**
   * Constructs an instance of ApiUserGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   */
  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service
    this._service = new ApiUserServicePromiseClient(_config.apiServerURL, null, {
      withCredentials: true,
      unaryInterceptors: [new LoggingInterceptor()],
    });
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
}