const BaseRepository = require('../db/common/baseRepository');

/**
 * Employee Account Repository
 */
class EmployeeAccountRepository extends BaseRepository {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    super(db, 'employee_account');
  }
}

module.exports = EmployeeAccountRepository;
