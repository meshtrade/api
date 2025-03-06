import { ServicePromiseClient as InstrumentServiceClient } from "../../instrument/service_grpc_web_pb";
import { ServicePromiseClient as FeeProfileServiceClient } from "../../instrument/feeprofile/service_grpc_web_pb";
import { ServicePromiseClient as FeeServiceClient } from "../../instrument/fee/service_grpc_web_pb";
import { ServiceConstructorArgs } from "../service";

export class Instrument extends InstrumentServiceClient {
    private _fee: FeeServiceClient;
    private _feeProfile: FeeProfileServiceClient;

    constructor(args: ServiceConstructorArgs) {
        super(...args);
        this._feeProfile = new FeeProfileServiceClient(...args);
        this._fee = new FeeServiceClient(...args);
    }

    public get feeProfile(): FeeProfileServiceClient {
        return this._feeProfile;
    }

    public get fee(): FeeServiceClient {
        return this._fee;
    }
}