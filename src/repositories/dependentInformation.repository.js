const BaseRepository = require('../db/common/baseRepository');

/**
 * Custom Attribute Repository
 */
class DependentInformationRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'dependent_information');
  }

}

module.exports = DependentInformationRepository;
