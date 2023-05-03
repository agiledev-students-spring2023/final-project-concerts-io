const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');

const helpers = require('../spotifyHelperFunctions');
const Artist = require('../models/Artist');
const User = require('../models/User');

const SpotifyCallbackRouter = express.Router();

SpotifyCallbackRouter.get('/', async (req, res, next) => {
  // application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  if (state === null) {
    res.redirect(
      401,
      `${process.env.FRONT_END_DOMAIN}/connection?${new URLSearchParams({
        error: 'authentication',
      }).toString()}`
    );
  } else {
    const data = await helpers.getToken(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      code,
      process.env.REDIRECT_URI
    );
    const { access_token } = data;
    const { refresh_token } = data;
    // get favorite artists
    try {
      const response = await helpers.useAccessToken(
        'https://api.spotify.com/v1/me/top/artists',
        access_token
      );
      if (response == 'error') {
        res.redirect(
          401,
          `${process.env.FRONT_END_DOMAIN}/connection?${new URLSearchParams({
            error: 'notRegistered',
          }).toString()}`
        );
      } else {
        const favArtists = response.items.slice(0, 20);
        const artistDocuments = favArtists.map((artist) => {
          const value = new Artist({
            name: artist.name,
          });
          value.save();
          return value;
        });

        const user = await User.findOne({ _id: new mongoose.Types.ObjectId(state) });
        user.favoriteArtists = artistDocuments;
        await user.save();

        res.redirect(`${process.env.FRONT_END_DOMAIN}/profile`);
      }
    } catch (err) {
      console.error(err);
      res.redirect(
        401,
        `${process.env.FRONT_END_DOMAIN}/connection?${new URLSearchParams({
          error: 'authentication',
        }).toString()}`
      );
    }
  }
});

module.exports = SpotifyCallbackRouter;
