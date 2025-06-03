/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/textExactCriterion.proto.
 */
export declare const file_search_textExactCriterion: GenFile;
/**
 * TextExactCriterion is an exact text search criterion
 *
 * @generated from message api.search.TextExactCriterion
 */
export type TextExactCriterion = Message<"api.search.TextExactCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * Text is the text that should match the value in the Field.
     *
     * @generated from field: string text = 2;
     */
    text: string;
};
/**
 * Describes the message api.search.TextExactCriterion.
 * Use `create(TextExactCriterionSchema)` to create a new message.
 */
export declare const TextExactCriterionSchema: GenMessage<TextExactCriterion>;
