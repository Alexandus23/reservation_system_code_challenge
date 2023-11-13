const Reservation = require('../models/reservation');
const Appointment = require('../models/appointment');

const ONE_MINUTE = 60000;
const MILLISECONDS_PER_HOUR = 3600000;

exports.reserveAppointment = async (req, res) => {
    try {
        const { appointmentId, clientName } = req.body;
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment || !appointment.isAvailable) {
            return res.status(400).send({ message: 'Appointment not available' });
        }

        const hoursUntilAppointment = (appointment.startTime - new Date()) / MILLISECONDS_PER_HOUR;
        if (hoursUntilAppointment < 24) {
            return res.status(400).send({ message: 'Reservations must be made at least 24 hours in advance' });
        }

        const newReservation = new Reservation({ appointment: appointmentId, clientName });
        await newReservation.save();

        appointment.isAvailable = false;
        await appointment.save();

        res.status(201).send({ message: 'Reservation created successfully', newReservation });
    } catch (error) {
        res.status(500).send({ message: 'Error creating reservation', error });
    }
};

exports.confirmReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).send({ message: 'Reservation not found' });
        }

        const timeElapsed = (new Date() - reservation.reservedAt) / ONE_MINUTE;
        if (timeElapsed > 30) {
            reservation.status = 'expired';
            await reservation.save();

            const appointment = await Appointment.findById(reservation.appointment);
            appointment.isAvailable = true;
            await appointment.save();

            return res.status(400).send({ message: 'Reservation expired' });
        }

        reservation.status = 'confirmed';
        await reservation.save();
        res.status(200).send({ message: 'Reservation confirmed', reservation });
    } catch (error) {
        res.status(500).send({ message: 'Error confirming reservation', error });
    }
};
