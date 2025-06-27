import { LoggingInterceptor } from "../../../common/grpc_web";
import { AccountServicePromiseClient } from "./service_grpc_web_pb";
import {
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountRequest,
  GetAccountResponse,
  ListAccountsRequest,
  ListAccountsResponse,
  SearchAccountsRequest,
  SearchAccountsResponse,
} from "./service_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the wallet account v1 API resource service.
 */
export class AccountGrpcWebClientV1 {
  private _service: AccountServicePromiseClient;

  /**
   * Constructs an instance of AccountGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   */
  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service
    this._service = new AccountServicePromiseClient(
      _config.apiServerURL,
      null,
      {
        withCredentials: true,
        unaryInterceptors: [new LoggingInterceptor()],
      }
    );
  }

  /**
   * Creates an account.
   * @param {CreateAccountRequest} request - The request object for creating an account.
   * @returns {Promise<CreateAccountResponse>} A promise that resolves with the created account.
   */
  create(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    return this._service.create(request);
  }

  /**
   * Retrieves an account.
   * @param {GetAccountRequest} request - The request object for getting an account.
   * @returns {Promise<GetAccountResponse>} A promise that resolves with the account.
   */
  get(request: GetAccountRequest): Promise<GetAccountResponse> {
    return this._service.get(request);
  }

  /**
   * Retrieves a list of accounts.
   * @param {ListAccountsRequest} request - The request object for listing accounts.
   * @returns {Promise<ListAccountsResponse>} A promise that resolves with the list of accounts.
   */
  list(request: ListAccountsRequest): Promise<ListAccountsResponse> {
    return this._service.list(request);
  }

  /**
   * Searches for accounts.
   * @param {SearchAccountsRequest} request - The request object for searching accounts.
   * @returns {Promise<SearchAccountsResponse>} A promise that resolves with the list of accounts.
   */
  search(request: SearchAccountsRequest): Promise<SearchAccountsResponse> {
    return this._service.search(request);
  }
}
