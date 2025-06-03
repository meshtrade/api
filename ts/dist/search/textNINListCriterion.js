/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTextNINListCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const protobuf_1 = require("@bufbuild/protobuf");
const textNINListCriterion_pb_1 = require("./textNINListCriterion_pb");
/**
 * Convenience function to construct a wrapped new TextNINListCriterion.
 *
 * @param {string} field - field of list text criterion
 * @param {string[]} list - value of list text criterion
 * @returns {Criterion} TextNINListCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$in":["someID1", "someID2"]}}
 * const textNINListCriterion = newTextNINListCriterion("id", ["someID1", "someID2"]);
 */
function newTextNINListCriterion(field, list) {
    return (0, protobuf_1.create)(criterion_pb_1.CriterionSchema, {
        criterion: {
            case: "textNINListCriterion",
            value: (0, protobuf_1.create)(textNINListCriterion_pb_1.TextNINListCriterionSchema, { field, list }),
        },
    });
}
exports.newTextNINListCriterion = newTextNINListCriterion;
