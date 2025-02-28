import { Criterion } from "./criterion_pb";
import { Uint32NEExactCriterion } from "./uint32NEExactCriterion_pb";

/**
 * Convenience function to construct a wrapped new Uint32NEExactCriterion.
 *
 * @param {string} field - field of exact uint32 criterion
 * @param {number} value - value of exactly not uint32 criterion
 * @returns {Criterion} Uint32NEExactCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$ne":33}}
 * const uint32NEExactCriterion = newUint32NEExactCriterion("id", 33);
 */
export function newUint32NEExactCriterion(
  field: string,
  value: number,
): Criterion {
  return new Criterion().setUint32neexactcriterion(
    new Uint32NEExactCriterion().setField(field).setUint32(value),
  );
}
