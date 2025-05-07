/* eslint-disable */
// @ts-nocheck
import { Criterion } from "./criterion_pb";
export type CriteriaMap = Record<string, CriteriaMapField | undefined>;
export type ValueType = string | number | number[] | string[];
export type CriteriaMapField = {
    criterion?: Criterion;
    value?: ValueType;
};
/**
 * Utility Type to keep track of multiple criteria with key/value pairs
 */
export declare class Criteria {
    criteriaMap: CriteriaMap;
    constructor(criteriaMap?: CriteriaMap);
    updateCriterion(key: string, criterion?: Criterion, value?: ValueType): void;
    getCriterionValue(key: string): ValueType | undefined;
    toCriterionList(): Criterion[];
}
