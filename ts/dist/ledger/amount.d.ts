/* eslint-disable */
// @ts-nocheck
import { Amount } from "./amount_pb";
import { Token } from "./token_pb";
import BigNumber from "bignumber.js";
import { Decimal } from "../num/decimal_pb";
/**
 * Creates a new Amount of the given Token.
 *
 * @param {BigNumber | Decimal | string | undefined} amount - The amount in BigNumber, num.Decimal or string format.
 * @param {Token} token - The token type that the amount is denominated in.
 * @returns {Amount} Returns an Amount object that contains the value in Decimal format and the type of token.
 */
export declare function newAmountOfToken(amount: BigNumber | Decimal | string | undefined, token?: Token): Amount;
export declare function amountIsUndefined(amount?: Amount): boolean;
