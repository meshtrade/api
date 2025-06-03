/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Amount } from "../../ledger/amount_pb";
import type { Decimal } from "../../num/decimal_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/fee/dataRate.proto.
 */
export declare const file_instrument_fee_dataRate: GenFile;
/**
 *
 * RateData is the additional calculation data for a Fee
 * calculated using a percentage rate and a variable base
 * amount.
 * This is used for fees that depend on a base amount like the
 * primary market settlement amount or subscription order book
 * target raise, not yet known with certainty at the time of
 * setting up the Instrument's FeeProfile.
 *
 * @bson-marshalled
 *
 * @generated from message api.instrument.fee.RateData
 */
export type RateData = Message<"api.instrument.fee.RateData"> & {
    /**
     *
     * Rate is the rate applied to the BaseAmount to calculate the
     * resulting AmountExclVAT.
     *
     * @generated from field: api.num.Decimal rate = 1;
     */
    rate?: Decimal;
    /**
     *
     * BaseAmount is the variable amount that gets multiplied with
     * the Rate to calculate the AmountExclVAT.
     * For example, this might be the primary market settlement
     * amount or subscription order book target raise.
     *
     * @generated from field: api.ledger.Amount baseAmount = 2;
     */
    baseAmount?: Amount;
    /**
     *
     * AmountExclVAT is the VAT exclusive amount used to calculate
     * Fee.VatAmount and the resulting Fee.AmountInclVAT.
     *
     * @generated from field: api.ledger.Amount amountExclVAT = 3;
     */
    amountExclVAT?: Amount;
    /**
     *
     * VATRate is the rate used to calculate Fee.VatAmount.
     *
     * @generated from field: api.num.Decimal vatRate = 4;
     */
    vatRate?: Decimal;
};
/**
 * Describes the message api.instrument.fee.RateData.
 * Use `create(RateDataSchema)` to create a new message.
 */
export declare const RateDataSchema: GenMessage<RateData>;
