/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Tokenisation } from "./tokenisation_pb";
import type { LifecycleEvent } from "./lifecycleEvent_pb";
import type { AUM } from "./aum_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/feeprofile/feeProfile.proto.
 */
export declare const file_instrument_feeprofile_feeProfile: GenFile;
/**
 *
 * FeeProfile defines the fee structure associated with a specific
 * Instrument.
 * It determines the types of fees applicable, the conditions under
 * which they are generated, and the schedule for charging these fees
 * to the Issuer.
 *
 * @generated from message api.instrument.feeprofile.FeeProfile
 */
export type FeeProfile = Message<"api.instrument.feeprofile.FeeProfile"> & {
    /**
     *
     * InstrumentID references the instrument against which this FeeProfile
     * is applied.
     *
     * @generated from field: string instrumentID = 1;
     */
    instrumentID: string;
    /**
     *
     * Tokenisation configures the fees related to the tokenisation processes
     * of the Instrument.
     * Tokenisation involves converting the Instrument into digital tokens,
     * which may include actions like:
     * - Minting: The creation of new tokens representing the Instrument.
     * - Burning: The destruction of existing tokens, reducing the total
     * supply.
     *
     * @generated from field: api.instrument.feeprofile.Tokenisation tokenisation = 2;
     */
    tokenisation?: Tokenisation;
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
     * @generated from field: repeated api.instrument.feeprofile.LifecycleEvent lifecycleEvents = 3;
     */
    lifecycleEvents: LifecycleEvent[];
    /**
     *
     * AUM (Assets Under Management) configures the fees related to the
     * management of the Instrument on Mesh.
     * These fees are typically based on the total value of assets being
     * managed on Mesh, or a flat amount.
     *
     * @generated from field: api.instrument.feeprofile.AUM aum = 4;
     */
    aum?: AUM;
};
/**
 * Describes the message api.instrument.feeprofile.FeeProfile.
 * Use `create(FeeProfileSchema)` to create a new message.
 */
export declare const FeeProfileSchema: GenMessage<FeeProfile>;
