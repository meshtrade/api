/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/uint32RangeCriterion.proto.
 */
export declare const file_search_uint32RangeCriterion: GenFile;
/**
 * Uint32RangeCriterion is an exact uint32 range criterion
 *
 * @generated from message api.search.Uint32RangeCriterion
 */
export type Uint32RangeCriterion = Message<"api.search.Uint32RangeCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * Start is the lower bound of the uint32 range
     *
     * @generated from field: api.search.Uint32RangeValue start = 2;
     */
    start?: Uint32RangeValue;
    /**
     *
     * End is the upper bound of the uint32 range
     *
     * @generated from field: api.search.Uint32RangeValue end = 3;
     */
    end?: Uint32RangeValue;
};
/**
 * Describes the message api.search.Uint32RangeCriterion.
 * Use `create(Uint32RangeCriterionSchema)` to create a new message.
 */
export declare const Uint32RangeCriterionSchema: GenMessage<Uint32RangeCriterion>;
/**
 * @generated from message api.search.Uint32RangeValue
 */
export type Uint32RangeValue = Message<"api.search.Uint32RangeValue"> & {
    /**
     *
     * Date is the value the search is performed against
     *
     * @generated from field: uint32 value = 1;
     */
    value: number;
    /**
     *
     * Inclusive indicates whether the 'uint32' should be included in the search range.
     *
     * @generated from field: bool inclusive = 2;
     */
    inclusive: boolean;
    /**
     *
     * Ignore specifies whether to ignore this range value in the search.
     *
     * @generated from field: bool ignore = 3;
     */
    ignore: boolean;
};
/**
 * Describes the message api.search.Uint32RangeValue.
 * Use `create(Uint32RangeValueSchema)` to create a new message.
 */
export declare const Uint32RangeValueSchema: GenMessage<Uint32RangeValue>;
