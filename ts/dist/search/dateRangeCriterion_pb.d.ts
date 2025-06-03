/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/dateRangeCriterion.proto.
 */
export declare const file_search_dateRangeCriterion: GenFile;
/**
 * DataRangeCriterion is an exact date range criterion
 *
 * @generated from message api.search.DateRangeCriterion
 */
export type DateRangeCriterion = Message<"api.search.DateRangeCriterion"> & {
    /**
     *
     * Field is the field that the search is performed against.
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     *
     * Start is the lower bound of the date range
     *
     * @generated from field: api.search.RangeValue start = 2;
     */
    start?: RangeValue;
    /**
     *
     * End is the upper bound of the date range
     *
     * @generated from field: api.search.RangeValue end = 3;
     */
    end?: RangeValue;
};
/**
 * Describes the message api.search.DateRangeCriterion.
 * Use `create(DateRangeCriterionSchema)` to create a new message.
 */
export declare const DateRangeCriterionSchema: GenMessage<DateRangeCriterion>;
/**
 * @generated from message api.search.RangeValue
 */
export type RangeValue = Message<"api.search.RangeValue"> & {
    /**
     *
     * Date is the value the search is performed against
     *
     * @generated from field: google.protobuf.Timestamp date = 1;
     */
    date?: Timestamp;
    /**
     *
     * Inclusive indicates whether the 'date' should be included in the search range.
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
 * Describes the message api.search.RangeValue.
 * Use `create(RangeValueSchema)` to create a new message.
 */
export declare const RangeValueSchema: GenMessage<RangeValue>;
