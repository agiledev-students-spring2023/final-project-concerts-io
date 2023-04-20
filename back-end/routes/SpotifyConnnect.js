const express = require('express');
const helpers = require('../spotifyHelperFunctions');

const SpotifyConnectRouter = express.Router();

SpotifyConnectRouter.get('/', (req, res, next) => {
  const state = req.query.userid;

  // requests authorization
  const scope =
    'user-top-read user-library-read user-read-private user-read-email user-top-read playlist-modify-private playlist-modify-public';
  res.redirect(
    `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id: process.env.CLIENT_ID,
      scope,
      redirect_uri: `${process.env.REDIRECT_URI}`,
      state,
    }).toString()}`
  );
  // pass user to state
});

module.exports = SpotifyConnectRouter;
