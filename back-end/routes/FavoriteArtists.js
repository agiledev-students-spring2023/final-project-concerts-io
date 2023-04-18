const express = require('express');
const passport = require('passport');
const User = require('../models/User.js');
const Artist = require('../models/Artist.js');

const mongoose = require('mongoose');
const FavoriteArtistsRouter = express.Router();
const axios = require('axios');

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
    try {
      // console.log(req.user)
      const response = await User.findOne({_id:new mongoose.Types.ObjectId(req.user._id)});
      const artists = await Artist.find({_id:response.favoriteArtists})
      console.log(artists);
      res.send(artists)
    } catch (error) {
      console.error('Error from API: ', error.message);
      res.status(500).json(backupData);
    }
  }
);

module.exports = FavoriteArtistsRouter;
