import { LoggingInterceptor } from "../../../common/grpc_web";
import { ServicePromiseClient } from "./service_grpc_web_pb";
import {
  GetRequest,
  GetResponse,
  MintRequest,
  MintResponse,
  BurnRequest,
  BurnResponse,
} from "./service_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the issuance_hub instrument v1 API resource service.
 */
export class InstrumentGrpcWebClientV1 {
  private _service: ServicePromiseClient;

  /**
   * Constructs an instance of InstrumentGrpcWebClientV1.
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
   * Retrieves an instrument.
   * @param {GetRequest} request - The request object for getting an instrument.
   * @returns {Promise<GetResponse>} A promise that resolves with the instrument.
   */
  get(request: GetRequest): Promise<GetResponse> {
    return this._service.get(request);
  }

  /**
   * Mints new instruments.
   * @param {MintRequest} request - The request object for minting instruments.
   * @returns {Promise<MintResponse>} A promise that resolves with the minting response.
   */
  mint(request: MintRequest): Promise<MintResponse> {
    return this._service.mint(request);
  }

  /**
   * Burns instruments.
   * @param {BurnRequest} request - The request object for burning instruments.
   * @returns {Promise<BurnResponse>} A promise that resolves with the burning response.
   */
  burn(request: BurnRequest): Promise<BurnResponse> {
    return this._service.burn(request);
  }
}
