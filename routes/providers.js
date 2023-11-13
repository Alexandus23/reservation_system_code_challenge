const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

router.post('/schedule', providerController.createSchedule);
router.post('/', providerController.createProvider);

module.exports = router;
