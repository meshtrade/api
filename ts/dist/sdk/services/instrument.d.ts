import { ServicePromiseClient as InstrumentServiceClient } from "../../instrument/service_grpc_web_pb";
import { ServicePromiseClient as FeeProfileServiceClient } from "../../instrument/feeprofile/service_grpc_web_pb";
import { ServicePromiseClient as FeeServiceClient } from "../../instrument/fee/service_grpc_web_pb";
import { ServiceConstructorArgs } from "../service";
export declare class Instrument extends InstrumentServiceClient {
    private _fee;
    private _feeProfile;
    constructor(args: ServiceConstructorArgs);
    get feeProfile(): FeeProfileServiceClient;
    get fee(): FeeServiceClient;
}
