import { Date as ProtoDate } from "./date_pb";

/**
 * Creates a new Date protobuf message from year, month, and day values.
 * Validates the input values according to the Date message constraints.
 *
 * @param year - Year value (1-9999)
 * @param month - Month value (1-12)
 * @param day - Day value (1-31)
 * @returns A Date protobuf message
 * @throws Error if the date values are invalid
 */
export function newDate(year: number, month: number, day: number): ProtoDate {
  validateDate(year, month, day);
  return new ProtoDate().setYear(year).setMonth(month).setDay(day);
}

/**
 * Creates a Date protobuf message from a JavaScript Date object.
 *
 * @param jsDate - A JavaScript Date object
 * @returns A Date protobuf message
 */
export function newDateFromJsDate(jsDate: Date): ProtoDate {
  return new ProtoDate()
    .setYear(jsDate.getFullYear())
    .setMonth(jsDate.getMonth() + 1) // JS months are 0-indexed
    .setDay(jsDate.getDate());
}

/**
 * Converts a Date protobuf message to a JavaScript Date object.
 *
 * @param protoDate - A Date protobuf message
 * @returns A JavaScript Date object
 * @throws Error if the date is invalid
 */
export function dateToJsDate(protoDate: ProtoDate): Date {
  if (!protoDate) {
    throw new Error("Date object is null or undefined");
  }

  if (!isValid(protoDate)) {
    throw new Error(
      `Invalid date: year=${protoDate.getYear()}, month=${protoDate.getMonth()}, day=${protoDate.getDay()}`
    );
  }

  try {
    return new Date(
      protoDate.getYear(),
      protoDate.getMonth() - 1,
      protoDate.getDay()
    ); // JS months are 0-indexed
  } catch (e) {
    throw new Error(`Invalid date values: ${e}`);
  }
}

/**
 * Checks if a Date has valid values according to the protobuf constraints.
 *
 * @param protoDate - A Date protobuf message or undefined
 * @returns True if the date is valid, false otherwise
 */
export function isValid(protoDate?: ProtoDate): boolean {
  if (!protoDate) {
    return false;
  }

  try {
    validateDate(protoDate.getYear(), protoDate.getMonth(), protoDate.getDay());
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns true if the date has non-zero year, month, and day values.
 * Since only full dates are valid, this is equivalent to isValid().
 *
 * @param protoDate - A Date protobuf message or undefined
 * @returns True if the date is complete, false otherwise
 */
export function isComplete(protoDate?: ProtoDate): boolean {
  if (!protoDate) {
    return false;
  }
  return (
    protoDate.getYear() !== 0 &&
    protoDate.getMonth() !== 0 &&
    protoDate.getDay() !== 0
  );
}

/**
 * Returns a string representation of the date.
 *
 * @param protoDate - A Date protobuf message or undefined
 * @returns String representation of the date
 */
export function dateToString(protoDate?: ProtoDate): string {
  if (!protoDate) {
    return "<undefined>";
  }

  if (isValid(protoDate)) {
    return `${protoDate.getYear().toString().padStart(4, "0")}-${protoDate.getMonth().toString().padStart(2, "0")}-${protoDate.getDay().toString().padStart(2, "0")}`;
  } else {
    return `Date{year=${protoDate.getYear()}, month=${protoDate.getMonth()}, day=${protoDate.getDay()}} [INVALID]`;
  }
}

/**
 * Validates the year, month, and day values according to Date constraints.
 * Only full dates are valid - all fields must be non-zero.
 *
 * @param year - Year value
 * @param month - Month value
 * @param day - Day value
 * @throws Error if the date values are invalid
 */
function validateDate(year: number, month: number, day: number): void {
  // Year validation - must be non-zero
  if (year < 1 || year > 9999) {
    throw new Error(`Year must be between 1 and 9999, got ${year}`);
  }

  // Month validation - must be non-zero
  if (month < 1 || month > 12) {
    throw new Error(`Month must be between 1 and 12, got ${month}`);
  }

  // Day validation - must be non-zero
  if (day < 1 || day > 31) {
    throw new Error(`Day must be between 1 and 31, got ${day}`);
  }

  // Check if the day is valid for the given month and year
  const testDate = new Date(year, month - 1, day); // JS months are 0-indexed
  if (
    testDate.getFullYear() !== year ||
    testDate.getMonth() !== month - 1 ||
    testDate.getDate() !== day
  ) {
    throw new Error(
      `Invalid date: ${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
    );
  }
}
