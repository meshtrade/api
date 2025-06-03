/* eslint-disable */
// @ts-nocheck
import { Criterion } from "./criterion_pb";
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
export declare function newTextExactCriterion(field: string, value: string): Criterion;
