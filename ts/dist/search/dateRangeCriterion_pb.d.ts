/* eslint-disable */
// @ts-nocheck
// package: api.search
// file: api/proto/search/dateRangeCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class DateRangeCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): DateRangeCriterion;

    hasStart(): boolean;
    clearStart(): void;
    getStart(): RangeValue | undefined;
    setStart(value?: RangeValue): DateRangeCriterion;

    hasEnd(): boolean;
    clearEnd(): void;
    getEnd(): RangeValue | undefined;
    setEnd(value?: RangeValue): DateRangeCriterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DateRangeCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: DateRangeCriterion): DateRangeCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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

    hasDate(): boolean;
    clearDate(): void;
    getDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDate(value?: google_protobuf_timestamp_pb.Timestamp): RangeValue;
    getInclusive(): boolean;
    setInclusive(value: boolean): RangeValue;
    getIgnore(): boolean;
    setIgnore(value: boolean): RangeValue;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RangeValue.AsObject;
    static toObject(includeInstance: boolean, msg: RangeValue): RangeValue.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
