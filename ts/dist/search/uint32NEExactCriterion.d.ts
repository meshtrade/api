/* eslint-disable */
// @ts-nocheck
import { Criterion } from "./criterion_pb";
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
export declare function newUint32NEExactCriterion(field: string, value: number): Criterion;
