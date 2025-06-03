/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Sorting } from "./sorting_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/query.proto.
 */
export declare const file_search_query: GenFile;
/**
 * Query is used to configure a Search for data.
 *
 * @generated from message api.search.Query
 */
export type Query = Message<"api.search.Query"> & {
    /**
     * Limit is the requested maximum page size.
     *
     * @generated from field: uint64 limit = 1;
     */
    limit: bigint;
    /**
     * Offset is the point from which a Limit sized page of results should be returned.
     *
     * @generated from field: uint64 offset = 2;
     */
    offset: bigint;
    /**
     * Sorting is a list of Sorting requests.
     *
     * @generated from field: repeated api.search.Sorting sorting = 3;
     */
    sorting: Sorting[];
};
/**
 * Describes the message api.search.Query.
 * Use `create(QuerySchema)` to create a new message.
 */
export declare const QuerySchema: GenMessage<Query>;
