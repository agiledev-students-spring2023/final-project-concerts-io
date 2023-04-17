const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    artistName: {
        type: String,
        required: true
    }
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
