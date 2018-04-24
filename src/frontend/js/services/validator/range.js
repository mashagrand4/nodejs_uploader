/**
 * @description Validates file size based on given max size
 * @param {File} value
 * @param {number} min min file size (default 0)
 * @param {number} max max file size default (5 mb)
 * @returns {boolean}
 */

export default (value, min = 0, max = 1024 * 1024 * 5) => {
  if (typeof value !== 'number') {
    throw new Error('value must be a number');
  }

  return value < max && value > min;
};
