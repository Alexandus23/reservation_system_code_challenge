const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const providerRoutes = require('./routes/providers');
const appointmentRoutes = require('./routes/appointments');
const reservationRoutes = require('./routes/reservations');

const app = express();

require('./backgroundJobs'); 

mongoose.connect('mongodb://localhost:27017/reservationSystem', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/api/providers', providerRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reservations', reservationRoutes);

app.use((err, req, res, next) => {
    res.status(500).send({ message: `Error encountered: ${err.message}` });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
