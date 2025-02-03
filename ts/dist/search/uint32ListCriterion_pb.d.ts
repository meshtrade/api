import * as jspb from 'google-protobuf'



export class Uint32ListCriterion extends jspb.Message {
  getField(): string;
  setField(value: string): Uint32ListCriterion;

  getListList(): Array<number>;
  setListList(value: Array<number>): Uint32ListCriterion;
  clearListList(): Uint32ListCriterion;
  addList(value: number, index?: number): Uint32ListCriterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Uint32ListCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: Uint32ListCriterion): Uint32ListCriterion.AsObject;
  static serializeBinaryToWriter(message: Uint32ListCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Uint32ListCriterion;
  static deserializeBinaryFromReader(message: Uint32ListCriterion, reader: jspb.BinaryReader): Uint32ListCriterion;
}

export namespace Uint32ListCriterion {
  export type AsObject = {
    field: string,
    listList: Array<number>,
  }
}

