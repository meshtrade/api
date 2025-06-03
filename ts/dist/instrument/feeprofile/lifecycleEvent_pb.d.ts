/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { LifecycleEventCategory } from "./lifecycleEventCategory_pb";
import type { LifecycleEventCalculationConfig } from "./lifecycleEventCalculationConfig_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/feeprofile/lifecycleEvent.proto.
 */
export declare const file_instrument_feeprofile_lifecycleEvent: GenFile;
/**
 *
 * LifecycleEvents configures the fees associated with various stages in the
 * Instrument's lifecycle.
 * Lifecycle events are significant milestones or actions that may incur
 * fees, such as:
 * - Listing: Fees for listing the Instrument on Mesh.
 * - Primary Market Settlement: Fees related to the settlement of
 * transactions in the primary market.
 *
 * Multiple lifecycle events can be configured and managed within a single
 * FeeProfile.
 *
 * @generated from message api.instrument.feeprofile.LifecycleEvent
 */
export type LifecycleEvent = Message<"api.instrument.feeprofile.LifecycleEvent"> & {
    /**
     *
     * Description is the description of the Fee charged on this LifecycleEvent.
     * The description must be unique is the sense that the same description
     * cannot be used more than once for a single trigger.
     *
     * @generated from field: string description = 1;
     */
    description: string;
    /**
     *
     * Category is the Instrument lifecycle event type that leads to a Fee being charged.
     *
     * @generated from field: api.instrument.feeprofile.LifecycleEventCategory category = 2;
     */
    category: LifecycleEventCategory;
    /**
     *
     * CalculationConfig defines how the Fee on this lifecycle event is calculated.
     * Implementations include:
     * - Amount: The Fee amount is fixed and pre-determined.
     * - Rate: The Fee amount is variable are calculated as a percentage of a
     * base amount. The base amount used is contextual to the lifecycle event.
     *
     * @generated from field: api.instrument.feeprofile.LifecycleEventCalculationConfig calculationConfig = 3;
     */
    calculationConfig?: LifecycleEventCalculationConfig;
};
/**
 * Describes the message api.instrument.feeprofile.LifecycleEvent.
 * Use `create(LifecycleEventSchema)` to create a new message.
 */
export declare const LifecycleEventSchema: GenMessage<LifecycleEvent>;
