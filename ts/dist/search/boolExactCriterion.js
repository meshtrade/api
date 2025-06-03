/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newBoolExactCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const protobuf_1 = require("@bufbuild/protobuf");
const boolExactCriterion_pb_1 = require("./boolExactCriterion_pb");
/**
 * Convenience function to construct a wrapped new BoolExactCriterion.
 *
 * @param {string} field - field of exact bool criterion
 * @param {boolean} value - value of exact bool criterion
 * @returns {Criterion} BoolExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"set": false}
 * const boolExactCriterion = newBoolExactCriterion("set", false);
 */
function newBoolExactCriterion(field, value) {
    return (0, protobuf_1.create)(criterion_pb_1.CriterionSchema, {
        criterion: {
            case: "boolExactCriterion",
            value: (0, protobuf_1.create)(boolExactCriterion_pb_1.BoolExactCriterionSchema, { field, bool: value }),
        },
    });
}
exports.newBoolExactCriterion = newBoolExactCriterion;
