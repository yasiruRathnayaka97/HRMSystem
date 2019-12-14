/**
 * Absence Service
 */
const AbsenceRepository = require('../repositories/absence.repository');
const Absence = require('../models/absence.model');
/**
 *
 */
class AbsenceService {
  /**
   *
   * @param {Object} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {Number} id
   */
  async getById(id) {
    const absenceRepo = new AbsenceRepository(db);
    const result = await absenceRepo.find({
      id: id,
    });
    return new Absence(result[0][0]);
  }

  /**
   * Approve leave by supervisor
   * @param {Absence} leave
   * @param {EmployeeRecord} supervisor
   * @return {Absence} leave
   */
  async approveLeave(leave, supervisor) {
    const absenceRepo = new AbsenceRepository(db);
    leave.supervisor = supervisor;
    leave.status = 'approved';
    await absenceRepo.save(leave);
    return leave;
  }

  /**
   * Decline leave by supervisor
   * @param {Absence} leave
   * @param {EmployeeRecord} supervisor
   * @return {Absence} leave
   */
  async declineLeave(leave, supervisor) {
    const absenceRepo = new AbsenceRepository(db);
    leave.supervisor = supervisor;
    leave.status = 'declined';
    await absenceRepo.save(leave);
    return leave;
  }
}

export default AbsenceService;
