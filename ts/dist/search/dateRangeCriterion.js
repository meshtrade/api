/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newDateRangeCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const dateRangeCriterion_pb_1 = require("./dateRangeCriterion_pb");
function newDateRangeCriterion(field, start, end) {
    return new criterion_pb_1.Criterion().setDaterangecriterion(new dateRangeCriterion_pb_1.DateRangeCriterion().setField(field).setStart(start).setEnd(end));
}
exports.newDateRangeCriterion = newDateRangeCriterion;
