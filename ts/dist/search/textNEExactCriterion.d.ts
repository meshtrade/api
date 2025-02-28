import { Criterion } from "./criterion_pb";
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
export declare function newTextNEExactCriterion(
  field: string,
  value: string,
): Criterion;
