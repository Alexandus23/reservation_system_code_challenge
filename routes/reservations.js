const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.reserveAppointment);
router.post('/:id/confirm', reservationController.confirmReservation);

module.exports = router;
