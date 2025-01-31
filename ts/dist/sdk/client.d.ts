import { ServiceClient as FeeProfileServiceClient } from "../instrument/feeprofile/ServiceServiceClientPb";
declare class InstrumentDomain {
    private _feeProfile;
    constructor();
    get feeProfile(): FeeProfileServiceClient;
}
export declare class Client {
    private _instrument;
    constructor();
    get instrument(): InstrumentDomain;
}
export {};
