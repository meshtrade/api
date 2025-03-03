import * as jspb from 'google-protobuf'

import * as api_proto_instrument_feeprofile_tokenisation_pb from '../../instrument/feeprofile/tokenisation_pb'; // proto import: "api/proto/instrument/feeprofile/tokenisation.proto"
import * as api_proto_instrument_feeprofile_lifecycleEvent_pb from '../../instrument/feeprofile/lifecycleEvent_pb'; // proto import: "api/proto/instrument/feeprofile/lifecycleEvent.proto"
import * as api_proto_instrument_feeprofile_aum_pb from '../../instrument/feeprofile/aum_pb'; // proto import: "api/proto/instrument/feeprofile/aum.proto"


export class FeeProfile extends jspb.Message {
  getInstrumentid(): string;
  setInstrumentid(value: string): FeeProfile;

  getTokenisation(): api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation | undefined;
  setTokenisation(value?: api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation): FeeProfile;
  hasTokenisation(): boolean;
  clearTokenisation(): FeeProfile;

  getLifecycleeventsList(): Array<api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent>;
  setLifecycleeventsList(value: Array<api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent>): FeeProfile;
  clearLifecycleeventsList(): FeeProfile;
  addLifecycleevents(value?: api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent, index?: number): api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent;

  getAum(): api_proto_instrument_feeprofile_aum_pb.AUM | undefined;
  setAum(value?: api_proto_instrument_feeprofile_aum_pb.AUM): FeeProfile;
  hasAum(): boolean;
  clearAum(): FeeProfile;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FeeProfile.AsObject;
  static toObject(includeInstance: boolean, msg: FeeProfile): FeeProfile.AsObject;
  static serializeBinaryToWriter(message: FeeProfile, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FeeProfile;
  static deserializeBinaryFromReader(message: FeeProfile, reader: jspb.BinaryReader): FeeProfile;
}

export namespace FeeProfile {
  export type AsObject = {
    instrumentid: string,
    tokenisation?: api_proto_instrument_feeprofile_tokenisation_pb.Tokenisation.AsObject,
    lifecycleeventsList: Array<api_proto_instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent.AsObject>,
    aum?: api_proto_instrument_feeprofile_aum_pb.AUM.AsObject,
  }
}

