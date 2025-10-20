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
import { TimeOfDay, TimeOfDaySchema } from "./time_of_day_pb";
import { newDate } from "./date";
import { DateSchema } from "./date_pb";
import { create } from "@bufbuild/protobuf";

describe("newTimeOfDay", () => {
  // Valid test cases as individual tests
  test("valid midnight", () => {
    const result = newTimeOfDay(0, 0, 0, 0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
    expect(result.nanos).toBe(0);
  });

  test("valid noon", () => {
    const result = newTimeOfDay(12, 0, 0, 0);
    expect(result.hours).toBe(12);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
    expect(result.nanos).toBe(0);
  });

  test("valid end of day", () => {
    const result = newTimeOfDay(23, 59, 59, 999999999);
    expect(result.hours).toBe(23);
    expect(result.minutes).toBe(59);
    expect(result.seconds).toBe(59);
    expect(result.nanos).toBe(999999999);
  });

  // Invalid test cases as test.each
  const invalidTestCases: Array<
    [string, number, number, number, number, string?]
  > = [
      ["invalid hours too low", -1, 0, 0, 0, "Hours must be between 0 and 23"],
      ["invalid hours too high", 24, 0, 0, 0, "Hours must be between 0 and 23"],
      [
        "invalid minutes too low",
        12,
        -1,
        0,
        0,
        "Minutes must be between 0 and 59",
      ],
      [
        "invalid minutes too high",
        12,
        60,
        0,
        0,
        "Minutes must be between 0 and 59",
      ],
      [
        "invalid seconds too low",
        12,
        30,
        -1,
        0,
        "Seconds must be between 0 and 59",
      ],
      [
        "invalid seconds too high",
        12,
        30,
        60,
        0,
        "Seconds must be between 0 and 59",
      ],
      [
        "invalid nanos too low",
        12,
        30,
        45,
        -1,
        "Nanos must be between 0 and 999,999,999",
      ],
      [
        "invalid nanos too high",
        12,
        30,
        45,
        1000000000,
        "Nanos must be between 0 and 999,999,999",
      ],
    ];

  test.each(invalidTestCases)(
    "%s",
    (_, hours, minutes, seconds, nanos, errorMessage) => {
      expect(() => newTimeOfDay(hours, minutes, seconds, nanos)).toThrow();
      if (errorMessage) {
        expect(() => newTimeOfDay(hours, minutes, seconds, nanos)).toThrow(
          errorMessage
        );
      }
    }
  );
});

describe("newTimeOfDayFromJsDate", () => {
  test("midnight", () => {
    const result = newTimeOfDayFromJsDate(new Date(2023, 11, 25, 0, 0, 0, 0));
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
    expect(result.nanos).toBe(0);
  });

  test("noon", () => {
    const result = newTimeOfDayFromJsDate(new Date(2023, 11, 25, 12, 0, 0, 0));
    expect(result.hours).toBe(12);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
    expect(result.nanos).toBe(0);
  });

  test("complex time", () => {
    const result = newTimeOfDayFromJsDate(
      new Date(2023, 11, 25, 15, 30, 45, 123)
    );
    expect(result.hours).toBe(15);
    expect(result.minutes).toBe(30);
    expect(result.seconds).toBe(45);
    expect(result.nanos).toBe(123000000);
  });

  test("end of day", () => {
    const result = newTimeOfDayFromJsDate(
      new Date(2023, 11, 25, 23, 59, 59, 999)
    );
    expect(result.hours).toBe(23);
    expect(result.minutes).toBe(59);
    expect(result.seconds).toBe(59);
    expect(result.nanos).toBe(999000000);
  });
});

describe("newTimeOfDayFromMillis", () => {
  // Valid test cases as individual tests
  test("midnight", () => {
    const result = newTimeOfDayFromMillis(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
    expect(result.nanos).toBe(0);
  });

  test("one hour", () => {
    const result = newTimeOfDayFromMillis(3600000);
    expect(result.hours).toBe(1);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
    expect(result.nanos).toBe(0);
  });

  test("complex time", () => {
    const result = newTimeOfDayFromMillis(
      2 * 3600000 + 30 * 60000 + 45 * 1000 + 123
    );
    expect(result.hours).toBe(2);
    expect(result.minutes).toBe(30);
    expect(result.seconds).toBe(45);
    expect(result.nanos).toBe(123000000);
  });

  test("almost 24 hours", () => {
    const result = newTimeOfDayFromMillis(24 * 3600000 - 1);
    expect(result.hours).toBe(23);
    expect(result.minutes).toBe(59);
    expect(result.seconds).toBe(59);
    expect(result.nanos).toBe(999000000);
  });

  // Invalid test cases as test.each
  const invalidTestCases: Array<[string, number, string]> = [
    ["negative milliseconds", -1000, "Milliseconds cannot be negative"],
    [
      "exactly 24 hours",
      24 * 3600000,
      "Milliseconds cannot be 24 hours or more",
    ],
    [
      "more than 24 hours",
      25 * 3600000,
      "Milliseconds cannot be 24 hours or more",
    ],
  ];

  test.each(invalidTestCases)("%s", (_, millis, errorMessage) => {
    expect(() => newTimeOfDayFromMillis(millis)).toThrow();
    expect(() => newTimeOfDayFromMillis(millis)).toThrow(errorMessage);
  });
});

describe("timeOfDayToMillis", () => {
  test("undefined time", () => {
    // Cast to any to test undefined case
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = timeOfDayToMillis(undefined as any);
    expect(result).toBe(0);
  });

  test("midnight", () => {
    const result = timeOfDayToMillis(newTimeOfDay(0, 0, 0, 0));
    expect(result).toBe(0);
  });

  test("noon", () => {
    const result = timeOfDayToMillis(newTimeOfDay(12, 0, 0, 0));
    expect(result).toBe(12 * 3600000);
  });

  test("one minute", () => {
    const result = timeOfDayToMillis(newTimeOfDay(0, 1, 0, 0));
    expect(result).toBe(60000);
  });

  test("one second", () => {
    const result = timeOfDayToMillis(newTimeOfDay(0, 0, 1, 0));
    expect(result).toBe(1000);
  });

  test("complex time", () => {
    const result = timeOfDayToMillis(newTimeOfDay(2, 30, 45, 123000000));
    expect(result).toBe(2 * 3600000 + 30 * 60000 + 45 * 1000 + 123);
  });

  test("end of day", () => {
    const result = timeOfDayToMillis(newTimeOfDay(23, 59, 59, 999000000));
    expect(result).toBe(23 * 3600000 + 59 * 60000 + 59 * 1000 + 999);
  });
});

describe("timeOfDayToJsDateWithDate", () => {
  const date = newDate(2023, 12, 25);

  // Valid test cases as individual tests
  test("valid datetime", () => {
    const timeOfDay = newTimeOfDay(15, 30, 45, 123000000);
    const result = timeOfDayToJsDateWithDate(timeOfDay, date);
    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(date.year);
    expect(result.getMonth()).toBe(date.month - 1); // JS months are 0-indexed
    expect(result.getDay()).toBe(date.day);
    expect(result.getHours()).toBe(timeOfDay.hours);
    expect(result.getMinutes()).toBe(timeOfDay.minutes);
    expect(result.getSeconds()).toBe(timeOfDay.seconds);
  });

  test("midnight on date", () => {
    const timeOfDay = newTimeOfDay(0, 0, 0, 0);
    const result = timeOfDayToJsDateWithDate(timeOfDay, date);
    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(date.year);
    expect(result.getMonth()).toBe(date.month - 1); // JS months are 0-indexed
    expect(result.getDate()).toBe(date.day);
    expect(result.getHours()).toBe(timeOfDay.hours);
    expect(result.getMinutes()).toBe(timeOfDay.minutes);
    expect(result.getSeconds()).toBe(timeOfDay.seconds);
  });

  // Invalid test cases as test.each
  const invalidTestCases: Array<
    [string, TimeOfDay | undefined, typeof date | undefined, string]
  > = [
      [
        "undefined time",
        undefined,
        date,
        "TimeOfDay object is null or undefined",
      ],
      [
        "undefined date",
        newTimeOfDay(12, 0, 0, 0),
        undefined,
        "Date object is null or undefined",
      ],
      [
        "incomplete date",
        newTimeOfDay(12, 0, 0, 0),
        (() => {
          const incompleteDate = create(DateSchema)
          incompleteDate.year = 2023;
          incompleteDate.month = 1;
          // Day is not set, so it remains 0, making the date incomplete
          return incompleteDate;
        })(),
        "Date must be complete",
      ],
    ];

  test.each(invalidTestCases)("%s", (_, timeOfDay, protoDate, errorMessage) => {
    expect(() => timeOfDayToJsDateWithDate(timeOfDay!, protoDate!)).toThrow();
    expect(() => timeOfDayToJsDateWithDate(timeOfDay!, protoDate!)).toThrow(
      errorMessage
    );
  });
});

describe("isValid", () => {
  test("undefined time", () => {
    expect(isValid(undefined)).toBe(false);
  });

  test("valid midnight", () => {
    expect(isValid(newTimeOfDay(0, 0, 0, 0))).toBe(true);
  });

  test("valid noon", () => {
    expect(isValid(newTimeOfDay(12, 0, 0, 0))).toBe(true);
  });

  test("valid end of day", () => {
    expect(isValid(newTimeOfDay(23, 59, 59, 999999999))).toBe(true);
  });

  test("invalid hours", () => {
    const timeOfDay = create(TimeOfDaySchema, {
      hours: 12,
      minutes: 0,
      seconds: 0,
      nanos: 0,
    })
    expect(isValid(timeOfDay)).toBe(false);
  });

  test("invalid minutes", () => {
    const timeOfDay = create(TimeOfDaySchema, {
      hours: 12,
      minutes: 60,
      seconds: 0,
      nanos: 0,
    })
    expect(isValid(timeOfDay)).toBe(false);
  });

  test("invalid seconds", () => {
    const timeOfDay = create(TimeOfDaySchema, {
      hours: 12,
      minutes: 30,
      seconds: 60,
      nanos: 0,
    })
    expect(isValid(timeOfDay)).toBe(false);
  });

  test("invalid nanos", () => {
    const timeOfDay = create(TimeOfDaySchema, {
      hours: 12,
      minutes: 30,
      seconds: 45,
      nanos: 1000000000,
    })
    expect(isValid(timeOfDay)).toBe(false);
  });
});

describe("isMidnight", () => {
  test("undefined time", () => {
    expect(isMidnight(undefined)).toBe(false);
  });

  test("midnight", () => {
    expect(isMidnight(newTimeOfDay(0, 0, 0, 0))).toBe(true);
  });

  test("not midnight - 1 hour", () => {
    expect(isMidnight(newTimeOfDay(1, 0, 0, 0))).toBe(false);
  });

  test("not midnight - 1 minute", () => {
    expect(isMidnight(newTimeOfDay(0, 1, 0, 0))).toBe(false);
  });

  test("not midnight - 1 second", () => {
    expect(isMidnight(newTimeOfDay(0, 0, 1, 0))).toBe(false);
  });

  test("not midnight - 1 nano", () => {
    expect(isMidnight(newTimeOfDay(0, 0, 0, 1))).toBe(false);
  });
});

describe("timeOfDayToString", () => {
  test("undefined time", () => {
    expect(timeOfDayToString(undefined)).toBe("<undefined>");
  });

  test("midnight", () => {
    expect(timeOfDayToString(newTimeOfDay(0, 0, 0, 0))).toBe("00:00:00");
  });

  test("noon", () => {
    expect(timeOfDayToString(newTimeOfDay(12, 0, 0, 0))).toBe("12:00:00");
  });

  test("complex time without nanos", () => {
    expect(timeOfDayToString(newTimeOfDay(15, 30, 45, 0))).toBe("15:30:45");
  });

  test("complex time with nanos", () => {
    expect(timeOfDayToString(newTimeOfDay(15, 30, 45, 123456789))).toBe(
      "15:30:45.123456789"
    );
  });

  test("single digits", () => {
    expect(timeOfDayToString(newTimeOfDay(1, 2, 3, 4))).toBe(
      "01:02:03.000000004"
    );
  });

  test("end of day", () => {
    expect(timeOfDayToString(newTimeOfDay(23, 59, 59, 999999999))).toBe(
      "23:59:59.999999999"
    );
  });
});

describe("totalSeconds", () => {
  test("undefined time", () => {
    const result = totalSeconds(undefined);
    expect(result).toBeCloseTo(0, 9);
  });

  test("midnight", () => {
    const result = totalSeconds(newTimeOfDay(0, 0, 0, 0));
    expect(result).toBeCloseTo(0, 9);
  });

  test("one hour", () => {
    const result = totalSeconds(newTimeOfDay(1, 0, 0, 0));
    expect(result).toBeCloseTo(3600, 9);
  });

  test("one minute", () => {
    const result = totalSeconds(newTimeOfDay(0, 1, 0, 0));
    expect(result).toBeCloseTo(60, 9);
  });

  test("one second", () => {
    const result = totalSeconds(newTimeOfDay(0, 0, 1, 0));
    expect(result).toBeCloseTo(1, 9);
  });

  test("half second", () => {
    const result = totalSeconds(newTimeOfDay(0, 0, 0, 500000000));
    expect(result).toBeCloseTo(0.5, 9);
  });

  test("complex time", () => {
    const result = totalSeconds(newTimeOfDay(2, 30, 45, 123456789));
    expect(result).toBeCloseTo(2 * 3600 + 30 * 60 + 45 + 0.123456789, 9);
  });

  test("end of day", () => {
    const result = totalSeconds(newTimeOfDay(23, 59, 59, 999999999));
    expect(result).toBeCloseTo(23 * 3600 + 59 * 60 + 59 + 0.999999999, 9);
  });
});
