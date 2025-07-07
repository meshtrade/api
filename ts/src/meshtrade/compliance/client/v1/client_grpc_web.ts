import { LoggingInterceptor } from "../../../common/grpc_web";
import { ClientServicePromiseClient } from "./service_grpc_web_pb";
import {
  CreateClientRequest,
  GetClientRequest,
  ListClientsRequest,
  ListClientsResponse,
} from "./service_pb";
import { Client } from "./client_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the compliance client v1 API resource service.
 */
export class ClientGrpcWebClientV1 {
  private _service: ClientServicePromiseClient;

  /**
   * Constructs an instance of ClientGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   */
  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service
    this._service = new ClientServicePromiseClient(_config.apiServerURL, null, {
      withCredentials: true,
      unaryInterceptors: [new LoggingInterceptor()],
    });
  }

  /**
   * Creates a client.
   * @param {CreateClientRequest} request - The request object for creating a client.
   * @returns {Promise<Client>} A promise that resolves with the created client.
   */
  createClient(request: CreateClientRequest): Promise<Client> {
    return this._service.createClient(request);
  }

  /**
   * Retrieves a client.
   * @param {GetClientRequest} request - The request object for getting a client.
   * @returns {Promise<Client>} A promise that resolves with the client.
   */
  getClient(request: GetClientRequest): Promise<Client> {
    return this._service.getClient(request);
  }

  /**
   * Retrieves a list of clients.
   * @param {ListClientsRequest} request - The request object for listing clients.
   * @returns {Promise<ListClientsResponse>} A promise that resolves with the list of clients.
   */
  listClients(request: ListClientsRequest): Promise<ListClientsResponse> {
    return this._service.listClients(request);
  }
}
