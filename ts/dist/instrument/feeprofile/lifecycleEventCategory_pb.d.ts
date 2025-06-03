/* eslint-disable */
// @ts-nocheck
import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file instrument/feeprofile/lifecycleEventCategory.proto.
 */
export declare const file_instrument_feeprofile_lifecycleEventCategory: GenFile;
/**
 *
 * LifecycleEventCategory defines the different types of lifecycle events that can trigger a Fee.
 *
 * @generated from enum api.instrument.feeprofile.LifecycleEventCategory
 */
export declare enum LifecycleEventCategory {
    /**
     * 0 not used to prevent unexpected default value behaviour.
     *
     * @generated from enum value: UNDEFINED_LIFECYCLE_EVENT_CATEGORY = 0;
     */
    UNDEFINED_LIFECYCLE_EVENT_CATEGORY = 0,
    /**
     * @generated from enum value: LISTING_LIFECYCLE_EVENT_CATEGORY = 1;
     */
    LISTING_LIFECYCLE_EVENT_CATEGORY = 1,
    /**
     * @generated from enum value: PRIMARY_MARKET_SETTLEMENT_LIFECYCLE_EVENT_CATEGORY = 2;
     */
    PRIMARY_MARKET_SETTLEMENT_LIFECYCLE_EVENT_CATEGORY = 2
}
/**
 * Describes the enum api.instrument.feeprofile.LifecycleEventCategory.
 */
export declare const LifecycleEventCategorySchema: GenEnum<LifecycleEventCategory>;
