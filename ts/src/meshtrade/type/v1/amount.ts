import { Amount } from './amount_pb';
import { Token } from './token_pb';
import { bigNumberToDecimal, decimalToBigNumber } from './decimalConversions';
import { getLedgerNoDecimalPlaces } from './ledger';
import BigNumber from 'bignumber.js';
import { Decimal } from './decimal_pb';
import { Ledger } from './ledger_pb';
import { tokenIsUndefined } from './token';

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
 * decimal places for the target ledger.
 */
function newAmountFromBigNumber(amount: BigNumber, token?: Token): Amount {
  return new Amount()
    .setValue(
      bigNumberToDecimal(
        amount.decimalPlaces(
          getLedgerNoDecimalPlaces(
            token?.getLedger() ?? Ledger.LEDGER_UNSPECIFIED
          ),
          BigNumber.ROUND_HALF_DOWN
        )
      )
    )
    .setToken(token);
}

/**
 * Creates a new Amount of the given Token.
 *
 * @param {BigNumber | Decimal | string | undefined} amount - The amount in BigNumber, num.Decimal or string format.
 * @param {Token} token - The token type that the amount is denominated in.
 * @returns {Amount} Returns an Amount object that contains the value in Decimal format and the type of token.
 */
export function newAmountOfToken(
  amount: BigNumber | Decimal | string | undefined,
  token?: Token
): Amount {
  let value: BigNumber = new BigNumber('0');
  if (!amount) {
    value = new BigNumber('0');
  } else if (amount instanceof BigNumber) {
    value = amount;
  } else if (amount instanceof Decimal) {
    value = decimalToBigNumber(amount);
  } else {
    if (isNaN(Number(amount))) {
      value = new BigNumber('0');
    } else {
      value = new BigNumber(amount);
    }
  }

  return newAmountFromBigNumber(value, token);
}

export function amountIsUndefined(amount?: Amount): boolean {
  if (!amount) {
    return true;
  }
  return tokenIsUndefined(amount.getToken());
}
