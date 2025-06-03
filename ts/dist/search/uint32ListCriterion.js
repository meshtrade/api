/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUint32ListCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const protobuf_1 = require("@bufbuild/protobuf");
const uint32ListCriterion_pb_1 = require("./uint32ListCriterion_pb");
/**
 * Convenience function to construct a wrapped new Uint32ListCriterion.
 *
 * @param {string} field - field of list uint32 criterion
 * @param {number[]} list - value of list uint32 criterion
 * @returns {Criterion} Uint32ListCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$in":[1, 2]}}
 * const uint32ListCriterion = newUint32ListCriterion("id", [1, 2]);
 */
function newUint32ListCriterion(field, list) {
    return (0, protobuf_1.create)(criterion_pb_1.CriterionSchema, {
        criterion: {
            case: "uint32ListCriterion",
            value: (0, protobuf_1.create)(uint32ListCriterion_pb_1.Uint32ListCriterionSchema, { field, list }),
        },
    });
}
exports.newUint32ListCriterion = newUint32ListCriterion;
