const Artist = require('./models/Artist');

const convertFavoriteArtistsToDocuments = (favoriteArtists) =>
  favoriteArtists.map((artistData) =>
    new Artist({
      id: artistData.id,
      artistName: artistData.artistName,
    })
  );

module.exports = convertFavoriteArtistsToDocuments;