const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    reservedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['reserved', 'confirmed', 'expired'],
        default: 'reserved'
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
