import { LoggingInterceptor } from "../../../common/grpc_web";
import { GroupServicePromiseClient } from "./service_grpc_web_pb";
import {
  GetGroupRequest,
  GetGroupResponse,
} from "./service_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the iam group v1 API resource service.
 */
export class GroupGrpcWebClientV1 {
  private _service: GroupServicePromiseClient;

  /**
   * Constructs an instance of GroupGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   */
  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service
    this._service = new GroupServicePromiseClient(_config.apiServerURL, null, {
      withCredentials: true,
      unaryInterceptors: [new LoggingInterceptor()],
    });
  }

  /**
   * Retrieves a group.
   * @param {GetGroupRequest} request - The request object for getting a group.
   * @returns {Promise<GetGroupResponse>} A promise that resolves with the group.
   */
  get(request: GetGroupRequest): Promise<GetGroupResponse> {
    return this._service.get(request);
  }
}
