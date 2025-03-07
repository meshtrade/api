/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'



export class Int64ExactCriterion extends jspb.Message {
  getField(): string;
  setField(value: string): Int64ExactCriterion;

  getInt64(): number;
  setInt64(value: number): Int64ExactCriterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Int64ExactCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: Int64ExactCriterion): Int64ExactCriterion.AsObject;
  static serializeBinaryToWriter(message: Int64ExactCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Int64ExactCriterion;
  static deserializeBinaryFromReader(message: Int64ExactCriterion, reader: jspb.BinaryReader): Int64ExactCriterion;
}

export namespace Int64ExactCriterion {
  export type AsObject = {
    field: string,
    int64: number,
  }
}

