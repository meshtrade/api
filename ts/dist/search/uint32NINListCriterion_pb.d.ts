/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/uint32NINListCriterion.proto.
 */
export declare const file_search_uint32NINListCriterion: GenFile;
/**
 * Uint32NINListCriterion is a list of unit32 values that the value at the Field is NOT in.
 * i.e. any other value than the values in the list.
 *
 * @generated from message api.search.Uint32NINListCriterion
 */
export type Uint32NINListCriterion = Message<"api.search.Uint32NINListCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * List is the list of uint32 values that field can be NOT equal to.
     * i.e. looking for entities where the value in Field is NOT in this List.
     *
     * @generated from field: repeated uint32 list = 2;
     */
    list: number[];
};
/**
 * Describes the message api.search.Uint32NINListCriterion.
 * Use `create(Uint32NINListCriterionSchema)` to create a new message.
 */
export declare const Uint32NINListCriterionSchema: GenMessage<Uint32NINListCriterion>;
