const express = require('express');

const ArtistRouter = express.Router();

const axios = require('axios');

const passport = require('passport');

const User = require('../models/User');
const Artist = require('../models/Artist');
const Concert = require('../models/Concert');

ArtistRouter.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // eslint-disable-next-line no-console
    console.log(req.params);
    const artist = await Artist.findById(req.params.id);

    res.json(artist);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    const exampleArtist = [
      {
        id: 1,
        name: 'John Smith',
      },
    ];

    res.json(exampleArtist);
  }
});

module.exports = ArtistRouter;
