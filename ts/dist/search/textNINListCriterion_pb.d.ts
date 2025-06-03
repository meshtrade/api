/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/textNINListCriterion.proto.
 */
export declare const file_search_textNINListCriterion: GenFile;
/**
 * TextNINListCriterion is a list of strings that a field should not be equal to.
 *
 * @generated from message api.search.TextNINListCriterion
 */
export type TextNINListCriterion = Message<"api.search.TextNINListCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * List is the list of string values that field CANNOT be equal to.
     * i.e. looking for entities where the value in Field is not in this List.
     *
     * @generated from field: repeated string list = 2;
     */
    list: string[];
};
/**
 * Describes the message api.search.TextNINListCriterion.
 * Use `create(TextNINListCriterionSchema)` to create a new message.
 */
export declare const TextNINListCriterionSchema: GenMessage<TextNINListCriterion>;
