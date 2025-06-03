/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTextSubstringCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const protobuf_1 = require("@bufbuild/protobuf");
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
    return (0, protobuf_1.create)(criterion_pb_1.CriterionSchema, {
        criterion: {
            case: "textSubstringCriterion",
            value: (0, protobuf_1.create)(textSubstringCriterion_pb_1.TextSubstringCriterionSchema, { field, value }),
        },
    });
}
exports.newTextSubstringCriterion = newTextSubstringCriterion;
