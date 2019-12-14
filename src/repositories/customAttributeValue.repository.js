const BaseRepository = require('../db/common/baseRepository');
const CustomAttributeRepository = require('./customAttribute.repository');
const valueColumns = require('../helpers/customAttribute.helper').valueColumns;
const prepareForInsert =
  require('../helpers/attribute.helper').prepareForInsert;
const camelCase = require('lodash').camelCase;

/**
 * Custom Attribute Repository
 */
class CustomAttributeValueRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'custom_attribute_value');
  }

  /**
   * @param {*} recordId
   * @param {*} object
   */
  async createMany(recordId, object) {
    query = prepareForInsert('custom_attribute_value',
        valueColumns,
        objects.length,
    );
    object.name, object.value;
    flat = [];

    const attributeRepo = new CustomAttributeRepository(this.db);
    const attributes = await attributeRepo.getAttributes();
    for (const attribute of attributes) {
      flat.push(id, attribute, object[camelCase(attribute)]);
    }

    await this.db.execute(query, flat);
    return customAttributes;
  }
}

export default CustomAttributeValueRepository;