const BaseRepository = require('../db/common/baseRepository');

/**
 * Absence Repository
 */
class AbsenceRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'absence');
  }
}

module.exports = AbsenceRepository;
