const {camelCase} = require('lodash');

/**
 *
 */
class Absence {
  /**
     *
     * @param {*} data
     */
  constructor(data) {
    for (const key of Object.keys(data)) {
      this[camelCase(key)] = data[key];
    }
    Object.seal(this);
  }
}

module.exports = Absence;
