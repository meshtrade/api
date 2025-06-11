"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTextSubstringCriterion = newTextSubstringCriterion;
const criterion_pb_1 = require("./criterion_pb");
const textSubstringCriterion_pb_1 = require("./textSubstringCriterion_pb");
/**
 * Convenience function to construct a wrapped new TextSubstringCriterion.
 *
 * @param {string} field - field of Substring text criterion
 * @param {string} value - value of Substring text criterion
 * @returns {Criterion} TextSubstringCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"someField": {"$regex": ".*someText.*", "$options": "i"}}
 * const textSubstringCriterion = newTextSubstringCriterion("someField", "someText");
 */
function newTextSubstringCriterion(field, value) {
    return new criterion_pb_1.Criterion().setTextsubstringcriterion(new textSubstringCriterion_pb_1.TextSubstringCriterion().setField(field).setValue(value));
}
