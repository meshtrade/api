import BigNumber from "bignumber.js";
import { create } from "@bufbuild/protobuf";
import { Decimal, DecimalSchema } from "./decimal_pb";

/**
 * Converts a BigNumber instance to a Decimal object.
 *
 * @param {BigNumber} bigNumberToConvert - The BigNumber instance to convert.
 * @returns {Decimal} A Decimal object with the value set.
 *
 * @remarks
 * This function uses the string representation of the BigNumber
 * to construct a Decimal object.
 */
export function bigNumberToDecimal(bigNumberToConvert: BigNumber): Decimal {
  return create(DecimalSchema, { value: bigNumberToConvert.toString() });
}

/**
 * Converts a Decimal object to a BigNumber instance.
 *
 * @param {Decimal} decimal - The Decimal object to convert.
 * @returns {BigNumber} A BigNumber instance with the value set.
 *
 * @remarks
 * This function uses the value of the Decimal object
 * to construct a BigNumber instance.
 */
export function decimalToBigNumber(decimal?: Decimal): BigNumber {
  if (!decimal || decimal.value === "") {
    return new BigNumber("0");
  }
  return new BigNumber(decimal.value);
}
