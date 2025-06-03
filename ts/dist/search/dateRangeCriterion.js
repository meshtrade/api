/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newDateRangeCriterion = void 0;
const criterion_pb_1 = require("./criterion_pb");
const dateRangeCriterion_pb_1 = require("./dateRangeCriterion_pb");
const protobuf_1 = require("@bufbuild/protobuf");
function newDateRangeCriterion(field, start, end) {
    return (0, protobuf_1.create)(criterion_pb_1.CriterionSchema, {
        criterion: {
            case: "dateRangeCriterion",
            value: (0, protobuf_1.create)(dateRangeCriterion_pb_1.DateRangeCriterionSchema, { field, start, end }),
        },
    });
}
exports.newDateRangeCriterion = newDateRangeCriterion;
