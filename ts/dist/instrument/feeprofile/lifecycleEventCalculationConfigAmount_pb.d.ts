/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Amount } from "../../ledger/amount_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/feeprofile/lifecycleEventCalculationConfigAmount.proto.
 */
export declare const file_instrument_feeprofile_lifecycleEventCalculationConfigAmount: GenFile;
/**
 *
 * AmountLifecycleEventCalculationConfig is the calculation data for a
 * lifecycle Fee with a fixed amount.
 * This is used for flat lifecycle event fees that do not depend on a
 * variable base amount and percentage for calculation.
 *
 * @bson-marshalled
 *
 * @generated from message api.instrument.feeprofile.AmountLifecycleEventCalculationConfig
 */
export type AmountLifecycleEventCalculationConfig = Message<"api.instrument.feeprofile.AmountLifecycleEventCalculationConfig"> & {
    /**
     *
     * Amount is the fixed (pre-tax) fee amount charged on the lifecycle event.
     *
     * @generated from field: api.ledger.Amount amount = 1;
     */
    amount?: Amount;
};
/**
 * Describes the message api.instrument.feeprofile.AmountLifecycleEventCalculationConfig.
 * Use `create(AmountLifecycleEventCalculationConfigSchema)` to create a new message.
 */
export declare const AmountLifecycleEventCalculationConfigSchema: GenMessage<AmountLifecycleEventCalculationConfig>;
