/**
 * Absence Service
 */
const AbsenceRepository = require('../repositories/absence.repository');
const EmployeeRecordService =
  require('../services/employeeRecord.service');
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
   * Attempts to approve leave using supervisorId
   * @param {Number} leaveId
   * @param {Number} supervisorId
   * @return {Absence} leave
   * @throws 
   */
  async approveLeave(leaveId, supervisorId) {
    const absenceRepo = new AbsenceRepository(db);
    const leave = this.getById(leaveId);
    const employee = EmployeeRecordService.getById(supervisorId);

    if (employee.supervisorId === supervisorId) {
      leave.supervisor = supervisorId;
      leave.status = 'approved';
      await absenceRepo.save(leave);
      return leave;
    } else {
      throw new Error('Provided supervisorId does not belong to supervisor');
    }
  }

  /**
   * Attempts to decline leave using
   * @param {Number} leaveId
   * @param {Number} supervisorId
   * @return {Absence} leave
   */
  async declineLeave(leaveId, supervisorId) {
    const leave = this.getById(leaveId);
    const employee = EmployeeRecordService.getById(supervisorId);

    const absenceRepo = new AbsenceRepository(db);

    if (employee.supervisorId === supervisorId) {
      leave.supervisor = supervisorId;
      leave.status = 'declined';
      await absenceRepo.save(leave);
      return leave;
    } else {
      throw new Error('Provided supervisorId does not belong to supervisor');
    }

  }
  async getLeaveInfoAll(supervisorId){
  const absenceRepo = new AbsenceRepository(this.db);
      return await leveInfoAll;
  }
  async getLeaveInfo(employeeRecordId){
    const absenceRepo = new AbsenceRepository(this.db);
    return await absenceRepo.getLeaveInfo(employeeRecordId);

  }
  async isAvailableLeave(id,type){
    const absenceRepo = new AbsenceRepository(this.db);
    return await absenceRepo.isAvailableLeave(id,type);
  }

  async applyLeave(id,type,from,to,comment){
    const absenceRepo = new AbsenceRepository(this.db);
    var stmt=await this.isAvailableLeave(id,type);
    if (stmt==true){
    var stmt=await absenceRepo.applyLeave(id,type,from,to,comment);
    if (stmt=='err'){
    return "can not apply 2 leaves for same period";
    }
    return "Request Pending.";
    }
    else{
      return "No left Leaves for This type.";
    }
  }
}

module.exports = AbsenceService;
