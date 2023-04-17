const Artist = require('./models/Artist');

const convertFavoriteArtistsToDocuments = async (favoriteArtists) => {
  const artistIds = [];
  for (let i = 0; i < favoriteArtists.length; i++) {
    const artist = favoriteArtists[i];
    const artistDoc = new Artist(artist);
    await artistDoc.save();
    artistIds.push(artistDoc._id);
  }
  return artistIds;
};

module.exports = convertFavoriteArtistsToDocuments;
