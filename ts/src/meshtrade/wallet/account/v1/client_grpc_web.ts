import { LoggingInterceptor } from "../../../common/grpc_web";
import { AccountServicePromiseClient } from "./service_grpc_web_pb";
import {
  CreateAccountRequest,
  GetAccountRequest,
  ListAccountsRequest,
  ListAccountsResponse,
  SearchAccountsRequest,
  SearchAccountsResponse,
} from "./service_pb";
import { Account } from "./account_pb";
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
   * @returns {Promise<Account>} A promise that resolves with the created account.
   */
  createAccount(request: CreateAccountRequest): Promise<Account> {
    return this._service.createAccount(request);
  }

  /**
   * Retrieves an account.
   * @param {GetAccountRequest} request - The request object for getting an account.
   * @returns {Promise<Account>} A promise that resolves with the account.
   */
  getAccount(request: GetAccountRequest): Promise<Account> {
    return this._service.getAccount(request);
  }

  /**
   * Retrieves a list of accounts.
   * @param {ListAccountsRequest} request - The request object for listing accounts.
   * @returns {Promise<ListAccountsResponse>} A promise that resolves with the list of accounts.
   */
  listAccounts(request: ListAccountsRequest): Promise<ListAccountsResponse> {
    return this._service.listAccounts(request);
  }

  /**
   * Searches for accounts.
   * @param {SearchAccountsRequest} request - The request object for searching accounts.
   * @returns {Promise<SearchAccountsResponse>} A promise that resolves with the list of accounts.
   */
  searchAccounts(
    request: SearchAccountsRequest
  ): Promise<SearchAccountsResponse> {
    return this._service.searchAccounts(request);
  }
}
