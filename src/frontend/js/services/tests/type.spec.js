import type from '../validator/type';

test('should be equal true', () => {
  expect(type('image/jpeg', ['image/jpeg', 'image/png', 'application/pdf'])).toBe(true);
});

test('should be equal false', () => {
  expect(type('', ['image/jpeg', 'image/png', 'application/pdf'])).toBe(false);
});

test('should be equal false', () => {
  expect(type('image/gif', ['image/jpeg', 'image/png', 'application/pdf'])).toBe(false);
});

test('should throw exception', () => {
  expect(() => type({}, [])).toThrow('needle must have typeof string');
});

test('should throw exception', () => {
  expect(() => type('', '')).toThrow('haystack must be an instance of Array');
});

