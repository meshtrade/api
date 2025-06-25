import { LoggingInterceptor } from "../../../common/grpc_web";
import { ServicePromiseClient } from "./service_grpc_web_pb";
import {
  CreateRequest,
  CreateResponse,
  GetRequest,
  GetResponse,
  ListRequest,
  ListResponse,
  SearchRequest,
  SearchResponse,
} from "./service_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the wallet account v1 API resource service.
 */
export class AccountGrpcWebClientV1 {
  private _service: ServicePromiseClient;

  /**
   * Constructs an instance of AccountGrpcWebClientV1.
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
   * Creates an account.
   * @param {CreateRequest} request - The request object for creating an account.
   * @returns {Promise<CreateResponse>} A promise that resolves with the created account.
   */
  create(request: CreateRequest): Promise<CreateResponse> {
    return this._service.create(request);
  }

  /**
   * Retrieves an account.
   * @param {GetRequest} request - The request object for getting an account.
   * @returns {Promise<GetResponse>} A promise that resolves with the account.
   */
  get(request: GetRequest): Promise<GetResponse> {
    return this._service.get(request);
  }

  /**
   * Retrieves a list of accounts.
   * @param {ListRequest} request - The request object for listing accounts.
   * @returns {Promise<ListResponse>} A promise that resolves with the list of accounts.
   */
  list(request: ListRequest): Promise<ListResponse> {
    return this._service.list(request);
  }

  /**
   * Searches for accounts.
   * @param {SearchRequest} request - The request object for searching accounts.
   * @returns {Promise<SearchResponse>} A promise that resolves with the list of accounts.
   */
  search(request: SearchRequest): Promise<SearchResponse> {
    return this._service.search(request);
  }
}
