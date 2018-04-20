import regexp from '../validator/regexp';

test('should be equal true', () => {
  expect(regexp('image.jpeg', /\.(jpe?g|png|pdf)$/i)).toBe(true);
});

test('should be equal false', () => {
  expect(regexp('image.aza', /\.(jpe?g|png|pdf)$/i)).toBe(false);
});

test('should be equal false', () => {
  expect(regexp('image', /\.(jpe?g|png|pdf)$/i)).toBe(false);
});

test('should throw exception', () => {
  expect(() => regexp([], /\.(jpe?g|png|pdf)$/i)).toThrow('str must have typeof string');
});

test('should throw exception', () => {
  expect(() => regexp('doc.pdf', [])).toThrow('rule must be an instance of RegExp');
});

