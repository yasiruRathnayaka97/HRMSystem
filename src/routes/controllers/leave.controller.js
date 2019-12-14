const LeaveService = require('../../services/absence.service');
const db = require('../../db');
/**
 *
 */
class LeaveController {
  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static async superviseLeave(req, res) {
    const {
      leaveId,
      supervisorId,
      status,
    } = req.body;

    const leaveService= new LeaveService(db);
    const leave = await leaveService.getById(leaveId);

    if (status === 'accept') {
      leaveService.approveLeave(leave, supervisorId);
    } else if (status === 'decline') {
      leaveService.declineLeave(leave, supervisorId);
    }
  }
}

export default LeaveController;
