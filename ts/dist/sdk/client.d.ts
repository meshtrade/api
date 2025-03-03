import { ServicePromiseClient as FeeProfileServiceClient } from "../instrument/feeprofile/service_grpc_web_pb";
declare class InstrumentDomain {
  private _feeProfile;
  constructor();
  get feeProfile(): FeeProfileServiceClient;
}
export declare class Client {
  private _instrument;
  constructor();
  get instrument(): InstrumentDomain;
}
export {};
