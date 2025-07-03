import { LoggingInterceptor } from "../../../common/grpc_web";
import { SpotServicePromiseClient } from "./service_grpc_web_pb";
import { GetSpotRequest } from "./service_pb";
import { Spot } from "./spot_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the trading spot v1 API resource service.
 */
export class SpotGrpcWebClientV1 {
  private _service: SpotServicePromiseClient;

  /**
   * Constructs an instance of SpotGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   */
  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service
    this._service = new SpotServicePromiseClient(_config.apiServerURL, null, {
      withCredentials: true,
      unaryInterceptors: [new LoggingInterceptor()],
    });
  }

  /**
   * Retrieves a spot.
   * @param {GetSpotRequest} request - The request object for getting a spot.
   * @returns {Promise<Spot>} A promise that resolves with the spot.
   */
  getSpot(request: GetSpotRequest): Promise<Spot> {
    return this._service.getSpot(request);
  }
}
