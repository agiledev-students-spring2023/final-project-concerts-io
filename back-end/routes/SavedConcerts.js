const express = require('express');
const axios = require('axios');
const passport = require('passport');

const SavedConcertsRouter = express.Router();

SavedConcertsRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { user } = req; // get user
  try {
    await user.populate('savedConcerts'); // populate favoriteArtists with actual artist docs
    console.log(user.savedConcerts);
    res.status(200).json(user.savedConcerts);
  } catch (err) {
    console.error('Database Error: ', err.message);
    return res.status(500).json({
      success: false,
      message: 'Error finding saved concerts data.',
      error: err,
    });
  }
});

module.exports = SavedConcertsRouter;
