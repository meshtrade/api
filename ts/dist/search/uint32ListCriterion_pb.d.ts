/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/uint32ListCriterion.proto.
 */
export declare const file_search_uint32ListCriterion: GenFile;
/**
 * Uint32ExactCriterion is an exact uint32 search criterion
 *
 * @generated from message api.search.Uint32ListCriterion
 */
export type Uint32ListCriterion = Message<"api.search.Uint32ListCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * List is the list of uint32 values that field can be EXACTLY equal to.
     * i.e. looking for entities where the value in Field is in this List.
     *
     * @generated from field: repeated uint32 list = 2;
     */
    list: number[];
};
/**
 * Describes the message api.search.Uint32ListCriterion.
 * Use `create(Uint32ListCriterionSchema)` to create a new message.
 */
export declare const Uint32ListCriterionSchema: GenMessage<Uint32ListCriterion>;
