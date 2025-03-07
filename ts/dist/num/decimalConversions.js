"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigNumberToDecimal = bigNumberToDecimal;
exports.decimalToBigNumber = decimalToBigNumber;
const bignumber_js_1 = require("bignumber.js");
const decimal_pb_1 = require("./decimal_pb");
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
    const dec = new decimal_pb_1.Decimal().setValue(bigNumberToConvert.toString());
    return dec;
}
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
    if (!decimal || decimal.getValue() == "") {
        return new bignumber_js_1.BigNumber("0");
    }
    const value = decimal.getValue();
    return new bignumber_js_1.BigNumber(`${value}`);
}
