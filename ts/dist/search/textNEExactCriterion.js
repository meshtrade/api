"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTextNEExactCriterion = newTextNEExactCriterion;
const criterion_pb_1 = require("./criterion_pb");
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
    return new criterion_pb_1.Criterion().setTextneexactcriterion(new textNEExactCriterion_pb_1.TextNEExactCriterion().setField(field).setText(value));
}
