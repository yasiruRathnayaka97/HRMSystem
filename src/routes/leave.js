import LeaveController from './controllers/leave.controller';

const express = require('express');
const router = express.Router();

router.post('/create', LeaveController.superviseLeave);

module.exports = router;
