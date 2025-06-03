/* eslint-disable */
// @ts-nocheck
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimalToBigNumber = exports.bigNumberToDecimal = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const decimal_pb_1 = require("./decimal_pb");
const protobuf_1 = require("@bufbuild/protobuf");
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
function bigNumberToDecimal(bigNumberToConvert) {
    const dec = (0, protobuf_1.create)(decimal_pb_1.DecimalSchema, {
        value: bigNumberToConvert.toString(),
    });
    return dec;
}
exports.bigNumberToDecimal = bigNumberToDecimal;
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
function decimalToBigNumber(decimal) {
    if (!decimal || decimal.value == "") {
        return new bignumber_js_1.default("0");
    }
    const value = decimal.value;
    return new bignumber_js_1.default(`${value}`);
}
exports.decimalToBigNumber = decimalToBigNumber;
