"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUint32ListCriterion = newUint32ListCriterion;
var criterion_pb_1 = require("./criterion_pb");
var uint32ListCriterion_pb_1 = require("./uint32ListCriterion_pb");
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
    return new criterion_pb_1.Criterion().setUint32listcriterion(new uint32ListCriterion_pb_1.Uint32ListCriterion().setField(field).setListList(list));
}
