const express = require('express');
const passport = require('passport');

const FavoriteArtistsRouter = express.Router();

FavoriteArtistsRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { user } = req; // get user
    try {
      await user.populate('favoriteArtists'); // populate favoriteArtists with actual artist docs
      console.log(user.favoriteArtists);
      res.status(200).json(user.favoriteArtists);
    } catch (err) {
      console.error('Database Error: ', err.message);
      return res.status(500).json({
        success: false,
        message: 'Error finding favorite artists data.',
        error: err,
      });
    }
  }
);

module.exports = FavoriteArtistsRouter;
