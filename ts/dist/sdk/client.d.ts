/* eslint-disable */
// @ts-nocheck
import { ConfigOpts } from "./config";
import { Instrument, Legal } from "./services";
export declare class Client {
    private _instrument;
    private _legal;
    constructor(config?: ConfigOpts);
    get instrument(): Instrument;
    get legal(): Legal;
}
