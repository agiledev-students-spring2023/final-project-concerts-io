const express = require('express');
const passport = require('passport');

const SaveConcertRouter = express.Router();
const Concert = require('../models/Concert.js');

SaveConcertRouter.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const data = req.body;

    const newConcert = await new Concert({
      ticketmasterID: data.ticketmasterID,
      name: data.name,
      artist: data.artist,
      date: data.date,
      description: data.name,
      location: data.location,
      image: data.image,
      ticketLink: data.ticketLink,
    }).save();
    req.user.savedConcerts.push(newConcert);
    await req.user.save();
    res.status(200).send();
  } catch (err) {
    // throw an error
    console.error(err);
    res.json(err);
  }
});

module.exports = SaveConcertRouter;
