const express = require('express');
const axios = require('axios');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User.js');
const Artist = require('../models/Artist.js');
const { getSession, getSignature } = require('../lastfmHelperFunctions');

const LastFmCallbackRouter = express.Router();

LastFmCallbackRouter.get('/', async (req, res, next) => {
  //   application requests refresh and access tokens
  const token = req.query.token || null;
  if (token === null) {
    res.redirect(
      401,
      `${process.env.FRONT_END_DOMAIN}/connection?${new URLSearchParams({
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
    const topartists = response.data.topartists.artist;
    const artistDocuments = topartists.map((artist) => {
      const value = new Artist({
        name: artist.name,
      });
      value.save();
      return value;
    });

    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(req.query.userid) });
    user.favoriteArtists = artistDocuments;
    await user.save();

    res.redirect(`${process.env.FRONT_END_DOMAIN}/profile?sessionKey=${sessionKey}`);
  }
});

module.exports = LastFmCallbackRouter;
