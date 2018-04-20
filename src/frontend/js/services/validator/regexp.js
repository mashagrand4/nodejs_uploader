/**
 * @description Validates file name based on given regular expression
 * @param {string} str to validate
 * @param {RegExp} rule
 * @returns {boolean}
 */

export default (str, rule) => {
  if (typeof str !== 'string') {
    throw new Error('str must have typeof string');
  }

  if (!(rule instanceof RegExp)) {
    throw new Error('rule must be an instance of RegExp');
  }

  return rule.test(str);
};
