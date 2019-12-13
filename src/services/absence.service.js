/**
 * Absence Service
 */
import AbsenceRepository from
  '../repositories/absence.repository';
import Absence from '../models/absence.model';
/**
 *
 */
class AbsenceService {
  /**
   *
   * @param {*} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {*} id
   */
  async getById(id) {
    const absenceRepo = new AbsenceRepository(db);
    const result = await absenceRepo.find({
      id: id,
    });
    return new Absence(result[0][0]);
  }

  /**
   * Approve Leave by supervisor
   * @param {Absence} leave
   * @param {EmployeeRecord} supervisor
   * @return {Objet} leave
   */
  approveLeave(leave, supervisor) {
    const absenceRepo = new AbsenceRepository(db);
    leave.supervisor = supervisor;
    leave.status = 'approved';
    absenceRepo.save(leave);
    return leave;
  }

  /**
   * Decline Leave by supervisor
   * @param {*} leave
   * @param {*} supervisor
   * @return {Objet} leave
   */
  declineLeave(leave, supervisor) {
    const absenceRepo = new AbsenceRepository(db);
    leave.supervisor = supervisor;
    leave.status = 'declined';
    absenceRepo.save(leave);
    return leave;
  }
}

export default AbsenceService;
