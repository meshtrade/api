/* eslint-disable */
// @ts-nocheck
// package: api.audit
// file: api/proto/audit/entry.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Entry extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): Entry;
    getAction(): Action;
    setAction(value: Action): Entry;

    hasTime(): boolean;
    clearTime(): void;
    getTime(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setTime(value?: google_protobuf_timestamp_pb.Timestamp): Entry;
    getVersion(): number;
    setVersion(value: number): Entry;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Entry.AsObject;
    static toObject(includeInstance: boolean, msg: Entry): Entry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Entry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Entry;
    static deserializeBinaryFromReader(message: Entry, reader: jspb.BinaryReader): Entry;
}

export namespace Entry {
    export type AsObject = {
        userid: string,
        action: Action,
        time?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        version: number,
    }
}

export enum Action {
    UNDEFINED_ACTION = 0,
    CREATED_ACTION = 1,
    MODIFIED_ACTION = 2,
    DELETED_ACTION = 3,
    RESTORED_ACTION = 4,
}
