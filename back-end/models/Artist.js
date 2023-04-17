const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  artistName: {
    type: String,
    required: true,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
