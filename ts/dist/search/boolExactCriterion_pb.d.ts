import * as jspb from 'google-protobuf'



export class BoolExactCriterion extends jspb.Message {
  getField(): string;
  setField(value: string): BoolExactCriterion;

  getBool(): boolean;
  setBool(value: boolean): BoolExactCriterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BoolExactCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: BoolExactCriterion): BoolExactCriterion.AsObject;
  static serializeBinaryToWriter(message: BoolExactCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BoolExactCriterion;
  static deserializeBinaryFromReader(message: BoolExactCriterion, reader: jspb.BinaryReader): BoolExactCriterion;
}

export namespace BoolExactCriterion {
  export type AsObject = {
    field: string,
    bool: boolean,
  }
}

