/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'

import * as api_proto_num_decimal_pb from '../../num/decimal_pb'; // proto import: "api/proto/num/decimal.proto"


export class AUM extends jspb.Message {
  getRate(): api_proto_num_decimal_pb.Decimal | undefined;
  setRate(value?: api_proto_num_decimal_pb.Decimal): AUM;
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
    rate?: api_proto_num_decimal_pb.Decimal.AsObject,
  }
}

