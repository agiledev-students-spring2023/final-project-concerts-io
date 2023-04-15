const express = require('express');

const TicketMasterManyRouter = express.Router();

const axios = require('axios');
const morgan = require('morgan');
const passport = require('passport');

// get multiple concerts from ticket master api
TicketMasterManyRouter.get(
  '/',
  morgan('dev'),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    // dummy place holder query that gets multiple concerts
    try {
      const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
        params: {
          apikey: process.env.TICKETMASTER_API_KEY,
          segmentName: 'Music',
        },
      });

      const { events } = response.data._embedded;

      const eventsMapped = events.map((concert) => ({
        id: concert.id ?? ' ',
        name: concert.name ?? ' ',
        artist: concert.name ?? ' ',
        date: concert.dates.start.localDate ?? ' ',
        description: concert.info ?? ' ',
        location: concert._embedded.venues[0].city.name ?? ' ',
        image: concert.images !== null ? concert.images[0].url : ' ',
        ticketLink: concert.events !== null ? concert.url : ' ',
      }));

      res.json(eventsMapped);
    } catch (err) {
      console.log(`Get Nae Naed--No Data For you`);
      console.error(err);
    }
  }
);

module.exports = TicketMasterManyRouter;
