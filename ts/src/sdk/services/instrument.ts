import { Service as InstrumentService } from "../../instrument/service_pb";
import { Service as InstrumentFeeProfileService } from "../../instrument/feeprofile/service_pb";
import { Service as InstrumentFeeService } from "../../instrument/fee/service_pb";
import { ServiceConstructorArgs } from "../service";
import { createClient, Client } from "@connectrpc/connect";

// export class Instrument implements InstrumentService {
export class Instrument {
  private _fee: Client<typeof InstrumentFeeService>;
  private _feeProfile: Client<typeof InstrumentFeeProfileService>;

  constructor(args: ServiceConstructorArgs) {
    this._feeProfile = createClient(InstrumentFeeProfileService, args.transport);
    this._fee = createClient(InstrumentFeeService, args.transport);
  }

  public get feeProfile(): Client<typeof InstrumentFeeProfileService> {
    return this._feeProfile;
  }

  public get fee(): Client<typeof InstrumentFeeService> {
    return this._fee;
  }
}
