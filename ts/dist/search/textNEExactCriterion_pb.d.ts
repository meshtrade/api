import * as jspb from 'google-protobuf'



export class TextNEExactCriterion extends jspb.Message {
  getField(): string;
  setField(value: string): TextNEExactCriterion;

  getText(): string;
  setText(value: string): TextNEExactCriterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TextNEExactCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: TextNEExactCriterion): TextNEExactCriterion.AsObject;
  static serializeBinaryToWriter(message: TextNEExactCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TextNEExactCriterion;
  static deserializeBinaryFromReader(message: TextNEExactCriterion, reader: jspb.BinaryReader): TextNEExactCriterion;
}

export namespace TextNEExactCriterion {
  export type AsObject = {
    field: string,
    text: string,
  }
}

