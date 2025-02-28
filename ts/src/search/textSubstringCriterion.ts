import { Criterion } from "./criterion_pb";
import { TextSubstringCriterion } from "./textSubstringCriterion_pb";

/**
 * Convenience function to construct a wrapped new TextSubstringCriterion.
 *
 * @param {string} field - field of Substring text criterion
 * @param {string} value - value of Substring text criterion
 * @returns {Criterion} TextSubstringCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"someField": {"$regex": ".*someText.*", "$options": "i"}}
 * const textSubstringCriterion = newTextSubstringCriterion("someField", "someText");
 */
export function newTextSubstringCriterion(
  field: string,
  value: string,
): Criterion {
  return new Criterion().setTextsubstringcriterion(
    new TextSubstringCriterion().setField(field).setValue(value),
  );
}
