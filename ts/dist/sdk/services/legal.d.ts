import { ServicePromiseClient as CompanyServiceClient } from "../../legal/company/service_grpc_web_pb";
import { ServiceConstructorArgs } from "../service";
export declare class Legal {
    private _company;
    constructor(args: ServiceConstructorArgs);
    get company(): CompanyServiceClient;
}
