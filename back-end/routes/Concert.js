
const express = require('express');

const ConcertRouter = express.Router();

const axios = require("axios");


ConcertRouter.get("/:id", async (req,res) =>{
    try {
        // eslint-disable-next-line no-console
        console.log(req.params)
        const response = await axios.get(
          `https://my.api.mockaroo.com/concerts/${req.params.id}.json?key=54687d90`
        )
        res.json(response.data) // pass data along directly to client
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)

        const backupData = 
        {
          id: 1,
          name: "John Smith live at the Purple Lounge",
          artist: "John Smith",
          date: "September 22, 2040",
          description: "John Smith debuts his new record for the first time live",
          location: 'Example Venue',
          image: 'https://example.com/image.jpg',
          ticketLink: 'https://example.com/tickets',
        }

        res.json(backupData)
      }
})

module.exports = ConcertRouter