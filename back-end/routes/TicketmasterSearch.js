const express = require('express');
const TicketmasterSearchRouter = express.Router();

const axios = require("axios");
const morgan = require("morgan") 

TicketmasterSearchRouter.get('/:artist', async (req, res) => {
    try {
      // Extract search criteria from URL parameter
      const artist = req.params.artist;
  
      // Call the Ticketmaster API with search criteria
      const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
        params: {
          apikey: '8TyzvIJo1qYOzAkLo8ytUqpOsj2evcPb',
          keyword: artist,
        },
      });
  
      // Filter and format API response
      const events = response.data._embedded.events;
      const formattedEvents = events.map(concert => ({
        id: concert.id ?? " ",
        name: concert.name ?? " ",
        artist: concert.name ?? " ",
        date: concert.dates.start.localDate ?? " ",
        description: concert.info ?? " ",
        location: concert["_embedded"].venues[0].city.name ?? " ",
        image: concert.images !== null ? concert.images[0].url : " ",
        ticketLink: concert.events !== null ? concert.url : " "
      }));
  
      // Send formatted search results to the client
      res.json(formattedEvents);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
module.exports = TicketmasterSearchRouter;