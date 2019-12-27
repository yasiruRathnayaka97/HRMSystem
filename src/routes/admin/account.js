const AccountController = require('../controllers/admin/account.controller');
const express = require('express');
const router = express.Router();

router.get('/changejob', AccountController.changeJob);

module.exports = router;
