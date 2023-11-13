const cron = require('node-cron');
const Reservation = require('./models/reservation');
const Appointment = require('./models/appointment');

async function expireReservations() {
    try {
        const thirtyMinutesAgo = new Date(new Date() - 30 * 60000);

        const reservations = await Reservation.find({
            status: 'reserved',
            reservedAt: { $lt: thirtyMinutesAgo }
        });

        for (const reservation of reservations) {
            reservation.status = 'expired';
            await reservation.save();

            const appointment = await Appointment.findById(reservation.appointment);
            if (appointment) {
                appointment.isAvailable = true;
                await appointment.save();
            }
        }
    } catch (error) {
        console.error('Error expiring reservations:', error);
    }
}

// Runs every 5 minutes to check expirations
cron.schedule('*/5 * * * *', expireReservations);
