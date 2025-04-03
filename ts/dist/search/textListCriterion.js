/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTextListCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
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
    return new criterion_pb_1.Criterion().setTextlistcriterion(new textListCriterion_pb_1.TextListCriterion().setField(field).setListList(list));
}
exports.newTextListCriterion = newTextListCriterion;
