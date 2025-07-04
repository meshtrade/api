import { LoggingInterceptor } from "../../../common/grpc_web";
import { DirectOrderServicePromiseClient } from "./service_grpc_web_pb";
import { GetDirectOrderRequest } from "./service_pb";
import { DirectOrder } from "./direct_order_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the trading direct_order v1 API resource service.
 */
export class DirectOrderGrpcWebClientV1 {
  private _service: DirectOrderServicePromiseClient;

  /**
   * Constructs an instance of DirectOrderGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   */
  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service
    this._service = new DirectOrderServicePromiseClient(
      _config.apiServerURL,
      null,
      {
        withCredentials: true,
        unaryInterceptors: [new LoggingInterceptor()],
      }
    );
  }

  /**
   * Retrieves a direct order.
   * @param {GetDirectOrderRequest} request - The request object for getting a direct order.
   * @returns {Promise<DirectOrder>} A promise that resolves with the direct order.
   */
  getDirectOrder(request: GetDirectOrderRequest): Promise<DirectOrder> {
    return this._service.getDirectOrder(request);
  }
}
