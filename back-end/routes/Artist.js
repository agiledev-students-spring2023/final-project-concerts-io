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
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Error finding artist data.',
      error: err,
    });
  }
});

module.exports = ArtistRouter;
