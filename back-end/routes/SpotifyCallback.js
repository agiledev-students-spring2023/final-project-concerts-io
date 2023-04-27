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
    const response = await helpers.useAccessToken(
      'https://api.spotify.com/v1/me/top/artists',
      access_token
    );
    console.log(response.items);
    console.log(state);
    const favArtists = response.items.slice(0, 20);
    // use userid from state to find user and then add favartists to user
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
});

module.exports = SpotifyCallbackRouter;
