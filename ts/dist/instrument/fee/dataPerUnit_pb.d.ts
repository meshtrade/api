/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Amount } from "../../ledger/amount_pb";
import type { Decimal } from "../../num/decimal_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file instrument/fee/dataPerUnit.proto.
 */
export declare const file_instrument_fee_dataPerUnit: GenFile;
/**
 *
 * PerUnitData is the additional calculation data for a Fee
 * calculated using a variable amount of tokens and a set
 * amount per token.
 * For example, this is used for minting and burning fees where
 * the Fee amount depends on the number of tokens minted
 * or burned, and the fee amount per token minted or burned.
 *
 * @bson-marshalled
 *
 * @generated from message api.instrument.fee.PerUnitData
 */
export type PerUnitData = Message<"api.instrument.fee.PerUnitData"> & {
    /**
     *
     * NoUnits is the number of tokens for which a set fee amount
     * is charged and is used to calculate the AmountExclVAT.
     *
     * @generated from field: api.num.Decimal noUnits = 1;
     */
    noUnits?: Decimal;
    /**
     *
     * PerUnitAmount is the fee amount per token that gets
     * multiplied with the NoUnits to calculate the AmountExclVAT.
     *
     * @generated from field: api.ledger.Amount perUnitAmount = 2;
     */
    perUnitAmount?: Amount;
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
 * Describes the message api.instrument.fee.PerUnitData.
 * Use `create(PerUnitDataSchema)` to create a new message.
 */
export declare const PerUnitDataSchema: GenMessage<PerUnitData>;
