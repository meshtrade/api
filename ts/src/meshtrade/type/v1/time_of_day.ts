import { TimeOfDay } from "./time_of_day_pb";
import { Date as ProtoDate } from "./date_pb";
import { isComplete as isDateComplete } from "./date";

/**
 * Creates a new TimeOfDay protobuf message from hours, minutes, seconds, and nanos values.
 * Validates the input values according to the TimeOfDay message constraints.
 *
 * @param hours - Hours value (0-24)
 * @param minutes - Minutes value (0-59)
 * @param seconds - Seconds value (0-60, default 0)
 * @param nanos - Nanoseconds value (0-999999999, default 0)
 * @returns A TimeOfDay protobuf message
 * @throws Error if the time values are invalid
 */
export function newTimeOfDay(
  hours: number,
  minutes: number,
  seconds: number = 0,
  nanos: number = 0
): TimeOfDay {
  validateTimeOfDay(hours, minutes, seconds, nanos);
  return new TimeOfDay()
    .setHours(hours)
    .setMinutes(minutes)
    .setSeconds(seconds)
    .setNanos(nanos);
}

/**
 * Creates a TimeOfDay protobuf message from a JavaScript Date object.
 * Only extracts the time components, ignoring the date.
 *
 * @param jsDate - A JavaScript Date object
 * @returns A TimeOfDay protobuf message
 */
export function newTimeOfDayFromJsDate(jsDate: Date): TimeOfDay {
  return new TimeOfDay()
    .setHours(jsDate.getHours())
    .setMinutes(jsDate.getMinutes())
    .setSeconds(jsDate.getSeconds())
    .setNanos(jsDate.getMilliseconds() * 1000000); // Convert milliseconds to nanoseconds
}

/**
 * Creates a TimeOfDay protobuf message from milliseconds since midnight.
 *
 * @param millisSinceMidnight - Milliseconds elapsed since midnight
 * @returns A TimeOfDay protobuf message
 * @throws Error if the value is negative or >= 24 hours
 */
export function newTimeOfDayFromMillis(millisSinceMidnight: number): TimeOfDay {
  if (millisSinceMidnight < 0) {
    throw new Error(`Milliseconds cannot be negative: ${millisSinceMidnight}`);
  }
  if (millisSinceMidnight >= 24 * 60 * 60 * 1000) {
    throw new Error(
      `Milliseconds cannot be 24 hours or more: ${millisSinceMidnight}`
    );
  }

  const totalSeconds = Math.floor(millisSinceMidnight / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const nanos = (millisSinceMidnight % 1000) * 1000000; // Convert remaining milliseconds to nanoseconds

  return new TimeOfDay()
    .setHours(hours)
    .setMinutes(minutes)
    .setSeconds(seconds)
    .setNanos(nanos);
}

/**
 * Converts a TimeOfDay protobuf message to milliseconds since midnight.
 *
 * @param protoTime - A TimeOfDay protobuf message
 * @returns Milliseconds elapsed since midnight
 */
export function timeOfDayToMillis(protoTime: TimeOfDay): number {
  if (!protoTime) {
    return 0;
  }

  return (
    protoTime.getHours() * 3600000 +
    protoTime.getMinutes() * 60000 +
    protoTime.getSeconds() * 1000 +
    Math.floor(protoTime.getNanos() / 1000000)
  ); // Convert nanoseconds to milliseconds
}

/**
 * Combines a TimeOfDay with a Date to create a JavaScript Date object.
 *
 * @param protoTime - A TimeOfDay protobuf message
 * @param protoDate - A Date protobuf message
 * @returns A JavaScript Date object
 * @throws Error if either object is invalid or if date is incomplete
 */
export function timeOfDayToJsDateWithDate(
  protoTime: TimeOfDay,
  protoDate: ProtoDate
): Date {
  if (!protoTime) {
    throw new Error("TimeOfDay object is null or undefined");
  }
  if (!protoDate) {
    throw new Error("Date object is null or undefined");
  }

  if (!isDateComplete(protoDate)) {
    throw new Error("Date must be complete");
  }

  if (protoTime.getHours() === 24) {
    // Handle end of day by adding a day and setting time to midnight
    const baseDate = new Date(
      protoDate.getYear(),
      protoDate.getMonth() - 1,
      protoDate.getDay(),
      0,
      0,
      0,
      0
    );
    return new Date(baseDate.getTime() + 24 * 60 * 60 * 1000);
  }

  try {
    return new Date(
      protoDate.getYear(),
      protoDate.getMonth() - 1, // JS months are 0-indexed
      protoDate.getDay(),
      protoTime.getHours(),
      protoTime.getMinutes(),
      protoTime.getSeconds(),
      Math.floor(protoTime.getNanos() / 1000000) // Convert nanoseconds to milliseconds
    );
  } catch (e) {
    throw new Error(`Invalid datetime values: ${e}`);
  }
}

/**
 * Checks if a TimeOfDay has valid values according to the protobuf constraints.
 *
 * @param protoTime - A TimeOfDay protobuf message or undefined
 * @returns True if the time is valid, false otherwise
 */
export function isValid(protoTime?: TimeOfDay): boolean {
  if (!protoTime) {
    return false;
  }

  try {
    validateTimeOfDay(
      protoTime.getHours(),
      protoTime.getMinutes(),
      protoTime.getSeconds(),
      protoTime.getNanos()
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns true if the time represents midnight (00:00:00.000000000).
 *
 * @param protoTime - A TimeOfDay protobuf message or undefined
 * @returns True if the time is midnight, false otherwise
 */
export function isMidnight(protoTime?: TimeOfDay): boolean {
  if (!protoTime) {
    return false;
  }
  return (
    protoTime.getHours() === 0 &&
    protoTime.getMinutes() === 0 &&
    protoTime.getSeconds() === 0 &&
    protoTime.getNanos() === 0
  );
}

/**
 * Returns true if the time represents 24:00:00 (end of day).
 *
 * @param protoTime - A TimeOfDay protobuf message or undefined
 * @returns True if the time is end of day, false otherwise
 */
export function isEndOfDay(protoTime?: TimeOfDay): boolean {
  if (!protoTime) {
    return false;
  }
  return (
    protoTime.getHours() === 24 &&
    protoTime.getMinutes() === 0 &&
    protoTime.getSeconds() === 0 &&
    protoTime.getNanos() === 0
  );
}

/**
 * Returns a string representation of the time in HH:MM:SS.nnnnnnnnn format.
 *
 * @param protoTime - A TimeOfDay protobuf message or undefined
 * @returns String representation of the time
 */
export function timeOfDayToString(protoTime?: TimeOfDay): string {
  if (!protoTime) {
    return "<undefined>";
  }

  if (protoTime.getNanos() === 0) {
    return `${protoTime.getHours().toString().padStart(2, "0")}:${protoTime.getMinutes().toString().padStart(2, "0")}:${protoTime.getSeconds().toString().padStart(2, "0")}`;
  } else {
    return `${protoTime.getHours().toString().padStart(2, "0")}:${protoTime.getMinutes().toString().padStart(2, "0")}:${protoTime.getSeconds().toString().padStart(2, "0")}.${protoTime.getNanos().toString().padStart(9, "0")}`;
  }
}

/**
 * Returns the total number of seconds since midnight as a number.
 *
 * @param protoTime - A TimeOfDay protobuf message or undefined
 * @returns Total seconds since midnight
 */
export function totalSeconds(protoTime?: TimeOfDay): number {
  if (!protoTime) {
    return 0;
  }

  return (
    protoTime.getHours() * 3600 +
    protoTime.getMinutes() * 60 +
    protoTime.getSeconds() +
    protoTime.getNanos() / 1e9
  );
}

/**
 * Validates the hours, minutes, seconds, and nanos values according to TimeOfDay constraints.
 *
 * @param hours - Hours value
 * @param minutes - Minutes value
 * @param seconds - Seconds value
 * @param nanos - Nanoseconds value
 * @throws Error if the time values are invalid
 */
function validateTimeOfDay(
  hours: number,
  minutes: number,
  seconds: number,
  nanos: number
): void {
  // Hours validation (0-23, or 24 for end of day scenarios)
  if (hours < 0 || hours > 24) {
    throw new Error(`Hours must be between 0 and 24, got ${hours}`);
  }
  if (hours === 24 && (minutes !== 0 || seconds !== 0 || nanos !== 0)) {
    throw new Error("When hours is 24, minutes, seconds, and nanos must be 0");
  }

  // Minutes validation
  if (minutes < 0 || minutes > 59) {
    throw new Error(`Minutes must be between 0 and 59, got ${minutes}`);
  }

  // Seconds validation (0-59, or 60 for leap seconds if allowed)
  if (seconds < 0 || seconds > 60) {
    throw new Error(`Seconds must be between 0 and 60, got ${seconds}`);
  }

  // Nanos validation
  if (nanos < 0 || nanos > 999999999) {
    throw new Error(`Nanos must be between 0 and 999,999,999, got ${nanos}`);
  }
}
