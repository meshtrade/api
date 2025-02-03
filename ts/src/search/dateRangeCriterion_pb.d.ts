import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class DateRangeCriterion extends jspb.Message {
  getField(): string;
  setField(value: string): DateRangeCriterion;

  getStart(): RangeValue | undefined;
  setStart(value?: RangeValue): DateRangeCriterion;
  hasStart(): boolean;
  clearStart(): DateRangeCriterion;

  getEnd(): RangeValue | undefined;
  setEnd(value?: RangeValue): DateRangeCriterion;
  hasEnd(): boolean;
  clearEnd(): DateRangeCriterion;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DateRangeCriterion.AsObject;
  static toObject(includeInstance: boolean, msg: DateRangeCriterion): DateRangeCriterion.AsObject;
  static serializeBinaryToWriter(message: DateRangeCriterion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DateRangeCriterion;
  static deserializeBinaryFromReader(message: DateRangeCriterion, reader: jspb.BinaryReader): DateRangeCriterion;
}

export namespace DateRangeCriterion {
  export type AsObject = {
    field: string,
    start?: RangeValue.AsObject,
    end?: RangeValue.AsObject,
  }
}

export class RangeValue extends jspb.Message {
  getDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDate(value?: google_protobuf_timestamp_pb.Timestamp): RangeValue;
  hasDate(): boolean;
  clearDate(): RangeValue;

  getInclusive(): boolean;
  setInclusive(value: boolean): RangeValue;

  getIgnore(): boolean;
  setIgnore(value: boolean): RangeValue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RangeValue.AsObject;
  static toObject(includeInstance: boolean, msg: RangeValue): RangeValue.AsObject;
  static serializeBinaryToWriter(message: RangeValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RangeValue;
  static deserializeBinaryFromReader(message: RangeValue, reader: jspb.BinaryReader): RangeValue;
}

export namespace RangeValue {
  export type AsObject = {
    date?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    inclusive: boolean,
    ignore: boolean,
  }
}

