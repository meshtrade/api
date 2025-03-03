import * as jspb from 'google-protobuf'



export class TextNINListCriterion extends jspb.Message {
  getField(): string;
  setField(value: string): TextNINListCriterion;

  getListList(): Array<string>;
  setListList(value: Array<string>): TextNINListCriterion;
  clearListList(): TextNINListCriterion;
  addList(value: string, index?: number): TextNINListCriterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TextNINListCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: TextNINListCriterion): TextNINListCriterion.AsObject;
  static serializeBinaryToWriter(message: TextNINListCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TextNINListCriterion;
  static deserializeBinaryFromReader(message: TextNINListCriterion, reader: jspb.BinaryReader): TextNINListCriterion;
}

export namespace TextNINListCriterion {
  export type AsObject = {
    field: string,
    listList: Array<string>,
  }
}

