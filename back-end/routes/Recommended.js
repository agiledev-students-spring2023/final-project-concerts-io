const express = require('express');

const ReccomendedRouter = express.Router();

const axios = require('axios');
const morgan = require('morgan');
const passport = require('passport');

const User = require('../models/User');
const Artist = require('../models/Artist');
const Concert = require('../models/Concert');




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
     
      // Call the Ticketmaster API with search criteria
      const apiMethod = async function(n, callback) {
        try {
          // Call your api here (or whatever thing you want to do) and assign to result.
          const artist = favoriteArtists.name[n]
          const result = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
            params: {
              apikey: process.env.TICKETMASTER_API_KEY,
              keyword: artist,
            },
          });
          if(result.data._embedded !== undefined){
            return result 
          }
          else{
            callback(n+1, result);
          }
        } catch (err) {
          callback(err);
        }
      };
      const result = async.retry({times: 3, interval: 200}, apiMethod, function(err, result) {
        if (err) {
          throw err; // Error still thrown after retrying N times, so rethrow.
        }
      });
      const response = 
    
      // Filter and format API response
      
      let events = null
      if(response.data._embedded !== undefined){
        events = response.data._embedded.events
        if (events !== null){
          const formattedEvents = events.map((concert) => ({
          ticketMasterId: concert.id ?? ' ',
          name: concert.name ?? ' ',
          artist: concert.name ?? ' ',
          date: concert.dates.start.localDate ?? ' ',
          description: concert.info ?? ' ',
          location: concert._embedded.venues[0].city.name ?? ' ',
          image: concert.images !== null ? concert.images[0].url : ' ',
          ticketLink: concert.events !== null ? concert.url : ' ',
          }));
          console.log(formattedEvents)
          res.json(formattedEvents);
        }

      }
      else{
        res.json()
      }
      // Send formatted search results to the client
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