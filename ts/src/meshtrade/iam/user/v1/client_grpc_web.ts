import { LoggingInterceptor } from "../../../common/grpc_web";
import { UserServicePromiseClient } from "./service_grpc_web_pb";
import { AssignRoleToUserRequest } from "./service_pb";
import { User } from "./user_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the iam user v1 API resource service.
 */
export class UserGrpcWebClientV1 {
  private _service: UserServicePromiseClient;

  /**
   * Constructs an instance of UserGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   */
  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service
    this._service = new UserServicePromiseClient(_config.apiServerURL, null, {
      withCredentials: true,
      unaryInterceptors: [new LoggingInterceptor()],
    });
  }

  /**
   * Assigns a role to a user.
   * @param {AssignRoleToUserRequest} request - The request object for assigning a role to a user.
   * @returns {Promise<User>} A promise that resolves with the user.
   */
  assignRoleToUser(request: AssignRoleToUserRequest): Promise<User> {
    return this._service.assignRoleToUser(request);
  }
}
