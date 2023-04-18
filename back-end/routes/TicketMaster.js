const express = require('express');

const TicketMasterRouter = express.Router();

const axios = require('axios');
const morgan = require('morgan');
const passport = require('passport');

// get single concert from ticket master api
TicketMasterRouter.get(
  '/:id',
  morgan('dev'),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const response = await axios(`https://app.ticketmaster.com/discovery/v2/events.json?`, {
        params: {
          apikey: process.env.TICKETMASTER_API_KEY,
          id: req.params.id,
        },
      });

      const concert = {
        id: response.data._embedded.events[0].id,
        name: response.data._embedded.events[0].name,
        artist: response.data._embedded.events[0].name,
        date: response.data._embedded.events[0].dates.start.localDate,
        description: response.data._embedded.events[0].info,
        location: response.data._embedded.events[0]._embedded.venues[0].city.name,
        image: response.data._embedded.events[0].images[0].url,
        ticketLink: response.data._embedded.events[0].url,
      };

      res.json(concert);
    } catch (err) {
      console.error(err);
      const backupData = {
        ticketmasterid: 1,
        name: 'John Smith live at the Purple Lounge',
        artist: 'John Smith',
        date: 'September 22, 2040',
        description: 'John Smith debuts his new record for the first time live',
        location: 'Example Venue',
        image: 'https://example.com/image.jpg',
        ticketLink: 'https://example.com/tickets',
      };

      res.json(backupData);
    }
  }
);

module.exports = TicketMasterRouter;
