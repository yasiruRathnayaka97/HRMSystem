const BaseRepository = require('../db/common/baseRepository');

/**
 * Custom Attribute Repository
 */
class BranchRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'branch');
  }

}

module.exports = BranchRepository;
