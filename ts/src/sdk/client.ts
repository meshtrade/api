import { LoggingInterceptor } from "../grpc_web";
import { ConfigOpts, getConfigFromOpts } from "./config";
import { ServiceConstructorArgs } from "./service";
import { Instrument, Legal, Banking } from "./services";

export class Client {
  private _instrument: Instrument;
  private _legal: Legal;
  private _banking: Banking;

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
    this._legal = new Legal(args);
    this._banking = new Banking(args);
  }

  public get instrument(): Instrument {
    return this._instrument;
  }

  public get legal(): Legal {
    return this._legal;
  }

  public get banking(): Banking {
    return this._banking;
  }
}
