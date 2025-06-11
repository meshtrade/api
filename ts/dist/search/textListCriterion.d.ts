/* eslint-disable */
// @ts-nocheck
import { Criterion } from "./criterion_pb";
/**
 * Convenience function to construct a wrapped new TextListCriterion.
 *
 * @param {string} field - field of list text criterion
 * @param {string[]} list - value of list text criterion
 * @returns {Criterion} TextListCriterion wrapped in Criterion
 *
 * @example
 * // results in the mongo db query {"id": {"$in":["someID1", "someID2"]}}
 * const textListCriterion = newTextListCriterion("id", ["someID1", "someID2"]);
 */
export declare function newTextListCriterion(field: string, list: string[]): Criterion;
