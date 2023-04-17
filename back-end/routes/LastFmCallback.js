const express = require('express');
const axios = require('axios');
const passport = require('passport');
const { getSession, getSignature } = require('../lastfmHelperFunctions');

const LastFmCallbackRouter = express.Router();

LastFmCallbackRouter.get('/', async (req, res, next) => {
  //   application requests refresh and access tokens
  const token = req.query.token || null;
  if (token === null) {
    res.redirect(
      401,
      `http://localhost:3001/connection?${new URLSearchParams({
        error: 'authentication',
      }).toString()}`
    );
  } else {
    const signature = getSignature(token);
    const session = await getSession(token, signature);
    const sessionKey = session.session.key;

    // get favorite artists
    const response = await axios('http://ws.audioscrobbler.com/2.0/', {
      params: {
        api_key: process.env.LASTFM_API_KEY,
        method: 'user.gettopartists',
        sk: sessionKey,
        format: 'json',
      },
    });

    // solution #1, somehow in the callback, pass userID
    // solution #2, put the userID in the cookie

    res.redirect(`http://localhost:3001/profile?sessionKey=${sessionKey}`);
  }
});

module.exports = LastFmCallbackRouter;
