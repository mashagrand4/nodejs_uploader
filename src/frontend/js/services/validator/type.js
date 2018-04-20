/**
 * @param {string} needle what we search
 * @param  {Array} haystack array in which we search
 * @returns {boolean} is needle presents in array
 */

export default (needle = '', haystack = []) => {
  if (typeof needle !== 'string') {
    throw new Error('needle must have typeof string');
  }

  if (!(haystack instanceof Array)) {
    throw new Error('haystack must be an instance of Array');
  }

  return haystack.includes(needle);
};
