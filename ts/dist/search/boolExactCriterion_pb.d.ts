/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/boolExactCriterion.proto.
 */
export declare const file_search_boolExactCriterion: GenFile;
/**
 * BoolExactCriterion is an exact bool search criterion
 *
 * @generated from message api.search.BoolExactCriterion
 */
export type BoolExactCriterion = Message<"api.search.BoolExactCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * Bool is the bool that should match the value in the Field.
     *
     * @generated from field: bool bool = 2;
     */
    bool: boolean;
};
/**
 * Describes the message api.search.BoolExactCriterion.
 * Use `create(BoolExactCriterionSchema)` to create a new message.
 */
export declare const BoolExactCriterionSchema: GenMessage<BoolExactCriterion>;
