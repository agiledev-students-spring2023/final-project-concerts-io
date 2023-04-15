const Artist = require('./models/artist');

const convertFavoriteArtistsToDocuments = (favoriteArtists) =>
  favoriteArtists.map((artistData) =>
    new Artist({
      id: artistData.id,
      name: artistData.name,
      image: artistData.image,
    })
  );

module.exports = convertFavoriteArtistsToDocuments;