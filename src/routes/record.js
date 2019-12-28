const RecordController = require('./controllers/record.controller');
const express = require('express');
const router = express.Router();

router.post('/create', RecordController.create);
router.get('/:id', RecordController.view);
module.exports = router;
