export default class Validator {
  constructor() {
    this.errors = [];
  }

  /**
   * @description Validates file name based on given regular expression
   * @param {string} str to validate
   * @param {RegExp} rule
   * @returns {boolean}
   */
  static regexp(str, rule) {
    if (!(rule instanceof RegExp)) {
      throw new Error('rule must be an instance of RegExp');
    }
    return rule.test(str);
  }

  /**
   * @description Validates file size based on given max size
   * @param {File} value
   * @param {number} min min file size (default 0)
   * @param {number} max max file size default (5 mb)
   * @returns {boolean}
   */
  static range(value, min = 0, max = 1024 * 1024 * 5) {
    if (typeof value !== 'number') {
      throw new Error('value must be a number');
    }
    return value < max && value > min;
  }

  /**
   * @description Validates file mime type on given array with allowed types
   * @param {File} file
   * @param {Array} types array of allowed mime types
   * @returns {boolean}
   */
  static type(file, types = []) {
    if (!(file instanceof File)) {
      throw new Error('file must be an instance of File');
    }
    return types.includes(file.type);
  }
}
