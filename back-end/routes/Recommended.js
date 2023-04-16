const express = require('express');
const passport = require('passport');

const RecommendedRouter = express.Router();

const axios = require('axios');

RecommendedRouter.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const response = await axios.get(
      `https://my.api.mockaroo.com/concerts.json?key=${process.env.CONCERTS_API_KEY}`
    );
    const { data } = response;
    res.json(data);
  } catch (err) {
    console.error(err);
    const backupData = [
      {
        id: 1,
        name: 'Example Concert',
        artist: 'Example Artist',
        date: 'Example Date',
        location: 'Example Venue',
        image: 'https://dummyimage.com/250x100',
        link: 'http://localhost:3000/concerts/1',
      },
      {
        id: 2,
        name: 'Example Concert',
        artist: 'Example Artist',
        date: 'Example Date',
        location: 'Example Venue',
        image: 'https://dummyimage.com/250x100',
        link: 'http://localhost:3000/concerts/2',
      },
      {
        id: 3,
        name: 'Example Concert',
        artist: 'Example Artist',
        date: 'Example Date',
        location: 'Example Venue',
        image: 'https://dummyimage.com/250x100',
        link: 'http://localhost:3000/concerts/3',
      },
    ];
    res.json(backupData);
  }
});

module.exports = RecommendedRouter;
