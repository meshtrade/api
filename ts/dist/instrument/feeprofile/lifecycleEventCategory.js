/* eslint-disable */
// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allLifecycleEventCategories = void 0;
exports.lifecycleEventCategoryToString = lifecycleEventCategoryToString;
exports.stringToLifecycleEventCategory = stringToLifecycleEventCategory;
const lifecycleEventCategory_pb_1 = require("./lifecycleEventCategory_pb");
// Get all lifecycleEventCategories as enum values
exports.allLifecycleEventCategories = Object.values(lifecycleEventCategory_pb_1.LifecycleEventCategory).filter((value) => typeof value === "number");
// Define explicit mappings between LifecycleEventCategory enums and custom string representations
const lifecycleEventCategoryToStringMapping = {
    [lifecycleEventCategory_pb_1.LifecycleEventCategory.UNDEFINED_LIFECYCLE_EVENT_CATEGORY]: "-",
    [lifecycleEventCategory_pb_1.LifecycleEventCategory.LISTING_LIFECYCLE_EVENT_CATEGORY]: "Listing",
    [lifecycleEventCategory_pb_1.LifecycleEventCategory.PRIMARY_MARKET_SETTLEMENT_LIFECYCLE_EVENT_CATEGORY]: "Primary Market Settlement",
};
// Reverse mapping from string to LifecycleEventCategory enum
const stringToLifecycleEventCategoryMapping = {};
for (const [key, value] of Object.entries(lifecycleEventCategoryToStringMapping)) {
    stringToLifecycleEventCategoryMapping[value] = Number(key);
}
class UnsupportedLifecycleEventCategoryError extends Error {
    constructor(lifecycleEventCategory) {
        const message = `Unsupported LifecycleEventCategory: ${lifecycleEventCategory}`;
        super(message);
        this.lifecycleEventCategory = lifecycleEventCategory;
    }
}
/**
 * Converts a LifecycleEventCategory enum instance to a custom string representation.
 * @param {LifecycleEventCategory} lifecycleEventCategory - The lifecycleEventCategory to convert.
 * @returns {string} The custom string representation of the lifecycleEventCategory.
 */
function lifecycleEventCategoryToString(lifecycleEventCategory) {
    if (lifecycleEventCategory in lifecycleEventCategoryToStringMapping) {
        return lifecycleEventCategoryToStringMapping[lifecycleEventCategory];
    }
    else {
        throw new UnsupportedLifecycleEventCategoryError(lifecycleEventCategory);
    }
}
class UnsupportedLifecycleEventCategoryStringError extends Error {
    constructor(lifecycleEventCategoryStr) {
        const message = `Unsupported lifecycleEventCategory string: ${lifecycleEventCategoryStr}`;
        super(message);
        this.lifecycleEventCategoryStr = lifecycleEventCategoryStr;
    }
}
/**
 * Converts a custom string representation to a LifecycleEventCategory enum instance.
 * @param {string} lifecycleEventCategoryStr - The custom string representation of the lifecycleEventCategory.
 * @returns {LifecycleEventCategory} The corresponding LifecycleEventCategory enum instance.
 */
function stringToLifecycleEventCategory(lifecycleEventCategoryStr) {
    if (lifecycleEventCategoryStr in stringToLifecycleEventCategoryMapping) {
        return stringToLifecycleEventCategoryMapping[lifecycleEventCategoryStr];
    }
    else {
        throw new UnsupportedLifecycleEventCategoryStringError(lifecycleEventCategoryStr);
    }
}
