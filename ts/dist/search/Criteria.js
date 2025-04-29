/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Criteria = void 0;
/**
 Utility Type to keep track of multiple criteria with key/value pairs
 */
class Criteria {
    constructor(criteriaMap) {
        this.criteriaMap = {};
        if (!criteriaMap)
            return;
        this.criteriaMap = criteriaMap;
    }
    updateCriterion(key, criterion, value) {
        this.criteriaMap[key] = {
            criterion,
            value,
        };
    }
    getCriterionValue(key) {
        var _a;
        return (_a = this.criteriaMap[key]) === null || _a === void 0 ? void 0 : _a.value;
    }
    toCriterionList() {
        return Object.keys(this.criteriaMap)
            .map((key) => { var _a; return (_a = this.criteriaMap[key]) === null || _a === void 0 ? void 0 : _a.criterion; }).filter((v) => v !== undefined);
    }
}
exports.Criteria = Criteria;
