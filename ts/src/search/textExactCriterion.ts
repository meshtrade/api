import { Criterion } from "./criterion_pb";
import { TextExactCriterion } from "./textExactCriterion_pb";

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
export function newTextExactCriterion(field: string, value: string): Criterion {
  return new Criterion().setTextexactcriterion(
    new TextExactCriterion().setField(field).setText(value),
  );
}
