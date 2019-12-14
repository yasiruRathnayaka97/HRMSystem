const DependentRepository = require('../repositories/dependent.repository');
const Dependent = require('../models/dependent.model');
/**
 * Dependent Service
 */
class DependentService {
  /**
   * Creates a DependentService object
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Get dependent objects that belongs to a record
   * @param {*} recordId
   */
  async getDependents(recordId) {
    const dependentRepo = new DependentRepository(db);
    const result = await dependentRepo.find({
      employee_record_id: recordId,
    });

    dependents = [];

    for (const tuple of result[0]) {
      dependents.push(new Dependent(tuple));
    }

    return dependents;
  }
}

export default DependentService;
