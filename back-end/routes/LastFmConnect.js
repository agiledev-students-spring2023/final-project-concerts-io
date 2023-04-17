const express = require('express');

const passport = require('passport');

const LastFmConnectRouter = express.Router();

LastFmConnectRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  console.log(req.user.body);
  res.redirect(`https://www.last.fm/api/auth/?api_key=${process.env.LASTFM_API_KEY}&cb=${process.env.LASTFM_CALLBACK}&userId=${req.user._id}`);

});

module.exports = LastFmConnectRouter;
