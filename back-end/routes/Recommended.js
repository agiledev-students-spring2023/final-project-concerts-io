const express = require('express');
const passport = require('passport');

const RecommendedRouter = express.Router();

const axios = require('axios');

RecommendedRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const response = await axios.get(
      `https://my.api.mockaroo.com/concerts.json?key=${process.env.CONCERTS_API_KEY}`
    );
    const { data } = response;
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

module.exports = RecommendedRouter;
