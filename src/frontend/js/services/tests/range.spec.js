import range from '../validator/range';

test('should be equal true', () => {
  expect(range(5242879)).toBe(true);
});

test('should be equal true', () => {
  expect(range(5242881)).toBe(false);
});

test('type of value should be a number', () => {
  expect(() => range('ddf')).toThrow('value must be a number');
});

test('if type of value is null/undefined to throw exception', () => {
  expect(() => range(undefined)).toThrow('value must be a number');
});

test('if type of value is null/undefined to throw exception', () => {
  expect(() => range(null)).toThrow('value must be a number');
});

test('if min/max is number and value is between their to equal true', () => {
  expect(range(5242879, 23, 10000000000)).toBe(true);
});

