import { Criterion } from "./criterion_pb";
import { BoolExactCriterion } from "./boolExactCriterion_pb";

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
export function newBoolExactCriterion(
  field: string,
  value: boolean,
): Criterion {
  return new Criterion().setBoolexactcriterion(
    new BoolExactCriterion().setField(field).setBool(value),
  );
}
