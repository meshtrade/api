/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAmountOfToken = newAmountOfToken;
exports.amountIsUndefined = amountIsUndefined;
const amount_pb_1 = require("./amount_pb");
const num_1 = require("../num");
const network_1 = require("./network");
const bignumber_js_1 = require("bignumber.js");
const decimal_pb_1 = require("../num/decimal_pb");
const network_pb_1 = require("./network_pb");
const token_1 = require("./token");
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
function newAmountFromBigNumber(amount, token) {
    var _a;
    return new amount_pb_1.Amount()
        .setValue((0, num_1.bigNumberToDecimal)(amount.decimalPlaces((0, network_1.getNetworkNoDecimalPlaces)((_a = token === null || token === void 0 ? void 0 : token.getNetwork()) !== null && _a !== void 0 ? _a : network_pb_1.Network.UNDEFINED_NETWORK), bignumber_js_1.BigNumber.ROUND_HALF_DOWN)))
        .setToken(token);
}
/**
 * Creates a new Amount of the given Token.
 *
 * @param {BigNumber | Decimal | string | undefined} amount - The amount in BigNumber, num.Decimal or string format.
 * @param {Token} token - The token type that the amount is denominated in.
 * @returns {Amount} Returns an Amount object that contains the value in Decimal format and the type of token.
 */
function newAmountOfToken(amount, token) {
    let value = new bignumber_js_1.BigNumber("0");
    if (!amount) {
        value = new bignumber_js_1.BigNumber("0");
    }
    else if (amount instanceof bignumber_js_1.BigNumber) {
        value = amount;
    }
    else if (amount instanceof decimal_pb_1.Decimal) {
        value = (0, num_1.decimalToBigNumber)(amount);
    }
    else {
        if (isNaN(Number(amount))) {
            value = new bignumber_js_1.BigNumber("0");
        }
        else {
            value = new bignumber_js_1.BigNumber(amount);
        }
    }
    return newAmountFromBigNumber(value, token);
}
function amountIsUndefined(amount) {
    if (!amount) {
        return true;
    }
    return (0, token_1.tokenIsUndefined)(amount.getToken());
}
