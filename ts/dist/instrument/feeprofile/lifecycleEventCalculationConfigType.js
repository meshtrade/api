/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allLifecycleEventCalculationConfigTypes = void 0;
exports.lifecycleEventCalculationConfigTypeToString = lifecycleEventCalculationConfigTypeToString;
exports.stringToLifecycleEventCalculationConfigType = stringToLifecycleEventCalculationConfigType;
const lifecycleEventCalculationConfigType_pb_1 = require("./lifecycleEventCalculationConfigType_pb");
// Get all calculation configuration types as enum values
exports.allLifecycleEventCalculationConfigTypes = Object.values(lifecycleEventCalculationConfigType_pb_1.LifecycleEventCalculationConfigType).filter((value) => typeof value === "number");
// Define explicit mappings between LifecycleEventCalculationConfigType enums and custom string representations
const lifecycleEventCalculationConfigTypeToStringMapping = {
    [lifecycleEventCalculationConfigType_pb_1.LifecycleEventCalculationConfigType.UNDEFINED_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE]: "-",
    [lifecycleEventCalculationConfigType_pb_1.LifecycleEventCalculationConfigType.AMOUNT_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE]: "Amount",
    [lifecycleEventCalculationConfigType_pb_1.LifecycleEventCalculationConfigType.RATE_LIFECYCLE_EVENTS_CALCULATION_CONFIG_TYPE]: "Rate",
};
// Reverse mapping from string to LifecycleEventCalculationConfigType enum
const stringToLifecycleEventCalculationConfigTypeMapping = {};
for (const [key, value] of Object.entries(lifecycleEventCalculationConfigTypeToStringMapping)) {
    stringToLifecycleEventCalculationConfigTypeMapping[value] = Number(key);
}
class UnsupportedLifecycleEventCalculationConfigTypeError extends Error {
    constructor(lifecycleEventCalculationConfigType) {
        const message = `Unsupported LifecycleEventCalculationConfigType: ${lifecycleEventCalculationConfigType}`;
        super(message);
        this.lifecycleEventCalculationConfigType =
            lifecycleEventCalculationConfigType;
    }
}
/**
 * Converts a LifecycleEventCalculationConfigType enum instance to a custom string representation.
 * @param {LifecycleEventCalculationConfigType} lifecycleEventCalculationConfigType - The calculation configuration type to convert.
 * @returns {string} The custom string representation of the calculation configuration type.
 */
function lifecycleEventCalculationConfigTypeToString(lifecycleEventCalculationConfigType) {
    if (lifecycleEventCalculationConfigType in
        lifecycleEventCalculationConfigTypeToStringMapping) {
        return lifecycleEventCalculationConfigTypeToStringMapping[lifecycleEventCalculationConfigType];
    }
    else {
        throw new UnsupportedLifecycleEventCalculationConfigTypeError(lifecycleEventCalculationConfigType);
    }
}
class UnsupportedLifecycleEventCalculationConfigTypeStringError extends Error {
    constructor(lifecycleEventCalculationConfigTypeStr) {
        const message = `Unsupported calculation configuration type string: ${lifecycleEventCalculationConfigTypeStr}`;
        super(message);
        this.lifecycleEventCalculationConfigTypeStr =
            lifecycleEventCalculationConfigTypeStr;
    }
}
/**
 * Converts a custom string representation to a LifecycleEventCalculationConfigType enum instance.
 * @param {string} lifecycleEventCalculationConfigTypeStr - The custom string representation of the calculation configuration type.
 * @returns {LifecycleEventCalculationConfigType} The corresponding LifecycleEventCalculationConfigType enum instance.
 */
function stringToLifecycleEventCalculationConfigType(lifecycleEventCalculationConfigTypeStr) {
    if (lifecycleEventCalculationConfigTypeStr in
        stringToLifecycleEventCalculationConfigTypeMapping) {
        return stringToLifecycleEventCalculationConfigTypeMapping[lifecycleEventCalculationConfigTypeStr];
    }
    else {
        throw new UnsupportedLifecycleEventCalculationConfigTypeStringError(lifecycleEventCalculationConfigTypeStr);
    }
}
