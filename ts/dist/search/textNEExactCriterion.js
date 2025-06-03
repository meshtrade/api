/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTextNEExactCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const protobuf_1 = require("@bufbuild/protobuf");
const textNEExactCriterion_pb_1 = require("./textNEExactCriterion_pb");
/**
 * Convenience function to construct a wrapped new TextNEExactCriterion.
 *
 * @param {string} field - field of exact text criterion
 * @param {string} value - value of exactly NOT text criterion
 * @returns {Criterion} TextNEExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$ne":"someID"}}
 * const textNEExactCriterion = newTextNEExactCriterion("id", "someID");
 */
function newTextNEExactCriterion(field, value) {
    return (0, protobuf_1.create)(criterion_pb_1.CriterionSchema, {
        criterion: {
            case: "textNEExactCriterion",
            value: (0, protobuf_1.create)(textNEExactCriterion_pb_1.TextNEExactCriterionSchema, { field, text: value }),
        },
    });
}
exports.newTextNEExactCriterion = newTextNEExactCriterion;
