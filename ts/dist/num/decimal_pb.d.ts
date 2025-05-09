/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'



export class Decimal extends jspb.Message {
  getValue(): string;
  setValue(value: string): Decimal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Decimal.AsObject;
  static toObject(includeInstance: boolean, msg: Decimal): Decimal.AsObject;
  static serializeBinaryToWriter(message: Decimal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Decimal;
  static deserializeBinaryFromReader(message: Decimal, reader: jspb.BinaryReader): Decimal;
}

export namespace Decimal {
  export type AsObject = {
    value: string,
  }
}

