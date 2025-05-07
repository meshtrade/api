import { Criterion } from "./criterion_pb";

export type CriteriaMap = Record<string, CriteriaMapField | undefined>;

export type ValueType = string | number | number[] | string[];

export type CriteriaMapField = {
  criterion?: Criterion,
  value?: ValueType
};

/** 
 * Utility Type to keep track of multiple criteria with key/value pairs
 */
export class Criteria {
  criteriaMap: CriteriaMap = {};

  constructor(criteriaMap?: CriteriaMap) {
    if (!criteriaMap) return;
    this.criteriaMap = criteriaMap;
  }

  updateCriterion(key: string, criterion?: Criterion, value?: ValueType) {
    this.criteriaMap[key] = {
      criterion,
      value,
    };
  }

  getCriterionValue(key: string): ValueType | undefined {
    return this.criteriaMap[key]?.value
  }

  toCriterionList(): Criterion[] {
    return Object.keys(this.criteriaMap)
      .map((key) => this.criteriaMap[key]?.criterion).filter((v) => v !== undefined);
  }
}
