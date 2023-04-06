const express = require('express');
const helpers = require('../helperFunctions');

const SpotifyCallbackRouter = express.Router();

SpotifyCallbackRouter.get('/', async (req, res, next) => {
  // application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  console.log(code, state);
  if (state === null) {
    res.redirect(
      401,
      `http://localhost:3001/connection?${new URLSearchParams({
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
    console.log(data);
    const { access_token } = data;
    const { refresh_token } = data;

    // get favorite artists
    const response = await helpers.useAccessToken(
      'https://api.spotify.com/v1/me/top/artists',
      access_token
    );
    const favArtists = response.items;
    console.log(favArtists);
    res.redirect('http://localhost:3001/profile');
    // send normal json response to react app that tells it where to redirect
  }
});

module.exports = SpotifyCallbackRouter;
