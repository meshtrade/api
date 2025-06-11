import { LifecycleEventCategory } from "./lifecycleEventCategory_pb";
export declare const allLifecycleEventCategories: LifecycleEventCategory[];
/**
 * Converts a LifecycleEventCategory enum instance to a custom string representation.
 * @param {LifecycleEventCategory} lifecycleEventCategory - The lifecycleEventCategory to convert.
 * @returns {string} The custom string representation of the lifecycleEventCategory.
 */
export declare function lifecycleEventCategoryToString(lifecycleEventCategory: LifecycleEventCategory): string;
/**
 * Converts a custom string representation to a LifecycleEventCategory enum instance.
 * @param {string} lifecycleEventCategoryStr - The custom string representation of the lifecycleEventCategory.
 * @returns {LifecycleEventCategory} The corresponding LifecycleEventCategory enum instance.
 */
export declare function stringToLifecycleEventCategory(lifecycleEventCategoryStr: string): LifecycleEventCategory;
