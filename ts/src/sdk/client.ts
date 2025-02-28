import { ServicePromiseClient as FeeProfileServiceClient } from "../instrument/feeprofile/service_grpc_web_pb";

class InstrumentDomain {
  private _feeProfile: FeeProfileServiceClient;

  constructor() {
    this._feeProfile = new FeeProfileServiceClient("");
  }

  public get feeProfile(): FeeProfileServiceClient {
    return this._feeProfile;
  }
}

export class Client {
  private _instrument: InstrumentDomain;

  constructor() {
    this._instrument = new InstrumentDomain();
  }

  public get instrument(): InstrumentDomain {
    return this._instrument;
  }
}
