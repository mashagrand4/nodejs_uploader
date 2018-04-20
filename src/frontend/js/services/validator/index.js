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
    rangeValidation(value);
  }

  static regexp(str, rule) {
    regexpValidation(str, rule);
  }

  static type(needle, haystack) {
    typeValidation(needle, haystack);
  }
}
