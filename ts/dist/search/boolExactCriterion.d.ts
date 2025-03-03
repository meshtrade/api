import { Criterion } from "./criterion_pb";
/**
 * Convenience function to construct a wrapped new BoolExactCriterion.
 *
 * @param {string} field - field of exact bool criterion
 * @param {boolean} value - value of exact bool criterion
 * @returns {Criterion} BoolExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": "someID"}
 * const boolExactCriterion = newBoolExactCriterion("id", "someID");
 */
export declare function newBoolExactCriterion(field: string, value: boolean): Criterion;
