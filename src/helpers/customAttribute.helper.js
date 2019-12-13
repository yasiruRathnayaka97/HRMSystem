const {sqlHelper} = require('./sql.helper');
const {connection} = require('../db');

/** Class providing helper methods related to custm attributes */
class CustomAttribute {
  /**
   * Get custom attributes from the databaseb
   * @param {String} name - Name of the attribute
   * @param {String} type - Type of the attribute. One of text and select
   * @param {String} defaultValue - Default value for the attribute
   * @param {Array} allowed - Allowed values for enum types
   * @return {Boolean} Object with javascript key and
   */
  static create(name, type = 'text', defaultValue = null, allowed=[]) {
    if (type === 'text') {
      const attributeNames = ['attribute_name', 'type'];
      const query = sqlHelper.prepareForOneInsert(
          'custom_attribute', attributeNames,
      );

      return connection.execute(query, [
        name,
        type,
      ]).then((result) => {
        return true;
      });
    } else {
      throw new Error('Non-text type attributes not supported yet');
    }
  }

  /**
   * Get columns in the attribute_value table
   * @return {Array} columns - Return columns in the attribute_value table
   * table attribute_name
   */
  static get valueColumns() {
    return [
      'attribute_name',
      'value',
      'employee_record_id',
    ];
  }

  /**
   * Check if the given custom attribute exists
   * @param {String} attribute - Attribute name
   * @return {Boolean} - Return whether attribute is
   * table attribute_name
   */
  static has(attribute) {
    const customAttributes = this.attributes;
    return customAttributes.hasOwnProperty(attribute);
  }

  /**
   * Check if the given value is valid for the attribute
   * @param {String} attribute - Attribute name
   * @param {String} value - Value for the attribute
   * @return {Boolean} - Return whether the value is valid for the attribute
   */
  static allowed(attribute, value) {
    return true;
  }

  /**
   * Return array of custom attributes for insertion query
   * @param {Object} data - An object containging employee data
   * @return {Array} - Return an array for an insertion query
   */
  static extractForQuery(data) {
    customAttributes = [];
    Object.keys(data, (key) => {
      if (this.has(key) &&
                this.allowed(key, data[key])) {
        customAttributes.push(key, data[key], data.id);
      } else {
        throw new Error('Invalid custom data given');
      }
    });
    return customAttributes;
  }
}

module.exports = CustomAttribute;
