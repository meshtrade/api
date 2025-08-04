import {
  newTimeOfDay,
  newTimeOfDayFromJsDate,
  newTimeOfDayFromMillis,
  timeOfDayToMillis,
  timeOfDayToJsDateWithDate,
  isValid,
  isMidnight,
  timeOfDayToString,
  totalSeconds,
} from "./time_of_day";
import { TimeOfDay } from "./time_of_day_pb";
import { newDate } from "./date";

describe("newTimeOfDay", () => {
  const testCases: Array<
    [string, number, number, number, number, boolean, string?]
  > = [
    ["valid midnight", 0, 0, 0, 0, false],
    ["valid noon", 12, 0, 0, 0, false],
    ["valid end of day", 23, 59, 59, 999999999, false],
    [
      "invalid hours too low",
      -1,
      0,
      0,
      0,
      true,
      "Hours must be between 0 and 23",
    ],
    [
      "invalid hours too high",
      24,
      0,
      0,
      0,
      true,
      "Hours must be between 0 and 23",
    ],
    [
      "invalid minutes too low",
      12,
      -1,
      0,
      0,
      true,
      "Minutes must be between 0 and 59",
    ],
    [
      "invalid minutes too high",
      12,
      60,
      0,
      0,
      true,
      "Minutes must be between 0 and 59",
    ],
    [
      "invalid seconds too low",
      12,
      30,
      -1,
      0,
      true,
      "Seconds must be between 0 and 59",
    ],
    [
      "invalid seconds too high",
      12,
      30,
      60,
      0,
      true,
      "Seconds must be between 0 and 59",
    ],
    [
      "invalid nanos too low",
      12,
      30,
      45,
      -1,
      true,
      "Nanos must be between 0 and 999,999,999",
    ],
    [
      "invalid nanos too high",
      12,
      30,
      45,
      1000000000,
      true,
      "Nanos must be between 0 and 999,999,999",
    ],
  ];

  test.each(testCases)(
    "%s",
    (name, hours, minutes, seconds, nanos, shouldThrow, errorMessage) => {
      if (shouldThrow) {
        expect(() => newTimeOfDay(hours, minutes, seconds, nanos)).toThrow();
        if (errorMessage) {
          expect(() => newTimeOfDay(hours, minutes, seconds, nanos)).toThrow(
            errorMessage
          );
        }
      } else {
        const result = newTimeOfDay(hours, minutes, seconds, nanos);
        expect(result.getHours()).toBe(hours);
        expect(result.getMinutes()).toBe(minutes);
        expect(result.getSeconds()).toBe(seconds);
        expect(result.getNanos()).toBe(nanos);
      }
    }
  );
});

describe("newTimeOfDayFromJsDate", () => {
  const testCases: Array<[string, Date, number, number, number, number]> = [
    ["midnight", new Date(2023, 11, 25, 0, 0, 0, 0), 0, 0, 0, 0],
    ["noon", new Date(2023, 11, 25, 12, 0, 0, 0), 12, 0, 0, 0],
    [
      "complex time",
      new Date(2023, 11, 25, 15, 30, 45, 123),
      15,
      30,
      45,
      123000000,
    ],
    [
      "end of day",
      new Date(2023, 11, 25, 23, 59, 59, 999),
      23,
      59,
      59,
      999000000,
    ],
  ];

  test.each(testCases)(
    "%s",
    (
      name,
      jsDate,
      expectedHours,
      expectedMinutes,
      expectedSeconds,
      expectedNanos
    ) => {
      const result = newTimeOfDayFromJsDate(jsDate);
      expect(result.getHours()).toBe(expectedHours);
      expect(result.getMinutes()).toBe(expectedMinutes);
      expect(result.getSeconds()).toBe(expectedSeconds);
      expect(result.getNanos()).toBe(expectedNanos);
    }
  );
});

describe("newTimeOfDayFromMillis", () => {
  const testCases: Array<
    [string, number, boolean, string?, number?, number?, number?, number?]
  > = [
    ["midnight", 0, false, undefined, 0, 0, 0, 0],
    ["one hour", 3600000, false, undefined, 1, 0, 0, 0],
    [
      "complex time",
      2 * 3600000 + 30 * 60000 + 45 * 1000 + 123,
      false,
      undefined,
      2,
      30,
      45,
      123000000,
    ],
    [
      "almost 24 hours",
      24 * 3600000 - 1,
      false,
      undefined,
      23,
      59,
      59,
      999000000,
    ],
    ["negative milliseconds", -1000, true, "Milliseconds cannot be negative"],
    [
      "exactly 24 hours",
      24 * 3600000,
      true,
      "Milliseconds cannot be 24 hours or more",
    ],
    [
      "more than 24 hours",
      25 * 3600000,
      true,
      "Milliseconds cannot be 24 hours or more",
    ],
  ];

  test.each(testCases)(
    "%s",
    (
      name,
      millis,
      shouldThrow,
      errorMessage,
      expectedHours,
      expectedMinutes,
      expectedSeconds,
      expectedNanos
    ) => {
      if (shouldThrow) {
        expect(() => newTimeOfDayFromMillis(millis)).toThrow();
        if (errorMessage) {
          expect(() => newTimeOfDayFromMillis(millis)).toThrow(errorMessage);
        }
      } else {
        const result = newTimeOfDayFromMillis(millis);
        expect(result.getHours()).toBe(expectedHours);
        expect(result.getMinutes()).toBe(expectedMinutes);
        expect(result.getSeconds()).toBe(expectedSeconds);
        expect(result.getNanos()).toBe(expectedNanos);
      }
    }
  );
});

describe("timeOfDayToMillis", () => {
  test("undefined time", () => {
    // Cast to any to test undefined case
    const result = timeOfDayToMillis(undefined as any);
    expect(result).toBe(0);
  });

  const testCases: Array<[string, TimeOfDay, number]> = [
    ["midnight", newTimeOfDay(0, 0, 0, 0), 0],
    ["noon", newTimeOfDay(12, 0, 0, 0), 12 * 3600000],
    ["one minute", newTimeOfDay(0, 1, 0, 0), 60000],
    ["one second", newTimeOfDay(0, 0, 1, 0), 1000],
    [
      "complex time",
      newTimeOfDay(2, 30, 45, 123000000),
      2 * 3600000 + 30 * 60000 + 45 * 1000 + 123,
    ],
    [
      "end of day",
      newTimeOfDay(23, 59, 59, 999000000),
      23 * 3600000 + 59 * 60000 + 59 * 1000 + 999,
    ],
  ];

  test.each(testCases)("%s", (name, timeOfDay, expected) => {
    const result = timeOfDayToMillis(timeOfDay);
    expect(result).toBe(expected);
  });
});

describe("timeOfDayToJsDateWithDate", () => {
  const date = newDate(2023, 12, 25);

  const testCases: Array<
    [string, TimeOfDay | undefined, typeof date | undefined, boolean, string?]
  > = [
    ["valid datetime", newTimeOfDay(15, 30, 45, 123000000), date, false],
    ["midnight on date", newTimeOfDay(0, 0, 0, 0), date, false],
    [
      "undefined time",
      undefined,
      date,
      true,
      "TimeOfDay object is null or undefined",
    ],
    [
      "undefined date",
      newTimeOfDay(12, 0, 0, 0),
      undefined,
      true,
      "Date object is null or undefined",
    ],
    [
      "incomplete date",
      newTimeOfDay(12, 0, 0, 0),
      newDate(2023, 0, 0),
      true,
      "Date must be complete",
    ],
  ];

  test.each(testCases)(
    "%s",
    (name, timeOfDay, protoDate, shouldThrow, errorMessage) => {
      if (shouldThrow) {
        expect(() =>
          timeOfDayToJsDateWithDate(timeOfDay!, protoDate!)
        ).toThrow();
        if (errorMessage) {
          expect(() =>
            timeOfDayToJsDateWithDate(timeOfDay!, protoDate!)
          ).toThrow(errorMessage);
        }
      } else {
        const result = timeOfDayToJsDateWithDate(timeOfDay!, protoDate!);
        expect(result).toBeInstanceOf(Date);
        expect(result.getFullYear()).toBe(protoDate!.getYear());
        expect(result.getMonth()).toBe(protoDate!.getMonth() - 1); // JS months are 0-indexed
        expect(result.getDate()).toBe(protoDate!.getDay());
        expect(result.getHours()).toBe(timeOfDay!.getHours());
        expect(result.getMinutes()).toBe(timeOfDay!.getMinutes());
        expect(result.getSeconds()).toBe(timeOfDay!.getSeconds());
      }
    }
  );
});

describe("isValid", () => {
  const testCases: Array<[string, TimeOfDay | undefined, boolean]> = [
    ["undefined time", undefined, false],
    ["valid midnight", newTimeOfDay(0, 0, 0, 0), true],
    ["valid noon", newTimeOfDay(12, 0, 0, 0), true],
    ["valid end of day", newTimeOfDay(23, 59, 59, 999999999), true],
    [
      "invalid hours",
      new TimeOfDay().setHours(24).setMinutes(0).setSeconds(0).setNanos(0),
      false,
    ],
    [
      "invalid minutes",
      new TimeOfDay().setHours(12).setMinutes(60).setSeconds(0).setNanos(0),
      false,
    ],
    [
      "invalid seconds",
      new TimeOfDay().setHours(12).setMinutes(30).setSeconds(60).setNanos(0),
      false,
    ],
    [
      "invalid nanos",
      new TimeOfDay()
        .setHours(12)
        .setMinutes(30)
        .setSeconds(45)
        .setNanos(1000000000),
      false,
    ],
  ];

  test.each(testCases)("%s", (name, timeOfDay, expected) => {
    expect(isValid(timeOfDay)).toBe(expected);
  });
});

describe("isMidnight", () => {
  const testCases: Array<[string, TimeOfDay | undefined, boolean]> = [
    ["undefined time", undefined, false],
    ["midnight", newTimeOfDay(0, 0, 0, 0), true],
    ["not midnight - 1 hour", newTimeOfDay(1, 0, 0, 0), false],
    ["not midnight - 1 minute", newTimeOfDay(0, 1, 0, 0), false],
    ["not midnight - 1 second", newTimeOfDay(0, 0, 1, 0), false],
    ["not midnight - 1 nano", newTimeOfDay(0, 0, 0, 1), false],
  ];

  test.each(testCases)("%s", (name, timeOfDay, expected) => {
    expect(isMidnight(timeOfDay)).toBe(expected);
  });
});

describe("timeOfDayToString", () => {
  const testCases: Array<[string, TimeOfDay | undefined, string]> = [
    ["undefined time", undefined, "<undefined>"],
    ["midnight", newTimeOfDay(0, 0, 0, 0), "00:00:00"],
    ["noon", newTimeOfDay(12, 0, 0, 0), "12:00:00"],
    ["complex time without nanos", newTimeOfDay(15, 30, 45, 0), "15:30:45"],
    [
      "complex time with nanos",
      newTimeOfDay(15, 30, 45, 123456789),
      "15:30:45.123456789",
    ],
    ["single digits", newTimeOfDay(1, 2, 3, 4), "01:02:03.000000004"],
    ["end of day", newTimeOfDay(23, 59, 59, 999999999), "23:59:59.999999999"],
  ];

  test.each(testCases)("%s", (name, timeOfDay, expected) => {
    expect(timeOfDayToString(timeOfDay)).toBe(expected);
  });
});

describe("totalSeconds", () => {
  const testCases: Array<[string, TimeOfDay | undefined, number]> = [
    ["undefined time", undefined, 0],
    ["midnight", newTimeOfDay(0, 0, 0, 0), 0],
    ["one hour", newTimeOfDay(1, 0, 0, 0), 3600],
    ["one minute", newTimeOfDay(0, 1, 0, 0), 60],
    ["one second", newTimeOfDay(0, 0, 1, 0), 1],
    ["half second", newTimeOfDay(0, 0, 0, 500000000), 0.5],
    [
      "complex time",
      newTimeOfDay(2, 30, 45, 123456789),
      2 * 3600 + 30 * 60 + 45 + 0.123456789,
    ],
    [
      "end of day",
      newTimeOfDay(23, 59, 59, 999999999),
      23 * 3600 + 59 * 60 + 59 + 0.999999999,
    ],
  ];

  test.each(testCases)("%s", (name, timeOfDay, expected) => {
    const result = totalSeconds(timeOfDay);
    expect(result).toBeCloseTo(expected, 9); // Allow small floating point differences
  });
});
