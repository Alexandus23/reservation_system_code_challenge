const Provider = require('../models/provider');
const Appointment = require('../models/appointment');

const ONE_MINUTE = 60000;

exports.createSchedule = async (req, res) => {
    try {
        const { providerId, startTime, endTime } = req.body;

        const provider = await Provider.findById(providerId);
        if (!provider) {
            return res.status(404).send({ message: 'Provider not found' });
        }

        let timeSlots = [];
        let start = new Date(startTime);
        const end = new Date(endTime);

        while (start < end) {
            let slotEnd = new Date(start.getTime() + 15 * ONE_MINUTE);
            if(slotEnd > end) slotEnd = end;

            timeSlots.push({ provider: providerId, startTime: new Date(start), endTime: new Date(slotEnd), isAvailable: true });
            start = new Date(slotEnd.getTime());
        }
        await Appointment.insertMany(timeSlots);

        res.status(201).send({ message: 'Schedule created successfully with 15-minute slots', timeSlots });
    } catch (error) {
        res.status(500).send({ message: 'Error creating schedule', error: error.message });
    }
};

exports.createProvider = async (req, res) => {
    try {
        const newProvider = new Provider(req.body);
        await newProvider.save();
        res.status(201).send({ message: 'Provider created successfully', newProvider });
    } catch (error) {
        res.status(500).send({ message: 'Error creating provider', error: error.message });
    }
};