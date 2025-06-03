/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newORCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const protobuf_1 = require("@bufbuild/protobuf");
/**
 * Convenience function to construct a wrapped new ORCriterion.
 *
 * @param {Criterion[]} criteria - list of criteria.
 * @returns {Criterion} ORCriterion wrapped in Criterion
 */
function newORCriterion(criteria) {
    if (!criteria.length) {
        throw new Error("at least 1 criterion required to construct OR, got none");
    }
    return (0, protobuf_1.create)(criterion_pb_1.CriterionSchema, {
        criterion: {
            case: "orCriterion",
            value: (0, protobuf_1.create)(criterion_pb_1.ORCriterionSchema, { criteria }),
        },
    });
}
exports.newORCriterion = newORCriterion;
