/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/textNEExactCriterion.proto.
 */
export declare const file_search_textNEExactCriterion: GenFile;
/**
 * TextNEExactCriterion is a NOT EQUAL exact text search criterion
 *
 * @generated from message api.search.TextNEExactCriterion
 */
export type TextNEExactCriterion = Message<"api.search.TextNEExactCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * Text is the text that should NOT match the value in the Field.
     *
     * @generated from field: string text = 2;
     */
    text: string;
};
/**
 * Describes the message api.search.TextNEExactCriterion.
 * Use `create(TextNEExactCriterionSchema)` to create a new message.
 */
export declare const TextNEExactCriterionSchema: GenMessage<TextNEExactCriterion>;
