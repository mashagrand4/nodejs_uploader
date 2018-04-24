import type from '../validator/type';

test('needle: image/jpeg, image/png, application/pdf should be in haystack and to equal true', () => {
  expect(type('image/jpeg', ['image/jpeg', 'image/png', 'application/pdf'])).toBe(true);
});

test('empty needle should be to equal false', () => {
  expect(type('', ['image/jpeg', 'image/png', 'application/pdf'])).toBe(false);
});

test('\'needle: image/jpeg, image/png, application/pdf should be in haystack and to equal true otherwise it will be equal false', () => {
  expect(type('image/gif', ['image/jpeg', 'image/png', 'application/pdf'])).toBe(false);
});

test('needle must be only string and otherwise should throw exception', () => {
  expect(() => type({}, [])).toThrow('needle must have typeof string');
});

test('needle must be only string and otherwise should throw exception', () => {
  expect(() => type('', '')).toThrow('haystack must be an instance of Array');
});

