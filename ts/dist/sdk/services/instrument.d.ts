/* eslint-disable */
// @ts-nocheck
import { Service as InstrumentFeeProfileService } from "../../instrument/feeprofile/service_pb";
import { Service as InstrumentFeeService } from "../../instrument/fee/service_pb";
import { ServiceConstructorArgs } from "../service";
import { Client } from "@connectrpc/connect";
export declare class Instrument {
    private _fee;
    private _feeProfile;
    constructor(args: ServiceConstructorArgs);
    get feeProfile(): Client<typeof InstrumentFeeProfileService>;
    get fee(): Client<typeof InstrumentFeeService>;
}
