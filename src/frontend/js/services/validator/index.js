import rangeValidation from './range';
import regexpValidation from './regexp';
import typeValidation from './type';

export default class Validator {
  constructor() {
    this.errors = [];
  }

  clear() {
    this.errors = [];
  }

  static range(value) {
    return rangeValidation(value);
  }

  static regexp(str, rule) {
    return regexpValidation(str, rule);
  }

  static type(needle, haystack) {
    return typeValidation(needle, haystack);
  }
}
