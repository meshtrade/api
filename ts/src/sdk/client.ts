import { LoggingInterceptor } from "../grpc_web";
import { ConfigOpts, getConfigFromOpts } from "./config";
import { ServiceConstructorArgs } from "./service";
import { Instrument } from "./services";

export class Client {
  private _instrument: Instrument;

  constructor(config?: ConfigOpts) {
    // process config
    const _config = getConfigFromOpts(config);

    // construct service constructor args
    const args: ServiceConstructorArgs = [
      _config.apiServerURL,
      null,
      {
        withCredentials: true,
        unaryInterceptors: [new LoggingInterceptor()],
      },
    ];

    // construct services
    this._instrument = new Instrument(args);
  }

  public get instrument(): Instrument {
    return this._instrument;
  }
}
