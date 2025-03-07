/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Criteria = void 0;
// Utility Type to keep track of multiple criteria with key/value pairs
class Criteria {
    constructor(criteriaMap) {
        this.criteriaMap = {};
        if (!criteriaMap)
            return;
        this.criteriaMap = criteriaMap;
    }
    updateCriterion(key, criterion) {
        this.criteriaMap[key] = criterion;
    }
    toCriterionList() {
        return Object.keys(this.criteriaMap).map((key) => this.criteriaMap[key]);
    }
}
exports.Criteria = Criteria;
