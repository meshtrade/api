import { LifecycleEventCategory } from "./lifecycleEventCategory_pb";

// Get all lifecycleEventCategories as enum values
export const allLifecycleEventCategories: LifecycleEventCategory[] =
  Object.values(LifecycleEventCategory).filter(
    (value) => typeof value === "number",
  ) as LifecycleEventCategory[];

// Define explicit mappings between LifecycleEventCategory enums and custom string representations
const lifecycleEventCategoryToStringMapping: {
  [key in LifecycleEventCategory]: string;
} = {
  [LifecycleEventCategory.UNDEFINED_LIFECYCLE_EVENT_CATEGORY]: "-",
  [LifecycleEventCategory.LISTING_LIFECYCLE_EVENT_CATEGORY]: "Listing",
  [LifecycleEventCategory.PRIMARY_MARKET_SETTLEMENT_LIFECYCLE_EVENT_CATEGORY]:
    "Primary Market Settlement",
};
// Reverse mapping from string to LifecycleEventCategory enum
const stringToLifecycleEventCategoryMapping: Record<
  string,
  LifecycleEventCategory
> = {};
for (const [key, value] of Object.entries(
  lifecycleEventCategoryToStringMapping,
)) {
  stringToLifecycleEventCategoryMapping[value] = Number(key);
}

class UnsupportedLifecycleEventCategoryError extends Error {
  lifecycleEventCategory: LifecycleEventCategory;

  constructor(lifecycleEventCategory: LifecycleEventCategory) {
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
export function lifecycleEventCategoryToString(
  lifecycleEventCategory: LifecycleEventCategory,
): string {
  if (lifecycleEventCategory in lifecycleEventCategoryToStringMapping) {
    return lifecycleEventCategoryToStringMapping[lifecycleEventCategory];
  } else {
    throw new UnsupportedLifecycleEventCategoryError(lifecycleEventCategory);
  }
}

class UnsupportedLifecycleEventCategoryStringError extends Error {
  lifecycleEventCategoryStr: string;

  constructor(lifecycleEventCategoryStr: string) {
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
export function stringToLifecycleEventCategory(
  lifecycleEventCategoryStr: string,
): LifecycleEventCategory {
  if (lifecycleEventCategoryStr in stringToLifecycleEventCategoryMapping) {
    return stringToLifecycleEventCategoryMapping[lifecycleEventCategoryStr];
  } else {
    throw new UnsupportedLifecycleEventCategoryStringError(
      lifecycleEventCategoryStr,
    );
  }
}
