const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
