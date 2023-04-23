const express = require('express');

const ReccomendedRouter = express.Router();

const axios = require('axios');
const morgan = require('morgan');
const passport = require('passport');

const User = require('../models/User');
const Artist = require('../models/Artist');
const Concert = require('../models/Concert');
const { error } = require('../config/jwt-config');



ReccomendedRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      // Extract search criteria from URL parameter
      const { user } = req;
      await user.populate('favoriteArtists'); // populate favoriteArtists with actual artist docs
      const {favoriteArtists} = user;
      const artist = favoriteArtists
      const delay = (ms = 100) => new Promise((r) => setTimeout(r, ms));
      const getAllArtists = async function (items) {
        const results = [];
        for (let index = 0; index < items.length; index++) {
          await delay();
          const res = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
            params: {
            apikey: process.env.TICKETMASTER_API_KEY,
            keyword: artist[index].name
          },});
          if(res.data._embedded !== undefined){
            results.push(res.data._embedded.events);
          }
        }
        return results;
      };
      const responses = await getAllArtists(artist)
      const allFormattedEvents = responses.map(events => 
          events.map((concert) => ({
          ticketMasterId: concert.id ?? ' ',
          name: concert.name ?? ' ',
          artist: concert.name ?? ' ',
          date: concert.dates.start.localDate ?? ' ',
          description: concert.info ?? ' ',
          location: concert._embedded.venues[0].city.name ?? ' ',
          image: concert.images !== null ? concert.images[0].url : ' ',
          ticketLink: concert.events !== null ? concert.url : ' ',
      }))
      )
      const flattenedArray = [].concat.apply([], allFormattedEvents);
      res.json(flattenedArray);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: 'Error finding artist data.',
        error: err,
      });
    }
  }
);

module.exports = ReccomendedRouter;