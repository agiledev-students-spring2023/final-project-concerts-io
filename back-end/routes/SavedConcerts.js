const express = require('express');
const SavedConcertsRouter = express.Router();

const axios = require("axios");
const morgan = require("morgan") 



SavedConcertsRouter.get("/", morgan("dev"),(req, res, next) => {
    // use axios to make a request to an API for concert data
    axios("https://my.api.mockaroo.com/concerts.json?key=54687d90")
    .then(apiResponse => res.json(apiResponse.data))
   .catch(err => {
     console.log(`Get Nae Naed--No Data For you`)
     console.error(err)
     const backupData = [
      {
        id: 1,
        name: 'Example Concert',
        artist: 'Example Artist',
        date: 'Example Date',
        location: 'Example Venue',
        image: 'https://example.com/image.jpg',
        link: 'http://localhost:3000/concerts/1',
      },
      {
        id: 2,
        name: 'Example Concert',
        artist: 'Example Artist',
        date: 'Example Date',
        location: 'Example Venue',
        image: 'https://example.com/image.jpg',
        link: 'http://localhost:3000/concerts/2',
      },
      {
        id: 3,
        name: 'Example Concert',
        artist: 'Example Artist',
        date: 'Example Date',
        location: 'Example Venue',
        image: 'https://example.com/image.jpg',
        link: 'http://localhost:3000/concerts/3',
      },
      {
        id: 4,
        name: 'Example Concert',
        artist: 'Example Artist',
        date: 'Example Date',
        location: 'Example Venue',
        image: 'https://example.com/image.jpg',
        link: 'http://localhost:3000/concerts/4',
      },
      {
        id: 5,
        name: 'Example Concert',
        artist: 'Example Artist',
        date: 'Example Date',
        location: 'Example Venue',
        image: 'https://example.com/image.jpg',
        link: 'http://localhost:3000/concerts/5',
      },
      {
        id: 6,
        name: 'Example Concert',
        artist: 'Example Artist',
        date: 'Example Date',
        location: 'Example Venue',
        image: 'https://example.com/image.jpg',
        link: 'http://localhost:3000/concerts/6',
      },
      {
        id: 7,
        name: 'Example Concert',
        artist: 'Example Artist',
        date: 'Example Date',
        location: 'Example Venue',
        image: 'https://example.com/image.jpg',
        link: 'http://localhost:3000/concerts/7',
      }
    ]})

    
});

module.exports = SavedConcertsRouter;
