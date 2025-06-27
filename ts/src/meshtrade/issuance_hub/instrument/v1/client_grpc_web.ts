import { LoggingInterceptor } from "../../../common/grpc_web";
import { InstrumentServicePromiseClient } from "./service_grpc_web_pb";
import {
  GetInstrumentRequest,
  GetInstrumentResponse,
  MintInstrumentRequest,
  MintInstrumentResponse,
  BurnInstrumentRequest,
  BurnInstrumentResponse,
} from "./service_pb";
import { ConfigOpts, getConfigFromOpts } from "../../../common/config";

/**
 * Client for interacting with the issuance_hub instrument v1 API resource service.
 */
export class InstrumentGrpcWebClientV1 {
  private _service: InstrumentServicePromiseClient;

  /**
   * Constructs an instance of InstrumentGrpcWebClientV1.
   * @param {ConfigOpts} [config] - Optional configuration for the client.
   */
  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service
    this._service = new InstrumentServicePromiseClient(_config.apiServerURL, null, {
      withCredentials: true,
      unaryInterceptors: [new LoggingInterceptor()],
    });
  }

  /**
   * Retrieves an instrument.
   * @param {GetInstrumentRequest} request - The request object for getting an instrument.
   * @returns {Promise<GetInstrumentResponse>} A promise that resolves with the instrument.
   */
  get(request: GetInstrumentRequest): Promise<GetInstrumentResponse> {
    return this._service.get(request);
  }

  /**
   * Mints new instruments.
   * @param {MintInstrumentRequest} request - The request object for minting instruments.
   * @returns {Promise<MintInstrumentResponse>} A promise that resolves with the minting response.
   */
  mint(request: MintInstrumentRequest): Promise<MintInstrumentResponse> {
    return this._service.mint(request);
  }

  /**
   * Burns instruments.
   * @param {BurnInstrumentRequest} request - The request object for burning instruments.
   * @returns {Promise<BurnInstrumentResponse>} A promise that resolves with the burning response.
   */
  burn(request: BurnInstrumentRequest): Promise<BurnInstrumentResponse> {
    return this._service.burn(request);
  }
}
