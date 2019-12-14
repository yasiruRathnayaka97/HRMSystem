/**
 * Dependent Model
 */
class Dependent {
  /**
     *
     * @param {*} data
     */
  constructor(data) {
    Object.assign(this, data);
    Object.seal(this);
  }
}

export default Dependent;
