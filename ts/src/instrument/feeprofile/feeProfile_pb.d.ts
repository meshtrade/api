import * as jspb from 'google-protobuf'

import * as instrument_feeprofile_tokenisation_pb from '../../instrument/feeprofile/tokenisation_pb'; // proto import: "instrument/feeprofile/tokenisation.proto"
import * as instrument_feeprofile_lifecycleEvent_pb from '../../instrument/feeprofile/lifecycleEvent_pb'; // proto import: "instrument/feeprofile/lifecycleEvent.proto"
import * as instrument_feeprofile_aum_pb from '../../instrument/feeprofile/aum_pb'; // proto import: "instrument/feeprofile/aum.proto"


export class FeeProfile extends jspb.Message {
  getInstrumentname(): string;
  setInstrumentname(value: string): FeeProfile;

  getTokenisation(): instrument_feeprofile_tokenisation_pb.Tokenisation | undefined;
  setTokenisation(value?: instrument_feeprofile_tokenisation_pb.Tokenisation): FeeProfile;
  hasTokenisation(): boolean;
  clearTokenisation(): FeeProfile;

  getLifecycleeventsList(): Array<instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent>;
  setLifecycleeventsList(value: Array<instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent>): FeeProfile;
  clearLifecycleeventsList(): FeeProfile;
  addLifecycleevents(value?: instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent, index?: number): instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent;

  getAum(): instrument_feeprofile_aum_pb.AUM | undefined;
  setAum(value?: instrument_feeprofile_aum_pb.AUM): FeeProfile;
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
    instrumentname: string,
    tokenisation?: instrument_feeprofile_tokenisation_pb.Tokenisation.AsObject,
    lifecycleeventsList: Array<instrument_feeprofile_lifecycleEvent_pb.LifecycleEvent.AsObject>,
    aum?: instrument_feeprofile_aum_pb.AUM.AsObject,
  }
}

