import range from '../validator/range';

test('should be equal true', () => {
  expect(range(5242879)).toBe(true);
});

test('should be equal true', () => {
  expect(range(5242881)).toBe(false);
});

test('value should be a number', () => {
  expect(() => range('ddf')).toThrow('value must be a number');
});

