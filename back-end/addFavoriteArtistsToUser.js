const User = require('./models/user');
const Artist = require('./models/artist');
const convertFavoriteArtistsToDocuments = require('./artistUtils');

async function addFavoriteArtistsToUser(userId, favoriteArtists) {
  // Convert the favorite artists to artist documents
  const artistDocuments = convertFavoriteArtistsToDocuments(favoriteArtists);

  // Save the artist documents to the database
  const savedArtists = await Artist.insertMany(artistDocuments);

  // Find the user by userId and update their favorite artists array
  await User.findByIdAndUpdate(userId, {
    $addToSet: { favoriteArtists: { $each: savedArtists.map(artist => artist._id) } },
  });

  // If necessary, return the updated user
  const updatedUser = await User.findById(userId).populate('favoriteArtists');
  return updatedUser;
}

// Example usage:
// const userId = 'your user id here';
// const favoriteArtists = [
//   {
//     id: 1,
//     name: 'Artist 1',
//     image: 'artist1.jpg',
//     // other fields
//   },
//   // other artists
// ];

// addFavoriteArtistsToUser(userId, favoriteArtists)
//   .then(updatedUser => console.log(updatedUser))
//   .catch(err => console.error(err));
