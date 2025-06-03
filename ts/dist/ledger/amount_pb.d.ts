/* eslint-disable */
// @ts-nocheck
import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import type { Token } from "./token_pb";
import type { Decimal } from "../num/decimal_pb";
import type { Message } from "@bufbuild/protobuf";
/**
 * Describes the file ledger/amount.proto.
 */
export declare const file_ledger_amount: GenFile;
/**
 *
 * Amount is an amount of a particular token.
 *
 * @generated from message api.ledger.Amount
 */
export type Amount = Message<"api.ledger.Amount"> & {
    /**
     *
     * Token is the unit of account of this Amount.
     *
     * @generated from field: api.ledger.Token token = 1;
     */
    token?: Token;
    /**
     *
     * Value is the amount of Token that this Amount is.
     *
     * @generated from field: api.num.Decimal value = 2;
     */
    value?: Decimal;
};
/**
 * Describes the message api.ledger.Amount.
 * Use `create(AmountSchema)` to create a new message.
 */
export declare const AmountSchema: GenMessage<Amount>;
