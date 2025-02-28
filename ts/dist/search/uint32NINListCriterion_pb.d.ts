import * as jspb from 'google-protobuf'



export class Uint32NINListCriterion extends jspb.Message {
  getField(): string;
  setField(value: string): Uint32NINListCriterion;

  getListList(): Array<number>;
  setListList(value: Array<number>): Uint32NINListCriterion;
  clearListList(): Uint32NINListCriterion;
  addList(value: number, index?: number): Uint32NINListCriterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Uint32NINListCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: Uint32NINListCriterion): Uint32NINListCriterion.AsObject;
  static serializeBinaryToWriter(message: Uint32NINListCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Uint32NINListCriterion;
  static deserializeBinaryFromReader(message: Uint32NINListCriterion, reader: jspb.BinaryReader): Uint32NINListCriterion;
}

export namespace Uint32NINListCriterion {
  export type AsObject = {
    field: string,
    listList: Array<number>,
  }
}

