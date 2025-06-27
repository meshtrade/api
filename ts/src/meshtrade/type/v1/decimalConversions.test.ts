import { bigNumberToDecimal, decimalToBigNumber } from './decimalConversions'; // Replace with the actual file name
import { BigNumber } from 'bignumber.js';
import { Decimal } from './decimal_pb'; // Replace with the actual import

describe.each<[string, BigNumber, Decimal]>([
  [
    'positive number',
    new BigNumber('123.45'),
    new Decimal().setValue('123.45'),
  ],
  [
    'negative number',
    new BigNumber('-123.45'),
    new Decimal().setValue('-123.45'),
  ],
  ['zero', new BigNumber('0'), new Decimal().setValue('0')],
  ['positive integer', new BigNumber('100'), new Decimal().setValue('100')],
  ['negative integer', new BigNumber('-100'), new Decimal().setValue('-100')],
  ['zero', new BigNumber('0'), new Decimal().setValue('0')],
  ['positive integer', new BigNumber('100'), new Decimal().setValue('100')],
  ['negative integer', new BigNumber('-100'), new Decimal().setValue('-100')],
  [
    'positive float with multiple decimal places',
    new BigNumber('123.456789'),
    new Decimal().setValue('123.456789'),
  ],
  [
    'negative float with multiple decimal places',
    new BigNumber('-123.456789'),
    new Decimal().setValue('-123.456789'),
  ],
  [
    'very large positive number',
    new BigNumber('1e+20'),
    new Decimal().setValue('100000000000000000000'),
  ],
  [
    'very large negative number',
    new BigNumber('-1e+20'),
    new Decimal().setValue('-100000000000000000000'),
  ],
  [
    'very small positive number',
    new BigNumber('1e-20'),
    new Decimal().setValue('1e-20'),
  ],
  [
    'very small negative number',
    new BigNumber('-1e-20'),
    new Decimal().setValue('-1e-20'),
  ],
  [
    'positive number with leading zeros',
    new BigNumber('00123.45'),
    new Decimal().setValue('123.45'),
  ],
  [
    'negative number with leading zeros',
    new BigNumber('-00123.45'),
    new Decimal().setValue('-123.45'),
  ],
  ['zero with exponent', new BigNumber('0e+5'), new Decimal().setValue('0')],
  ['zero with exponent', new BigNumber('0e+5'), new Decimal().setValue('0')],
  [
    '+ precision loss test',
    new BigNumber('922337203685.4775807'),
    new Decimal().setValue('922337203685.4775807'),
  ],
  [
    '- precision loss test',
    new BigNumber('-922337203685.4775807'),
    new Decimal().setValue('-922337203685.4775807'),
  ],
])('bigNumberToDecimal', (testCaseName, bigNumber, expectedDecimal) => {
  it(testCaseName, () => {
    const result = bigNumberToDecimal(bigNumber);
    expect(result.getValue()).toBe(expectedDecimal.getValue());
  });
});

describe.each([
  [
    'positive number',
    new Decimal().setValue('123.45'),
    new BigNumber('123.45'),
  ],
  [
    'negative number',
    new Decimal().setValue('-123.45'),
    new BigNumber('-123.45'),
  ],
  ['zero', new Decimal().setValue('0'), new BigNumber('0')],
  ['value is null', new Decimal(), new BigNumber('0')],
  ['exponent is null', new Decimal().setValue('12345'), new BigNumber('12345')],
  ['both value and exponent are null', new Decimal(), new BigNumber('0')],
])('decimalToBigNumber', (description, decimal, expectedBigNumber) => {
  it(description, () => {
    const result = decimalToBigNumber(decimal);
    expect(result.toString()).toEqual(expectedBigNumber.toString());
  });
});
