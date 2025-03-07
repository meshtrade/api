import { Amount } from "./amount_pb";
import { Token } from "./token_pb";
import { BigNumber } from "bignumber.js";
import { Decimal } from "../num/decimal_pb";
/**
 * Creates a new Amount object using a BigNumber and a Token.
 *
 * @param {BigNumber} amount - The amount in BigNumber format to be converted to Decimal.
 * @param {Token} token - The token type that the amount is denominated in.
 * @returns {Amount} Returns an Amount object that contains the value in Decimal format and the type of token.
 *
 * @remarks
 * This function leverages the bigNumberToDecimal function to convert the BigNumber amount into a Decimal object.
 * The resulting Decimal object and the provided Token are then used to construct and return a new Amount object.
 * NOTE: this performs the necessary truncation so that the resultant amount contains a valid number of
 * decimal places for the target network.
 */
export declare function newAmountFromBigNumber(amount: BigNumber, token?: Token): Amount;
/**
 * Creates a new Amount object using a Decimal and a Token.
 *
 * @param {Decimal} amount - The amount in Decimal format to be converted to Decimal.
 * @param {Token} token - The token type that the amount is denominated in.
 * @returns {Amount} Returns an Amount object that contains the value in Decimal format and the type of token.
 *
 * @remarks
 * This function leverages the bigNumberToDecimal function to convert the Decimal amount into a BigNumber object.
 * The resulting Decimal object and the provided Token are then used to construct and return a new Amount object.
 * NOTE: this performs the necessary truncation so that the resultant amount contains a valid number of
 * decimal places for the target network.
 */
export declare function newAmountFromDecimal(amount?: Decimal, token?: Token): Amount;
export declare function amountIsUndefined(amount?: Amount): boolean;
