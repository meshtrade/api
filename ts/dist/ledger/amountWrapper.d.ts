/* eslint-disable */
// @ts-nocheck
import { Amount } from "./amount_pb";
import { Token } from "./token_pb";
import { Decimal } from "../num/decimal_pb";
/**
 * Wrapper class around a Amount.
 *
 * The AmountWrapper class provides convenience methods to manipulate and retrieve the
 * Amount instance it wraps, along with its associated Token and value.
 */
export declare class AmountWrapper {
    private _amount;
    /**
     * Constructs an instance of the AmountWrapper class.
     *
     * This constructor initializes the AmountWrapper with a given Amount.
     * If the amount is not provided or is undefined, a TypeError will be thrown.
     * The amount argument is set to option (i.e. could be undefined) as objects
     * returned by protobuf types are typically optionally undefined.
     *
     * @param {Amount} [amount] - The Amount to be wrapped. Must be defined.
     *
     * @throws {TypeError} If the amount is undefined.
     */
    constructor(amount?: Amount);
    /**
     * Retrieves the wrapped Amount.
     *
     * This getter provides access to the Amount instance that is wrapped by this class.
     *
     * @returns {Amount} The wrapped Amount.
     */
    get amount(): Amount;
    /**
     * Retrieves the token associated with the wrapped Amount.
     *
     * This getter returns the Token instance associated with the wrapped Amount.
     * If the token is undefined, a TypeError will be thrown.
     *
     * @returns {Token} The token associated with the wrapped Amount.
     * @throws {TypeError} If the token is undefined in the wrapped amount.
     */
    get token(): Token;
    /**
     * Retrieves the value associated with the wrapped Amount.
     *
     * This getter returns the Decimal value associated with the wrapped Amount.
     * If the value is undefined, a TypeError will be thrown.
     *
     * @returns {Decimal} The value associated with the wrapped Amount.
     * @throws {TypeError} If the value is undefined in the wrapped amount.
     */
    get value(): Decimal;
    /**
     * Sets a new value for the wrapped Amount.
     *
     * This method creates a new AmountWrapper instance with the provided value,
     * which can be either a BigNumber or a Decimal. The new value is converted
     * into a Amount using the associated token.
     *
     * @param {BigNumber | Decimal} value - The value to set for the wrapped Amount.
     * @returns {AmountWrapper} A new AmountWrapper instance with the updated value.
     */
    setValue(value: BigNumber | Decimal): AmountWrapper;
    /**
     * Sets a new token for the wrapped Amount.
     *
     * This method creates a new AmountWrapper instance with the provided token.
     * The current value of the wrapped Amount is associated with the new token.
     *
     * @param {Token} token - The new token to set for the wrapped Amount.
     * @returns {AmountWrapper} A new AmountWrapper instance with the updated token.
     */
    setToken(token: Token): AmountWrapper;
}
