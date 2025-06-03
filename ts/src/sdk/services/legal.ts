import { Service as CompanyService } from "../../legal/company/service_pb";
import { ServiceConstructorArgs } from "../service";
import { createClient, Client } from "@connectrpc/connect";

export class Legal {
  private _company: Client<typeof CompanyService>;

  constructor(args: ServiceConstructorArgs) {
    this._company = createClient(CompanyService, args.transport);
  }

  public get company(): Client<typeof CompanyService> {
    return this._company;
  }
}
