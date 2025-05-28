import { ServicePromiseClient as CompanyServiceClient } from "../../legal/company/service_grpc_web_pb";
import { ServiceConstructorArgs } from "../service";

export class Legal {
  private _company: CompanyServiceClient;

  constructor(args: ServiceConstructorArgs) {
    this._company = new CompanyServiceClient(...args);
  }

  public get company(): CompanyServiceClient {
    return this._company;
  }
}
