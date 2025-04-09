/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUint32NINListCriterion = newUint32NINListCriterion;
const criterion_pb_1 = require("./criterion_pb");
const uint32NINListCriterion_pb_1 = require("./uint32NINListCriterion_pb");
/**
 * Convenience function to construct a wrapped new Uint32NINListCriterion.
 *
 * @param {string} field - field of list uint32 criterion
 * @param {number[]} list - value of NOT in list uint32 criterion
 * @returns {Criterion} Uint32NINListCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$nin":[1, 2]}}
 * const uint32NINListCriterion = newUint32NINListCriterion("id", [1, 2]);
 */
function newUint32NINListCriterion(field, list) {
    return new criterion_pb_1.Criterion().setUint32ninlistcriterion(new uint32NINListCriterion_pb_1.Uint32NINListCriterion().setField(field).setListList(list));
}
