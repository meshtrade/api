/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { AmountLifecycleEventCalculationConfig } from "./lifecycleEventCalculationConfigAmount_pb";
import type { RateLifecycleEventCalculationConfig } from "./lifecycleEventCalculationConfigRate_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/feeprofile/lifecycleEventCalculationConfig.proto.
 */
export declare const file_instrument_feeprofile_lifecycleEventCalculationConfig: GenFile;
/**
 *
 * LifecycleEventCalculationConfig is the calculation configuration that is use to calculate
 * the Fee amount.
 *
 * @bson-marshalled
 *
 * @generated from message api.instrument.feeprofile.LifecycleEventCalculationConfig
 */
export type LifecycleEventCalculationConfig = Message<"api.instrument.feeprofile.LifecycleEventCalculationConfig"> & {
    /**
     * @generated from oneof api.instrument.feeprofile.LifecycleEventCalculationConfig.LifecycleEventCalculationConfig
     */
    LifecycleEventCalculationConfig: {
        /**
         * @generated from field: api.instrument.feeprofile.AmountLifecycleEventCalculationConfig amountLifecycleEventCalculationConfig = 1;
         */
        value: AmountLifecycleEventCalculationConfig;
        case: "amountLifecycleEventCalculationConfig";
    } | {
        /**
         * @generated from field: api.instrument.feeprofile.RateLifecycleEventCalculationConfig rateLifecycleEventCalculationConfig = 2;
         */
        value: RateLifecycleEventCalculationConfig;
        case: "rateLifecycleEventCalculationConfig";
    } | {
        case: undefined;
        value?: undefined;
    };
};
/**
 * Describes the message api.instrument.feeprofile.LifecycleEventCalculationConfig.
 * Use `create(LifecycleEventCalculationConfigSchema)` to create a new message.
 */
export declare const LifecycleEventCalculationConfigSchema: GenMessage<LifecycleEventCalculationConfig>;
