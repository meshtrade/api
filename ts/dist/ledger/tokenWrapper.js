/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenWrapper = void 0;
const token_pb_1 = require("./token_pb");
const amount_1 = require("./amount");
const network_pb_1 = require("./network_pb");
const protobuf_1 = require("@bufbuild/protobuf");
/**
 * Class representing a wrapper around a Amount.
 *
 * The AmountWrapper class provides convenience methods to manipulate and retrieve the
 * Amount instance it wraps, along with its associated Token and value.
 */
class TokenWrapper {
    /**
     * Constructs an instance of the TokenWrapper class.
     *
     * This constructor initializes the TokenWrapper with a given Token.
     * The token argument is set to option (i.e. could be undefined) as objects
     * returned by protobuf types are typically optionally undefined.
     *
     * @param {Token} [token] - The token to be wrapped. Must be defined.
     */
    constructor(token) {
        var _a, _b, _c;
        this._token = (0, protobuf_1.create)(token_pb_1.TokenSchema, {
            code: (_a = token === null || token === void 0 ? void 0 : token.code) !== null && _a !== void 0 ? _a : "",
            issuer: (_b = token === null || token === void 0 ? void 0 : token.issuer) !== null && _b !== void 0 ? _b : "",
            network: (_c = token === null || token === void 0 ? void 0 : token.network) !== null && _c !== void 0 ? _c : network_pb_1.Network.UNDEFINED_NETWORK,
        });
    }
    get code() {
        return this._token.code;
    }
    getCode() {
        return this.code;
    }
    get issuer() {
        return this._token.issuer;
    }
    getIssuer() {
        return this.issuer;
    }
    get network() {
        return this._token.network;
    }
    getNetwork() {
        return this.network;
    }
    /**
     * Retrieves the wrapped Token.
     *
     * This getter provides access to the Token instance that is wrapped by this class.
     *
     * @returns {Token} The wrapped Token.
     */
    get token() {
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
    newAmountOf(value) {
        return (0, amount_1.newAmountOfToken)(value, this._token);
    }
    isEqualTo(t2) {
        return (this.code === t2.code &&
            this.issuer === t2.issuer &&
            this.network === t2.network);
    }
}
exports.TokenWrapper = TokenWrapper;
