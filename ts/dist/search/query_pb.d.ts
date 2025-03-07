/* eslint-disable */
// @ts-nocheck
import * as jspb from 'google-protobuf'

import * as api_proto_search_sorting_pb from '../search/sorting_pb'; // proto import: "api/proto/search/sorting.proto"


export class Query extends jspb.Message {
  getLimit(): number;
  setLimit(value: number): Query;

  getOffset(): number;
  setOffset(value: number): Query;

  getSortingList(): Array<api_proto_search_sorting_pb.Sorting>;
  setSortingList(value: Array<api_proto_search_sorting_pb.Sorting>): Query;
  clearSortingList(): Query;
  addSorting(value?: api_proto_search_sorting_pb.Sorting, index?: number): api_proto_search_sorting_pb.Sorting;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Query.AsObject;
  static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
  static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Query;
  static deserializeBinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
}

export namespace Query {
  export type AsObject = {
    limit: number,
    offset: number,
    sortingList: Array<api_proto_search_sorting_pb.Sorting.AsObject>,
  }
}

