/* eslint-disable */
// @ts-nocheck
import { Service as CompanyService } from "../../legal/company/service_pb";
import { ServiceConstructorArgs } from "../service";
import { Client } from "@connectrpc/connect";
export declare class Legal {
    private _company;
    constructor(args: ServiceConstructorArgs);
    get company(): Client<typeof CompanyService>;
}
