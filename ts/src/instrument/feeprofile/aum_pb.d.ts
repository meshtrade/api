import * as jspb from 'google-protobuf'

import * as num_decimal_pb from '../../num/decimal_pb'; // proto import: "num/decimal.proto"


export class AUM extends jspb.Message {
  getRate(): num_decimal_pb.Decimal | undefined;
  setRate(value?: num_decimal_pb.Decimal): AUM;
  hasRate(): boolean;
  clearRate(): AUM;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AUM.AsObject;
  static toObject(includeInstance: boolean, msg: AUM): AUM.AsObject;
  static serializeBinaryToWriter(message: AUM, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AUM;
  static deserializeBinaryFromReader(message: AUM, reader: jspb.BinaryReader): AUM;
}

export namespace AUM {
  export type AsObject = {
    rate?: num_decimal_pb.Decimal.AsObject,
  }
}

