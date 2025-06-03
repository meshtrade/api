/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Decimal } from "../../num/decimal_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/feeprofile/lifecycleEventCalculationConfigRate.proto.
 */
export declare const file_instrument_feeprofile_lifecycleEventCalculationConfigRate: GenFile;
/**
 *
 * RateLifecycleEventCalculationConfig is the calculation configuration for a Fee
 * calculated using a percentage rate and a variable base
 * amount.
 * This is used for fees that depend on base amount like the
 * primary market settlement amount or subscription order book
 * target raise not yet known with certainty at the time of
 * setting up the Instrument's FeeProfile.
 *
 * @bson-marshalled
 *
 * @generated from message api.instrument.feeprofile.RateLifecycleEventCalculationConfig
 */
export type RateLifecycleEventCalculationConfig = Message<"api.instrument.feeprofile.RateLifecycleEventCalculationConfig"> & {
    /**
     *
     * Rate is the rate used to calculate Fee amount when mulitplied to
     * a base amount specific to the lifecycle event.
     * The base amount used is typically one of the following:
     * - Subscription order book target raise amount
     * - Primary market settlement amount
     *
     * @generated from field: api.num.Decimal rate = 1;
     */
    rate?: Decimal;
};
/**
 * Describes the message api.instrument.feeprofile.RateLifecycleEventCalculationConfig.
 * Use `create(RateLifecycleEventCalculationConfigSchema)` to create a new message.
 */
export declare const RateLifecycleEventCalculationConfigSchema: GenMessage<RateLifecycleEventCalculationConfig>;
