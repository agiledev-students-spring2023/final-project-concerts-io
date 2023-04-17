const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const Artist = require('../models/Artist');
const Concert = require('../models/Concert');

const FavoriteArtistsRouter = express.Router();

const backupData = [
  {
    id: 1,
    name: 'Josh Minksy',
  },
  {
    id: 2,
    name: 'Mindy Wu',
  },
];

FavoriteArtistsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { user } = req; // get user
    try {
      await user.populate('favoriteArtists'); // populate favoriteArtists with actual artist docs
      console.log(user.favoriteArtists);
      res.status(200).json(user.favoriteArtists);
    } catch (error) {
      console.error('Database Error: ', error.message);
      res.status(500).json(backupData);
    }
  }
);

module.exports = FavoriteArtistsRouter;
