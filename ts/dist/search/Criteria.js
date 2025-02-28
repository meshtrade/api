"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Criteria = void 0;
// Utility Type to keep track of multiple criteria with key/value pairs
var Criteria = /** @class */ (function () {
    function Criteria(criteriaMap) {
        this.criteriaMap = {};
        if (!criteriaMap)
            return;
        this.criteriaMap = criteriaMap;
    }
    Criteria.prototype.updateCriterion = function (key, criterion) {
        this.criteriaMap[key] = criterion;
    };
    Criteria.prototype.toCriterionList = function () {
        var _this = this;
        return Object.keys(this.criteriaMap).map(function (key) { return _this.criteriaMap[key]; });
    };
    return Criteria;
}());
exports.Criteria = Criteria;
