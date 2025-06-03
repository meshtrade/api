/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/textListCriterion.proto.
 */
export declare const file_search_textListCriterion: GenFile;
/**
 * textExactCriterion is an exact uint32 search criterion
 *
 * @generated from message api.search.TextListCriterion
 */
export type TextListCriterion = Message<"api.search.TextListCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * List is the list of string values that field can be EXACTLY equal to.
     * i.e. looking for entities where the value in Field is in this List.
     *
     * @generated from field: repeated string list = 2;
     */
    list: string[];
};
/**
 * Describes the message api.search.TextListCriterion.
 * Use `create(TextListCriterionSchema)` to create a new message.
 */
export declare const TextListCriterionSchema: GenMessage<TextListCriterion>;
