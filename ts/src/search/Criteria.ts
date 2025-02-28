import { Criterion } from "./criterion_pb";

// Utility Type to keep track of multiple criteria with key/value pairs
export class Criteria {
  criteriaMap: Record<string, Criterion> = {};

  constructor(criteriaMap?: Record<string, Criterion>) {
    if (!criteriaMap) return;
    this.criteriaMap = criteriaMap;
  }

  updateCriterion(key: string, criterion: Criterion) {
    this.criteriaMap[key] = criterion;
  }

  toCriterionList() {
    return Object.keys(this.criteriaMap).map((key) => this.criteriaMap[key]);
  }
}
