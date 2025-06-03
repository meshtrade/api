/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/uint32NEExactCriterion.proto.
 */
export declare const file_search_uint32NEExactCriterion: GenFile;
/**
 * Uint32NEExactCriterion is a NOT EQUAL exact uint32 search criterion
 *
 * @generated from message api.search.Uint32NEExactCriterion
 */
export type Uint32NEExactCriterion = Message<"api.search.Uint32NEExactCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * Uint32 is the uint32 that should NOT match the value in the Field.
     *
     * @generated from field: uint32 uint32 = 2;
     */
    uint32: number;
};
/**
 * Describes the message api.search.Uint32NEExactCriterion.
 * Use `create(Uint32NEExactCriterionSchema)` to create a new message.
 */
export declare const Uint32NEExactCriterionSchema: GenMessage<Uint32NEExactCriterion>;
