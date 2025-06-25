import { LoggingInterceptor } from "../../../common/grpc_web";
import { ServicePromiseClient } from "./service_grpc_web_pb";
import {
  GetRequest,
  GetResponse,
} from "./service_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the trading spot v1 API resource service.
 */
export class SpotGrpcWebClientV1 {
  private _service: ServicePromiseClient;

  /**
   * Constructs an instance of SpotGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   */
  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service
    this._service = new ServicePromiseClient(_config.apiServerURL, null, {
      withCredentials: true,
      unaryInterceptors: [new LoggingInterceptor()],
    });
  }

  /**
   * Retrieves a spot.
   * @param {GetRequest} request - The request object for getting a spot.
   * @returns {Promise<GetResponse>} A promise that resolves with the spot.
   */
  get(request: GetRequest): Promise<GetResponse> {
    return this._service.get(request);
  }
}
