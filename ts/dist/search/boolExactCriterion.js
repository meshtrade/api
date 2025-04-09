/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newBoolExactCriterion = newBoolExactCriterion;
const criterion_pb_1 = require("./criterion_pb");
const boolExactCriterion_pb_1 = require("./boolExactCriterion_pb");
/**
 * Convenience function to construct a wrapped new BoolExactCriterion.
 *
 * @param {string} field - field of exact bool criterion
 * @param {boolean} value - value of exact bool criterion
 * @returns {Criterion} BoolExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": "someID"}
 * const boolExactCriterion = newBoolExactCriterion("id", "someID");
 */
function newBoolExactCriterion(field, value) {
    return new criterion_pb_1.Criterion().setBoolexactcriterion(new boolExactCriterion_pb_1.BoolExactCriterion().setField(field).setBool(value));
}
