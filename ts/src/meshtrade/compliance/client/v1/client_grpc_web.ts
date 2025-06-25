import { LoggingInterceptor } from "../../../common/grpc_web";
import { ServicePromiseClient } from "./service_grpc_web_pb";
import {
  GetRequest,
  GetResponse,
  ListRequest,
  ListResponse,
} from "./service_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the compliance client v1 API resource service.
 */
export class ClientGrpcWebClientV1 {
  private _service: ServicePromiseClient;

  /**
   * Constructs an instance of ClientGrpcWebClientV1.
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
   * Retrieves a client.
   * @param {GetRequest} request - The request object for getting a client.
   * @returns {Promise<GetResponse>} A promise that resolves with the client.
   */
  get(request: GetRequest): Promise<GetResponse> {
    return this._service.get(request);
  }

  /**
   * Retrieves a list of clients.
   * @param {ListRequest} request - The request object for listing clients.
   * @returns {Promise<ListResponse>} A promise that resolves with the list of clients.
   */
  list(request: ListRequest): Promise<ListResponse> {
    return this._service.list(request);
  }
}