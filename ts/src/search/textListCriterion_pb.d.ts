import * as jspb from 'google-protobuf'



export class TextListCriterion extends jspb.Message {
  getField(): string;
  setField(value: string): TextListCriterion;

  getListList(): Array<string>;
  setListList(value: Array<string>): TextListCriterion;
  clearListList(): TextListCriterion;
  addList(value: string, index?: number): TextListCriterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TextListCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: TextListCriterion): TextListCriterion.AsObject;
  static serializeBinaryToWriter(message: TextListCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TextListCriterion;
  static deserializeBinaryFromReader(message: TextListCriterion, reader: jspb.BinaryReader): TextListCriterion;
}

export namespace TextListCriterion {
  export type AsObject = {
    field: string,
    listList: Array<string>,
  }
}

