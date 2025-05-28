// package: api.search
// file: api/proto/search/sorting.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Sorting extends jspb.Message { 
    getField(): string;
    setField(value: string): Sorting;
    getOrder(): SortingOrder;
    setOrder(value: SortingOrder): Sorting;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Sorting.AsObject;
    static toObject(includeInstance: boolean, msg: Sorting): Sorting.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Sorting, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Sorting;
    static deserializeBinaryFromReader(message: Sorting, reader: jspb.BinaryReader): Sorting;
}

export namespace Sorting {
    export type AsObject = {
        field: string,
        order: SortingOrder,
    }
}

export enum SortingOrder {
    UNDEFINED_SORTING_ORDER = 0,
    ASC_SORTING_ORDER = 1,
    DESC_SORTING_ORDER = 2,
}
