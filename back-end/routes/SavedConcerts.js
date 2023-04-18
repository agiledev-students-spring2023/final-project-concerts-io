const express = require('express');
const axios = require('axios');
const passport = require('passport');

const SavedConcertsRouter = express.Router();


const backupData = [
  {
    id: 1,
    name: 'Example Concert 1',
    artist: 'Example Artist 1',
    date: 'Example Date 1',
    location: 'Example Venue 1',
    image: 'https://example.com/image1.jpg',
    link: 'http://localhost:3000/concerts/1',
  },
  {
    id: 2,
    name: 'Example Concert 2',
    artist: 'Example Artist 2',
    date: 'Example Date 2',
    location: 'Example Venue 2',
    image: 'https://example.com/image2.jpg',
    link: 'http://localhost:3000/concerts/2',
  },
];

SavedConcertsRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
      const { user } = req; // get user
      try {
        await user.populate('savedConcerts'); // populate favoriteArtists with actual artist docs
        console.log(user.savedConcerts);
        res.status(200).json(user.savedConcerts);
      } catch (error) {
        console.error('Database Error: ', error.message);
        res.status(500).json(backupData);
      }
    }
  );

module.exports = SavedConcertsRouter;
