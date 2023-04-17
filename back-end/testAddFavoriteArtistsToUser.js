require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/User');
const convertFavoriteArtistsToDocuments = require('./artistUtils');

mongoose
  .connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Sample favorite artists data
    const favoriteArtists = [{ name: 'Artist One' }, { name: 'Artist Two' }];

    // Convert the sample data to Artist documents
    const artistDocuments = await convertFavoriteArtistsToDocuments(favoriteArtists); // returns an array of artist ids

    // Find an existing user or create a new one
    const username = 'testUser';
    const email = 'test@example.com';
    const password = 'testPassword';

    let user = await User.findOne({ username });

    if (!user) {
      user = new User({ username, email, password });
    }

    // Add the artist documents to the user's favoriteArtists array
    user.favoriteArtists = user.favoriteArtists.concat(artistDocuments);

    // Save the updated user document to the database
    await user.save();

    // Print the updated user document
    console.log('Updated user document:', user);

    // Close the MongoDB connection
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
