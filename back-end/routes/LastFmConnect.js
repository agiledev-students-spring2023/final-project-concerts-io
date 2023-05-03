const express = require('express');

const passport = require('passport');

const LastFmConnectRouter = express.Router();

LastFmConnectRouter.get('/',  (req, res, next) => {
  res.redirect(`https://www.last.fm/api/auth/?api_key=${process.env.LASTFM_API_KEY}&cb=${process.env.LASTFM_CALLBACK}/?userid=${req.query.userid}`);

});

module.exports = LastFmConnectRouter;
