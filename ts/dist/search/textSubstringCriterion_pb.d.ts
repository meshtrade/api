/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'



export class TextSubstringCriterion extends jspb.Message {
  getField(): string;
  setField(value: string): TextSubstringCriterion;

  getValue(): string;
  setValue(value: string): TextSubstringCriterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TextSubstringCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: TextSubstringCriterion): TextSubstringCriterion.AsObject;
  static serializeBinaryToWriter(message: TextSubstringCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TextSubstringCriterion;
  static deserializeBinaryFromReader(message: TextSubstringCriterion, reader: jspb.BinaryReader): TextSubstringCriterion;
}

export namespace TextSubstringCriterion {
  export type AsObject = {
    field: string,
    value: string,
  }
}

