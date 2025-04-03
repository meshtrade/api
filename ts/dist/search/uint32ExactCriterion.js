/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUint32ExactCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const uint32ExactCriterion_pb_1 = require("./uint32ExactCriterion_pb");
/**
 * Convenience function to construct a wrapped new Uint32ExactCriterion.
 *
 * @param {string} field - field of exact uint32 criterion
 * @param {number} value - value of exact uint32 criterion
 * @returns {Criterion} Uint32ExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": 33}
 * const uint32ExactCriterion = newUint32ExactCriterion("id", 33);
 */
function newUint32ExactCriterion(field, value) {
    return new criterion_pb_1.Criterion().setUint32exactcriterion(new uint32ExactCriterion_pb_1.Uint32ExactCriterion().setField(field).setUint32(value));
}
exports.newUint32ExactCriterion = newUint32ExactCriterion;
