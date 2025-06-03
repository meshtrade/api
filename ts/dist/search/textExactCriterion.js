/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTextExactCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const protobuf_1 = require("@bufbuild/protobuf");
const textExactCriterion_pb_1 = require("./textExactCriterion_pb");
/**
 * Convenience function to construct a wrapped new TextExactCriterion.
 *
 * @param {string} field - field of exact text criterion
 * @param {textean} value - value of exact text criterion
 * @returns {Criterion} TextExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": "someID"}
 * const textExactCriterion = newTextExactCriterion("id", "someID");
 */
function newTextExactCriterion(field, value) {
    return (0, protobuf_1.create)(criterion_pb_1.CriterionSchema, {
        criterion: {
            case: "textExactCriterion",
            value: (0, protobuf_1.create)(textExactCriterion_pb_1.TextExactCriterionSchema, { field, text: value }),
        },
    });
}
exports.newTextExactCriterion = newTextExactCriterion;
