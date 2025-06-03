/* eslint-disable */
// @ts-nocheck
import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file search/sorting.proto.
 */
export declare const file_search_sorting: GenFile;
/**
 * Sorting requests sorting by Field in Order.
 *
 * @generated from message api.search.Sorting
 */
export type Sorting = Message<"api.search.Sorting"> & {
    /**
     * Field is the field by which sorting should be done
     *
     * @generated from field: string field = 1;
     */
    field: string;
    /**
     * Order is the SortingOrder in which sorting should be applied to the Field
     *
     * @generated from field: api.search.SortingOrder order = 2;
     */
    order: SortingOrder;
};
/**
 * Describes the message api.search.Sorting.
 * Use `create(SortingSchema)` to create a new message.
 */
export declare const SortingSchema: GenMessage<Sorting>;
/**
 *
 * SortingOrder is possible search sorting orders.
 *
 * @generated from enum api.search.SortingOrder
 */
export declare enum SortingOrder {
    /**
     * 0 not used to prevent unexpected default value behaviour
     *
     * @generated from enum value: UNDEFINED_SORTING_ORDER = 0;
     */
    UNDEFINED_SORTING_ORDER = 0,
    /**
     * Ascending sorting order
     *
     * @generated from enum value: ASC_SORTING_ORDER = 1;
     */
    ASC_SORTING_ORDER = 1,
    /**
     * Descending sorting order
     *
     * @generated from enum value: DESC_SORTING_ORDER = 2;
     */
    DESC_SORTING_ORDER = 2
}
/**
 * Describes the enum api.search.SortingOrder.
 */
export declare const SortingOrderSchema: GenEnum<SortingOrder>;
