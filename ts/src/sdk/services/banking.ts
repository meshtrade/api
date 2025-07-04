import { ServicePromiseClient as FundingServiceClient } from "../../../../../mesh-funding/api/private/ts/src/meshtrade/private/banking/funding/service_grpc_web_pb";
import { ServiceConstructorArgs } from "../service";

export class Banking {
  private _funding: FundingServiceClient;

  constructor(args: ServiceConstructorArgs) {
    this._funding = new FundingServiceClient(...args);
  }

  public get funding(): FundingServiceClient {
    return this._funding;
  }
}
