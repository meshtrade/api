/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUint32NEExactCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const protobuf_1 = require("@bufbuild/protobuf");
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
    return (0, protobuf_1.create)(criterion_pb_1.CriterionSchema, {
        criterion: {
            case: "uint32NEExactCriterion",
            value: (0, protobuf_1.create)(uint32NEExactCriterion_pb_1.Uint32NEExactCriterionSchema, { field, uint32: value }),
        },
    });
}
exports.newUint32NEExactCriterion = newUint32NEExactCriterion;
