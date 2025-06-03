import { Amount, AmountSchema } from "./amount_pb";
import { Token } from "./token_pb";
import { bigNumberToDecimal, decimalToBigNumber } from "../num";
import { getNetworkNoDecimalPlaces } from "./network";
import BigNumber from "bignumber.js";
import { Decimal, DecimalSchema } from "../num/decimal_pb";
import { Network } from "./network_pb";
import { tokenIsUndefined } from "./token";
import { create } from "@bufbuild/protobuf";
import type { Message } from "@bufbuild/protobuf";

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
function newAmountFromBigNumber(amount: BigNumber, token?: Token): Amount {
  return create(
    AmountSchema,
    {
      value: bigNumberToDecimal(
        amount.decimalPlaces(
          getNetworkNoDecimalPlaces(
            token?.network ?? Network.UNDEFINED_NETWORK,
          ),
          BigNumber.ROUND_HALF_DOWN,
        ),
      )
    },
  );
}

/**
 * Creates a new Amount of the given Token.
 *
 * @param {BigNumber | Decimal | string | undefined} amount - The amount in BigNumber, num.Decimal or string format.
 * @param {Token} token - The token type that the amount is denominated in.
 * @returns {Amount} Returns an Amount object that contains the value in Decimal format and the type of token.
 */
export function newAmountOfToken(
  amount: BigNumber | Message | string | undefined,
  token?: Token,
): Amount {
  let value: BigNumber = new BigNumber("0");
  if (!amount) {
    value = new BigNumber("0");
  } else if (amount instanceof BigNumber) {
    value = amount;
  } else {
    if (DecimalSchema.typeName === (amount as Message).$typeName) {
      value = decimalToBigNumber(amount as Decimal);
    } else if (isNaN(Number(amount))) {
      value = new BigNumber("0");
    } else {
      value = new BigNumber(amount as string);
    }
  }

  return newAmountFromBigNumber(value, token);
}

export function amountIsUndefined(amount?: Amount): boolean {
  if (!amount) {
    return true;
  }
  return tokenIsUndefined(amount.token);
}
