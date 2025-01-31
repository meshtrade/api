import * as jspb from 'google-protobuf'



export class FeeProfile extends jspb.Message {
  getInstrumentid(): string;
  setInstrumentid(value: string): FeeProfile;

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
  }
}

