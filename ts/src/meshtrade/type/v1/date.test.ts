import {
  newDate,
  newDateFromJsDate,
  isValid,
  isComplete,
  isYearOnly,
  isYearMonth,
  isMonthDay,
  dateToJsDate,
  dateToString,
} from "./date";
import { Date as ProtoDate } from "./date_pb";

describe("newDate", () => {
  const testCases: Array<[string, number, number, number, boolean, string?]> = [
    ["valid complete date", 2023, 12, 25, false],
    ["valid year only", 2023, 0, 0, false],
    ["valid year-month", 2023, 12, 0, false],
    [
      "invalid year too high",
      10000,
      1,
      1,
      true,
      "Year must be 0 or between 1 and 9999",
    ],
    [
      "invalid month too high",
      2023,
      13,
      1,
      true,
      "Month must be 0 or between 1 and 12",
    ],
    [
      "invalid day too high",
      2023,
      1,
      32,
      true,
      "Day must be 0 or between 1 and 31",
    ],
    ["invalid date February 30", 2023, 2, 30, true, "Invalid date"],
    ["invalid leap year February 29", 2023, 2, 29, true, "Invalid date"],
    ["valid leap year February 29", 2024, 2, 29, false],
    [
      "month without year",
      0,
      1,
      0,
      true,
      "Month cannot be specified without year",
    ],
    [
      "day without month",
      0,
      0,
      1,
      true,
      "Day cannot be specified without month",
    ],
  ];

  test.each(testCases)(
    "%s",
    (name, year, month, day, shouldThrow, errorMessage) => {
      if (shouldThrow) {
        expect(() => newDate(year, month, day)).toThrow();
        if (errorMessage) {
          expect(() => newDate(year, month, day)).toThrow(errorMessage);
        }
      } else {
        const result = newDate(year, month, day);
        expect(result.getYear()).toBe(year);
        expect(result.getMonth()).toBe(month);
        expect(result.getDay()).toBe(day);
      }
    }
  );
});

describe("newDateFromJsDate", () => {
  const testCases: Array<[string, Date, number, number, number]> = [
    ["standard date", new Date(2023, 11, 25), 2023, 12, 25], // JS months are 0-indexed
    ["leap year date", new Date(2024, 1, 29), 2024, 2, 29],
    ["first day of year", new Date(2023, 0, 1), 2023, 1, 1],
    ["last day of year", new Date(2023, 11, 31), 2023, 12, 31],
  ];

  test.each(testCases)(
    "%s",
    (name, jsDate, expectedYear, expectedMonth, expectedDay) => {
      const result = newDateFromJsDate(jsDate);
      expect(result.getYear()).toBe(expectedYear);
      expect(result.getMonth()).toBe(expectedMonth);
      expect(result.getDay()).toBe(expectedDay);
    }
  );
});

describe("isValid", () => {
  const testCases: Array<[string, ProtoDate | undefined, boolean]> = [
    ["undefined date", undefined, false],
    ["valid complete date", newDate(2023, 12, 25), true],
    ["valid year only", newDate(2023, 0, 0), true],
    ["valid year-month", newDate(2023, 12, 0), true],
    [
      "invalid year too high",
      new ProtoDate().setYear(10000).setMonth(1).setDay(1),
      false,
    ],
    [
      "invalid month too high",
      new ProtoDate().setYear(2023).setMonth(13).setDay(1),
      false,
    ],
    [
      "invalid day too high",
      new ProtoDate().setYear(2023).setMonth(1).setDay(32),
      false,
    ],
  ];

  test.each(testCases)("%s", (name, date, expected) => {
    expect(isValid(date)).toBe(expected);
  });
});

describe("isComplete", () => {
  const testCases: Array<[string, ProtoDate | undefined, boolean]> = [
    ["undefined date", undefined, false],
    ["complete date", newDate(2023, 12, 25), true],
    ["year only", newDate(2023, 0, 0), false],
    ["year-month", newDate(2023, 12, 0), false],
    ["zero date", new ProtoDate().setYear(0).setMonth(0).setDay(0), false],
  ];

  test.each(testCases)("%s", (name, date, expected) => {
    expect(isComplete(date)).toBe(expected);
  });
});

describe("isYearOnly", () => {
  const testCases: Array<[string, ProtoDate | undefined, boolean]> = [
    ["undefined date", undefined, false],
    ["complete date", newDate(2023, 12, 25), false],
    ["year only", newDate(2023, 0, 0), true],
    ["year-month", newDate(2023, 12, 0), false],
    ["zero date", new ProtoDate().setYear(0).setMonth(0).setDay(0), false],
  ];

  test.each(testCases)("%s", (name, date, expected) => {
    expect(isYearOnly(date)).toBe(expected);
  });
});

describe("isYearMonth", () => {
  const testCases: Array<[string, ProtoDate | undefined, boolean]> = [
    ["undefined date", undefined, false],
    ["complete date", newDate(2023, 12, 25), false],
    ["year only", newDate(2023, 0, 0), false],
    ["year-month", newDate(2023, 12, 0), true],
    ["zero date", new ProtoDate().setYear(0).setMonth(0).setDay(0), false],
  ];

  test.each(testCases)("%s", (name, date, expected) => {
    expect(isYearMonth(date)).toBe(expected);
  });
});

describe("isMonthDay", () => {
  const testCases: Array<[string, ProtoDate | undefined, boolean]> = [
    ["undefined date", undefined, false],
    ["complete date", newDate(2023, 12, 25), false],
    ["year only", newDate(2023, 0, 0), false],
    ["year-month", newDate(2023, 12, 0), false],
    ["month-day", new ProtoDate().setYear(0).setMonth(12).setDay(25), true],
    ["zero date", new ProtoDate().setYear(0).setMonth(0).setDay(0), false],
  ];

  test.each(testCases)("%s", (name, date, expected) => {
    expect(isMonthDay(date)).toBe(expected);
  });
});

describe("dateToJsDate", () => {
  test("valid complete date", () => {
    const date = newDate(2023, 12, 25);
    const result = dateToJsDate(date);
    expect(result).toEqual(new Date(2023, 11, 25)); // JS months are 0-indexed
  });

  test("leap year date", () => {
    const date = newDate(2024, 2, 29);
    const result = dateToJsDate(date);
    expect(result).toEqual(new Date(2024, 1, 29));
  });

  test("incomplete date throws error", () => {
    const date = newDate(2023, 0, 0);
    expect(() => dateToJsDate(date)).toThrow();
  });
});

describe("dateToString", () => {
  const testCases: Array<[string, ProtoDate | undefined, string]> = [
    ["undefined date", undefined, "<undefined>"],
    ["complete date", newDate(2023, 12, 25), "2023-12-25"],
    ["year only", newDate(2023, 0, 0), "2023"],
    ["year-month", newDate(2023, 12, 0), "2023-12"],
    [
      "month-day",
      new ProtoDate().setYear(0).setMonth(12).setDay(25),
      "--12-25",
    ],
  ];

  test.each(testCases)("%s", (name, date, expected) => {
    expect(dateToString(date)).toBe(expected);
  });
});
