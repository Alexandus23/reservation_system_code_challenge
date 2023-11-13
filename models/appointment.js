const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
