const express = require('express');

const ArtistRouter = express.Router();

const mongoose = require('mongoose');

const passport = require('passport');

const Artist = require('../models/Artist');

ArtistRouter.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(400).json({
        success: false,
        message: 'Artist not found',
        error: 'Artist not found'
      });
    }

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).json({
        success: false,
        message: 'Invalid artist id',
        error: 'Invalid artist id'
      });
    }

    res.json(artist);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error finding artist data.',
      error: err,
    });
  }
});

module.exports = ArtistRouter;
