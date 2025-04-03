/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTextNINListCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
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
    return new criterion_pb_1.Criterion().setTextninlistcriterion(new textNINListCriterion_pb_1.TextNINListCriterion().setField(field).setListList(list));
}
exports.newTextNINListCriterion = newTextNINListCriterion;
