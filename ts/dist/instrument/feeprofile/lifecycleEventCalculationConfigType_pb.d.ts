/* eslint-disable */
// @ts-nocheck
import type { GenEnum, GenFile } from "@bufbuild/protobuf/codegenv2";
/**
 * Describes the file instrument/feeprofile/lifecycleEventCalculationConfigType.proto.
 */
export declare const file_instrument_feeprofile_lifecycleEventCalculationConfigType: GenFile;
/**
 *
 * LifecycleEventCalculationConfigType is a convenience enum that lists all possible calculation configuration types.
 *
 * @generated from enum financial.LifecycleEventCalculationConfigType
 */
export declare enum LifecycleEventCalculationConfigType {
    /**
     * 0 not used to prevent unexpected default value behaviour.
     *
     * @generated from enum value: UNDEFINED_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE = 0;
     */
    UNDEFINED_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE = 0,
    /**
     * @generated from enum value: AMOUNT_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE = 1;
     */
    AMOUNT_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE = 1,
    /**
     * @generated from enum value: RATE_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE = 2;
     */
    RATE_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE = 2
}
/**
 * Describes the enum financial.LifecycleEventCalculationConfigType.
 */
export declare const LifecycleEventCalculationConfigTypeSchema: GenEnum<LifecycleEventCalculationConfigType>;
