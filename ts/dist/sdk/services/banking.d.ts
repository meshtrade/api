/* eslint-disable */
// @ts-nocheck
import { ServicePromiseClient as FundingServiceClient } from "../../banking/funding/service_grpc_web_pb";
import { ServiceConstructorArgs } from "../service";
export declare class Banking {
    private _funding;
    constructor(args: ServiceConstructorArgs);
    get funding(): FundingServiceClient;
}
