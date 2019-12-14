const RecordController = require('./controllers/record.controller');
const express = require('express');
const router = express.Router();

router.post('/create', RecordController.create);
module.exports = router;
