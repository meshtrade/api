"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTextExactCriterion = newTextExactCriterion;
const criterion_pb_1 = require("./criterion_pb");
const textExactCriterion_pb_1 = require("./textExactCriterion_pb");
/**
 * Convenience function to construct a wrapped new TextExactCriterion.
 *
 * @param {string} field - field of exact text criterion
 * @param {string} value - value of exact text criterion
 * @returns {Criterion} TextExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": "someID"}
 * const textExactCriterion = newTextExactCriterion("id", "someID");
 */
function newTextExactCriterion(field, value) {
    return new criterion_pb_1.Criterion().setTextexactcriterion(new textExactCriterion_pb_1.TextExactCriterion().setField(field).setText(value));
}
