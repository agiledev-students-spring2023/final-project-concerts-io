const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: Date,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: Image,
        required: true
    },
    ticketLink: {
        type: String,
        required: true
    }
});

const Concert = mongoose.model('Concert', concertSchema);

module.exports = Concert;
