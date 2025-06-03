/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/int64ExactCriterion.proto.
 */
export declare const file_search_int64ExactCriterion: GenFile;
/**
 * Int64ExactCriterion is an exact int64 search criterion
 *
 * @generated from message api.search.Int64ExactCriterion
 */
export type Int64ExactCriterion = Message<"api.search.Int64ExactCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * Int64 is the int64 that should match the value in the Field.
     *
     * @generated from field: int64 int64 = 2;
     */
    int64: bigint;
};
/**
 * Describes the message api.search.Int64ExactCriterion.
 * Use `create(Int64ExactCriterionSchema)` to create a new message.
 */
export declare const Int64ExactCriterionSchema: GenMessage<Int64ExactCriterion>;
