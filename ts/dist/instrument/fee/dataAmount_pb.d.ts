/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Amount } from "../../ledger/amount_pb";
import type { Decimal } from "../../num/decimal_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/fee/dataAmount.proto.
 */
export declare const file_instrument_fee_dataAmount: GenFile;
/**
 *
 * AmountData is the additional calculation data for a Fee
 * of a fixed amount.
 * This is used for flat fees that do not depend on a variable
 * base amount and percentage for calculation.
 *
 * @bson-marshalled
 *
 * @generated from message api.instrument.fee.AmountData
 */
export type AmountData = Message<"api.instrument.fee.AmountData"> & {
    /**
     *
     * AmountExclVAT is the VAT exclusive amount used to calculate
     * Fee.VatAmount and the resulting Fee.AmountInclVAT.
     *
     * @generated from field: api.ledger.Amount amountExclVAT = 1;
     */
    amountExclVAT?: Amount;
    /**
     *
     * VATRate is the rate used to calculate Fee.VatAmount.
     *
     * @generated from field: api.num.Decimal vatRate = 2;
     */
    vatRate?: Decimal;
};
/**
 * Describes the message api.instrument.fee.AmountData.
 * Use `create(AmountDataSchema)` to create a new message.
 */
export declare const AmountDataSchema: GenMessage<AmountData>;
