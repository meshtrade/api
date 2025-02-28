import { Criterion } from "./criterion_pb";
import { Uint32NINListCriterion } from "./uint32NINListCriterion_pb";

/**
 * Convenience function to construct a wrapped new Uint32NINListCriterion.
 *
 * @param {string} field - field of list uint32 criterion
 * @param {number[]} list - value of NOT in list uint32 criterion
 * @returns {Criterion} Uint32NINListCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$nin":[1, 2]}}
 * const uint32NINListCriterion = newUint32NINListCriterion("id", [1, 2]);
 */
export function newUint32NINListCriterion(
  field: string,
  list: number[],
): Criterion {
  return new Criterion().setUint32ninlistcriterion(
    new Uint32NINListCriterion().setField(field).setListList(list),
  );
}
