/* eslint-disable */
// @ts-nocheck
import { ConfigOpts } from "./config";
import { Instrument, Legal, Banking } from "./services";
export declare class Client {
    private _instrument;
    private _legal;
    private _banking;
    constructor(config?: ConfigOpts);
    get instrument(): Instrument;
    get legal(): Legal;
    get banking(): Banking;
}
