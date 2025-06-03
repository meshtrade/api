/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/uint32ExactCriterion.proto.
 */
export declare const file_search_uint32ExactCriterion: GenFile;
/**
 * Uint32ExactCriterion is an exact uint32 search criterion
 *
 * @generated from message api.search.Uint32ExactCriterion
 */
export type Uint32ExactCriterion = Message<"api.search.Uint32ExactCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * Uint32 is the uint32 that should match the value in the Field.
     *
     * @generated from field: uint32 uint32 = 2;
     */
    uint32: number;
};
/**
 * Describes the message api.search.Uint32ExactCriterion.
 * Use `create(Uint32ExactCriterionSchema)` to create a new message.
 */
export declare const Uint32ExactCriterionSchema: GenMessage<Uint32ExactCriterion>;
