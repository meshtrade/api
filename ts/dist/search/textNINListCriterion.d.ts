import { Criterion } from "./criterion_pb";
/**
 * Convenience function to construct a wrapped new TextNINListCriterion.
 *
 * @param {string} field - field of list text criterion
 * @param {string[]} list - value of list text criterion
 * @returns {Criterion} TextNINListCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$in":["someID1", "someID2"]}}
 * const textNINListCriterion = newTextNINListCriterion("id", ["someID1", "someID2"]);
 */
export declare function newTextNINListCriterion(
  field: string,
  list: string[],
): Criterion;
