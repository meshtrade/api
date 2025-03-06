import { ConfigOpts } from "./config";
import { Instrument } from "./services";
export declare class Client {
  private _instrument;
  constructor(config?: ConfigOpts);
  get instrument(): Instrument;
}
