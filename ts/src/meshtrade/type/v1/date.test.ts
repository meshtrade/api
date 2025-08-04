import {
  newDate,
  newDateFromJsDate,
  isValid,
  isComplete,
  dateToJsDate,
  dateToString,
} from "./date";
import { Date as ProtoDate } from "./date_pb";

describe("newDate", () => {
  test("valid complete date", () => {
    const result = newDate(2023, 12, 25);
    expect(result.getYear()).toBe(2023);
    expect(result.getMonth()).toBe(12);
    expect(result.getDay()).toBe(25);
  });


  test("valid leap year February 29", () => {
    const result = newDate(2024, 2, 29);
    expect(result.getYear()).toBe(2024);
    expect(result.getMonth()).toBe(2);
    expect(result.getDay()).toBe(29);
  });

  test("invalid year zero", () => {
    expect(() => newDate(0, 12, 25)).toThrow(
      "Year must be between 1 and 9999"
    );
  });

  test("invalid year too high", () => {
    expect(() => newDate(10000, 1, 1)).toThrow(
      "Year must be between 1 and 9999"
    );
  });

  test("invalid month zero", () => {
    expect(() => newDate(2023, 0, 25)).toThrow(
      "Month must be between 1 and 12"
    );
  });

  test("invalid month too high", () => {
    expect(() => newDate(2023, 13, 1)).toThrow(
      "Month must be between 1 and 12"
    );
  });

  test("invalid day zero", () => {
    expect(() => newDate(2023, 1, 0)).toThrow(
      "Day must be between 1 and 31"
    );
  });

  test("invalid day too high", () => {
    expect(() => newDate(2023, 1, 32)).toThrow(
      "Day must be between 1 and 31"
    );
  });

  test("invalid date February 30", () => {
    expect(() => newDate(2023, 2, 30)).toThrow("Invalid date");
  });

  test("invalid leap year February 29", () => {
    expect(() => newDate(2023, 2, 29)).toThrow("Invalid date");
  });

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
    (_, jsDate, expectedYear, expectedMonth, expectedDay) => {
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
    [
      "invalid year zero",
      new ProtoDate().setYear(0).setMonth(12).setDay(25),
      false,
    ],
    [
      "invalid year too high",
      new ProtoDate().setYear(10000).setMonth(1).setDay(1),
      false,
    ],
    [
      "invalid month zero",
      new ProtoDate().setYear(2023).setMonth(0).setDay(25),
      false,
    ],
    [
      "invalid month too high",
      new ProtoDate().setYear(2023).setMonth(13).setDay(1),
      false,
    ],
    [
      "invalid day zero",
      new ProtoDate().setYear(2023).setMonth(1).setDay(0),
      false,
    ],
    [
      "invalid day too high",
      new ProtoDate().setYear(2023).setMonth(1).setDay(32),
      false,
    ],
  ];

  test.each(testCases)("%s", (_, date, expected) => {
    expect(isValid(date)).toBe(expected);
  });
});

describe("isComplete", () => {
  const testCases: Array<[string, ProtoDate | undefined, boolean]> = [
    ["undefined date", undefined, false],
    ["complete date", newDate(2023, 12, 25), true],
    [
      "incomplete - year zero",
      new ProtoDate().setYear(0).setMonth(12).setDay(25),
      false,
    ],
    [
      "incomplete - month zero",
      new ProtoDate().setYear(2023).setMonth(0).setDay(25),
      false,
    ],
    [
      "incomplete - day zero",
      new ProtoDate().setYear(2023).setMonth(12).setDay(0),
      false,
    ],
    ["zero date", new ProtoDate().setYear(0).setMonth(0).setDay(0), false],
  ];

  test.each(testCases)("%s", (_, date, expected) => {
    expect(isComplete(date)).toBe(expected);
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

  test("invalid date throws error", () => {
    const date = new ProtoDate().setYear(2023).setMonth(2).setDay(30);
    expect(() => dateToJsDate(date)).toThrow();
  });
});

describe("dateToString", () => {
  const testCases: Array<[string, ProtoDate | undefined, string]> = [
    ["undefined date", undefined, "<undefined>"],
    ["complete date", newDate(2023, 12, 25), "2023-12-25"],
    [
      "invalid date",
      new ProtoDate().setYear(0).setMonth(12).setDay(25),
      "Date{year=0, month=12, day=25} [INVALID]",
    ],
    [
      "invalid date February 30",
      new ProtoDate().setYear(2023).setMonth(2).setDay(30),
      "Date{year=2023, month=2, day=30} [INVALID]",
    ],
  ];

  test.each(testCases)("%s", (_, date, expected) => {
    expect(dateToString(date)).toBe(expected);
  });
});
