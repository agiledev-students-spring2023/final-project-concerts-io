const express = require('express');
const passport = require('passport');

const FavoriteArtistsRouter = express.Router();
const axios = require('axios');

const API_URL = 'https://my.api.mockaroo.com/artists.json?key=54687d90';

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
      const response = await axios.get(API_URL);
      console.log(response);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error from API: ', error.message);
      res.status(500).json(backupData);
    }
  }
);

module.exports = FavoriteArtistsRouter;
