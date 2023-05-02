const express = require('express');

const passport = require('passport');

const ManualEntryRouter = express.Router();

const Artist = require('../models/Artist')

ManualEntryRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const {artists} = req.body;
    console.log(req)

    if (!artists) {
      res
        .status(406)
        .json({ success: false, message: `Error: No artists supplied.`, error: 'Error' });
    } else {
      try {
        const filteredArtists = artists.filter((x) => x !== '')
        const artistDocuments = filteredArtists.map((artist) => {
            const value = new Artist({
              name: artist,
            });
            value.save();
            return value;
          });
          req.user.favoriteArtists = artistDocuments;
          await req.user.save();
          res.status(200).send();
      } catch (err) {
        // throw an error
        console.error(err);
        res.status(500).json({
          success: false,
          message: `Error saving New artists`,
          error: err,
        });
      }
    }
  }
);

module.exports = ManualEntryRouter;
