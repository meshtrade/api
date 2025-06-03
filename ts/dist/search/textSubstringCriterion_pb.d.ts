/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/textSubstringCriterion.proto.
 */
export declare const file_search_textSubstringCriterion: GenFile;
/**
 * TextSubstringCriterion is a substring text search criterion
 *
 * @generated from message api.search.TextSubstringCriterion
 */
export type TextSubstringCriterion = Message<"api.search.TextSubstringCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * Value is the text that should be contained within the Field.
     *
     * @generated from field: string value = 2;
     */
    value: string;
};
/**
 * Describes the message api.search.TextSubstringCriterion.
 * Use `create(TextSubstringCriterionSchema)` to create a new message.
 */
export declare const TextSubstringCriterionSchema: GenMessage<TextSubstringCriterion>;
