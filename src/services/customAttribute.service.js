const CustomAttributeRepository =
  require('../repositories/customAttribute.repository');
/**
 * Custom Attribute Service
 */
class CustomAttributeService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   */
  async getAttributes() {
    const customAttributeRepo = new CustomAttributeRepository(this.db);
    return await customAttributeRepo.getAttributes();
  }
}

export default CustomAttributeService;


