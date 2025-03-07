/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'



export class TextExactCriterion extends jspb.Message {
  getField(): string;
  setField(value: string): TextExactCriterion;

  getText(): string;
  setText(value: string): TextExactCriterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TextExactCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: TextExactCriterion): TextExactCriterion.AsObject;
  static serializeBinaryToWriter(message: TextExactCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TextExactCriterion;
  static deserializeBinaryFromReader(message: TextExactCriterion, reader: jspb.BinaryReader): TextExactCriterion;
}

export namespace TextExactCriterion {
  export type AsObject = {
    field: string,
    text: string,
  }
}

