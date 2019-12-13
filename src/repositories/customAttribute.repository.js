const BaseRepository = require('../db/common/baseRepository');

/**
 * Custom Attribute Repository
 */
class CustomAttributeRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'custom_attribute');
  }

  /**
   *
   */
  async getAttributes() {
    if (this.constructor.attributes) {
      return this.constructor.attributes;
    }
    const result = await this.db.execute('SELECT name FROM custom_attribute');
    const attributes = result[0];
    this.constructor.customAttributes = attributes;
    return attributes;
  }
}


module.exports = CustomAttributeRepository;
