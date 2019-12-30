const LeaveController = require('./controllers/leave.controller');
const express = require('express');
const router = express.Router();

router.post('/supervise', LeaveController.superviseLeave);
router.post('/leaveInfo',LeaveController.getLeaveInfo);
router.post('/leaveStatus',LeaveController.getLeaveStatus);
module.exports = router;
