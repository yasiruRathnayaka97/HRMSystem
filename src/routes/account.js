const AccountController = require('./controllers/account.controller');
const express = require('express');
const router = express.Router();

router.post('/create', AccountController.create);

module.exports = router;
