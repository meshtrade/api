/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Decimal } from "../../num/decimal_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/feeprofile/aum.proto.
 */
export declare const file_instrument_feeprofile_aum: GenFile;
/**
 *
 * NOT COMPLETE
 * AUM (Assets Under Management) configures the fees related to the
 * management of the Instrument on Mesh.
 * These fees are typically based on the total value of assets being
 * managed on Mesh, or a flat amount.
 *
 * @generated from message api.instrument.feeprofile.AUM
 */
export type AUM = Message<"api.instrument.feeprofile.AUM"> & {
    /**
     *
     * Rate is fee rate applied to the total value of assets on Mesh
     * to calculate the Fee.AmountExclVAT.
     *
     * @generated from field: api.num.Decimal rate = 1;
     */
    rate?: Decimal;
};
/**
 * Describes the message api.instrument.feeprofile.AUM.
 * Use `create(AUMSchema)` to create a new message.
 */
export declare const AUMSchema: GenMessage<AUM>;
