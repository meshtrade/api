/* eslint-disable */
// @ts-nocheck
import { Criterion } from "./criterion_pb";
export declare class Criteria {
    criteriaMap: Record<string, Criterion>;
    constructor(criteriaMap?: Record<string, Criterion>);
    updateCriterion(key: string, criterion: Criterion): void;
    toCriterionList(): Criterion[];
}
