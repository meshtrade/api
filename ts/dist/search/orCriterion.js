"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newORCriterion = newORCriterion;
const criterion_pb_1 = require("./criterion_pb");
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
    return new criterion_pb_1.Criterion().setOrcriterion(new criterion_pb_1.ORCriterion().setCriteriaList(criteria));
}
