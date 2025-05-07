// package: api.search
// file: api/proto/search/uint32RangeCriterion.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Uint32RangeCriterion extends jspb.Message { 
    getField(): string;
    setField(value: string): Uint32RangeCriterion;

    hasStart(): boolean;
    clearStart(): void;
    getStart(): Uint32RangeValue | undefined;
    setStart(value?: Uint32RangeValue): Uint32RangeCriterion;

    hasEnd(): boolean;
    clearEnd(): void;
    getEnd(): Uint32RangeValue | undefined;
    setEnd(value?: Uint32RangeValue): Uint32RangeCriterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Uint32RangeCriterion.AsObject;
    static toObject(includeInstance: boolean, msg: Uint32RangeCriterion): Uint32RangeCriterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Uint32RangeCriterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Uint32RangeCriterion;
    static deserializeBinaryFromReader(message: Uint32RangeCriterion, reader: jspb.BinaryReader): Uint32RangeCriterion;
}

export namespace Uint32RangeCriterion {
    export type AsObject = {
        field: string,
        start?: Uint32RangeValue.AsObject,
        end?: Uint32RangeValue.AsObject,
    }
}

export class Uint32RangeValue extends jspb.Message { 
    getValue(): number;
    setValue(value: number): Uint32RangeValue;
    getInclusive(): boolean;
    setInclusive(value: boolean): Uint32RangeValue;
    getIgnore(): boolean;
    setIgnore(value: boolean): Uint32RangeValue;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Uint32RangeValue.AsObject;
    static toObject(includeInstance: boolean, msg: Uint32RangeValue): Uint32RangeValue.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Uint32RangeValue, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Uint32RangeValue;
    static deserializeBinaryFromReader(message: Uint32RangeValue, reader: jspb.BinaryReader): Uint32RangeValue;
}

export namespace Uint32RangeValue {
    export type AsObject = {
        value: number,
        inclusive: boolean,
        ignore: boolean,
    }
}
