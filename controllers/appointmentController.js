const Appointment = require('../models/appointment');

exports.listAvailableAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ isAvailable: true });
        res.status(200).send(appointments);
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving appointments', error });
    }
};
