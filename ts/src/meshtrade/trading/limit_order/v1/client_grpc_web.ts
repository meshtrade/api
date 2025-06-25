import { LoggingInterceptor } from "../../../common/grpc_web";
import { ServicePromiseClient } from "./service_grpc_web_pb";
import {
  GetRequest,
  GetResponse,
} from "./service_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the trading limit_order v1 API resource service.
 */
export class LimitOrderGrpcWebClientV1 {
  private _service: ServicePromiseClient;

  /**
   * Constructs an instance of LimitOrderGrpcWebClientV1.
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
   * Retrieves a limit order.
   * @param {GetRequest} request - The request object for getting a limit order.
   * @returns {Promise<GetResponse>} A promise that resolves with the limit order.
   */
  get(request: GetRequest): Promise<GetResponse> {
    return this._service.get(request);
  }
}
