import { BigNumber } from "bignumber.js";
import { Decimal } from "./decimal_pb";
/**
 * Converts a BigNumber instance to a Decimal object.
 *
 * @param {BigNumber} bigNumberToConvert - The BigNumber instance to convert.
 * @returns {Decimal} A Decimal object with the value and exponent set.
 *
 * @remarks
 * This function uses the string representation of the BigNumber
 * to construct a Decimal object.
 */
export declare function bigNumberToDecimal(
  bigNumberToConvert: BigNumber,
): Decimal;
/**
 * Converts a Decimal object to a BigNumber instance.
 *
 * @param {Decimal} decimal - The Decimal object to convert.
 * @returns {BigNumber} A BigNumber instance with the value and exponent set.
 *
 * @remarks
 * This function uses the value of the Decimal object
 * to construct a BigNumber instance.
 */
export declare function decimalToBigNumber(decimal?: Decimal): BigNumber;
