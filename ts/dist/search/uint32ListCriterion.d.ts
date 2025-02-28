import { Criterion } from "./criterion_pb";
/**
 * Convenience function to construct a wrapped new Uint32ListCriterion.
 *
 * @param {string} field - field of list uint32 criterion
 * @param {number[]} list - value of list uint32 criterion
 * @returns {Criterion} Uint32ListCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$in":[1, 2]}}
 * const uint32ListCriterion = newUint32ListCriterion("id", [1, 2]);
 */
export declare function newUint32ListCriterion(field: string, list: number[]): Criterion;
