import { BigNumber } from "bignumber.js";
import { Token, TokenSchema } from "./token_pb";
import { Decimal } from "./decimal_pb";
import { Amount } from "./amount_pb";
import { newAmountOfToken } from "./amount";
import { Ledger } from "./ledger_pb";
import { create } from "@bufbuild/protobuf";

/**
 * Class representing a wrapper around a Amount.
 *
 * The AmountWrapper class provides convenience methods to manipulate and retrieve the
 * Amount instance it wraps, along with its associated Token and value.
 */
export class TokenWrapper {
  private _token: Token;

  /**
   * Constructs an instance of the TokenWrapper class.
   *
   * This constructor initializes the TokenWrapper with a given Token.
   * The token argument is set to option (i.e. could be undefined) as objects
   * returned by protobuf types are typically optionally undefined.
   *
   * @param {Token} [token] - The token to be wrapped. Must be defined.
   */
  constructor(token?: Token) {
    this._token = create(TokenSchema, {
      code: token?.code,
      issuer: token?.issuer,
      ledger: token?.ledger ?? Ledger.UNSPECIFIED,
    });
  }

  get code(): string {
    return this._token.code;
  }

  getCode() {
    return this.code;
  }

  get issuer(): string {
    return this._token.issuer;
  }

  getIssuer() {
    return this.issuer;
  }

  get ledger(): Ledger {
    return this._token.ledger;
  }

  getLedger() {
    return this.ledger;
  }

  /**
   * Retrieves the wrapped Token.
   *
   * This getter provides access to the Token instance that is wrapped by this class.
   *
   * @returns {Token} The wrapped Token.
   */
  get token(): Token {
    return this._token;
  }

  /**
   * Creates a new Amount instance based on the given value.
   *
   * This method accepts a value of type BigNumber or Decimal and returns a new Amount
   * instance created from this value, associated with the wrapped Token.
   *
   * @param {BigNumber | Decimal | string | undefined} value - The amount in BigNumber, num.Decimal or string format.
   *
   * @returns {Amount} A new Amount instance based on the provided value and the wrapped Token.
   */
  newAmountOf(value: BigNumber | Decimal | string | undefined): Amount {
    return newAmountOfToken(value, this._token);
  }

  isEqualTo(t2: Token | TokenWrapper): boolean {
    return (
      this.code === t2.code &&
      this.issuer === t2.issuer &&
      this.ledger === t2.ledger
    );
  }
}
