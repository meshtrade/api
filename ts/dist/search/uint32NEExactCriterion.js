"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUint32NEExactCriterion = newUint32NEExactCriterion;
const criterion_pb_1 = require("./criterion_pb");
const uint32NEExactCriterion_pb_1 = require("./uint32NEExactCriterion_pb");
/**
 * Convenience function to construct a wrapped new Uint32NEExactCriterion.
 *
 * @param {string} field - field of exact uint32 criterion
 * @param {number} value - value of exactly not uint32 criterion
 * @returns {Criterion} Uint32NEExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$ne":33}}
 * const uint32NEExactCriterion = newUint32NEExactCriterion("id", 33);
 */
function newUint32NEExactCriterion(field, value) {
    return new criterion_pb_1.Criterion().setUint32neexactcriterion(new uint32NEExactCriterion_pb_1.Uint32NEExactCriterion().setField(field).setUint32(value));
}
