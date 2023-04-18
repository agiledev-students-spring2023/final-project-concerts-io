const express = require('express');

const SpotifyMiddleRouter = express.Router();

const passport = require('passport');

SpotifyMiddleRouter.get('/', async (req, res,next) => {
    req.body.access_token = req.query.access_token
    res.redirect("http://localhost:3001/profile")

});

module.exports = SpotifyMiddleRouter;
