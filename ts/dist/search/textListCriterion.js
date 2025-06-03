/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTextListCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const protobuf_1 = require("@bufbuild/protobuf");
const textListCriterion_pb_1 = require("./textListCriterion_pb");
/**
 * Convenience function to construct a wrapped new TextListCriterion.
 *
 * @param {string} field - field of list text criterion
 * @param {string[]} list - value of list text criterion
 * @returns {Criterion} TextListCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$in":["someID1", "someID2"]}}
 * const textListCriterion = newTextListCriterion("id", ["someID1", "someID2"]);
 */
function newTextListCriterion(field, list) {
    return (0, protobuf_1.create)(criterion_pb_1.CriterionSchema, {
        criterion: {
            case: "textListCriterion",
            value: (0, protobuf_1.create)(textListCriterion_pb_1.TextListCriterionSchema, { field, list }),
        },
    });
}
exports.newTextListCriterion = newTextListCriterion;
