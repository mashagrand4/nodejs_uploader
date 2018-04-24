import regexp from '../validator/regexp';

it('files with extensions: jpeg, png, pdf should be in rule and to equal true', () => {
  expect(regexp('image.jpeg', /\.(jpe?g|png|pdf)$/i)).toBe(true);
});

test('files without following extensions: jpeg, png shouldnt be in rule and to equal false', () => {
  expect(regexp('image.aza', /\.(jpe?g|png|pdf)$/i)).toBe(false);
});

test('files without any extensions shouldnt be in rule and to equal false', () => {
  expect(regexp('image', /\.(jpe?g|png|pdf)$/i)).toBe(false);
});

test('', () => {
  expect(() => regexp([], /\.(jpe?g|png|pdf)$/i)).toThrow('str must have typeof string');
});

test('rule must be an instance of Regexp and otherwise should throw exception', () => {
  expect(() => regexp('doc.pdf', [])).toThrow('rule must be an instance of RegExp');
});

