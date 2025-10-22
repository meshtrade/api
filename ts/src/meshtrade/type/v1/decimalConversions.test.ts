import { bigNumberToDecimal, decimalToBigNumber } from "./decimalConversions"; // Replace with the actual file name
import { BigNumber } from "bignumber.js";
import { Decimal, DecimalSchema } from "./decimal_pb"; // Replace with the actual import
import { create } from "@bufbuild/protobuf";

describe.each<[string, BigNumber, Decimal]>([
  [
    "positive number",
    new BigNumber("123.45"),
    create(DecimalSchema, { value: "123.45" }),
  ],
  [
    "negative number",
    new BigNumber("-123.45"),
    create(DecimalSchema, { value: "-123.45" }),
  ],
  ["zero", new BigNumber("0"), create(DecimalSchema, { value: "0" })],
  [
    "positive integer",
    new BigNumber("100"),
    create(DecimalSchema, { value: "100" }),
  ],
  [
    "negative integer",
    new BigNumber("-100"),
    create(DecimalSchema, { value: "-100" }),
  ],
  [
    "positive float with multiple decimal places",
    new BigNumber("123.456789"),
    create(DecimalSchema, { value: "123.456789" }),
  ],
  [
    "negative float with multiple decimal places",
    new BigNumber("-123.456789"),
    create(DecimalSchema, { value: "-123.456789" }),
  ],
  [
    "very large positive number",
    new BigNumber("1e+20"),
    create(DecimalSchema, { value: "100000000000000000000" }),
  ],
  [
    "very large negative number",
    new BigNumber("-1e+20"),
    create(DecimalSchema, { value: "-100000000000000000000" }),
  ],
  [
    "very small positive number",
    new BigNumber("1e-20"),
    create(DecimalSchema, { value: "1e-20" }),
  ],
  [
    "very small negative number",
    new BigNumber("-1e-20"),
    create(DecimalSchema, { value: "-1e-20" }),
  ],
  [
    "positive number with leading zeros",
    new BigNumber("00123.45"),
    create(DecimalSchema, { value: "123.45" }),
  ],
  [
    "negative number with leading zeros",
    new BigNumber("-00123.45"),
    create(DecimalSchema, { value: "-123.45" }),
  ],
  [
    "zero with exponent",
    new BigNumber("0e+5"),
    create(DecimalSchema, { value: "0" }),
  ], // No need to change since it's not created using the create method
  [
    "zero with exponent",
    new BigNumber("0e+5"),
    create(DecimalSchema, { value: "0" }),
  ], // No need to change since it's not created using the create method
  [
    "+ precision loss test",
    new BigNumber("922337203685.4775807"),
    create(DecimalSchema, { value: "922337203685.4775807" }),
  ],
  [
    "- precision loss test",
    new BigNumber("-922337203685.4775807"),
    create(DecimalSchema, { value: "-922337203685.4775807" }),
  ],
])("bigNumberToDecimal", (testCaseName, bigNumber, expectedDecimal) => {
  it(testCaseName, () => {
    const result = bigNumberToDecimal(bigNumber);
    expect(result.value).toBe(expectedDecimal.value);
  });
});

describe.each([
  [
    "positive number",
    create(DecimalSchema, { value: "123.45" }),
    new BigNumber("123.45"),
  ],
  [
    "negative number",
    create(DecimalSchema, { value: "-123.45" }),
    new BigNumber("-123.45"),
  ],
  ["zero", create(DecimalSchema, { value: "0" }), new BigNumber("0")],
  ["value is null", create(DecimalSchema), new BigNumber("0")],
  [
    "exponent is null",
    create(DecimalSchema, { value: "12345" }),
    new BigNumber("12345"),
  ],
  [
    "both value and exponent are null",
    create(DecimalSchema),
    new BigNumber("0"),
  ],
])("decimalToBigNumber", (description, decimal, expectedBigNumber) => {
  it(description, () => {
    const result = decimalToBigNumber(decimal);
    expect(result.toString()).toEqual(expectedBigNumber.toString());
  });
});
