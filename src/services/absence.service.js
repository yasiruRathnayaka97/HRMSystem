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
   * @param {Number} requesterId
   * @return {Absence} leave
   * @throws
   */
  async approveLeave(leaveId, requesterId) {
    const absenceRepo = new AbsenceRepository(db);
    const leave = this.getById(leaveId);
    const employee = EmployeeRecordService.getById(leave.employeeRecordId);

    if (canModifyLeaveState(leave, requesterId) {
      leave.supervisor = requesterId;
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
   * @param {Number} requesterId
   * @return {Absence} leave
   */
  async declineLeave(leaveId, requesterId) {
    const leave = this.getById(leaveId);
  
    const absenceRepo = new AbsenceRepository(db);

    if (this.canApproveDeclineLeave(leave, requesterId)) {
      leave.supervisor = requesterId;
      leave.status = 'declined';
      await absenceRepo.save(leave);
      return leave;
    } else {
      throw new Error('Provided supervisorId does not belong to supervisor');
    }
  }

  /**
   * Check if the requester with {requesterID} can approve/decline leave
   * @param {Absence} leave 
   * @param {Number} requesterId 
   */
  async canApproveDeclineLeave(leave, requesterId){
    const employee = EmployeeRecordService.getById(leave.employeeRecordId);
    return (employee.supervisorId === requesterId);
  }
  async getLeaveInfo(supervisorId){
      availableLeave=getPaygradeLeaveCount(leaveId) - getTakenLeavesValue(leaveId);
              
      //TODO IMPLEMENT LEAVE INFO RETRIEVE
      return leveInfo;
  }
  async getLeaveStatus(employeeRecordId){
    var attr="status";
    const absenceRepo = new AbsenceRepository(this.db);
    return await absenceRepo.findOneByOne(attr,employeeRecordId);

  }
}

module.exports = AbsenceService;
